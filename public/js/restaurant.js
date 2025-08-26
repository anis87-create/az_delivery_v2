import { restaurants } from "../../data/restaurants.js";
import { cartService } from "../../src/services/cartService.js";

document.addEventListener('DOMContentLoaded', () => {
    loadRestaurant();
});

const loadRestaurant = () => {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('id');
    const restaurantName = cartService.findRestaurantNameByRestaurantId(restaurants ,restaurantId);
    const restaurantInfoContentElt = document.querySelector('.restaurant-info-content');
    const restaurantNameElt = document.createElement('h1');
    restaurantNameElt.classList.add('restaurant-name');
    restaurantNameElt.appendChild(document.createTextNode(restaurantName));
    restaurantInfoContentElt.insertBefore(restaurantNameElt, document.querySelector('.restaurant-address'));
    const restaurant = restaurants.find(restaurant => restaurant?.id === Number(restaurantId));
    const restaurantItems = restaurant.items;
    const objectsByCategory = {};
    restaurantItems.forEach(obj => {

    objectsByCategory[obj.category] = obj;
    });

    const itemsByCategory = restaurantItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});
    const itemsContainer = document.querySelector('.items-content');
    for (const key in itemsByCategory){
        const categoryElt =  document.createElement('h2');

        categoryElt.appendChild(document.createTextNode(key === 'popular' ? `${key.charAt(0).toUpperCase() + key.slice(1)} Items`: key.charAt(0).toUpperCase() + key.slice(1)));
        
       
        itemsContainer.appendChild(categoryElt);
       itemsByCategory[key].forEach(itemByCategory  => {
            const itemContainerElt = document.createElement('div');
            itemContainerElt.classList.add('item');
            const itemImg = document.createElement('img');
            itemImg.src = '/public/images/placeholder.svg';
            itemImg.alt = 'plaholder';
 
           const itemDescElt = document.createElement('div');
           itemDescElt.classList.add('item-desc');

           const itemNameElt = document.createElement('h3');
           itemNameElt.id = 'item-name';
           itemNameElt.appendChild(document.createTextNode(itemByCategory.name));
           const categorySpanElt = document.createElement('span');
           categorySpanElt.appendChild(document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1)));

           itemDescElt.appendChild(itemNameElt);
           if(key === 'popular'){
              itemDescElt.appendChild(categorySpanElt);
           }
           const ingredientsElt = document.createElement('p');
           ingredientsElt.classList.add('item-ingredients');
           ingredientsElt.appendChild(document.createTextNode(itemByCategory.ingredients.join(', ')));
           itemDescElt.appendChild(ingredientsElt);
           const priceEltContainer = document.createElement('div');
           priceEltContainer.classList.add('price');
           const priceSpanElt = document.createElement('span');
           priceSpanElt.appendChild(document.createTextNode(`$${itemByCategory.price}`));
           priceSpanElt.id = 'item-price';
           const buttonPriceElt = document.createElement('button');
           buttonPriceElt.classList.add('add-to-cart')
           buttonPriceElt.appendChild(document.createTextNode('Add'));
           priceEltContainer.appendChild(priceSpanElt);
           priceEltContainer.appendChild(buttonPriceElt);
           itemDescElt.append(priceEltContainer);
           itemContainerElt.appendChild(itemImg);
           itemContainerElt.appendChild(itemDescElt);
           itemsContainer.appendChild(itemContainerElt);
           
        });
        
        
    }
    
    
    
    //restaurantItems.forEach( )
    
   
}