import { redirect } from "next/navigation";

export default function Home() {
  redirect("/analyze");
  return <div>Construction in progress...</div>;
}
