import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Slider() {
  return (
    <section className="relative mt-7 shadow-2xl max-w-screen-2xl mx-auto">
      <div />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src="/slider-1.jpg"
            alt=""
            className="h-[368px] w-[1440px] object-center"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/slider-2.jpg"
            alt=""
            className="h-[368px] w-[1440px] object-center"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/slider-3.jpg"
            alt=""
            className="h-[368px] w-[1440px] object-center"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="/slider-4.jpg"
            alt=""
            className="h-[368px] w-[1440px] object-center"
          />
        </div>
      </Carousel>
    </section>
  );
}

export default Slider;
