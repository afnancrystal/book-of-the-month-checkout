export type Book = { id:string; title:string; author:string; coverImage:string; price:number };
export type Address = { name:string; street:string; city:string; state:string; zip:string };
export type CheckoutSuccess = { orderId:string; estimatedShipDate:string };
export type CheckoutFailure = { error:string };
