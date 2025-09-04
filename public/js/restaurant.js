import { restaurants } from "../../data/restaurants.js";
import { cartService } from "../../src/services/cartService.js";

import { commentService } from "../../src/services/commentService.js";
import { timeSince } from "../../src/utils/helpers.js";
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurant();
   //commentService.clear();
});

const loadRestaurant = () => {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('id');
    const restaurantName = cartService.findRestaurantNameByRestaurantId(restaurants ,restaurantId);
    // Clear existing comments
    const restaurantInfoContentElt = document.querySelector('.restaurant-info-content');
    const restaurantNameElt = document.createElement('h1');
    const postElt = document.getElementById('post');
    const btnPostElt = document.getElementById('btn_post_comment'); 
    const starRating = document.getElementById('star-rating');
    let selectedRating = 0;
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
    document.getElementById('restaurant_name').innerText=`${restaurantName}`;
    let post = '';
    let count = 0;
    
    // Star rating functionality
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            highlightStars(index + 1);
        });
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            highlightStars(selectedRating);
            checkFormValidity();
        });
    });
    
    starRating.addEventListener('mouseleave', () => {
        highlightStars(selectedRating);
    });
    
    function highlightStars(rating) {
        console.log('rating ===>', rating);
        
        stars.forEach((star, index) => {        
            if (index < rating) {
                star.style.color = '#ffd700';
            } else {
                star.style.color = '#ddd';
            }
        });
    }
    
    postElt.addEventListener('input', (e) => {
        count++;
        document.getElementById('count').innerHTML=e.target.value.length;
        
        if(e.target.value.length>0){
            post = e.target.value;
        }
        checkFormValidity();
    });
    
    function checkFormValidity() {
        if(selectedRating > 0 && post.length > 0){
            btnPostElt.removeAttribute('disabled');
            btnPostElt.style.opacity= '1';
        } else {
            btnPostElt.style.opacity= '0.5';
            btnPostElt.setAttribute('disabled', true);
        }
    }
    
    let commentsByResturant = commentService.load().filter(comment => comment.restaurantId === Number(restaurantId));
    let comments = commentService.load();
    btnPostElt.addEventListener('click', () => {
      comments.push({
        id: crypto.randomUUID(),
        content: post,
        rating: selectedRating, // Add rating to comments
        date: new Date(),
        user: {
            fullName:'Anis Zarrouk',
        },
        restaurantId: Number(restaurantId),
        like: false
      });
       commentService.save(comments);
       postElt.value='';
       document.getElementById('count').innerText='0';
       selectedRating = 0;
       highlightStars(0);
       checkFormValidity();
       clearbeforeLoading();
       loadRestaurant();
    });
    commentsByResturant.forEach(comment => {
        const commentContainerElt = document.createElement('div');
        commentContainerElt.classList.add('comment');
        commentContainerElt.setAttribute('data-id', comment?.id);
        const commentAvatarElt = document.createElement('div');
        commentAvatarElt.classList.add('comment-avatar');
        const commentAvatartSpan = document.createElement('span');
        const avatarImg = document.createElement('img');
        avatarImg.src='/public//images/avatar_2.jpeg';
        avatarImg.alt='avatart';
        commentAvatartSpan.appendChild(avatarImg);
        commentAvatarElt.appendChild(commentAvatartSpan);
        const commentContentElt = document.createElement('div');
        commentContentElt.classList.add('comment-content');
        const commentContentHeaderElt= document.createElement('div');
        commentContentHeaderElt.classList.add('comment-content-header');
        const fullNameTimeElt = document.createElement('div');
        const fullNameElt = document.createElement('h3');
        fullNameElt.appendChild(document.createTextNode(comment?.user.fullName));
        const timeElt = document.createElement('span');
        timeElt.appendChild(document.createTextNode(timeSince(comment?.date)));
        fullNameTimeElt.appendChild(fullNameElt);
        fullNameTimeElt.appendChild(timeElt);
        
        // Add star rating display for comments with ratings
        if(comment.rating) {
            const starsElt = document.createElement('div');
            starsElt.classList.add('comment-stars');
            for(let i = 1; i <= 5; i++) {
                const starElt = document.createElement('span');
                starElt.innerHTML = i <= comment.rating ? '★' : '☆';
                starElt.style.color = i <= comment.rating ? '#ffd700' : '#ddd';
                starsElt.appendChild(starElt);
            }
            fullNameTimeElt.appendChild(starsElt);
        }
      
        commentContentHeaderElt.appendChild(fullNameTimeElt);
        const contentElt = document.createElement('p');
        contentElt.appendChild(document.createTextNode(comment?.content));
        commentContentElt.appendChild(commentContentHeaderElt);
        commentContentElt.appendChild(contentElt);
        const commentContentFoot = document.createElement('div');
        commentContentFoot.classList.add('comment-content-footer');
        const buttonLikesElt = document.createElement('button');
        const buttonReplyElt = document.createElement('button');
        const buttonDeleteElt = document.createElement('button');
        buttonLikesElt.id = 'likes';
        buttonLikesElt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-4 h-4 mr-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>';
        const spanLikes = document.createElement('span');
        spanLikes.appendChild(document.createTextNode(comment.like ? '1' : '0'));
        buttonLikesElt.appendChild(spanLikes);
        
        // Set initial liked state
        if (comment.like) {
            buttonLikesElt.classList.add('liked');
        }
        buttonLikesElt.addEventListener('click', () => {
            toogleLike(buttonLikesElt, spanLikes, comment.id);
        });
        buttonReplyElt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-4 h-4 mr-1"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>';
        const spanReply = document.createElement('span');
        spanReply.appendChild(document.createTextNode('Reply'));
        buttonReplyElt.appendChild(spanReply);

        buttonDeleteElt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 w-4 h-4 mr-1"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>';
        buttonDeleteElt.id='btn_delete'; 

        buttonDeleteElt.addEventListener('click', () => {
            let confirmation = confirm('do you want to delete this comment ?');
            if(confirmation){
            commentService.delete(comment.id);
            clearbeforeLoading();
            loadRestaurant();
            }   
        });
        commentContentHeaderElt.appendChild(buttonDeleteElt);
        commentContentFoot.appendChild(buttonLikesElt);
        commentContentFoot.appendChild(buttonReplyElt);
 
        commentContentElt.appendChild(commentContentFoot); 
        commentContainerElt.appendChild(commentAvatarElt);
        commentContainerElt.appendChild(commentContentElt);
        const commentButtonContainer = document.querySelector('.comment-button-container');
        if (commentButtonContainer && commentButtonContainer.parentNode) {
            commentButtonContainer.parentNode.insertBefore(commentContainerElt, commentButtonContainer.nextSibling);
        }
    });

}

const clearbeforeLoading = () => {
    const existingComments = document.querySelectorAll('.comment');
    existingComments.forEach(comment => comment.remove());
}

const toogleLike = (likeButton, spanLikes, commentId) => {
  let comments = commentService.load();
  let comment = comments.find(c => c.id === commentId);
  
  if (comment.like) {
    // Unlike
    comment.like = false;
    likeButton.classList.remove('liked');
    spanLikes.textContent = '0';
    spanLikes.style.color='black';
  } else {
    // Like
    comment.like = true;
    likeButton.classList.add('liked');
    spanLikes.textContent = '1';
    spanLikes.style.color='red';
  }
  
  commentService.save(comments);
}