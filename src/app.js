const express = require("express");
const app = express();
const connectToDB = require("./config/database");
app.use(express.json());
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {userAuth} = require("./middlewares/auth");


const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { validateSignUpData } = require("./utils/validation");

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password, firstName, lastName, email, age } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
    });
    await user.save();
    res.send("user added to database successfully");
    console.log(user);
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user does not exist please signup");
    } else {
      const isPasswordValid = await user.getBCRYPT(password) 
      if (isPasswordValid) {

            //create jwt token

            const token = await user.getJWT() //cleaner ,, modular , testable
            // console.log(token)
            //add the token to cookie and send res back to user




            res.cookie("token",token , {httpOnly:true , expires: new Date(Date.now() + 8 * 3600000)})

        res.send("user logged in successfully");
        // console.log(user);
        // console.log(token)
      } else {
        throw new Error("invalid Credentials");
      }
    }
  } catch (err) {
    res.status(400).send("Error logging in : " + err.message);
  }
});


app.get("/profile" , userAuth,async (req , res)=>{
    
    try{
     



    const user = req.user;

    // console.log(user)

   

    res.send(user)

    }
    catch(err){
        res.status(400).send("Error in fetching profile : " + err.message)
    }
    
   
})


app.post("/sendConnectionRequest" ,userAuth, async(req , res)=>{

    // sending connection request
    const user = req.user;
    // console.log(user)

    console.log("Sending a connection request");
    res.send(user.firstName +"sent the connection request ")
})


connectToDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(3001, () => {
      console.log("server is running on port 3001");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected" + err.message);
  });
































// const express  = require("express");
// const app = express();
// app.use(express.json());
// const bcrypt = require("bcrypt");

// const connectToDB = require("./config/database")
// const User = require("./models/user")

// const {validateSignUpData} = require("./utils/validation")

// app.post("/signup" , async(req , res)=>{

//     try{
//          //validate the password

//     validateSignUpData(req);

//     const {password ,firstName , lastName , email , age} = req.body;
//     //Encrypt the code
//     const passwordHash = await bcrypt.hash(password , 10);

//     //creating new user

//     const user = new User({firstName , lastName , email , password:passwordHash ,age});
//         await user.save();
//         res.send("user added to database successfully")
//         console.log(user)
//     }
//     catch(err){
//         res.status(400).send("Error saving the user : " + err.message)
//     }

//     // const myemail = req.body.email;
//     // const check = await User.find({email : myemail});

//     // if(check.length===0){
//     //     try{
//     //         const myUser = new User(req.body);
//     //         await myUser.save();
//     //         res.send("user added to database successfully")
//     //         console.log(myUser)
//     //     }
//     //     catch(err){
//     //         res.status(400).send("Error saving the user : " + err.message)
//     //     }
//     // }
//     // else{
//     //     res.send("user already exists please login!!!")
//     // }
// })

// app.post("/login" ,async (req , res)=>{
//     try{
//         const {email , password} = req.body;

//     const user =await User.findOne({email:email});
//     if(!user){
//         throw new Error("user does not exist please signup")
//     }

//         const isPasswordValid = await bcrypt.compare(password ,user.password)

//         if(!isPasswordValid){
//             throw new Error("invalid Credentials")
//         }
//         res.send("user logged in successfully")
//         console.log(user)

//     }
//     catch(err){
//         res.status(400).send("Error logging in : " + err.message)
//     }

// })

// app.get("/user" , async(req , res)=>{
//     const userEmail = req.body.email;
//     try{
//         const user = await User.find({email:userEmail})
//         if(user.length===0){
//             res.status(404).send("user not found")
//         }
//         else{
//             res.send(user)
//         }
//     }
//     catch(err){
//         res.status(400).send("Something went wrong")
//     }
// })

// app.delete("/user" , async(req , res)=>{
//     const userId = req.body.userId;

//     try{
//        const user =  await User.findByIdAndDelete({_id :userId})
//          res.send("user deleted successfully")
//          console.log(user)

//     }
//     catch(err){
//         res.status(400).send("something went wrong" + err.message)
//     }

// })

// app.patch("/user/:userId" , async(req ,res)=>{
//     const userId = req.params?.userId;
//     const data = req.body;

