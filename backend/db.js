const mongoose = require('mongoose');

const mongoUrl='mongodb://127.0.0.1:27017/myfoods';

// Connect to MongoDB and fetch data
async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Fetch data from the 'food_item' collection
        const foodItems = await mongoose.connection.collection('food_item').find({}).toArray();
        const foodlist = await mongoose.connection.collection('food_list').find({}).toArray();

    

        global.food_item=foodItems;
        global.food_list=foodlist;

    
        

        // Optionally return data or handle it her
    } catch (err) {
        console.error('Error:', err);
    } 
}

main().catch(err => console.error(err));

module.exports = main;
