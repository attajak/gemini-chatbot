import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// @ts-ignore
import { CoreMessage, CoreToolMessage, generateId, Message, ToolInvocation } from "ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ApplicationError extends Error {
  info: string;
  status: number;
}

export const fetcher = async (url: string, extraHeaders?: Record<string, string>) => {
  const token = getToken();
  const res = await fetch(url, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(extraHeaders ?? {}) },
  });
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.") as ApplicationError;
    (error as any).info = await res.json().catch(() => ({}));
    (error as any).status = res.status;
    throw error;
  }
  return res.json();
};

export function getToken(): string | null {
  try {
    return localStorage.getItem("auth-token");
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  localStorage.setItem("auth-token", token);
}

export function removeToken() {
  localStorage.removeItem("auth-token");
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function addToolMessageToChat({
  toolMessage,
  messages,
}: {
  toolMessage: any;
  messages: Array<any>;
}): Array<any> {
  return messages.map((message) => {
    if (message.toolInvocations) {
      return {
        ...message,
        toolInvocations: message.toolInvocations.map((toolInvocation: any) => {
          const toolResult = toolMessage.content.find(
            (tool: any) => tool.toolCallId === toolInvocation.toolCallId
          );
          if (toolResult) {
            return { ...toolInvocation, state: "result", result: toolResult.result };
          }
          return toolInvocation;
        }),
      };
    }
    return message;
  });
}

export function convertToUIMessages(messages: Array<any>): Array<any> {
  return messages.reduce((chatMessages: Array<any>, message: any) => {
    if (message.role === "tool") {
      return addToolMessageToChat({ toolMessage: message, messages: chatMessages });
    }
    let textContent = "";
    let toolInvocations: Array<any> = [];
    if (typeof message.content === "string") {
      textContent = message.content;
    } else if (Array.isArray(message.content)) {
      for (const content of message.content) {
        if (content.type === "text") {
          textContent += content.text;
        } else if (content.type === "tool-call") {
          toolInvocations.push({
            state: "call",
            toolCallId: content.toolCallId,
            toolName: content.toolName,
            args: content.args,
          });
        }
      }
    }
    chatMessages.push({ id: generateId(), role: message.role, content: textContent, toolInvocations });
    return chatMessages;
  }, []);
}

export function getTitleFromChat(chat: { messages: any[] }) {
  const messages = convertToUIMessages(chat.messages);
  const firstMessage = messages[0];
  if (!firstMessage) return "Untitled";
  return typeof firstMessage.content === "string" && firstMessage.content ? firstMessage.content.slice(0, 60) : "Untitled";
}
