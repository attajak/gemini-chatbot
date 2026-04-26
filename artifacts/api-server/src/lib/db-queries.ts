import { genSaltSync, hashSync, compare } from "bcrypt-ts";
import { desc, eq } from "drizzle-orm";
import { db, user, chat, reservation } from "@workspace/db";
import type { User, Chat, Reservation } from "@workspace/db";

export type { User, Chat, Reservation };

export async function getUser(email: string): Promise<Array<User>> {
  return await db.select().from(user).where(eq(user.email, email));
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return await db.insert(user).values({ email, password: hash });
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const users = await getUser(email);
  if (users.length === 0) return null;
  const valid = await compare(password, users[0].password!);
  return valid ? users[0] : null;
}

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string;
  messages: any;
  userId: string;
}) {
  const selectedChats = await db.select().from(chat).where(eq(chat.id, id));
  if (selectedChats.length > 0) {
    return await db
      .update(chat)
      .set({ messages })
      .where(eq(chat.id, id));
  }
  return await db.insert(chat).values({
    id,
    createdAt: new Date(),
    messages,
    userId,
  });
}

export async function deleteChatById({ id }: { id: string }) {
  return await db.delete(chat).where(eq(chat.id, id));
}

export async function getChatsByUserId({ id }: { id: string }): Promise<Chat[]> {
  return (await db
    .select()
    .from(chat)
    .where(eq(chat.userId, id))
    .orderBy(desc(chat.createdAt))) as unknown as Chat[];
}

export async function getChatById({ id }: { id: string }): Promise<Chat | undefined> {
  const result = await db.select().from(chat).where(eq(chat.id, id));
  return result[0] as unknown as Chat | undefined;
}

export async function createReservation({
  id,
  userId,
  details,
}: {
  id: string;
  userId: string;
  details: any;
}) {
  return await db.insert(reservation).values({
    id,
    createdAt: new Date(),
    details,
    userId,
  });
}

export async function getReservationById({ id }: { id: string }): Promise<Reservation | undefined> {
  const result = await db.select().from(reservation).where(eq(reservation.id, id));
  return result[0] as unknown as Reservation | undefined;
}

export async function updateReservationPayment({ id, hasCompletedPayment }: { id: string; hasCompletedPayment: boolean }) {
  return await db.update(reservation).set({ hasCompletedPayment }).where(eq(reservation.id, id));
}
