import Image from "next/image";
import Slider from "./components/slider.js"
import Carousel from "./components/carousel";

export default function Home() {
  return (
    <div>
      <Carousel/>
      <section>
        <Slider title="Санал болгох"/>
        <Slider title="Hollywood"/>
      </section>
    </div>
  );
}
