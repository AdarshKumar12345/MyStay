"use client";

import React, { useEffect, useMemo, useState } from 'react'
import CalenderInput from './calender';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { Button } from './ui/button';
import formatMoney from '@/utils/formatMoney';
import { setReservation } from '@/app/actions/setReservation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function ReservationComponent({ pricePerDay , listingId , reservations }) {
  const [loading , setLoading] = useState(false);
  const router = useRouter();

const [dateRange , setDateRange] = useState(
            {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
)

  const [total , setTotal ] = useState(pricePerDay)
useEffect(() => {
   if ( dateRange.startDate && dateRange.endDate){
     const countDays = differenceInCalendarDays(
          dateRange.endDate,
          dateRange.startDate
     );
     if ( pricePerDay && countDays)
    setTotal(countDays * pricePerDay);
     else {
        setTotal(pricePerDay)
   }
   }
}, [pricePerDay, dateRange])

  const disabledDates = useMemo(() => {
    let dates =[];
    reservations.forEach(reservation =>{
        const range = eachDayOfInterval({
            start : new Date(reservation.startDate),
            end : new Date(reservation.endDate)
        });
        dates = [...dates, ...range];
        console.log("dates:", dates)
    })
    return dates;

  }, [reservations])

   const handleReservation = async()=>{
    setLoading(true);
    try {
        const res = await setReservation({
            listingId , startDate: dateRange.startDate , endDate: dateRange.endDate , price: total
        })
        if ( res.ok){
            toast.success("Reservation made Successfully");
            router.push('/bookings');
        
        }
        else {
            toast.error(res.message || "something went wrong");
        }
    }
    catch (error){
        toast.error("Something went wrong");    
    }
    finally {
        setLoading(false);
    }
   }
 

  return (
    <div className ='flex flex-col gap-2 items-center justify-center p-4 borderrounded-lg shadow-md bg-white'>
    <h2 className='text-2xl font-semibold'> Reservation</h2>
    <div className="  ">{pricePerDay}</div>
    <div>{listingId}</div>
    <div><CalenderInput value={dateRange} onChange={value => setDateRange(value.selection )} disabledDates={disabledDates} /></div>

    <Button onClick={handleReservation} className="text-white py-2 px-4 rounded-lg">Continue With {formatMoney(total)}</Button>
    </div>
  )    
}

export default ReservationComponent
 