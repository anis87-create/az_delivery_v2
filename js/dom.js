export const setupAddButtons = () => {
   const buttons = document.querySelectorAll('.add-to-cart');
   let items = [];
   let id = 0;
   buttons.forEach(button => button.addEventListener('click', function(e){
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

         localStorage.setItem('items', JSON.stringify(items));
      });



   
      e.target.parentElement.appendChild(div);
      buttonMinus.addEventListener('click', (e) => {       
         e.preventDefault();
         let numberOfItems = Number(e.target.nextElementSibling.textContent);
         numberOfItems--;
         items = JSON.parse(localStorage.getItem('items')) || [];
         e.target.nextElementSibling.textContent = numberOfItems;  
         const index = items.findIndex(item => item.name === name);
         if (index !== -1) {
            items[index].quantity = numberOfItems;
         }
         localStorage.setItem('items', JSON.stringify(items));
        if(numberOfItems === 0){
            div.style.display='none';
            itemButton.style.display = 'block';
            const itemName = e.target.parentElement.parentElement.parentElement.children[0].textContent;
            removeFromCart(localStorage.getItem('items'), itemName);       
        }         
      });
     
   }))
}

const addToCart = (arr, item) => {
  arr.push(item);
  localStorage.setItem('items', JSON.stringify(arr));
  localStorage.setItem('numberOfItems', 0);
}
const removeFromCart = (arr, itemName) => {
  const itemsParsed = JSON.parse(arr);
  const foundedItemById = itemsParsed.find(item  => item.name === itemName)?.id;
  const updatedItems = itemsParsed.filter(item => item?.id !== foundedItemById);
  localStorage.setItem('items', JSON.stringify(updatedItems));  
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