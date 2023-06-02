import React,{Fragment} from "react";


interface fieldProp {
    title?: string,
    label: string,
    type: string,
    placeholder?: string,
    id: string,
    value:string | number | undefined,
    onChange: (name:string,value:string) => void,
    option ?: any[]
}

export const Searchfield = (props:fieldProp) => {

    return (
        <Fragment>
                {props.title && (
                    <label htmlFor={props.label} className="capitalize font-medium">
                        {props.title}
                    </label>
                )}

                {props.type === 'text' || props.type === 'number' ? (
                    <input
                    type={props.type}
                    name={props.label}
                    id={props.id}
                    value={props.value}
                    onChange={(e)=>{props.onChange(e.target.name,e.target.value)}}
                    placeholder={props.placeholder}
                    min={0}
                    className={`${props.value ? 'border-indigo-500' : 'border-gray-200'} block w-full border-b-4 border-gray-200 px-1.5 py-1.5 text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-500 transition duration-200 sm:text-sm sm:leading-6`}
                    />
                ): null
                }

                {props.type === 'select' && (
                    <select 
                    name={props.id} 
                    id={props.id}
                    value={props.value}
                    onChange={(e)=>{props.onChange(e.target.name,e.target.value)}} 
                    className={`${props.value ? 'border-indigo-500' : 'border-gray-200'} block border-b-4 border-gray-200 px-1.5 py-1.5 text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-500 transition duration-200 sm:text-sm sm:leading-6`}>
                        {
                            props.option?.map((opt,idx) => (
                            <option
                            key={idx} 
                            value={opt.value}
                            >
                                {opt.title}
                            </option>
                            ))
                        }
                    </select>
                )}
        </Fragment>
    )
}