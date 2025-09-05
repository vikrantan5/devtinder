// // const mongoose = require("mongoose")

// // const userSchema =new  mongoose.Schema({
// //     firstName:{
// //         type:String
// //     },
// //     lastName:{
// //         type:String
// //     },
// //     emailId:{
// //         type:String
// //     },
// //     password:{
// //         type:String
// //     },
// //     age:{
// //         type:Number
// //     },
// //     gender:{
// //         type:String
// //     },
// // })

// // const User = mongoose.model("user" , userSchema)

// // module.exports = User














// const mongoose = require("mongoose")

// const userSchema =  mongoose.Schema({
//   firstName:{
//     type:String,

//   },
//   lastName:{
//     type:String,
//   },
//   email:{
//     type:String,
//   },
//   password:{
//     type:String,
//   },
//   age:{
//     type:Number,
//   }
// })


// const User = mongoose.model("user" , userSchema)


// module.exports = User;







// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//   firstName:{
//     type:String,
//   },
//   lastName:{
//     type:String,
//   },
//   email:{
//     type:String,
//   },
//   age:{
//     type:Number,
//   },
//   password:{
//     type:String,
//   }

// })


// const User = mongoose.model("user" , userSchema )

// module.exports = User;








// const mongoose = require("mongoose");

// const userSchema =mongoose.Schema({
//   firstName:{
//     type:String,
//   },
//   lastName:{
//     type:String,
//   },
//   email:{
//     type:String,
//   },
//   password:{
//     type:String,
//   },
// })


// const User = mongoose.model("user" ,userSchema )
// module.exports = User



// const mongoose = require("mongoose");

// const userSchema =mongoose.Schema({
//   firstName:{
//     type:String,
//   },
//   lastName:{
//     type:String,
//   },
//   email:{
//     type:String,
//   },
//   age:{
//     type:Number,
//   },
// })

// const User = mongoose.model("user" ,userSchema)

// module.exports =User;





// const mongoose = require("mongoose");
// const validator = require("validator");

// const userSchema = new mongoose.Schema({
//   firstName:{
//     type:String,
//     required:true,
//     minLength:4,
//     maxLength:100
//   },
//   lastName:{
//     type:String,

//   },
//   email:{
//     type:String,
//     required:true,
//     unique:true,
//     lowercase:true,
//     trim:true,
//     validate(value){
//       if(!validator.isEmail(value)){
//         throw new Error("Email is not valid")
//       }
//     }
//   },
//   age:{
//     type:Number,
//     // min:18,
//   },
//   password:{
//     type:String,
//     required:true,
//     minLength:6,
//     validate(value){
//       if(!validator.isStrongPassword(value)){
//         throw new Error("password is not strong")
//       }
//     }
//   },
//   gender:{
//     type:String,
//     validate(value){
//       if(!["male" ,"female" , "others"].includes(value)){
//         throw new Error("gender data is not valid")
//       }
//     }
//   },
//   photoUrl:{
//     type:String,
//     default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
//     validate(value){
//       if(!validator.isURL(value)){
//         throw new Error("photoUrl is not valid")
//       }
//     }
//   },
//   about:{
//     type:String,
//     default:"This is the default about me"
//   },
//   skills:{
//     type:[String],
//   }
// },{  timestamps:true

// })

// const User = mongoose.model("user" , userSchema)
// module.exports = User;










const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt =require("bcrypt")

const userSchema = new mongoose.Schema({

  firstName:{
    type:String,
    required:true,
    minLength:4,
  },
  lastName:{
    type:String,


  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  age:{
    type:Number,
    min:18,
    max:100,
  },
  password:{
    type:String,
    required:true,
    minLength:8,
    maxLength:100,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Password is not strong enough")
      }
  }
},
  gender:{
    type:String,
    validate(value){
      if(!["male" , "female" , "others"].includes(value)){
        throw new Error("gender data is not valid  ")
      }
    }

  },
  photoUrl:{
    type:String,
    default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("photoUrl is not valid")
      }
    }
  },
  about:{
    type:String,
    default:"This is the default about me"
  },
  skills:{
    type:[String],
    
  }
},{
  timestamps:true

})

// this keyword onlywork for normal function
userSchema.methods.getJWT =async function(){
  const user = this;
 const token = await  jwt.sign({_id:user._id} , "Vik4an5@#Devtinder",{expiresIn:"1d"})

 return token;
}



userSchema.methods.getBCRYPT = async function(passwordInputByUser){
  const user = this
  const isPasswordValid = await  bcrypt.compare(passwordInputByUser, user.password);



  return isPasswordValid
}

const User = mongoose.model("user" , userSchema);

module.exports = User;


// // const mongoose = require("mongoose");
// // const validator = require("validator")


// // const userSchema =new mongoose.Schema({
// //   firstName:{
// //     type:String,
// //     required:true,
// //     minLenghth:4,
// //     maxLength:100
// //   },
// //   lastName:{
// //     type:String,
// //   },
// //   email:{
// //     type:String,
// //     required:true,
// //     unique:true,
// //     lowercase:true,
// //     trim:true,
// //     validate(value){
// //       if(!validator.isEmail(value)){
// //         throw new Error("Email is not valid")
// //       }
// //     }
// //   },
// //   age:{
// //     type:Number,
// //     min:18,
   
// //   },
// //   password:{
// //     type:String,
// //     required:true,
// //     minLength:6,
// //     validate(value){
// //       if(!validator.isStrongPassword(value)){
// //         throw new Error("password is not strong")
// //       }
// //     }
    
// //   },
// //   gender:{
// //     type:String,
// //     //custom validation function
// //     validate(value){
// //       if(!["male" , "female" , "others"].includes(value)){
// //         throw new Error("Gender data is not valid")

// //       }
// //     }
// //   },
// //   photoUrl:{
// //     type:String,
// //     default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
// //     validate(value){
// //       if(!validator.isURL(value)){
// //         throw new Error("photoutrtrl is not valid")
// //       }
// //     }
// //   },
// //   about:{
// //     type:String,
// //     default:"This is the default about me"
// //   },
// //   skills:{
// //     type:[String],
// //   }
// // },{
// //   timestamps:true
// // })



// // const User = mongoose.model("user" , userSchema)

// // module.exports = User;