import { orderService } from "../../src/services/orderService.js";
import { getPriceRounded } from "../../src/utils/helpers.js";

document.addEventListener('DOMContentLoaded', () => {
mainOrders();
  orderService.clear();
});

const mainOrders = () => {
    const orders = orderService.load();    
    if(orders?.length>0){
     orders[0]?.orders?.forEach(order => {    
        const orderElt = document.createElement('div');
        orderElt.classList.add('order');
        const orderEltDesc = document.createElement('div');
        orderEltDesc.classList.add('order-desc');
        const imgElt = document.createElement('img');
        imgElt.src ='/public/images/placeholder.svg';
        imgElt.alt='';
        const orderDescContentElt = document.createElement('div');
        orderDescContentElt.classList.add('order-desc-content');
        const orderRestaurantTitleElt = document.createElement('h3');
        const orderRestaurantTitleText = document.createTextNode(order?.restaurant?.name);
        if(orderRestaurantTitleElt){
            orderRestaurantTitleElt.appendChild(orderRestaurantTitleText);
        }
        const orderItemElt = document.createElement('p');
        orderItemElt.classList.add('order-items');
        const itemsName = order?.items?.map(item => item.name);
        const orderItemEltText = document.createTextNode(itemsName?.join(', '));
        if(orderItemElt){
            orderItemElt.appendChild(orderItemEltText);
        }        
        const now = new Date();
        const date = new Date(order.created_at);
        const orderDate = document.createElement('p');
        orderDate.classList.add('order-date');
        
        
        const isToday = date.getDate() === now.getDate() &&  date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        const timeString = date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
        });
        const formatted =   (isToday ? "Today, " : "") + timeString.replace(" ", "");

        const orderDateText = document.createTextNode(formatted);
        if(orderDate){
           orderDate.appendChild(orderDateText);
        }
        const orderPriceElt = document.createElement('span');
        orderPriceElt.classList.add('order-price');
        const orderPriceEltTxt = document.createTextNode(`$${getPriceRounded(order?.totalPrice)}`);
        if(orderPriceElt){
          orderPriceElt.appendChild(orderPriceEltTxt);
        }
        const orderStatusElt = document.createElement('span');
        const orderStatusTxt = document.createTextNode('preparing');
        orderStatusElt.classList.add('order-status');
        if(orderStatusElt){
            orderStatusElt.appendChild(orderStatusTxt);
        }
       
        if(orderDescContentElt){
            orderDescContentElt.appendChild(orderRestaurantTitleElt);
            orderDescContentElt.appendChild(orderItemElt);
            orderDescContentElt.appendChild(orderDate);
            orderDescContentElt.appendChild(orderPriceElt);
        }
        if(orderEltDesc){
            orderEltDesc.append(imgElt);
            orderEltDesc.appendChild(orderDescContentElt);
        }
        if(orderElt){
            orderElt.appendChild(orderEltDesc);
            orderElt.appendChild(orderStatusElt);
            document.querySelector('.orders-content').appendChild(orderElt);
        }
     });
    }else {        
        const noOrdersContainer = document.createElement('div');
        noOrdersContainer.classList.add('no-orders');
        const noOrdersTextElt = document.createElement('span').appendChild(document.createTextNode('there is no orders!'));
        noOrdersContainer.appendChild(noOrdersTextElt);
        document.querySelector('.orders-content').appendChild(noOrdersContainer);
    }
   
}