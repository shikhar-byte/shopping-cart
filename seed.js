const mongoose = require('mongoose');
const Product = require('./models/product');

const products = [
    {
        name:"Iphone 12",
        img:"https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGlwaG9uZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:1000,
        desc:"The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 15.40 centimetres (6.06 inches) diagonally (actual viewable area is less)."
    },
    {
        name:"Macbook Pro",
        img:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:900000,
        desc:"The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 15.40 centimetres (6.06 inches) diagonally (actual viewable area is less)."
    },
    {
        name:"Titan Watch",
        img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:20000,
        desc:"The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 15.40 centimetres (6.06 inches) diagonally (actual viewable area is less)."
    },
    {
        name:"HP Laptop",
        img:"https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:1000,
        desc:"The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 15.40 centimetres (6.06 inches) diagonally (actual viewable area is less)."
    },
    {
        name:"Rolex",
        img:"https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHdhdGNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price:1000,
        desc:"The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 15.40 centimetres (6.06 inches) diagonally (actual viewable area is less)."
    },
    {
        name:"BoAt Headphones",
        img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:1000,
        desc:"The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 15.40 centimetres (6.06 inches) diagonally (actual viewable area is less)."
    },
    {
        name:"Drone",
        img:"https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJvbmVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price:1000,
        desc:"The iPhone 12 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 15.40 centimetres (6.06 inches) diagonally (actual viewable area is less)."
    },

]

const seedDB = async()=>{
    await Product.insertMany(products);
    console.log('DB SEEDED !');
}

module.exports = seedDB;