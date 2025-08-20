export const restaurants = [
    {
        id: 1,
        name:'Burger Palace',
        items: [
            {
                name:'Classic Cheesburger',
                ingredients: ['Beef patty','cheddar cheese', 'lettuce','tomato','onion','pickles','special sauce'],
                price: 8.99,
                category: 'popular'
            },
            {
                name: 'Bacon Deluxe',
                ingredients: ['Beef Paty','bacon','cheddar cheese','letuce','tomato','mayo'],
                price: 10.99,
                category:'popular'
            },
            {
               name:'Veggie Burger',
               ingredients: ['Plant-based patty','lettuce','tomato','onion','pickles','vegan mayo'],
               price: 9.99,
               category:'burgers'
            },
            {
               name:'Double Trouble',
               ingredients: ['Two beef patties','double cheese','lettuce','tomato','onion','special sauce'],
               price: 12.99,
               category:'burgers'
            },
            {
               name:'Mushroom Swiss',
               ingredients: ['Beef patty','sautéed mushrooms','swiss cheese','truffle aioli'],
               price: 11.99,
               category:'burgers'
            },
            {
               name:'French Fries',
               ingredients: ['Crispy golden fries seasoned with our special salt blend.'],
               price: 3.99,
               category:'sides'
            },
            {
               name:'Onion Rings',
               ingredients: ['Crispy battered onion rings served with dipping sauce.'],
               price: 4.99,
               category:'sides'
            },
            {
               name:'Milkshake',
               ingredients: ['Creamy vanilla','chocolate','strawberry milkshake'],
               price: 5.99,
               category:'drinks'
            },
            {
               name:'soft frink',
               ingredients: ['Cola','lemon-lime','root beer'],
               price: 2.49,
               category:'drinks'
            }
        ],
        rate:4.5,
        tags: ['American','Burgers'],
        time:'20-35'
    },
    ,
    {
        id: 2,
        name: 'Pizza Heaven',
        items: [
            {
                name: 'Margherita',
                ingredients: ['Tomato sauce', 'Mozzarella', 'Fresh basil'],
                price: 9.99,
                category: 'pizza'
            },
            {
                name: 'Pepperoni',
                ingredients: ['Tomato sauce', 'Mozzarella', 'Pepperoni'],
                price: 11.49,
                category: 'pizza'
            },
            {
                name: 'Veggie Supreme',
                ingredients: ['Tomato sauce', 'Mozzarella', 'Bell peppers', 'Olives', 'Onions', 'Mushrooms'],
                price: 10.99,
                category: 'pizza'
            },
            {
                name: 'Garlic Bread',
                ingredients: ['Fresh bread', 'Garlic butter', 'Parsley'],
                price: 4.99,
                category: 'sides'
            },
            {
                name: 'Soft Drink',
                ingredients: ['Cola', 'Lemon-lime', 'Orange soda'],
                price: 2.49,
                category: 'drinks'
            },
            {
                name: 'Popular Combo',
                ingredients: ['Pepperoni Pizza', 'Garlic Bread', 'Soft Drink'],
                price: 16.99,
                category: 'popular'
            }
        ],
        rate: 4.7,
        tags: ['Italia','Pizza'],
        time:'30-45'

    },
    {
        id: 3,
        name: 'Sushi Express',
        items: [
            {
                name: 'California Roll',
                ingredients: ['Crab', 'Avocado', 'Cucumber', 'Rice', 'Seaweed'],
                price: 8.99,
                category: 'sushi'
            },
            {
                name: 'Salmon Nigiri',
                ingredients: ['Salmon', 'Rice'],
                price: 6.49,
                category: 'sushi'
            },
            {
                name: 'Miso Soup',
                ingredients: ['Miso paste', 'Tofu', 'Seaweed', 'Green onion'],
                price: 3.99,
                category: 'sides'
            },
            {
                name: 'Green Tea',
                ingredients: ['Green tea leaves', 'Water'],
                price: 2.49,
                category: 'drinks'
            }
        ],
        rate: 4.5,
        tags: ['Japanese','Sushi'],
        time:'20-35'
    },
    { 
        id: 4,
        name: 'Tacos Fiesta',
        items: [
            {
                name: 'Chicken Taco',
                ingredients: ['Chicken', 'Tortilla', 'Lettuce', 'Cheese', 'Salsa'],
                price: 4.99,
                category: 'tacos'
            },
            {
                name: 'Beef Burrito',
                ingredients: ['Beef', 'Rice', 'Beans', 'Cheese', 'Tortilla'],
                price: 7.49,
                category: 'burritos'
            },
            {
                name: 'Nachos',
                ingredients: ['Tortilla chips', 'Cheese', 'Jalapenos', 'Salsa'],
                price: 5.99,
                category: 'sides'
            },
            {
                name: 'Horchata',
                ingredients: ['Rice', 'Milk', 'Cinnamon', 'Sugar'],
                price: 2.99,
                category: 'drinks'
            }
        ],
        rate: 4.3,
        tags: ['Mexican','Tacos'],
        time:'15-30'
    },
    {
        id: 5,
        name: 'Salad Bar',
        items: [
            {
                name: 'Caesar Salad',
                ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan', 'Caesar dressing'],
                price: 7.99,
                category: 'salad'
            },
            {
                name: 'Greek Salad',
                ingredients: ['Tomato', 'Cucumber', 'Feta', 'Olives', 'Onion'],
                price: 8.49,
                category: 'salad'
            },
            {
                name: 'Quinoa Bowl',
                ingredients: ['Quinoa', 'Spinach', 'Cherry tomatoes', 'Avocado'],
                price: 9.49,
                category: 'bowls'
            },
            {
                name: 'Fresh Juice',
                ingredients: ['Orange', 'Carrot', 'Apple'],
                price: 3.99,
                category: 'drinks'
            }
        ],
        rate: 4.4,
        tags: ['Healthy','Salads'],
        time:'20-35'
    },
    {
        id: 6,
        name: 'Noodle House',
        items: [
            {
                name: 'Chicken Ramen',
                ingredients: ['Noodles', 'Chicken broth', 'Chicken', 'Egg', 'Green onion'],
                price: 10.99,
                category: 'ramen'
            },
            {
                name: 'Vegetable Stir Fry',
                ingredients: ['Noodles', 'Broccoli', 'Carrots', 'Bell peppers', 'Soy sauce'],
                price: 9.49,
                category: 'noodles'
            },
            {
                name: 'Spring Rolls',
                ingredients: ['Rice paper', 'Vegetables', 'Soy sauce'],
                price: 4.99,
                category: 'sides'
            },
            {
                name: 'Bubble Tea',
                ingredients: ['Tea', 'Milk', 'Tapioca pearls'],
                price: 4.49,
                category: 'drinks'
            }
        ],
        rate: 4.5,
        tags: ['Asian','Noddles'],
        time:'20-40'
    }
];