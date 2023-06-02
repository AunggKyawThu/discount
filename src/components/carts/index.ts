export * from './Cartlist';

export interface productProps {
    code: string;
    description: string;
    unit: string;
    salePrice: number;
  }
  
export interface selectedItem extends productProps {
    qty: number;
    wholeSale: string;
    totalPrice: number;
    discount: number;
  }