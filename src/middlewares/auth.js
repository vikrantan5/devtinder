// //  const adminAuth =(req , res , next)=>{
// //     console.log("Admin auth is getting checked")
// //     const token = "xcyz";
// //     const isAdminAuthorized = token==="xyz"
// //     if(!isAdminAuthorized){

// //         res.status(401).send("not authorised")

// //     }
// //     else{
// //         next();
// //     }
// // }

// // module.exports = {
// //     adminAuth
// // }



// // middleware creation

// // const adminAuth = (req , res , next)=>{
// //     const token = "xyz";
// //     const isAdminAuth = token === "xyz";
// //     if(!isAdminAuth){
// //         res.status(401).send("Admin not Auth")
// //     }
// //     else{
// //         next()
// //     }
// // }

// // module.exports = adminAuth



// const adminAuth = (req  ,res ,next)=>{
//      let token = "xyz"
//     const isAdminAuth = token === "xyz"
//     if(!isAdminAuth){
//         res.status(401).send("unauthorised")

//     }
//     else{
//        next();
//     }

// }
// const userAuth = (req  ,res ,next)=>{
//      let token = "xyz"
//     const isAdminAuth = token === "xyz"
//     if(!isAdminAuth){
//         res.status(401).send("unauthorised")

//     }
//     else{
//        next();
//     }

// }

// module.exports = {adminAuth , userAuth}



 const jwt = require("jsonwebtoken");
 const User = require("../models/user");

const userAuth = async(req , res , next)=>{

    //read the token from the res cookies

    try{
         const {token} = req.cookies;
    if(!token){
      return  res.status(401).send("Unauthorized request no token found")
    }



    //validate the token
   const decodedUser =  jwt.verify(token , process.env.JWT_SECRET)

    if(!decodedUser){
      return  res.status(401).send("Unauthorized request invalid token")
    }


    //Find the user
    const {_id} = decodedUser;
    const user = await User.findById(_id);
    if(!user){
       return res.status(401).send("Unauthorized request user not found")
    }
    else{
        req.user = user
        next();
        //next is called for move to request handler
    }
    }
    catch(err){
       return res.status(400).send("Unauthorized request"+ err.message)
    }
   
}

module.exports = {userAuth};