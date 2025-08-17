export const getPriceRounded = (price) =>{
        return Intl.NumberFormat('en-US', { style:'currency', currency:'USD',minimumFractionDigits: 2, }).format(number || 0);
}