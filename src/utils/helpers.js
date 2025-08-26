import { DELIVERY_FREE, SERVICE_FREE } from "./config.js";

export const getPriceRounded = (price) =>{
        return Number(price + SERVICE_FREE + DELIVERY_FREE).toFixed(2);
}