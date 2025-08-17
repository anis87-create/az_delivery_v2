import {saveToStorage, loadFromStorage} from '../utils/storage.js';
import {SERVICE_FREE, DELIVERY_FREE } from '../utils/config.js';

let cart = loadFromStorage('cart') || [];

export const cartService = {
    save(cart){
        saveToStorage('cart', cart);
    },
    load(){
       cart = loadFromStorage('cart') || [];
       return cart;
    },
    clear(){
        saveToStorage('cart', []);
    },
    getSubTotalPrice (arr){
        return  arr.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity*currentValue.price), 0);  
    },
    getTotalPrice (subtTotal) {
         return subtTotal + SERVICE_FREE + DELIVERY_FREE;
    },
    addToCart (arr, item, callback) {
          arr.push(item);
            cartService.save(arr);  
            localStorage.setItem('numberOfItems', 0);
            callback();
    },
    removeFromCart(arr, itemName) {
         const foundedItemById = arr.find(item  => item.name === itemName)?.id;
         const updatedItems = arr.filter(item => item?.id !== foundedItemById);
         return updatedItems; 
    } 
}
