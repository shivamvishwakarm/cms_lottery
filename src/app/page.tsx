import Image from "next/image";
import Form from "./Form";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center bg-blue-100 w-full h-full">
      <h1 className="text-4xl font-bold text-blue-700 text-center m-12">Welcome to the Lottery Ticket Entry</h1>
      <Form />
    </main>
  );
}
