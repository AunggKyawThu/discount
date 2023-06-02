import { ChevronDownIcon,MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Dropdownfilter } from "./Dropdownfilter";

export const Searchinput = () => {
    return (
        <div className="my-auto">
            <div className="flex justify-between bg-gray-100 p-2 w-60 space-x-4 rounded-lg md:hidden">
                    <input className="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." />
                    <div className="cursor-pointer">
                        <MagnifyingGlassIcon className="h-6 w-6 opacity-30"/>
                    </div>
                </div>
            <div className="hidden md:flex md:items-center bg-white rounded-xl">
                <Dropdownfilter/>
                <MagnifyingGlassIcon className="h-10 w-10 opacity-50 p-2 text-black font-semibold rounded-full border border-gray-700 hover:opacity-60 transition duration-3000 cursor-pointer"/>
            </div>
        </div>        
    )
}