const express =require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./Routes/router")
app.use(express.json())
const con = async()=>{
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/users")
        app.listen(2201,()=>console.log("app running at port 2201"))
    } catch (error) {
       console.log(error) 
    }
}
con()

app.get("/",(req,res)=>{ res.send("hello this is working ")})
app.use("/users",router)