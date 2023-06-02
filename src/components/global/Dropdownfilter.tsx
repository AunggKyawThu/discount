import { Fragment } from "react";
import { Menu,Transition} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { Productfilter } from "../search/Productfilter";

export const Dropdownfilter = () => {
    



    return(
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex py-3 px-4 rounded-lg text-gray-600 font-semibold opacity-80 cursor-pointer hover:opacity-100 transition duration-200">
                    Search
                    <ChevronDownIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 w-96 origin-top-right rounded-md bg-white shadow-xl focus:outline-none">
                    <div className="py-1">
                        <form action="get">
                            <Productfilter/>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}