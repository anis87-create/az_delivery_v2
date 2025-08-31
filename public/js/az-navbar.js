import { html, render } from "./lit-html.js";

class NavBar extends HTMLElement {
    constructor(){
        super();
        this.root = this.attachShadow({mode:'open'});
    }

    
  connectedCallback() {
    this.update();
  }

  update() {
    render(this.template(), this.root);
  }

  get showSearchBar() {
    return this.getAttribute("showSearchBar") === "true";
  }
    template(){
        return html`
         <style>
           @import url("/public/css/index.css");
           .search-link span{ color: #551A8B; }
           .search-link svg { stroke: currentColor; } 
          .cart-link { color: var(--primary-color, #22C55E); }
         </style>

          <div class="header-content">
              <div class="header-logo">
                   <img src="/public/images/logo.png" alt="logo"/>
                   <h1>AzFoodDelivery</h1>
              </div>
      
              <div class="header-menu">
                <nav>
                    <li>
                        <a href="/public/index.html">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home w-5 h-5 sm:mr-1.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                       <a href="/src/pages/search.html" class="nav-link search-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="black" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="black" stroke-width="2"/></svg>
                            <span >Search</span>
                       </a> 
                    </li>
                    <li>
                       <a href="/src/pages/cart.html" id="cart" class="nav-link cart-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-5 h-5 sm:mr-1.5"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                            <span >Cart</span>
                       </a> 
                    </li>
                 
                    <li>
                        <a href="/src/pages/orders.html">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-5 h-5 sm:mr-1.5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                            <span>Orders</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/public/images/avatar.png" alt="avatar">
                        </a>
                    </li>
                </nav>
              </div>
          </div>
         `;
    }
}

customElements.define('az-navbar', NavBar);