//     try{
//           const ALLOWED_UPDATES = [ "photoUrl" , "about" , "age"  , "gender", "skills"]

//     const isUpdateAllowed =Object.keys(data).every((k)=>{
//         return ALLOWED_UPDATES.includes(k)
//     })

//     if(!isUpdateAllowed){
//        throw new Error("Invalid updates")
//     }

//     if(data?.skills?.length >10){
//         throw new Error("skills cannot be more than 10")
//     }
//        const user =  await User.findByIdAndUpdate({_id:userId} , data ,{
//         returnDocument:"after",
//         runValidators:true,
//        })
//         res.send("user updated successfully")
//         console.log(user)

//     }
//     catch(err){
//         res.status(400).send("not updated successfully !!!!" + err.message)
//     }
// })

// connectToDB().then(()=>{
//     console.log("database connected successfully")
//     app.listen(3002 , ()=>{
//         console.log("server is running on port 3001")
//     })
// }).catch(err=>{
//     console.log("database cannot be connected" + err.message)
//     res.send("server error" + err.message)
// })

// const express = require("express");
// const app = express();
// const connectToDB =require("./config/database")
// const User = require("./models/user")

// app.use(express.json());

// app.post("/signup" , (req ,res)=>{

//     const hehe = new User(req.body);
//     console.log(hehe)

//     hehe.save();

//     res.send("chal rha ahai")
// })

// // app.get("/" , (req  ,res)=>{
// //     res.send("chal rha hai")
// // })

// app.get("/user" , async(req ,res)=>{
//     const userEmail = req.body.email;
//     try{
//         const user = await User.findOne({email:userEmail})
//         if(!user){
//             res.status(404).send("user not found")
//         }
//         else{
//             res.send(user)
//         }

//         // if(user.length ===0){
//         //     res.status(404).send("user not found")

//         // }
//         // else{
//         //     res.send(user)
//         // }

//     }
//     catch(err){
//         res.status(400).send("Somrthing went wrong")
//     }
// })

// // ==========for gettig all the datats

// app.get("/feed", async(req , res)=>{
//     try{
//         const users = await User.find({});
//         res.send(users)

//     }
//     catch(err){
//         res.status(404).send("user not available")
//     }
// })

// //useed to delete the user
// app.delete("/user" ,async(req , res)=>{
//     const userId = req.body.userId
//     try{
//         const user = await User.findByIdAndDelete(userId)
//         res.send("User deleted Successfully")

//     }
//     catch(err){
//         res.status(400).send("something went wrong")
//     }
// })

// // app.get("/feed" , (req , res)=>{

// // })

// //update data of the user

// app.patch("/user" , async(req , res)=>{
//     const userId =req.body.userId;
//     const data = req.body;
//     try{

//         await user.findByIdAndUpdate({_id:data} , data )
//         res.send("user updated successsfully")

//     }
//     catch(err){
//         res.status(400).send("not updates successfully !!!!!")
//     }
// })

// connectToDB().then(()=>{
//     console.log("database connected");

//     app.listen(3001 ,()=>{
//         console.log("server is connected successfully")
//     })
// })

// const express = require("express")
// const app = express();
// const User = require("./models/user")

// app.use(express.json())

// app.post("/signup" , (req , res)=>{

//      const user = new User(req.body);

//      user.save();
//      res.send("data successfully stored to database");
// })

// const connectToDB = require("./config/database")

// connectToDB().then(()=>{
//     console.log("connected to database")
//     app.listen(3000 , ()=>{
//     console.log("server is running")
// })
// });

// const express = require("express")
// const app = express();
// const connectToDB = require("./config/database")

// const User =require("./models/user")

// // app.get("/" , (req , res)=>{
// //     res.send("chal rhaa hai mast")
// // })

// app.post("/signup" , async(req ,res)=>{
//     const userData = {
//         firstName:"tamanna ",
//         lastName:"ahrma",
//         email:"tamannasharma122@gmail.com",
//         age:19,
//         password:"tamanna"
//     }

//     const user = new User(userData)
//     await user.save();
//     res.send("yes it is working")
// })

// connectToDB().then(()=>{
//     console.log("connected to database successfully")
//     app.listen(3000 , ()=>{
//     console.log("server is runnign fine !!!!!")
// })
// }).catch(err=>{
//     console.log("there is an error"+ err.message)

