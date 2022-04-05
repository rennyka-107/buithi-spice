import React, { useEffect } from "react";

function CardPostIntro() {  

  return (
    <div className="blog-slider__item swiper-slide">
      <div className="blog-slider__img">
        <img
          src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
          alt="slider example "
        />
      </div>
      <div className="blog-slider__content">
        <span className="blog-slider__code">26 December 2019</span>
        <div className="blog-slider__title">Lorem Ipsum Dolor</div>
        <div className="blog-slider__text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          voluptate repellendus magni illo ea animi?{" "}
        </div>
        <a href="#" className="blog-slider__button">
          READ MORE
        </a>
      </div>
    </div>
  );
}

export default CardPostIntro;
