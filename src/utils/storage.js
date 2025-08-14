export const getFromStorage = (str) => {
    return localStorage.getItem(str)?.length>0 ? JSON.parse(localStorage.getItem(str)) : [];
}

export const saveToStorage = (str, arr) => {
    localStorage.setItem(str,JSON.stringify(arr));
}

export const getTotalPrice =  (arr) => {
  return  arr.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity*currentValue.price), 0);
}

export const getOrders = () => {
   return localStorage.getItem('orders')?.length>0 ? JSON.parse(localStorage.getItem('orders')) : [];
}

export const saveOrders = (arr) => {
    localStorage.setItem('orders',JSON.stringify(arr));
}

