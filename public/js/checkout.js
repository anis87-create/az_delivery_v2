import { DELIVERY_FREE, SERVICE_FREE } from "../../src/utils/config.js";
import { getFromStorage, getTotalPrice, saveToStorage } from "../../src/utils/storage.js";
document.addEventListener('DOMContentLoaded', () => {
   checkoutUI();
});





const checkoutUI = () => {
   let orders = getFromStorage('orders') || [];
   const items = getFromStorage('items');
   const itemsContainer = document.querySelector('.order-items');
   items.forEach(item => {
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
      const restaurantTitle = document.createTextNode('Burger Palace');
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
   const subTotalPrice = getTotalPrice(getFromStorage('items'));
   const orderSubtotalElt = document.getElementById('order_subtotal');
   if (orderSubtotalElt) orderSubtotalElt.innerText = `$${subTotalPrice}`;

   const totalPrice = subTotalPrice + DELIVERY_FREE + SERVICE_FREE;
   const totalPriceElt = document.getElementById('total_price_value');
   if (totalPriceElt) totalPriceElt.innerText = `$${Math.round(totalPrice*100)/100}`;
   document.getElementById('order_btn_price').innerText= `$${Math.round(totalPrice*100)/100}`;
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
         if(items.length>0){
        const uuid = crypto.randomUUID();
         orders.push({
            id: `ORDER-${uuid}`,
            created_at: new Date(),
            status:'preparing',
            restaurant: {
               id: 1,
               name:'Burger Palace'
            },
            customer: {
               fullName: fullNameValue,
               phone: phoneValue,
               address: addressValue,
               city: cityValue,
               zipcode: zipCodeValue,
               instructions: ""
            },
            items,
            subTotal: subTotalPrice,
            deliveryFee: 1.99,
            totalPrice
         });

         
         saveToStorage('orders', orders);
         alert(`ORDER-${uuid} confirmed`);
         saveToStorage('items',[]);
         }
      }else {
         return;
      }
   });
   }
  

}


