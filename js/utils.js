export const getCartItems = () => {
    return JSON.parse(localStorage.getItem('items'));
}

export const saveCartItems = (arr) => {
    localStorage.setItem('items',JSON.stringify(arr));
}