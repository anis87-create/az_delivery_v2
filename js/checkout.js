import { getCartItems, getTotalPrice } from "./utils.js";
document.addEventListener('DOMContentLoaded', () => {
   mainCheckout();
});


const mainCheckout = () => {
   checkoutUI();
}



const checkoutUI = () => {
   let orders = [];
   const items = getCartItems();
   const itemsContainer = document.querySelector('.order-items');
   items.forEach(item => {
      const itemElt = document.createElement('div');
      itemElt.classList.add('order-item');
      const itemEltLeft = document.createElement('div');
      itemEltLeft.classList.add('order-item-left');
      const itemImg = document.createElement('img');
      itemImg.src='images/placeholder.svg';
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
   const subTotalPrice = getTotalPrice(getCartItems());
   const orderSubtotalElt = document.getElementById('order_subtotal');
   if (orderSubtotalElt) orderSubtotalElt.innerText = `$${subTotalPrice}`;

   const totalPrice = subTotalPrice + 1.99 + 0.99;
   const totalPriceElt = document.getElementById('total_price_value');
   if (totalPriceElt) totalPriceElt.innerText = `$${Math.round(totalPrice*100)/100}`;
   document.getElementById('order_btn_price').innerText= `$${Math.round(totalPrice*100)/100}`;
   const checkoutBtn = document.getElementById('checkout-btn');
   if(checkoutBtn){
       document.getElementById('checkout-btn').addEventListener('click', () => {
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
               name: "John Doe",
               phone: "06 12 34 56 78",
               address: "123 Rue de la Paix, 75001 Paris",
               instructions: "2ème étage, porte droite"
            },
            items,
            subTotal: subTotalPrice,
            deliveryFee: 1.99,
            totalPrice
         });
         localStorage.setItem('orders', JSON.stringify(orders));
         localStorage.setItem('items', []);
         }
       
      }else {
         alert('no');
         console.log(localStorage.getItem('orders'));
         
      }
   });
   }
  

}


