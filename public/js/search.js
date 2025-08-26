document.addEventListener('DOMContentLoaded', () => {
    const categoryItemElts = document.querySelectorAll('.category-item');
    categoryItemElts[0].style.backgroundColor='#f97316';
    categoryItemElts[0].style.color='#fff';
    categoryItemElts.forEach(cateogryElt => {
        cateogryElt.addEventListener('click', () => {
            categoryItemElts.forEach(item => {
                item.style.backgroundColor = '';
                item.style.color = '';
            });
            cateogryElt.style.backgroundColor = '#f97316';
            cateogryElt.style.color = '#fff';
        });
    });
  
});


