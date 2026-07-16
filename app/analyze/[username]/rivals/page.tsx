import RivalsMainWrapper from "@/components/rivals/MainWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyChessAccuracy | Rivals",
  description: "Discover your easiest and toughest opponents.",
};

export default function RivalsPage() {
  return <RivalsMainWrapper />;
}
