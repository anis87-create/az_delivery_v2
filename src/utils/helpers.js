import { DELIVERY_FREE, SERVICE_FREE } from "./config.js";

export const getPriceRounded = (price) =>{
        return Number(price + SERVICE_FREE + DELIVERY_FREE).toFixed(2);
}

export const  timeSince = (date) =>{
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000; // seconds in a year
  if (interval > 1) {
    return `${Math.floor(interval)} year${Math.floor(interval) === 1 ? '' : 's'} ago`;
  }

  interval = seconds / 2592000; // seconds in a month
  if (interval > 1) {
    return `${Math.floor(interval)} month${Math.floor(interval) === 1 ? '' : 's'} ago`;
  }

  interval = seconds / 86400; // seconds in a day
  if (interval > 1) {
    return `${Math.floor(interval)} day${Math.floor(interval) === 1 ? '' : 's'} ago`;
  }

  interval = seconds / 3600; // seconds in an hour
  if (interval > 1) {
    return `${Math.floor(interval)} hour${Math.floor(interval) === 1 ? '' : 's'} ago`;
  }

  interval = seconds / 60; // seconds in a minute
  if (interval > 1) {
    return `${Math.floor(interval)} minute${Math.floor(interval) === 1 ? '' : 's'} ago`;
  }
  console.log(date);
  
  return seconds <= 60 ? "Just now" : `${seconds} seconds ago`;
  
}
