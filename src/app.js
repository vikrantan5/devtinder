const express = require("express")

const app = express()

app.use("/test",function(req , res){
    res.send("Hello from the server")
})
app.use("/hello",function(req , res){
    res.send("Hell   gjgfhfhho hvj xcjsbnvksvbscvbs dsvbsksvssd")
})

app.listen(3001  ,()=>{
    console.log("server is successfully rinning on port 3001")
})