// })

// =================================================================================

// const {adminAuth} = require("./middlewares/auth.")
// app.use("/test",function(req , res){
//     res.send("Hello from the server")
// })
// app.use("/hello",function(req , res){
//     res.send("Hell   gjgfhfhho hvj xcjsbnvksvbscvbs dsvbsksvssd")
// })

// app.use("/hello" , (req , res)=>{
//     res.send("server startted")
// })

// app.use("/hello/2" , (req , res)=>{
//     res.send("servervbgndgndgndg startted")
// })

// app.get("/user/:username/:age/:address" , function(req , res){
//     res.send(`my name is ${req.params.username} and i am ${req.params.age} years old and i live in ${req.params.address}`);
//     console.log("username printed")
// })

// app.get("/user" , (req , res , next)=>{
//     console.log("ye hai user ka first route")
//     //  res.send("y2nd route handelr")
//      next()
//     // next();
// })
// app.get("/user" , (req , res , next)=>{
//     console.log("handling the route user!!")
//      res.send("ye haoii user ka res ka 2nd routre")
//     // next()
// })

// handle auth middleware for all GEt post...PATCH

// app.use("/admin" , adminAuth)

// app.get("/admin/getAllData" , (req , res)=>{
//     // check if the request is auhorized

//         res.send("All data sent")

// })

// app.get("/admin/deletedUser" , (req , res)=>{
//     res.send("delete data sent")
// })

// app.get("/admin/getAllData" , (req , res)=>{
//     res.send("All data sent")
// })

// app.use("/hello" ,
//    [ (req , res , next)=>{
//     console.log("hello");

//     // cons
//     next()
//     //   res.send("hello")
// }
// ,
// (req , res , next)=>{
//     console.log("hey 2nd response")
//     next();
//     // res.send("2nd response")
// },
// (req , res , next)=>{
//     console.log("hey 3rd response")
//         next();

//     // res.send("3rd response")
// },
// (req , res , next)=>{
//     console.log("hey 4rd response")
//         next();

//     // res.send("4nd response")
// },
// (req , res , next)=>{
//     console.log("hey 5th response")
//         next();

//      res.send("5th response")
// },
// (req , res , next)=>{
//     console.log("hey 6th response")
//     // res.send("6th response")
//     // next();
// },
// ])

//

// app.post("/user" , function(req , res){
//     console.log("done");
//     res.send("data successfully sedn")
// })

// app.get("/admin/getAllData" , ()=>{
//     // logic of fetching all data

//     res.send("ALL data sent");
// });

// app.use("/user" ,[ (req , res , next)=>{
//     console.log("dekhta hu chalta hai ya nhi")
//     next()
//     // res.send("route handeler");

// },
// (req , res , next)=>{
//     console.log("Thisi s 2nd console.log")
//     next()
//     res.send("this is 2nd route handler")

// },
// (req , res , next)=>{
//     console.log("Thisi s 3rd console.log")
//     // res.send("this is 3rd route handler")
//     // next()

// },
// (req , res , next)=>{
//     console.log("Thisi s 4th console.log")
//     // res.send("this is 4th route handler")
//      next()

// },]

// )

// ==================================================================================

// const adminAuth  =require("./middlewares/auth")
// // app.use("/admin" , (req , res , next)=>{
// //       const token = "xyz"
// //     const isAdminAuthorized = token ==="xyz";
// //     if(!isAdminAuthorized){
// //          res.status(401).send("unauthorized request")
// //     }else{
// //         next()
// //     }
// // })

// app.use("/admin" ,adminAuth)

// app.get("/admin/getAllData" , (req , res)=>{

//          res.send("All data sent")

// })
// app.get("/admin/deleteTheUser" , (req , res)=>{
//     res.send("All user  deleted")
// })

// ======================================================================================

// const {adminAuth , userAuth} = require("./middlewares/auth")

// app.use("/admin" , adminAuth)
// app.use("/user" ,userAuth ,  (req  ,res , next)=>{

//       res.send("yes it is working")

// })

// app.get('/admin/getUser'  ,(req , res)=>{

