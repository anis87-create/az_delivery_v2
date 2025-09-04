import { restaurants } from "../../data/restaurants.js";
import { cartService } from "../../src/services/cartService.js";
import { orderService } from "../../src/services/orderService.js";
import { getPriceRounded } from "../../src/utils/helpers.js";
document.addEventListener('DOMContentLoaded', () => {
   checkoutUI();
});


const checkoutUI = () => {
   let orders = orderService.load();
   const cartItems = cartService.load();
   const itemsContainer = document.querySelector('.order-items');
   cartItems.forEach(item => {
      const itemElt = document.createElement('div');
      itemElt.classList.add('order-item');
      const itemEltLeft = document.createElement('div');
      itemEltLeft.classList.add('order-item-left');
      const itemImg = document.createElement('img');
      itemImg.src='/public/images/placeholder.svg';
      item.alt='';
      itemEltLeft.appendChild(itemImg);
      const itemCount = document.createElement('div');
      itemCount.classList.add('count');
      const itemCountValue = document.createTextNode(item.quantity);
      itemCount.appendChild(itemCountValue);
      itemEltLeft.appendChild(itemCount);
      const itemLeftDesc = document.createElement('div');
      const itemLeftDescTitle = document.createElement('h3');
      const title = document.createTextNode(item.name);
      itemLeftDescTitle.appendChild(title);
      itemLeftDesc.appendChild(itemLeftDescTitle);
      const restauratnTitleElt = document.createElement('span');
      const restaurantName = cartService.findRestaurantNameByRestaurantId(restaurants, item?.restaurantId);
      const restaurantTitle = document.createTextNode(restaurantName);
      restauratnTitleElt.appendChild(restaurantTitle);
      itemLeftDesc.appendChild(restauratnTitleElt);
      itemEltLeft.appendChild(itemLeftDesc);
      const itemEltRight = document.createElement('div');
      itemEltRight.classList.add('order-item-right');
      const itemEltRightPrice = document.createElement('span');
      const price = document.createTextNode(`$${item.price}`);
      itemEltRightPrice.appendChild(price);
      itemEltRight.appendChild(itemEltRightPrice);
      itemElt.appendChild(itemEltLeft);
      itemElt.appendChild(itemEltRight);
      if(itemsContainer){
         itemsContainer.appendChild(itemElt)
      }
     
   });
   
   const subTotalPrice =cartService.getSubTotalPrice(cartService.load());

   
   const orderSubtotalElt = document.getElementById('order_subtotal');
   if (orderSubtotalElt) orderSubtotalElt.innerText = `$${subTotalPrice}`;

   const totalPrice = getPriceRounded(subTotalPrice);   
   const totalPriceElt = document.getElementById('total_price_value');   
   
   if (totalPriceElt) totalPriceElt.innerText = totalPrice;
   
   document.getElementById('order_btn_price').innerText= totalPrice;
   const checkoutBtn = document.getElementById('checkout-btn');
  
   
   if(checkoutBtn){
   document.getElementById('checkout-btn').addEventListener('click', (e) => {
      e.preventDefault();
      const fullNameValue = document.querySelector('[name="fullName"]').value;
      const phoneValue = document.querySelector('[name="phoneNumber"]').value;
      const addressValue = document.querySelector('[name="address"]').value;
      const cityValue = document.querySelector('[name="city"]').value;
      const zipCodeValue = document.querySelector('[name="zipcode"]').value;
      let confirmation = confirm('do you want to confirm this order ?');

      if(confirmation){
         if(cartItems.length>0){
         let groupedOrders = [];  
         const itemsByRestaurant = cartItems.reduce((acc, it) => {
         (acc[it.restaurantId] ||= []).push(it);
         return acc;
         }, {});

         for (const [rid, items] of Object.entries(itemsByRestaurant)) {
         const restaurant = restaurants.find(r => r?.id === Number(rid));
         const subTotal = cartService.getSubTotalPrice(items);
         const totalPrice = cartService.getTotalPrice(subTotal);
         const order = {
            id: `ORDER-${crypto.randomUUID()}`,
            created_at: new Date(),
            status: 'preparing',
            restaurant: { id: restaurant.id, name: restaurant.name },
            items,
            subTotal,
            deliveryFee: 1.99,
            totalPrice
         };
         groupedOrders.push(order); // tu fais déjà push/save aujourd’hui:contentReference[oaicite:11]{index=11}
         }
         orders = [{orders: groupedOrders},
           {customer: { fullName: fullNameValue, phone: phoneValue, address:addressValue, city:cityValue, zipcode:zipCodeValue, instructions: "" }},
         ]
         orderService.save(orders);
         window.location.href= '/src/pages/orders.html';
         cartService.clear();
         }
      }else {
         return;
      }
   });
   }
  

}


