import {saveToStorage, loadFromStorage} from '../utils/storage.js';


let comments = loadFromStorage('comments') || [];

export const commentService = {
    save(comments){
        saveToStorage('comments', comments);
    },
    load(){
       comments = loadFromStorage('comments') || [];
       return comments;
    },
    clear(){
        saveToStorage('comments', []);
    },
    delete(commentId){
        comments = loadFromStorage('comments') || [];
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        console.log(updatedComments);
        
        saveToStorage('comments', updatedComments);
        return updatedComments;
    }
}
