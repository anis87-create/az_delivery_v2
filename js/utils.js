export const getCartItems = () => {
    return localStorage.getItem('items')?.length>0 ? JSON.parse(localStorage.getItem('items')).filter(item => item.quantity !== 0) : [];
}

export const saveCartItems = (arr) => {
    localStorage.setItem('items',JSON.stringify(arr));
}