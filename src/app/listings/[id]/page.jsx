

import getListingsById from '@/app/actions/getListingsById';
import { getReservationById } from '@/app/actions/getReservationById';
import ReservationComponent from '@/components/reservation-component';
import Image from 'next/image';
import React from 'react'
import { get } from 'react-hook-form'


export default async function  Listing({params}) {
  const {id} = await params;
  const listing = await getListingsById(id);

  const reservation = await getReservationById(id);

  if(!listing) {
    return <div className="w-full h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Listing Not Found</h1>
        <p>Maybe change your filters</p>
      </div>
    </div>
  }
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{listing.title}</h1>
        <p className="text-lg text-gray-500 mt-1">
          Hosted by <span className="font-medium">{listing.user.name}</span>
        </p>
      </div>

      <div className="w-full mb-6 overflow-hidden rounded-xl">
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          width={800}
          height={450}
          className="w-full h-auto object-cover"
        />
      </div>

      <p className="text-gray-700 text-base leading-relaxed">{listing.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm text-gray-600">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-800">Price</p>
          <p>${listing.price}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-800">Location</p>
          <p>{listing.locationValue}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-800">Guests</p>
          <p>{listing.guestCount}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-800">Rooms</p>
          <p>{listing.roomCount}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-800">Children</p>
          <p>{listing.childCount}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-800">Category</p>
          <p>{listing.category}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm col-span-2 md:col-span-3">
          <p className="font-semibold text-gray-800">Created At</p>
          <p>{new Date(listing.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="text-lg font-semibold mt-6">Make Reservations for This Listing</div>
      <div>
        <ReservationComponent pricePerDay={listing.price} listingId={listing.id} reservations={reservation} />
      </div>
    </div>
  );
}
