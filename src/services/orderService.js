import {saveToStorage, loadFromStorage} from '../utils/storage.js';


let orders = loadFromStorage('orders') || [];

export const orderService = {
    save(orders){
        saveToStorage('orders', orders);
    },
    load(){
       orders = loadFromStorage('orders') || [];
       return orders;
    },
    clear(){
        saveToStorage('orders', []);
    }
}
