
import React,{useState,useLayoutEffect,MouseEventHandler } from 'react';


interface RippleProps{
    x:number;
    y:number;
    size:number;
}

interface ButtonProps {
    title:string;
}

const useDebouncedRippleCleanUp = (rippleCount : number, cleanUpFunction : () => void ) => {
    useLayoutEffect(() => {
        let bounce :any = null;
        if (rippleCount > 0) {
            clearTimeout(bounce);
      
            bounce = setTimeout(() => {
              cleanUpFunction();
              clearTimeout(bounce);
            }, 500);
          }
      
          return () => clearTimeout(bounce);

    },[rippleCount, cleanUpFunction])
}

export const Button = (props : ButtonProps) => {

    const {title} = props;
    const [ripples, setRipples] = useState<RippleProps[]>([]);

    useDebouncedRippleCleanUp(ripples.length, () => {
        setRipples([]);
    });

    console.log(ripples)

    const addRipple :MouseEventHandler<HTMLButtonElement>  = (event) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size =
          rippleContainer.width > rippleContainer.height
            ? rippleContainer.width
            : rippleContainer.height;
        const x = event.pageX - rippleContainer.x - size / 2;
        const y = event.pageY - rippleContainer.y - size / 2;
        const newRipple = { x, y, size };
        setRipples([...ripples, newRipple]);

    }

    return (
        <button className='relative rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white overflow-hidden border border-gray-300 focus:outline-none' onClick={addRipple}>
        {title}
        <div className='absolute top-0 bottom-0 left-0 right-0'>
        {ripples.length > 0 &&
            ripples.map((ripple, index) => {
            return (
                <span
                key={index}
                className="absolute rounded-full bg-white opacity-50 animate-[ripple_0.8s]"
                style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
            }}
            ></span>
          );
        })}
        </div>
        </button>
    )
}