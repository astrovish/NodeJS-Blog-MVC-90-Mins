const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const methodOverride = require("method-override");

// creating an express application
const app = express();

// setting path of config file
dotenv.config({path: "./config/config.env"});

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
})
.then(result => {
    console.log("Application successfully connected with database.");
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`);
})

// listening app on assigned port
const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
    console.log(`Application is up and running on port: ${PORT}`);
})

// setting up view engine
app.set("view engine", "ejs");

// setting up path of views folder
app.set("views", process.env.VIEWS_FOLDER);

// use /public folder static files
app.use(express.static(__dirname + "/public"));


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// home page route
app.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Home Page"
    })
})

app.use("/blogs", blogRoutes);

app.use((req, res) => {
    res.render("404", {
        pageTitle: "OOPS! Page Not Found."
    })
})