import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

function CardPostIntro({
  title,
  description,
  createdAt,
  imageUrl,
  id,
  ...props
}) {
  const convertDay = dayjs(createdAt, "DD-MM-YYYY").toString();
  return (
    <div className="blog-slider__item swiper-slide">
      <div className="blog-slider__img">
        <img src={imageUrl} alt="slider example" />
      </div>
      <div className="blog-slider__content">
        <span className="blog-slider__code">{convertDay}</span>
        <div className="blog-slider__title">{title}</div>
        <div className="blog-slider__text">{description}</div>
        <Link passHref href={`/posts/${id}`}>
          <a className="blog-slider__button">READ MORE</a>
        </Link>
      </div>
    </div>
  );
}

export default CardPostIntro;
