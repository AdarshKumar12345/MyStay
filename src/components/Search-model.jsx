"use client";

import { X } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { Button } from './ui/button';
import CountrySelect from './country-select';
import CalenderInput from './calender';
import Counter from './counter-input';
import { useRouter, useSearchParams } from 'next/navigation';

const STEPS = { // starting from 0 because of indexing convention
    LOCATION: 0, // means step 1
    DATE: 1, // step 2
    DETAILS: 2 // step 2
}

function SearchModal({ isOpen, setIsOpen, stepAt }) {
    const [step, setStep] = useState(stepAt || STEPS.LOCATION);
    const [location, setLocation] = useState();
    const [guestCount, setGuestCount] = useState(2);
    const [roomCount, setRoomCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [dateRange, setDateRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    )
    const router = useRouter();
    const searchParams = useSearchParams();

    const sourceToReturn = {
        [STEPS.LOCATION]: ( 
            <div>
                <h2>Where are you planning to visit?</h2>
                <CountrySelect
                    value={location}
                    onChange={value=> setLocation(value)}
                />
            </div>
        ),
        [STEPS.DATE]: (
            <div>
                <CalenderInput 
                    value={dateRange} 
                    onChange={value=> setDateRange(value.selection)}
                />
            </div>
        ),
        [STEPS.DETAILS]: (
            <div>
                <div className='flex justify-between'>
                    <h3>How many Guests are joining?</h3>
                    <Counter 
                        value={guestCount}
                        onChange={setGuestCount}
                    />
                </div>
                <div className='h-[0.4px] w-full bg-gray-500 my-5' />
                <div className='flex justify-between'>
                    <h3>How many Rooms do you want?</h3>
                    <Counter 
                        value={roomCount}
                        onChange={setRoomCount}
                    />
                </div>
                <div className='h-[0.4px] w-full bg-gray-500 my-5' />
                <div className='flex justify-between'>
                    <h3>How many children?</h3>
                    <Counter 
                        value={childCount}
                        onChange={setChildCount}
                    />
                </div>
            </div>
        )
    }

    const onBack = () => {
        if(step == 0) return;
        setStep(previousStep => previousStep - 1)
    }
    const onNext = useCallback(()=> {
        if(step == Object.keys(STEPS).length - 1){

            const trackOfQueryParams = {
                ...(location?.value && { locationValue: location.value }),
                ...(guestCount && { guestCount: guestCount}),
                ...(roomCount && { roomCount: roomCount}),
                ...(childCount && { childCount: childCount}),
                ...(dateRange.startDate && dateRange.endDate && {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate
                })
            } // queyr modified ends here 

            if(Object.keys(trackOfQueryParams).length === 0) return;

            const queryString = Object.keys(trackOfQueryParams).map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(trackOfQueryParams[key])}`).join("&")
            console.log("Query String: ", queryString)
            const params = new URLSearchParams(searchParams.toString());
            const tempCat = params.get('cat');
            if(tempCat) params.set('cat', tempCat)

            const url = `/?${queryString}`
            setIsOpen(false);
            router.push(url);
        }
        
        
        setStep(previousStep => previousStep + 1)
    }, [step, location, guestCount, roomCount, childCount, dateRange])

    const labelForLastButton = step == Object.keys(STEPS).length - 1 ? "Search" : "Next"
  return (
    <>
        {
            isOpen  ? (<div className='fixed top-0 left-0 w-full h-screen z-10'>
                <div className='w-full relative h-screen bg-black/40'>
                    <div className='modal_content absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full md:w-3/5 min-h-[300px] p-5 rounded-lg shadow'>
                        {sourceToReturn[step]}
                        <X onClick={()=> setIsOpen(false)} className='float-right absolute top-4 right-4 cursor-pointer'/>
                        <div className='w-full flex justify-between pt-5'>
                            <Button 
                                disabled={step == 0}
                                className={step==0 && 'bg-gray-500'}
                                onClick={onBack}>
                                Back
                            </Button>
                            <Button 
                                className={step == Object.keys(STEPS).length - 1 && "bg-red-400 hover:bg-red-300"}
                                onClick={onNext}>
                                {labelForLastButton}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>)
            : 
            null
        }
    </>
  )
}

export default SearchModal