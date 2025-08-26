import { restaurants } from "../../data/restaurants.js";
import { cartService } from "../../src/services/cartService.js";

document.addEventListener('DOMContentLoaded', () => {
    //cartService.clear();
    loadRestaurants();
});


const loadRestaurants = () => {
    let restaurantContainer = document.querySelector('.restaurants-list');
    restaurants.forEach(restaurant => {
      let restaurantElt = document.createElement('div');
      restaurantElt.classList.add('restaurant'); 
      restaurantElt.dataset.name = restaurant.name;
      restaurantElt.dataset.rate = restaurant.rate;
      restaurantElt.dataset.tags = JSON.stringify(restaurant.tags);
      restaurantElt.dataset.time = restaurant.time;
      const restaurantLink = document.createElement('a');
      restaurantLink.href = `/src/pages/restaurant.html?id=${restaurant.id}`;
      const imgContainerrElt = document.createElement('div');
      imgContainerrElt.classList.add('restaurant_img');
      const restaurantOpacityElt = document.createElement('div');
      restaurantOpacityElt.classList.add('restaurant_opacity');
      const imgElt = document.createElement('img');
      imgElt.src='/public/images/restaurant_1.avif';
      imgElt.alt='image of restaurant';
      imgContainerrElt.appendChild(restaurantOpacityElt);
      imgContainerrElt.appendChild(imgElt);
      const restaurantDesc = document.createElement('div');
      restaurantDesc.classList.add('restaurant_desc');
      const restaurantDescHeader = document.createElement('div');
      restaurantDescHeader.classList.add('restaurant_desc_header');
      const restaurantTitle = document.createElement('h3');
      const restaurantTitleText = document.createTextNode(restaurantElt.dataset.name);
      restaurantTitle.appendChild(restaurantTitleText);
      const rateElt = document.createElement('div');
      const rateIcon = document.createElement('i');
      rateElt.classList.add('rate');
      rateIcon.classList.add('fa');
      rateIcon.classList.add('fa-star');
      rateIcon.classList.add('icon');
      rateIcon.ariaHidden = "true";
      rateElt.appendChild(rateIcon);
      const rateValue = document.createTextNode(restaurantElt.dataset.rate);
      rateElt.appendChild(rateValue);
      restaurantDescHeader.appendChild(restaurantTitle);
      restaurantDescHeader.appendChild(rateElt);
      const tagsElt = document.createElement('p');
      const tagsText = document.createTextNode(JSON.parse(restaurantElt.dataset.tags).join(', '));
      tagsElt.appendChild(tagsText);
      restaurantDesc.appendChild(restaurantDescHeader);
      const timeDistanceElt = document.createElement('div');
      timeDistanceElt.classList.add('time_distance');
      const timeElt = document.createElement('div');
      timeElt.classList.add('time');
      const iconTimeElt = document.createElement('i');
      iconTimeElt.classList.add('fa');
      iconTimeElt.classList.add('fa-clock-o');
      iconTimeElt.ariaHidden = "true";
      timeElt.appendChild(iconTimeElt);
      const timeValueElt = document.createElement('span');
      const timeValueTxt = document.createTextNode(restaurantElt.dataset.time);
      timeValueElt.appendChild(timeValueTxt);
      timeElt.appendChild(timeValueElt);
      timeDistanceElt.appendChild(timeElt);
      restaurantLink.appendChild(imgContainerrElt);
      restaurantDesc.appendChild(tagsElt);
      restaurantDesc.append(timeDistanceElt);
      restaurantElt.appendChild(restaurantLink);
      restaurantLink.appendChild(restaurantDesc);
    
      restaurantContainer.appendChild(restaurantElt);
      
    });
    
}

