import React from "react";
import { Card } from "flowbite-react";
export default function ProductDetailCard({
  image,
  title,
  description,
  price,
}) {
  return (
    <Card className="max-w-sm ">
      <img
        className="h-[250px] object-cover items-center mx-auto "
        src={image ? image : "../assets/img1.png"}
        alt="image product"
      />
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title || "no title"}
        </h5>
      </a>
      <p>{description || "no content"}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ${price ? price : description}
        </span>
      </div>
    </Card>
  );
}
