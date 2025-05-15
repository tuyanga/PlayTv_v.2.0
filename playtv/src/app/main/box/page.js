'use client'
import Slider from "../components/slider.js"
import Carousel from "../components/carousel.js";
import { useState, useEffect } from "react";

export default function Home() {

  return (
    <div>
      <Carousel/>
      <section>
      <Slider title="Шинээр нэмэгдсэн"/>
      </section>
    </div>
  );
}
