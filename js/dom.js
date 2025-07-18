export const setupAddButtons = () => {
   const buttons = document.querySelectorAll('.add-to-cart');
   let items = [];
   let id = 0;
   buttons.forEach(button => button.addEventListener('click', function(e){
      const itemButton = e.target;
      itemButton.style.display = 'none';
      var div = document.createElement('div');
      var buttonPlus = document.createElement('button');
      buttonPlus.textContent='+';
      buttonPlus.style.background= '#f9fafb';
      buttonPlus.style.boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px;'
      buttonPlus.style.borderRadius='50%';
      buttonPlus.style.width= '2rem';
      buttonPlus.style.height= '2rem';
      buttonPlus.style.color='#333';
      buttonPlus.style.borderColor='#ccc';
      buttonPlus.style.borderWidth='1.5px';
      buttonPlus.style.borderStyle='solid';
      buttonPlus.style.marginLeft ='0.313rem';
      var itemsNumber = document.createElement('span');
      var number = document.createTextNode('1');
      itemsNumber.appendChild(number);
      itemsNumber.style.fontSize='1.25rem';
      itemsNumber.style.fontWeight='500';
      var buttonMinus = document.createElement('button');
      buttonMinus.textContent = '-';
      buttonMinus.style.background= '#f9fafb';
      buttonMinus.style.boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px;'
      buttonMinus.style.borderRadius='50%';
      buttonMinus.style.width= '2rem';
      buttonMinus.style.height= '2rem';
      buttonMinus.style.color='#333';
      buttonMinus.style.borderColor='#ccc';
      buttonMinus.style.borderWidth='1.5px';
      buttonMinus.style.borderStyle='solid';
      buttonMinus.style.marginRight='0.313rem';
     
      div.appendChild(buttonMinus);
      div.appendChild(itemsNumber);
      div.appendChild(buttonPlus);
      const item = e.target.parentElement.parentElement;
      const name = item.children[0].textContent;
      const ingredients = item.children[item.children[0].nextElementSibling.tagName==='SPAN' ? 2:1].textContent;
      const price =  Number(item.children[item.children[0].nextElementSibling.tagName==='SPAN' ? 3:2].children[0].textContent.split('')[1]);
      
      addToCart(items, {id: ++id, name, ingredients, price});      
      e.target.parentElement.appendChild(div);
       buttonMinus.addEventListener('click', (e) => {
        div.style.display='none';
        itemButton.style.display = 'block';
        const itemName = e.target.parentElement.parentElement.parentElement.children[0].textContent;
        const itemsParsed = JSON.parse(localStorage.getItem('items'));
        const foundedItemById = itemsParsed.find(item  => item.name === itemName).id;
        const updatedItems = itemsParsed.filter(item => item.id !== foundedItemById);
        localStorage.setItem('items', JSON.stringify(updatedItems));    
      })
      
   }))
}

const addToCart = (arr, item) => {
  arr.push(item);
  localStorage.setItem('items', JSON.stringify(arr));
}