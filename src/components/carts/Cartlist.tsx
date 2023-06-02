import React,{useState,useEffect} from 'react';

import { productProps,selectedItem } from '.';
import { Product } from '../products'
import { DropList } from '../global/DropList';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CartProp {
    discount : number;
    products : Product[] | undefined;
    onhandleChange :(val : selectedItem[]) => void;
}


export const Cartlist = (props : CartProp) => {

    const tableHead = [
        'No','Code','Description','Qty','Unit','Sale Price','Whole Sale','Price','Total Price'," "
    ]
 
    const [selectedItem,setSelectedItem] = useState<selectedItem[]>([]);
    const [currentDescription,setCurrentDescription] = useState<String>('');
    const [selectDescription,setSelectDescription] = useState<string[]>([]);

    useEffect(()=>{
        setCurrentDescription('');
        props.onhandleChange(selectedItem);
    },[selectedItem,currentDescription])

    const handleSelectItem = (item : string,target:string|undefined) => {

        /* For State Update when choose Cart Item */
        setCurrentDescription(item);
    
        const createSelectedItem = (select : productProps): selectedItem => {
    
          return {
            code: select.code,
            description: select.description,
            qty: Number(0),
            unit: select.unit,
            salePrice: select.salePrice,
            wholeSale: '',
            totalPrice: Number(0),
            discount : Number(0)
          }
    
        };
    
        const filterByItem = (product: productProps, item: string, target: string|undefined) => {
          target === 'Description' && product.description === item || target === 'Code' && product.code === item ? selectedItem.push(createSelectedItem(product)) : null;
        };
    
        item && props.products && props.products.map((product) => filterByItem(product, item, target));
    
        item && props.products?.forEach(product => product.description === item && selectDescription.push(product.description));
    
    }

    const deleteItem = (id:number) => {
    
        const removeDescription = (value:string) => {
          const newDescription = selectDescription.filter(item => item !== value ? item : null);
          setSelectDescription(newDescription);
        }
    
        const newItem = selectedItem.filter((item,idx) => idx !== Number(id) ? item : removeDescription(item.description));
    
        setSelectedItem(newItem);

    }

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,idx:number) => {
        e.preventDefault();

        let value = e.target.value.trim();

        value.startsWith("0") && value.length > 1 ? e.target.value = value.slice(1) : e.target.value;
  
        setSelectedItem((prevItem: selectedItem[]) => {
          
            const updateditem = [...prevItem];
            const currentItem = updateditem[idx];
  
            currentItem 
            ? updateditem[idx] = { 
              ...(prevItem[idx] as selectedItem),
              [e.target.name] : e.target.value,
              totalPrice : e.target.name === 'qty' 
              ? currentItem.wholeSale === '' 
                ? currentItem.salePrice * Number(e.target.value)
                : Number(currentItem.wholeSale) * Number(e.target.value)
              : e.target.value !== ''
                ? currentItem.qty * Number(e.target.value) 
                : currentItem.qty * currentItem.salePrice
              }
            :null
  
            return updateditem
          })
    }
  

    return(

        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm border border border-gray-100 text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {tableHead.map((item,idx)=> (
                        <th 
                        key={idx} 
                        scope="col" 
                        className={`px-3 py-3 bg-gray-300 
                            ${item === 'Whole Sale' || item === 'Sale Price' || item === ' ' ? 'print:hidden' : null} 
                            ${item === 'Total Price' && 'text-right'}
                            `}
                        >
                        {item}
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        selectedItem.length !== 0 && 
                        selectedItem.map((item,idx) =>(
                        <tr key={idx} className={`border-b ${Number(idx % 2) === Number(0) ? 'bg-white' : 'bg-gray-100'}`}>
                            <td className="px-3 py-3">
                                {idx+1}
                            </td>
                            <td className="px-3 py-3">
                                {item.code}
                            </td>
                            <td className="px-3 py-3">
                                {item.description}
                            </td>
                            <td className="px-3 py-3">
                                <input type="number" id='qty' name='qty' className={`w-12 outline-none bg-indigo-200 ${ Number(idx % 2) === Number(0) ? 'print:bg-white' : 'print:bg-gray-100' }`} min={0} onChange={(e)=>handleChangePrice(e,idx)}/>
                            </td>
                            <td className="px-3 py-3">
                                {item.unit}
                            </td>
                            <td className="px-3 py-3 print:hidden">
                                {item.salePrice}
                            </td>
                            <td className="px-3 py-3 print:hidden">
                                <input type="number" id='wholeSale' name='wholeSale' className='w-28  bg-indigo-200 outline-none' onChange={(e)=>handleChangePrice(e,idx)}/>
                            </td>
                            <td className="px-3 py-3">
                                {
                                item.wholeSale === "" ? item.salePrice : item.wholeSale
                                } 
                            </td>
                            <td className="px-3 py-3 text-right">
                                {item.totalPrice} K
                            </td>
                            <td className='text-center print:hidden'>
                            <button className='bg-red-500 rounded-full' onClick={()=>deleteItem(idx)}>
                                <XMarkIcon 
                                className="h-5 w-5 text-white"
                                aria-hidden="true"/>
                            </button>
                            </td>
                        </tr>
                        ))
                    }
                    
                    </tbody>
                </table>
            </div>
            {
                selectedItem.length < 15 && (
                <div className="bg-white flex print:hidden">
                    <div className="px-3 py-3 text-gray-700 self-center">
                        {selectedItem.length+1}
                    </div>
                    <div className='px-3 py-3'>
                        <DropList items={props.products} target={'Code'} onAddDescription={handleSelectItem}/>
                    </div>
                    <div className="px-3 py-3">
                        <DropList items={props.products} target={'Description'} onAddDescription={handleSelectItem}/>
                    </div>
                </div>
            )}
        </>

    )
}