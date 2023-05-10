const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://localhost:27017/Friends');
    console.log("connected");

    //create a SCHEMA that sets out the fields each document will have and their datatypes
    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 10,
        },
        review: String
    })

    const friendsScheme = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please check your data entry, no name is specified"],
        },
        age: {
            type: Number,
            min: 0,
            max: 120,
        },
        favouriteFruit: fruitSchema,
    });


    //create a MODEL
    const Fruit = new mongoose.model("Fruit", fruitSchema)
    const Friend = new mongoose.model("Friend", friendsScheme);

    //create a DOCUMENT
    const apple = new Fruit({
        name: "Apple",
        rating: 7,
        review: "Great!"
    })

    const strawberry = new Fruit({
        name: "Strawberry",
        rating: 8,
        review: "Delicious!"
    })

    const mango = new Fruit({
        name: "Mango",
        rating: 10,
        review: "Only in Asia or Andalucia!"
    })

    const John = new Friend({
        name: "John",
        age: 34,
        favouriteFruit: apple,
    });

    const Dagma = new Friend({
        name: "Dagma",
        age: 41,
        favouriteFruit: strawberry,
    });

    const Ali = new Friend({
        name: "Ali",
        age: 19,
        favouriteFruit: strawberry
    });

    const Amy = new Friend({
        name: "Amy",
        age: 29,
        favouriteFruit: mango,
    })
    await Fruit.insertMany([strawberry, apple, mango]).then(function () {
        console.log("Data inserted") // Success
    }).catch(function (error) {
        console.log(error) // Failure
    });


    // Friend.insertMany([John, Dagma, Ali]).then(function () {
    // console.log("Data inserted") // Success
    // }).catch(function (error) {
    // console.log(error) // Failure
    // });

    // await Amy.save();
    await mango.save();

    // Read and store all friends in constant 
    const all_friends = await Friend.find().catch((error) => {
        console.log(error)
    });
    for (friend of all_friends) {
        console.log(friend.name);
        console.log(friend.age);
    };

    await Friend.updateOne({
        name: "John"
    }, {
        age: 100
    });
    // Find particular entry
    // await Friend.findOne({name:"Basti"}).then((data) => {
    //     console.log(data);
    // }).catch( (error) => {
    //     console.log(error)
    // });

    // Delete Single Entry by Name (deletes first entry in case of multiple entries with this name)
    // await Friend.deleteOne({
    //     name: "Dagma"
    // }).catch((error) => {
    //     console.log(error)
    // });

    await mongoose.connection.close();
}