import { createSlice } from "@reduxjs/toolkit";

function calculatePriceByQuantity(price:number,quantity:number){
  if (quantity === 1) {
    return price;
  }

  const priceByQuantity = price * quantity;

  return priceByQuantity;
}

function extractPriceNumber(productItem:any){
  if(productItem?.sizeSelected != null){
    const {sizeValue}=  productItem.sizeSelected
    const priceSize = sizeValue.price.includes(",") ?  parseInt(sizeValue.price.split(",")[0]) :parseInt(sizeValue.price)
   return priceSize
  }
  return productItem?.price
}


const initialState: {
  totalPrice: number
  shippingProtectionChecked:boolean,

  productsAddedToCart: {
    totalQuantityPrice:number,
    quantity: number;
    sizeSelected: { price: string; sold: number; numberItemsAvailable: string };
    [key: string]: any;
  }[];
} = {
  shippingProtectionChecked:false,
  totalPrice:0,
  productsAddedToCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, { payload }) {

      const productAlreadyInCart = state.productsAddedToCart.findIndex((product)=>product.id === payload.id)
   
      const priceNumber = extractPriceNumber(payload)
      const priceCalculatedByQantity = calculatePriceByQuantity(priceNumber,payload.quantity)
      if(productAlreadyInCart !== -1){
        state.productsAddedToCart.splice(productAlreadyInCart,1,{...payload,totalQuantityPrice:priceCalculatedByQantity})
        return
      }  

      state.productsAddedToCart.push({...payload,totalQuantityPrice:priceCalculatedByQantity});
    },

    removeProductFromCart(state, { payload }){
      
      const productIndex = payload.productIndex
      state.productsAddedToCart.splice(productIndex,1)


    },
  
    changeShippingProtectionCheck(state, { payload }:{payload:boolean}){
    state.shippingProtectionChecked = payload
    },
    changeProductQuantityByIndex(state, { payload }){
      const indexProduct = payload.productIndex 
      const newQuantity = payload.newQuantity
     const productObject = state.productsAddedToCart[indexProduct]

     const priceNumber = extractPriceNumber(productObject)
     const priceCalculatedByQantity = calculatePriceByQuantity(priceNumber,newQuantity)

     state.productsAddedToCart.splice(indexProduct,1,{...productObject,quantity:newQuantity,totalQuantityPrice:priceCalculatedByQantity})
    }
  },
});

export const { addProductToCart,removeProductFromCart,changeShippingProtectionCheck,changeProductQuantityByIndex } = cartSlice.actions;

export default cartSlice.reducer;
