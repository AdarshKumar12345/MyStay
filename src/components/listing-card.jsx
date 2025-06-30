
"use client";

import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import formatMoney from "@/utils/formatMoney";
import Favorite from "./favorite-btn";

export default function ListingsCard({
  user,
  reservationsData,
  listing,
  showSecondaryBtn = false,
  secondaryBtnLabel,
  onAction,
}) {
  const { getByValue } = useCountries();
  const router = useRouter();
  const countryDetails = getByValue(listing.locationValue);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg border border-gray-200">
      <div className="relative w-full aspect-[4/3]">
       <Favorite className="absolute top-6 right-6" listingId={listing.id} user={user} />
        <Image
          className="object-cover w-full h-full"
          src={listing.imageSrc} 
          width={400}
          height={300}
          alt="property listing"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">{listing.title}</h2>

        <p className="text-sm text-gray-600 mt-1">
          {countryDetails.label}, {countryDetails.region}
        </p>

        <div className="mt-2 text-base text-gray-700">
          {reservationsData ? (
            <span className="font-medium text-green-600">
              Paid {formatMoney(reservationsData.totalPrice)} ₹
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-700">
              <IndianRupee size={16} />
              {listing.price} <span className="text-sm text-gray-500">/ night</span>
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={() => router.push(`/listings/${listing.id}`)}
            className="w-full text-white font-semibold"
          >
            View Property
          </Button>

          {showSecondaryBtn && (
            <Button
              onClick={onAction}
              variant="outline"
              className="w-full border-red-500 text-red-600 hover:bg-red-50"
            >
              {secondaryBtnLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