//         res.send("ye i am getting your user")
// })
// app.get('/user/getUser'  ,(req , res)=>{

//         res.send("ye i am getting your user2")
// })

// app.get("/admin/deleteUser" , (req , res)=>{
//     res.send("delete your user")
// })
// app.use("/" , (err , req , res , next)=>{
//     if(err){
//         res.status(401).send("something went wrong")
//     }
// })

// const express = require("express")
// const app = express();

// const connectToDB = require("./config/database")

// connectToDB().then(()=>{
//     console.log("database connected successfully")
//     app.listen(3001 , ()=>{
//     console.log("Serever start ho gya hai")
// })

// }).catch(err=>{
//     console.log("database cannot be connected ")

// })

// ==============================================================================
// const express = require("express")
// const app = express()
// const connectToDB = require("./config/database")
// const User  = require("./models/user")

// app.post("/signup" ,async (req , res)=>{
//     // const userObj =

//     // const user = new User(userObj)

//     //creating new instance of the user model

//     // or you can write like this

//         const user = new User({
//         firstName:"sachin kohle ",
//         lastName:"Singh",
//         email:"vikrantsinghan5@gmail.com",
//         password:"vik4an5@#",
//         age:18,
//         gender:"male",
//         //  _id:"64464646464645",
//     })

//     //id is unique string and object id are uniquely idenified

//      //most of the mongoose function return you the promise so you have to use async await in this

//      try{
//         await user.save()
//     res.send("saved to database successfully...")

//      }catch(err){
//         res.status(400).send("Error saving the user: " + err.message)
//      }

// })

// connectToDB().then(()=>{
//     console.log("Connected to database successfully")
//     app.listen(3005 , ()=>{
//         console.log("server connected successfully")
//     })
// }).catch(err=>{
//     console.log("You got an error")
// })

// const express  = require("express");
// const app =express();
// const connectToDB =require("./config/database")
// const User = require("./models/user")
// app.use(express.json());

// // express.json is the middle ware which checks the request and convert json to js object and give us access to data to here
// // we usee app.use beacuse now it is avalilable for my all the routes

// app.get("/" , (req , res)=>{
//     res.send("server is running fine you can check it ot");
// })

// app.post("/signup" , async(req , res)=>{
//     // const user = new User(req.body);
//     // try{
//     //     await user.save();
//     //     res.send("user added to database");

//     // }
//     // catch(err){
//     //     res.status(400).send("Error saving the user : " +err.message);
//     // }

//     const email = req.body.email;
//     const check = await User.find({email:email}) ;
//     if(check.length===0){
//         try{
//             const myUser = new User(req.body);
//             await myUser.save();

//             console.log(myUser);
//            return res.send("user added to database successfully")
//         }
//         catch(err){
//           return  res.status(400).send("Error saving the user : " +err.message);
//         }
//     }
//     else{
//       return  res.send("user already exists please login!!!")
//     }
// })

// app.get("/user" ,async (req ,res)=>{
//     const userEmail = req.body.email;

//     try{
//         const user =  await User.find({email : userEmail})

//         if(user.length ===0){
//             res.send("user not found")
//         }
//         else{
//             res.send(user)
//         }

//     }
//     catch(err){
//         res.status(400).send("Something went wrong")
//     }
// })

// app.get("/feed", async(req , res)=>{
//     try{
//   const users = await User.find({});
//     res.send(users)
//     }
//     catch(err){
//         res.status(404).send("user not available")
//     }

// })

// app.delete("/user" , async(req ,res)=>{
//     const userId = req.body.userId;

//     try{
//         const user =await User.findByIdAndDelete(userId)
//         res.send("user deleted successfully")

//     }
//     catch(err){
//         res.status(400).send("something went wrong")
//     }
// })

// app.patch("/user" , async(req , res)=>{
//     const userId = req.body.userId;
//     const data = req.body;

//     try{
//         await User.findByIdAndUpdate({_id:userId} ,data);
//         res.send("user updated successfully")

//     }
//     catch(err){
//         res.status(400).send("not updated successfully !!!!" + err.message)
//     }
// })

// connectToDB()
// .then(()=>{
//     console.log("connected to db successfully");
//     app.listen(3000 , ()=>{
//     console.log("server is started successfully");
// })

// })
