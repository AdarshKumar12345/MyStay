"use client";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useCountries from "@/hooks/useCountries";
import CountrySelect from "./country-select";

import CounterInfo from "./counter-info";
import { Heading2 } from "lucide-react";

const STEPS = {
  CATEGORY: 1,
  LOCATION: 2,
  INFO: 3,
  IMAGES: 4,
  DESCRIPTION: 5,
  PRICE: 6,
};

export default function BecomeAHostComponent() {
  const [step, setStep] = useState(STEPS.IMAGES);
  const setCustomValue = (title, value) => {
    setValue(title, value);
  };

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      category: "",
      roomCount: 1,
      childCount: 0,
      guestCount: 2,
      title: "",
      description: "",
      price: null,
    },
  });
  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const childCount = watch("childCount");
  const guestCount = watch("guestCount");

  let sourceAtStep = (
    <div className="w-full flex flex-col item-center p-10">
      <div className="w-full flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">
          Which of these categories define your property?
        </h1>
      </div>
      <p className="text-lg pt-5">Pick a Category</p>
      <div className=" grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 flex-wrap justify-center">
        {categories.map((items) => {
          return (
            <div
              className={cn(
                "border-2 border-gray-100 rounded-md flex hover:bg-gray-300 flex-col items-center p-4 bg-gray-300/20",
                category === items.label ? "bg-orange-600/50" : "bg-gray-300/20"
              )}
              key={items.label}
              onClick={() => setCustomValue("category", items.label)}
            >
              <items.icon className="h-8 w-8 text-gray-500" />
              <p className="text-gray-800 mt-2"> {items.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    sourceAtStep = (
      <div className="w-full flex flex-col items-center justify-center px-6 py-10 bg-gray-50 rounded-xl shadow-md">
        <div className="w-full flex items-center justify-center mb-4">
          <h1 className="text-3xl font-semibold text-center text-gray-800">
            Where is your property located?
          </h1>
        </div>

        <p className="text-lg text-gray-600 mb-3">
          Select a location to get started
        </p>

        <div className="w-full max-w-md">
          <CountrySelect
            className="mt-2"
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
        </div>
      </div>
    );
  } else if (step === STEPS.INFO) {
    sourceAtStep = (
      <div className="w-full max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Give us some information about your property
        </h1>

        <div className="space-y-6">
          {/* Question 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
              1. Total No. of Rooms Available
            </h2>
            <CounterInfo
              value={roomCount}
              onChange={(value) => setCustomValue("roomCount", value)}
            />
          </div>

          {/* Question 2 */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
              2. Total No. of Guests Allowed
            </h2>
            <CounterInfo
              value={childCount}
              onChange={(value) => setCustomValue("childCount", value)}
            />
          </div>

          {/* Question 3 */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
              3. Number of Guests Joining You
            </h2>
            <CounterInfo
              value={guestCount}
              onChange={(value) => setCustomValue("guestCount", value)}
            />
          </div>
        </div>
      </div>
    );
  }
  if(step === STEPS.IMAGES){
    sourceAtStep =(
        <div>
            <div className=" flex items-center justify-center pt-5 "> <h1 className=" font-bold text-3xl">Upload Images of Your Property</h1></div>
            <div>
                
            </div>
        </div>
        
    )
  }
  return (
    <section>
      <div>{sourceAtStep}</div>
    </section>
  );
}
