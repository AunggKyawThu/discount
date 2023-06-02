import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



interface SelectProps{
    menu: string[];
    name: string;
    size?: string;
    onhandlechange: (val:string,id:string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Selectmenu = (props: SelectProps) => {

  const [selected, setSelected] = useState(" ")

  const onhandleupdate = (val:string) => {
    setSelected(val);
    props.onhandlechange(val,props.name)
  }

  return (
    <Listbox value={selected} onChange={(val)=>onhandleupdate(val)}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className={`flex ${selected !== " " ? 'w-full' : 'w-20'} cursor-pointer border-b border-b-4 border-indigo-200 text-left text-gray-900 outline-none sm:text-sm sm:leading-6 print:border-0`}>
              <span className="flex items-center">
                <span className={`ml-1 block text-${props.size && props.size} truncate`}>{selected}</span>
              </span>
              <span className={`pointer-events-none ${selected === ' '? 'ml-14' : null} inset-y-0 right-0 ml-3 flex items-center print:hidden`}>
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {props.menu.map((person,idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}