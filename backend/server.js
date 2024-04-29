const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path"); //get access to backend directory
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//Databse connection with MongoDB
mongoose.connect("mongodb+srv://IsuruAdithya:Adithya1234@cluster0.n2rfr4c.mongodb.net/Vastra_clothing_store");

//API creation

app.get("/",(req,res)=>{
res.send("Express App is runnng");
});

//Image Storage Engine
const storage = multer.diskStorage({
    destination:'./uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage});

//creating upload endpoints for images
app.use('/images',express.static('uploads/images'));
app.post("/uploads",upload.single('product'),(req,res)=>{
res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})

//Schema for creating products

const Products = mongoose.model("Products",{
    id:{
        type:Number,
        required:true
    },
   name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true
    },
})

//API for adding products
app.post('/add-product',async(req,res)=>{

let products = await Products.find({}); 
let id;
if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
}else{
    id = 1;
}   
const product = new Products({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price
});
console.log(product);
await product.save();
console.log("saved");

res.json({
    success:true,
    name:req.body.name,
})

})

//Create API for deleting products
app.post('/remove-product',async(req,res)=>{
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//API for deleting products by url-encoded id
app.delete('/remove-product/:id',async(req,res)=>{
    await Products.findOneAndDelete({id:req.params.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//API for fetching all products
app.get("/all-products",async (req,res)=>{
    let products = await Products.find({});
    console.log("All products fetched");
    res.send(products);
})

//API for fetching product by url-encoded id
app.get("/product/:id",async (req,res)=>{
    let product = await Products.find({id:req.params.id});
    console.log("Product fetched");
    res.send(product);
})

//API for updating product by url-encoded id
app.put("/update-product/:id",async (req,res)=>{
    let product = await Products.findOneAndUpdate({id:req.params.id},req.body);
    console.log("Product updated");
    res.send(product);
})

//API for updating only one item of the object
app.patch("/update-product/:id",async (req,res)=>{
    let product = await Products.findOneAndUpdate({id:req.params.id},req.body);
    console.log("Product updated");
    res.send(product);
})

app.listen(port, (error) => (!error)? console.log(`Server running on port ${port}`) : console.log(error));
