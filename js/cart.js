import { saveCartItems, getCartItems } from "./utils.js";

export const mainCart  = () => {
    setupAddButtons();
    displayCartCount();
    loadCartItems();
}


const setupAddButtons = () => {
   const buttons = document.querySelectorAll('.add-to-cart');
   let items = [];
   let id = 0;

   buttons.forEach(button => {
      const itemElement = button.closest('.item-desc');
      const name = itemElement.querySelector('h3')?.textContent;
      const cartItems = JSON.parse(localStorage.getItem('items')) || [];  
      const item = cartItems.find(item => item.name === name);
      if(!item){
         button.style.display = 'block';
      }
      else{
         button.style.display = 'none';
         const div = document.createElement('div');
         var buttonPlus = document.createElement('button');
         buttonPlus.style.marginLeft='0.313rem';
         buttonPlus.textContent = '+';
         UIButton(buttonPlus);
         var itemsNumber = document.createElement('span');
         var number = document.createTextNode(item.quantity);
         itemsNumber.appendChild(number);
         itemsNumber.style.fontSize='1.25rem';
         itemsNumber.style.fontWeight='500';
         var buttonMinus = document.createElement('button');
         buttonMinus.style.marginRight='0.313rem';
         buttonMinus.textContent='-';
         UIButton(buttonMinus);
         div.appendChild(buttonMinus);
         div.appendChild(itemsNumber);
         div.appendChild(buttonPlus);
         button.parentElement.appendChild(div);
         buttonPlus.addEventListener('click', (e) => {
            e.preventDefault();
            let numberOfItems = Number(e.target.previousElementSibling.textContent);

            numberOfItems++;
            items = JSON.parse(localStorage.getItem('items')) || [];
            e.target.previousElementSibling.textContent = numberOfItems;
      
            const index = items.findIndex(item => item.name === name);         
            if (index !== -1) {
               items[index].quantity = numberOfItems;
            }
      
            saveCartItems(items);
            displayCartCount();
         });
         buttonMinus.addEventListener('click', (e) => {       
            e.preventDefault();
            let numberOfItems = Number(e.target.nextElementSibling.textContent);
            numberOfItems--;
            items = getCartItems() || [];
            e.target.nextElementSibling.textContent = numberOfItems;  
            const index = items.findIndex(item => item.name === name);
            if (index !== -1) {
               items[index].quantity = numberOfItems;
            }
            saveCartItems(items);
         if(numberOfItems === 0){
               div.style.display='none';
               button.style.display = 'block';
               const itemName = e.target.parentElement.parentElement.parentElement.children[0].textContent;
               removeFromCart(getCartItems(), itemName);   
               displayCartCount();
         }    
         
         displayCartCount();
         });
      }
      button.addEventListener('click', function(e){
         const itemButton = e.target;      
         itemButton.style.display = 'none';
         var div = document.createElement('div');
         var buttonPlus = document.createElement('button');
         buttonPlus.style.marginLeft='0.313rem';
         buttonPlus.textContent = '+';
         UIButton(buttonPlus);
         var itemsNumber = document.createElement('span');
         var number = document.createTextNode('1');
         itemsNumber.appendChild(number);
         itemsNumber.style.fontSize='1.25rem';
         itemsNumber.style.fontWeight='500';
         var buttonMinus = document.createElement('button');
         buttonMinus.style.marginRight='0.313rem';
         buttonMinus.textContent='-';
         UIButton(buttonMinus);
         div.appendChild(buttonMinus);
         div.appendChild(itemsNumber);
         div.appendChild(buttonPlus);
         const item = e.target.parentElement.parentElement;
         const name = item.children[0].textContent;
         const ingredients = item.children[item.children[0].nextElementSibling.tagName==='SPAN' ? 2:1].textContent;
         const price =  Number(item.children[item.children[0].nextElementSibling.tagName==='SPAN' ? 3:2].children[0].textContent.split('')[1]);
         items = getCartItems() || [];
         const index = items.findIndex(item => item.name === name);     
         if (index !== -1) {
            items[index].quantity = 1;
         }


         addToCart(items, {id: ++id,quantity: 1, name, ingredients, price});  
         buttonPlus.addEventListener('click', (e) => {
            e.preventDefault();
            let numberOfItems = Number(e.target.previousElementSibling.textContent);

            numberOfItems++;
            items = JSON.parse(localStorage.getItem('items')) || [];
            e.target.previousElementSibling.textContent = numberOfItems;
      
            const index = items.findIndex(item => item.name === name);         
            if (index !== -1) {
               items[index].quantity = numberOfItems;
            }
      
            saveCartItems(items);
            displayCartCount();
         });
         
      
         e.target.parentElement.appendChild(div);
         buttonMinus.addEventListener('click', (e) => {       
            e.preventDefault();
            let numberOfItems = Number(e.target.nextElementSibling.textContent);
            numberOfItems--;
            items = getCartItems() || [];
            e.target.nextElementSibling.textContent = numberOfItems;  
            const index = items.findIndex(item => item.name === name);
            if (index !== -1) {
               items[index].quantity = numberOfItems;
            }
            saveCartItems(items);
         if(numberOfItems === 0){
               div.style.display='none';
               itemButton.style.display = 'block';
               const itemName = e.target.parentElement.parentElement.parentElement.children[0].textContent;
               removeFromCart(getCartItems(), itemName);   
               displayCartCount();
         }    
         
         displayCartCount();
         });
      })

   }
)  
}



