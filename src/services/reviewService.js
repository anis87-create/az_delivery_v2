import {saveToStorage, loadFromStorage} from '../utils/storage.js';

let reviews = loadFromStorage('reviews') || [];

export const reviewService = {
    save(reviews){
        saveToStorage('reviews', reviews);
    },
    load(){
       reviews = loadFromStorage('reviews') || [];
       return reviews;
    },
    clear(){
        saveToStorage('reviews', []);
    },
    delete(reviewId){
        reviews = loadFromStorage('reviews') || [];
        const updatedReviews = reviews.filter(review => review.id !== reviewId);
        saveToStorage('reviews', updatedReviews);
        return updatedReviews;
    },
    getAverageRating(restaurantId){
        reviews = loadFromStorage('reviews') || [];
        const restaurantReviews = reviews.filter(review => review.restaurantId === restaurantId);
        if(restaurantReviews.length === 0) return 0;
        const totalRating = restaurantReviews.reduce((sum, review) => sum + review.rating, 0);
        return Math.round((totalRating / restaurantReviews.length) * 10) / 10;
    },
    getReviewCount(restaurantId){
        reviews = loadFromStorage('reviews') || [];
        return reviews.filter(review => review.restaurantId === restaurantId).length;
    }
}