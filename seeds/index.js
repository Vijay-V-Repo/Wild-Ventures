const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => console.log('Connected!'));

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await campground.deleteMany({});
    for(let i=0;i<6;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new campground({
            author: '64281a68f3dafbaa9b53255a',
            location : `${cities[random1000].city},${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dysi0sjod/image/upload/v1680372203/YelpCamp/gtgpuap8sssudmb2forj.jpg',
                    filename: 'YelpCamp/gtgpuap8sssudmb2forj'
                },
                {
                    url: 'https://res.cloudinary.com/dysi0sjod/image/upload/v1680372206/YelpCamp/zzkqfz8i6nqinirnkfqr.jpg',
                    filename: 'YelpCamp/zzkqfz8i6nqinirnkfqr'
                }
            ]
        });
        await camp.save();
    }
}

seedDB();

