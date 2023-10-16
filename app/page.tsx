import Image from "next/image";
import Navbar from "./(users)/_components/Navbar";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
    </div>
  );
}
