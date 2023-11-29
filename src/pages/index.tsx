import Image from "next/image";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import Navbar from "@/Components/Navbar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Theme>
      <Navbar />
    </Theme>
  );
}
