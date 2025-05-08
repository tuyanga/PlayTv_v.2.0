import Slider from "./components/slider.js"
import Carousel from "./components/carousel.js";
import { redirect } from 'next/navigation';

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
