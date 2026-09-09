"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id: number;
  image: string;
  location: string;
  distance?: string;
  dates?: string;
  price: string;
  rating?: string;
  isFavorite?: boolean;
  badge?: string;
}

const PropertyCard = ({ id, image, location, distance, dates, price, rating = "Nuevo", isFavorite = false, badge }: PropertyCardProps) => {
  const [liked, setLiked] = useState(isFavorite);

  return (
    <Link href={`/property/${id}`} className="flex flex-col group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-3 bg-gray-200 shadow-sm">
        <img
          src={image}
          alt={location}
          className="object-cover w-full h-full group-hover:scale-[1.035] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/85 backdrop-blur-sm shadow-sm hover:scale-105 transition-transform"
          aria-label="Favorito"
        >
          <Heart size={19} className={liked ? "fill-rose-500 text-rose-500" : "text-gray-700"} />
        </button>
        {badge && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
            {badge}
          </div>
        )}
      </div>

      <div className="px-0.5">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-950 text-base truncate group-hover:text-cyan-700 transition-colors">{location}</h3>
            {distance && <p className="text-gray-500 text-sm mt-1 truncate">{distance}</p>}
            {dates && <p className="text-gray-500 text-sm">{dates}</p>}
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-semibold text-gray-950">${price} MXN</span>
              <span className="text-gray-500 text-sm">noche</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <Star size={13} className="fill-gray-900 text-gray-900" />
            <span className="text-sm text-gray-800">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
