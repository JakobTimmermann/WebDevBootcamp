const express = require("express");
app = express();
port = 3000;
app.use(express.urlencoded()); // Necessary to tap into data recieved via html form

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/", (req, res) => {
    var height = req.body.height;
    var weight= req.body.weight;
    var bmi = weight / (height/100 * height/100);
    res.send(`<h3 style="padding:3%;">Your BMI is ${bmi.toFixed(1)}</h3>`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})