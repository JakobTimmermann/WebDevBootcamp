import express from 'express';
import mongoose from "mongoose";
import _ from "lodash";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
})); // Necessary to tap into data recieved via html form
app.use(express.static("public")); // Upload static files in public folder!

// Update ToDo Storage to Mongoose!
//mongoose.connect('mongodb://localhost:27017/todoListDB');
mongoose.connect(`mongodb+srv://${process.env.ADMIN_ACCOUNT}:${process.env.ADMIN_PASSWORD}@daisyduke.iusbkik.mongodb.net/todoListDB`);

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
const Item = new mongoose.model("ToDo", itemsSchema);
const item1 = new Item({
    name: "Buy Food"
});
const item2 = new Item({
    name: "Cook Food"
});
const item3 = new Item({
    name: "Eat Food"
});

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema],
});

const List = new mongoose.model("List", listSchema);


app.get('/', async (req, res) => {

    const toDos = await Item.find().catch((error) => {
        console.log(error)
    });

    if (toDos.length === 0) {
        await Item.insertMany([item1, item2, item3]).then(function () {
            console.log("Data inserted") // Success
        }).catch(function (error) {
            console.log(error) // Failure
        });
        res.redirect("/");
    } else {
        // let toDos = toDos_raw.map(({
        //     name
        // }) => name);
        res.render('list', {
            //            listTitle: getDate(),
            listTitle: "Today",
            toDos: toDos
        });

    }
});

app.post("/", (req, res) => {
    const itemName = req.body.newToDo;
    const listName = req.body.list;
    const newItem = new Item({
        name: itemName,
    });
    if (req.body.list === "Today") {
        newItem.save();
        res.redirect("/");

    } else {
        List.find({
            name: listName
        }).then((data) => {
            data[0].items.push(newItem);
            data[0].save();
            res.redirect("/" + listName)
        })
    }
});

app.post("/delete", async (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId).catch((error) => {
            console.log(error);
        });
        res.redirect("/")
    } else {
        List.findOneAndUpdate({
            name: listName
        }, {
            $pull: {
                items: {
                    _id: checkedItemId
                }
            }
        }).then((data) => {
            res.redirect("/" + listName)
        })

    }
});

app.get("/:customListName", async (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.find({
        name: customListName
    }).then((data) => {
        if (data.length) {
            res.render('list', {
                listTitle: customListName,
                toDos: data[0].items,
            });
        } else {
            const list = new List({
                name: req.params.customListName,
                items: [],
            })
            list.save();
            res.redirect("/" + customListName);
        }
    });

});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})