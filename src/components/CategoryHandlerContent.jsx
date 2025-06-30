"use client"

import { cn } from "@/lib/utils";
import { categories } from "@/static/config"
import { useRouter, useSearchParams } from "next/navigation"

export default function CategoryHandlerContent(){
    const searchParms = useSearchParams();
    const router = useRouter();

    const activeCat = searchParms.get('cat');

    const params = new URLSearchParams(searchParms.toString());

    const setCategory = (cat) => {
        params.set('cat', cat)
        router.push(`?${params.toString()}`)
    }


    return (
        <div className="w-full flex justify-evenly gap-3 py-2 px-8 border-b border-gray-100 overflow-x-auto">

            {categories.map(cat => {
                return <div onClick={()=> setCategory(cat.label)} key={cat.label} 
                        className={cn(
                            "flex flex-col gap-1 items-center cursor-pointer hover:bg-gray-100/40 p-4 rounded-lg hover:text-red-500 transition-colors duration-200 delay-100",
                            activeCat == cat.label && "bg-gray-100/40 text-red-400"
                            )}>
                        <cat.icon />
                        {cat.label}
                    </div>
            })}
        </div>
    )
}