"use client";

import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

interface PropertyCardProps {
  image: string;
  location: string;
  distance: string;
  dates: string;
  price: string;
  rating: string;
  isFavorite: boolean;
  badge?: string;
}

const PropertyCard = ({
  image,
  location,
  distance,
  dates,
  price,
  rating,
  isFavorite,
  badge,
}: PropertyCardProps) => {

  const [liked, setLiked] = useState(isFavorite);

  return (
    <div className="flex flex-col group cursor-pointer">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-3 bg-gray-200">

        <img
          src={image}
          alt={location}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 z-10 p-1"
        >
          <Heart
            size={24}
            className={`
              drop-shadow-md transition
              ${
                liked
                  ? "fill-red-500 text-red-500"
                  : "fill-black/30 text-white hover:scale-110"
              }
            `}
          />
        </button>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
            {badge}
          </div>
        )}

      </div>

      {/* Property Details */}
      <div className="flex justify-between items-start">

        <div>
          <h3 className="font-semibold text-gray-900 text-base">
            {location}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {distance}
          </p>

          <p className="text-gray-500 text-sm">
            {dates}
          </p>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-semibold text-gray-900">
              ${price} MXN
            </span>

            <span className="text-gray-500 text-sm">
              noche
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">

          <Star
            size={14}
            className="fill-gray-900 text-gray-900"
          />

          <span className="text-sm font-light text-gray-900">
            {rating}
          </span>

        </div>

      </div>

    </div>
  );
};

export default PropertyCard;