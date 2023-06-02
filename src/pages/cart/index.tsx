import React, { useState,useRef, useEffect } from 'react';
import { type NextPage } from "next";
import { Layout } from "../../components";
import Logo from '../../../public/images/uto-logo.png';

import { useReactToPrint } from 'react-to-print';
import { useProduct } from "../../contexts";

import { Selectmenu } from '~/components/global/Selectmenu';
import { api } from '~/utils/api';
import { Cartlist } from '~/components/carts/Cartlist';
import { Button } from '~/components/global/Button';


interface productProps {
  code: string;
  description: string;
  unit: string;
  salePrice: number;
}

interface selectedItem extends productProps {
  qty: number;
  wholeSale: string;
  totalPrice: number;
  discount: number;
}

const Cart: NextPage = () => {
  
  const { products, isLoadingProducts } = useProduct();
  const [restart,setRestart] = useState<boolean>(true);
  const [data,setData] = useState({});
  const [productList,setProductList] = useState<selectedItem[]>([]);
  const [subTotal,setSubTotal] =useState<Number>(0);
  const [discount,setDiscount] = useState<Number>(0);
  const [finalTotal,setFinalTotal] = useState<Number>(0);
  const [date,setDate] = useState<String>('');
  const [invoiceNumber,setInvoiceNumber] = useState<Number>(10000+1);

  /*For print Function*/
  const componentRef = useRef(null);
  const handleSave = useReactToPrint({


    content: () => componentRef.current,
  });

  /* For Total Price */
  const subSum = productList.map(item=> item.totalPrice).reduce((total,current)=>total+current,0);
  
  useEffect(()=>{

    setSubTotal(subSum);
    let finalPrice = discount !== Number(0) ? subSum - subSum * ( Number(discount) / 100 ) : subSum
    setFinalTotal(Math.ceil(finalPrice));

    productList.length === Number(0) ? setDiscount(0) : null;

    setRestart(true);
  },[discount,productList,restart])
  
  
 
  /* For Customer,Location,Date,Payment */
  const handleChange = (value:string,id:string) => {
    setData({
      ...data,
      [id]:value
    })

  }

  const handleStateChange = (value:selectedItem[]) => {
      setProductList(value);
      setData({
        ...data,
        productList: value
      })
  }

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  
  }  

  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value.trim();

    value.startsWith("0") && value.length > 1 ? e.target.value = value.slice(1) : e.target.value;

    productList.map(item => item.discount = Number(e.target.value))

    setDiscount(Number(e.target.value) > 100 ? Number(100) : Number(e.target.value));
  }

  const handleCancel = () => {
    if(restart) {
      setData({});
      setProductList([]);
      setSubTotal(0);
      setDiscount(0);
      setFinalTotal(0);
      setDate('');
      setRestart(false);
    }else{
      return
    }
      
  }

  return (
    <Layout title="Cart">

      <div className='flex justify-between'>
        <div></div>
        <div>
          <button onClick={handleCancel} className='mb-3 mr-3 py-2 px-3 rounded-lg bg-red-500 text-white'>Cancel</button>
          <button onClick={handleSave} className='mb-3 py-2 px-3 rounded-lg bg-indigo-600 text-white'>Sent</button>
        </div>
      </div>

      <div ref={componentRef} className="w-full bg-white p-4">

        <div className='flex justify-between mb-3'>
          <div>

            <h1 className="text-2xl mb-3 text-red-500 font-semibold">U Than Ohn & Sons (YGN Tools Shop)</h1>
            <div className="leading-7 font-semibold text-sm">
              <p className="">No.105,Shwedagon Pagoda Rd.</p>
              <p>Latha Township,Yangon</p>
              <p>(+951)204021,95-1-378956,378928</p>
              <a href="#" className="underline">www.utotools.com</a>
            </div>

          </div>
          <div className="block">
            <img src={Logo.src} className="w-32 object-cover" alt=""/>
          </div>
          
        </div>
        <div className='flex justify-between mb-3'>
          <div>

            <div className='mb-3 flex '>
                <span className='text-xl font-semibold mr-1 text-gray-600'>Customer Name :</span>
                <Selectmenu 
                menu={[
                  'AKT',
                  'AKT-1',
                  'AKT-2',
                  'AKT-3',
                  'AKT-4'
                ]}
                name='customerName'
                onhandlechange={handleChange}
                size='xl'
                />
            </div>
            <div className='flex'>
              <span className='text-base font-semibold mr-1 text-gray-600'>Location :</span>
              <Selectmenu 
              menu={[
                'YGN',
                'MDY',
                'NPT',
                'PG',
                'MLM'
              ]}
              name='location'
              onhandlechange={handleChange}
              />
            </div>

          </div>
          <div className=''>

            <div className='mb-3'>
                <span className='text-base font-semibold mr-1 text-gray-600'>Invoice Date :</span>
                <span className='hidden print:inline'>{date}</span>
                <input type="date" name='date' onChange={handleChangeDate} className='border-b border-b-4 border-indigo-200 outline-none print-hidden-spinner print:hidden'/>
            </div>
            <div>
                <span className='text-base font-semibold mr-1 text-gray-600'>Invoice# :</span>
                <span className='tracking-wider'>{Number(invoiceNumber)}</span>
            </div>

          </div>
        </div>
        
        <Cartlist products={products} discount={Number(discount)} onhandleChange={handleStateChange}/>
        
        <div className='flex justify-between mr-[25px] print:m-0'>

            <div className='w-1/2 py-2 flex justify-between flex-col'>
              <div className='self-start flex mt-5'>
                <span className='font-semibold text-gray-500 '>Cash/Credit :</span>
                <Selectmenu 
                menu={[
                  'Cash',
                  'Credit-7',
                  'Credit-14',
                  'Credit-30',
                  'Credit-45'
                ]}
                name='cash/Credit'
                onhandlechange={handleChange}
                size='base'
                />
              </div>
              <h1>Thank For Your Business</h1>
            </div>
            
            <div className='text-right print:mr-3'>

              <div className='py-2'>
                <span className='font-semibold text-gray-500'>Sub Total :</span>
                <span className='inline-block w-32 px-1 text-md text-gray-700'>{Number(subTotal)} </span>
                <span className='text-gray-500'>K</span>
              </div>
              <div className='py-2'>
                <span className='font-semibold text-gray-500'>Discount :</span>
                <input type="number" value={Number(discount)} disabled={productList.length === Number(0) ? true : false} className='w-32 px-1 text-right text-gray-700 bg-indigo-200 outline-none hidden-spinner print:bg-white' min={0} max={100} onChange={handleDiscount}/>
                <span className='text-gray-500'>%</span>
              </div>
              <div className='py-2'>
                <span className='font-semibold text-gray-500'>Total :</span>
                <span className='inline-block w-32 px-1'>{Number(finalTotal)}</span>
                <span>K</span>
              </div>

            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
