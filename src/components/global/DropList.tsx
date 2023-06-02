import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


interface itemsProps {
  items?: { description: string,code:string }[] | [];
  target: string | undefined
  onAddDescription : (item : string,target:string | undefined) => void;
}

export const DropList = (props:itemsProps) => {
    
    const [query, setQuery] = useState('')
  
    const filteredPeople =
    query === ''
      ? props.items
      : props.items?.filter((item) => {
        if(props.target === 'Description'){
          return item.description.toLowerCase().includes(query.toLowerCase())
        }else if(props.target === 'Code'){
          return item.code.toLowerCase().includes(query.toLowerCase())
        }
      })
    const handleChange = (value : string,target:string | undefined) => {
      props.onAddDescription(value,target)
    }

    return (
      <div>
        <Combobox value={query} onChange={(val)=>{handleChange(val,props.target)}}>
          <div className="relative">
            <div className="relative">
              <Combobox.Input
                className="w-auto rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={`Enter ${props.target}`}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={()=> setQuery('')}
            >
              <Combobox.Options
              className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople?.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople?.map((person,idx) => (
                    <Combobox.Option
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-default select-none p-2 ${
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={props.target === 'Description' ? person.description : person.code}
                    >
                      {({ selected }) => (
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {
                            props.target === 'Description' ? person.description : person.code
                            }
                          </span>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    )
  }