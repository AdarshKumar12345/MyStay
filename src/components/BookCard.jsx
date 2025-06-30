"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import ListingsCard from './listing-card';
import { DeleteReservation } from '@/app/actions/setReservation';
import { toast } from 'sonner';

function BookCard({ resv}) {

    const router = useRouter();
     const cancelReservation = async (e) => {
    e.preventDefault();
    const res = await DeleteReservation( resv.id)
    if(res.ok){
        toast("Reservation cancelled successfully" );
        router.refresh();
    }
  };

    return (
    <div>
        <ListingsCard
            reservationsData = {resv}
            listing={resv.listing}
            showSecondaryBtn={true}
            secondaryBtnLabel={"Cancel Booking"}
            onAction={cancelReservation}
        />
    </div>
  )
}

export default BookCard