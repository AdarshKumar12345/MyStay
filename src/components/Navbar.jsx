"use client";
import { Search } from "lucide-react";
import Icons from "./Icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import SearchModal from "./Search-model";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SignInButton from "./SignInButton";

function ProfileComponent() {
  return (
    <div className="flex items-center p-2 rounded-full border border-gray-300 cursor-pointer">
      <svg
        className="w-5 h-5 text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 12a7 7 0 1 1 0-14 7.001 7.001 0 0 1 0 14Z" />
      </svg>
      <svg
        className="w-4 h-4 ml-2 text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </div>
  );
}

const MyStayNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalStateStep, setModalStateStep] = useState(-1);
  const openSearchModalAtStep = (step) => {
    if (!isOpen) {
      setIsOpen(true);
      setModalStateStep(step);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-3 px-6">
      <div className="flex items-center justify-between mx-auto">
        {/* Logo and Brand Name */}
        <a href="/" className="flex items-center space-x-2">
          <Icons.Logo className="h-9 w-auto" />{" "}
          {/* Slightly smaller logo for simplicity */}
          <span className="self-center text-2xl font-bold text-red-400/90 whitespace-nowrap">
            MyStay
          </span>
        </a>

        {/* Interactive Search Bar Section */}
        <div className="flex-1 flex justify-center mx-4 ">
          <div className="flex items-center p-1 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div
              className="text-sm font-medium px-4 border-r border-gray-200"
              onClick={() => openSearchModalAtStep(1)}
            >
              Location
            </div>
            <div
              className="text-sm font-medium px-4 border-r border-gray-200 hidden sm:block"
              onClick={() => openSearchModalAtStep(2)}
            >
              Dates
            </div>{" "}
            {/* Hidden on small screens */}
            <div
              className="text-sm font-medium px-4 text-gray-500"
              onClick={() => openSearchModalAtStep(3)}
            >
              Add guests
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-400/90 ml-2">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-4">
          <div className="border border-gray-300 hover:border-black transition-all duration-200 rounded-md shadow-sm hover:shadow-md bg-white">
            <SignInButton />
          </div>
        </div>

        {/* Profile and Menu Options */}
        <div className="flex items-center space-x-4">
          <Link
            href="/become-a-host"
            className="text-gray-700 hover:text-blue-600 font-medium text-sm hidden md:block"
          >
            Become a Host
          </Link>

          {/* User Profile/Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ProfileComponent />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-800">
                My Stay
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-t border-gray-200 my-1" />
              <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <Link href="/bookings">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <Link href="/favorites">Favorites</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <Link href="/properties">Properties</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-t border-gray-200 my-1" />
              <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <div
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log-out
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <SearchModal
        key={modalStateStep}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        stepAt={modalStateStep}
      />
    </nav>
  );
};

export default MyStayNavbar;
