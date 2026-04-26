import { v4 as uuidv4 } from "uuid";
import { Chat } from "@/components/custom/chat";
import { Navbar } from "@/components/custom/navbar";

export default function HomePage() {
  const id = uuidv4();
  return (
    <>
      <Navbar />
      <Chat id={id} initialMessages={[]} />
    </>
  );
}
