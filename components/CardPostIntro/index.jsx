import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CardPostIntro({
  title,
  description,
  createdAt,
  imageUrl,
  slug,
}) {
  const convertDay = dayjs(createdAt, "DD-MM-YYYY").toString();
  return (
    <div className="blog-slider__item swiper-slide"> 
      <div className="blog-slider__img">
        {/* <Image layout="fill" src={imageUrl} alt="slider example" /> */}
        <img src={imageUrl} loading="lazy" alt="slider example" />
      </div>
      <div className="blog-slider__content">
        <span className="blog-slider__code">{convertDay}</span>
        <div className="blog-slider__title">{title}</div>
        <div className="blog-slider__text">{description}</div>
        <Link passHref href={`/posts/${slug}`}>
          <a className="blog-slider__button">READ MORE</a>
        </Link>
      </div>
    </div>
  );
}

export default CardPostIntro;
