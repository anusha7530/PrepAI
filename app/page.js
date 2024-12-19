import Link from "next/link";
import Header from "../app/dashboard/_components/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex flex-col lg:flex-row gap-5 items-center p-5">
        <img src={"/bgImg.webp"} alt="PrepAI" className="lg:h-lvh w-1/2" />
        <div className="flex flex-col items-center gap-10">
          <h1 className="sm:text-3xl md:text-4xl font-bold text-center">
            Welcome to PrepAI - Prepare youself for Mock Interviews
          </h1>
          <p className="sm:text-lg text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non
            fermentum diam nisl sit amet erat.
          </p>
          <Link href={"/dashboard"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
