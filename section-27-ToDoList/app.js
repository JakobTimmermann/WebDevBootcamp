import { getDate,  getDay } from "./date.js"; // Loading local modules
import express from 'express';


const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(express.urlencoded()); // Necessary to tap into data recieved via html form
app.use(express.static("public")); // Upload static files in public folder!

// The content of const arrays can still be changed. Only new assignment is prohibite  
const toDos = ["Buy Food", "Cook Food"];
const workToDos = []; 

app.get('/', (req, res) => {
    res.render('list', {
        listTitle: getDate(),
        toDos: toDos
    });
});

app.post("/", (req, res) => {
    if (req.body.list === "Work") {
        workToDos.push(req.body.newToDo);
        res.redirect("/work");

    } else {
        toDos.push(req.body.newToDo);
        res.redirect("/");

    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.get('/work', (req, res) => {
    res.render('list', {
        listTitle: "Work",
        toDos: workToDos
    });
});
