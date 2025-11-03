import { Courses } from "./Courses";
import { FAQ } from "./FAQ";
import { ForWho } from "./ForWho";
import { Graduates } from "./Graduates";
import { Hero } from "./Hero";
import { News } from "./News";
import { Teachers } from "./Teachers";
import { Videos } from "./Videos";
import { WhyUs } from "./WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <Courses />
      <Graduates />
      <Teachers />
      <Videos />
      <News />
      <ForWho />
      <WhyUs />
      <FAQ />
    </>
  );
}
