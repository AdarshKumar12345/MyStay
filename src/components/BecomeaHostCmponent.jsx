"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { categories } from "@/static/config";
import { useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import useCountries from "@/hooks/useCountries";
import CountrySelect from "./country-select";

import CounterInfo from "./counter-info";
import { ArrowLeft, ArrowRight, Heading2 } from "lucide-react";
import ImageUploadComponent from "./image-fileUpload";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STEPS = {
  CATEGORY: 1,
  LOCATION: 2,
  INFO: 3,
  IMAGES: 4,
  DESCRIPTION: 5,
  PRICE: 6,
};


export default function BecomeAHostComponent() {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const setCustomValue = (title, value) => {
    setValue(title, value);
  };
  const router = useRouter();


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
  const imageSrc = watch("imageSrc");

  const isStepValid = useMemo(()=> {
        switch(step){
            case STEPS.CATEGORY:
                return !!category;
            case STEPS.LOCATION:
                return !!location;
            case STEPS.INFO:
                return guestCount > 0 && roomCount > 0;
            case STEPS.IMAGES:
                return !!imageSrc;
            case STEPS.DESCRIPTION:
                return watch('title') && watch('description');
            case STEPS.PRICE:
                return watch('price') && parseFloat(watch('price')) > 0;
            default: 
                return true;
        }
  }, [step, category, location, roomCount, childCount, guestCount, imageSrc, watch()])

  const onBack = () => {
    setStep((step) => step - 1);
  };
  const onNext = (data) => {
    console.log(data);
    
    if( step === STEPS.PRICE){
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/listing`, data).then((res)=> {
          if (res.status === 201) {
            toast.success("Property listed successfully!");
          }
          router.push("/")

        })

    }
    else {
      setStep((step) => step + 1);
    }
  };
  const NextLevel = useMemo(() => {

    if (step == STEPS.PRICE) {
      return <span className="flex flex-row gap-2 items-center text-white text-semibold text-md"> List <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" /></span>

    }
    else return (
       <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" />
    )
  }, [step]);

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
  if (step === STEPS.IMAGES) {
    sourceAtStep = (
      <div>
        <div className=" flex items-center justify-center pt-5 ">
         
          <h1 className=" font-bold text-3xl">
            Upload Images of Your Property
          </h1>
        </div>
        <div>
          <ImageUploadComponent
            value={imageSrc}
            returnUrl={(url) => setCustomValue("imageSrc", url)}
          />
        </div>

      </div>
    );
  } else if (step === STEPS.DESCRIPTION) {
    sourceAtStep = (
      <div className="w-full flex flex-col justify-center  max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex justify-center pt-4 sm:pt-5">
          <h1 className="font-bold text-2xl sm:text-3xl text-center">
            Describe Your Property
          </h1>
        </div>
        <p className="text-gray-600 mt-2 mb-4 text-sm sm:text-base text-center px-2">
          Provide a detailed description to help guests understand your
          property.
        </p>

        <div className="w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
          <Input
            placeholder="Title"
            {...register("title")}
            className="mb-4 w-full"
          />
          <Textarea
            placeholder="Description for Your Property"
            {...register("description")}
            className="mb-4 w-full"
          />
        </div>
      </div>
    );
  } else if (step === STEPS.PRICE) {
    sourceAtStep = (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex justify-center pt-4 sm:pt-5">
          <h1 className="font-bold text-2xl sm:text-3xl text-center">
            Set Your Price
          </h1>
        </div>
        <p className="text-gray-600 mt-2 mb-4 text-sm sm:text-base text-center px-2">
          Set a competitive price for your property Per Night.
        </p>

        <div className="w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
          <Input
            placeholder="Price"
            {...register("price")}
            className="mb-4 w-full"
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>{sourceAtStep}</div>

      <div className="fixed bottom-5 left-0 right-0 flex justify-between items-center max-w-4xl mx-auto px-4 sm:px-6 py-4 z-10">
        <button
          onClick={onBack}
          aria-label="Go Back"
          className="flex items-center justify-center border rounded-full p-2 bg-red-400/90 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <button
          onClick={handleSubmit(onNext)}
          aria-label="Go Next"
          className="flex items-center justify-center border rounded-full p-2 bg-red-400/90 hover:bg-gray-200 transition-colors disabled:opacity-50" disabled={!isStepValid}
        >
          {NextLevel}

        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-4 sm:px-6 py-2 z-0">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-red-400/90 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / Object.keys(STEPS).length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
