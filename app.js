const  express = require("express");
const bodyParser = require("body-parser");
var app= express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema);
const Task = mongoose.model("task",trySchema);
// const todo = new item({
//     name:"Create some videos"
// });
// const todo2 = new item({
//     name:"learn DSA"
// });
//  todo.save();
// todo2.save();
// app.get("/",function(req,res){
//     item.find({},function(err,foundItems){
//     res.render("list", { dayej: foundItems });
//     })
// });
app.get("/", async function(req, res) {
    try {
      const foundItems = await item.find({}).exec();
      res.render("list", { dayej: foundItems });
    } catch (err) {
      console.error("Error occurred while fetching items:", err.message, err.stack);
      res.status(500).send(`Error occurred while fetching items: ${err.message}`);
    }
});
app.post("/", function(req, res) {
    const itemName = req.body.ele1;
    const todo = new item({
        name:itemName
    });
    todo.save();
    res.redirect("/");
});
app.post("/delete", function(req, res) {
    const checked = req.body.checkbox1;
    const task = Task.findByIdAndDelete(checked);
    async function removeTask(checked) {
        try {
          const task = await Task.findByIdAndDelete(checked);
          console.log('Task removed:', task);
        } catch (err) {
          console.error(err);
        }
      }
      // Call the function
      removeTask(checked);
      res.redirect("/");
    // try {
    //     item.deleteOne({ _id: checked });
    //     res.send(`Item with ID ${checked} has been removed`);
    //   } catch (err) {
    //     res.status(500).send(`Error: ${err}`);
    //   }
});
// app.post("/delete", function(req, res) {
//     const checked = req.body.checkbox1;
//     item.findByIdAndRemove(checked, function(err) {
//         if (!err) {
//             console.log("deleted");
//             res.redirect("/");
//         }
//     });
// });
app.listen(3000,function(){
    console.log("server started");
});