const addToCart = (arr, item) => {
  arr.push(item);
  saveCartItems(arr);
  localStorage.setItem('numberOfItems', 0);
  displayCartCount();  
}
const removeFromCart = (arr, itemName) => {
  const itemsParsed = arr;
  const foundedItemById = itemsParsed.find(item  => item.name === itemName)?.id;
  const updatedItems = itemsParsed.filter(item => item?.id !== foundedItemById);
  saveCartItems(updatedItems); 
  displayCartCount();
}
const UIButton = (button) => {
   button.style.background= '#f9fafb';
   button.style.boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px;'
   button.style.borderRadius='50%';
   button.style.width= '2rem';
   button.style.height= '2rem';
   button.style.color='#333';
   button.style.borderColor='#ccc';
   button.style.borderWidth='1.5px';
   button.style.borderStyle='solid';
}


const displayCartCount = () => {
   const cartIcon = document.getElementById('cart');
   if (!cartIcon) return;

   const oldNotif = cartIcon.querySelector('.cart-notification');
   if (oldNotif) cartIcon.removeChild(oldNotif);
   const items = getCartItems() || [];
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  
  if (totalQuantity > 0) {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'cart-notification';
    notificationDiv.textContent = totalQuantity;

    Object.assign(notificationDiv.style, {
      position: 'absolute',
      top: '-5px',
      right: '1px',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      padding: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#22C55E',
      color: '#fff',
      fontSize: '0.8rem'
    });

    cartIcon.style.position = 'relative';
    cartIcon.appendChild(notificationDiv);  
}
}
  

const loadCartItems = () => {
   let items =  getCartItems();

   const cartContainer = document.getElementById('cart-items-content');

   items.forEach(item => {
         const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      const cartItemDesc = document.createElement('div');
      cartItemDesc.classList.add('cart-item-desc');
      const cartItemImg = document.createElement('img');
      cartItemImg.src="images/placeholder.svg";
      cartItemImg.alt="";
      const cartItemInfo = document.createElement('div');
      cartItemInfo.classList.add("cart-item-info");
      const itemName = document.createElement('h3');
      const itemNameValue = document.createTextNode(item.name);
      itemName.appendChild(itemNameValue);
      const restaurantName = document.createElement('span');
      const restaurantNameValue = document.createTextNode('BurgerPalace');
      restaurantName.appendChild(restaurantNameValue);
      const itemPrice = document.createElement('span');
      const itemPriceValue = document.createTextNode(`$${item.price}`);
      itemPrice.appendChild(itemPriceValue);
      cartItemDesc.appendChild(cartItemImg);
      cartItemInfo.appendChild(itemName);
      cartItemInfo.appendChild(restaurantName);
      cartItemInfo.append(itemPrice);
      cartItemDesc.appendChild(cartItemInfo);
      const cartItemButtons = document.createElement('div');
      const buttonMinus = document.createElement('button');
      const buttonMinusValue = document.createTextNode('+');
      buttonMinus.appendChild(buttonMinusValue);
      buttonMinus.id = 'cart-item-btn-minus';
      const itemCount = document.createElement('span');
      const itemCountValue = document.createTextNode(item.quantity);
      itemCount.appendChild(itemCountValue);
      const buttonPlus = document.createElement('button');
      buttonPlus.id = 'cart-item-btn-plus';
      const buttonPlusValue = document.createTextNode('-');
      buttonPlus.appendChild(buttonPlusValue);
      const icon = document.createElement('i');
      icon.classList.add('fa');
      icon.classList.add('fa-trash-o');
      cartItemButtons.classList.add('cart-item-btn');
      cartItemButtons.appendChild(buttonMinus);
      cartItemButtons.appendChild(itemCount);
      cartItemButtons.appendChild(buttonPlus);
      cartItemButtons.appendChild(icon);
      cartItem.appendChild(cartItemDesc);
      cartItem.appendChild(cartItemButtons);
         cartContainer.appendChild(cartItem);
   });

}

