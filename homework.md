

// what are dependencies
//there are two types of dependencies first onr is normal dependencies like the package use for creatin g that site or app need during production and dev dependencies which  are not related to that project but it enhaces the programmmer coding experiences need during pdevelopment only


// Normal/regular dependencies → These are required for the application to run in production. These packages become part of the actual working project (for example: react, express, axios, etc.)

// Dev dependencies → These are only needed during development. They are used to help the developer while building the project, but they are not required in production. Examples: eslint, nodemon, jest, bundlers, etc.

// what is the use of "-g" while npm onstall

// if we want some package to install in global level then it will use this -g sign it install tha package in my machine which i dont have to install always
// what is the use of "-g" while npm install

// The -g flag is used to install a package globally.
// That means the package is installed on our entire machine (not inside a specific project).
// So we can use that package from anywhere and we don’t need to install it again in every project.


// difference between caret and tilde in package.json
// tilde represents by ~ and caret by ^ 
//here caret is used for minor change upgradation for any package like if we install any pakage which has 4.7.5 version then if in future there will come 4.8.6 version then it will upgrade your package version automatically bcz minor version doesnot effect on you code

//but in tilde~ if we use this in package.json then it upgrads package in the basis pf major version ,, and in all major version there will some major chages happns so ti could  eeffect on your project and can change several changes so we does not use the tilde


we add package.json to production bt why also packagelock.json

✅ Why we add package-lock.json to production (along with package.json)

package.json only defines which packages your project depends on (and version ranges, like ^4.8.0)

package-lock.json records the exact versions that were actually installed (including all nested sub-dependencies)

If you deploy only package.json, then when someone runs npm install on the production server, npm could install slightly different versions (because of version ranges like ^ or ~).

⚠️ And a small version difference can sometimes cause bugs or unexpected behavior in production.










<!-- lecture 2 -->

initialize git.gitignore
it creates  afile which do noe export for production it stores sensitive data ot the files which we can automatically generate again and again


create a remote repo on github
git init
git add . (its add the all files)
git commit -m "kuch vi messaage"
git remote add origin https://github.comxxfbfkjbsfks
git branch -M main
git push  -u origin main

push all code to remote origin
play whit routes and route extension ex./hello ,/hello/2 , /xyz

if we use app.use then /hello and /hello/kuch v give me the same esult also

order ofthe route matter a lot
ye order of the routes mattr alo if we pass the "/" route at first the n whatever wi will pass the route it will give me the same result as "/" route

install post mans app and make a workspace / collection test API casll


write logic to handle GET , POST , PATCH , DELETE API calls and test them on postman
expllore routing in and use ? ,+  , * , /.*fly$ in routes
Use egex in routes /a/ , /
reading query params in thre routees
reading the dynamic routes



<!-- lecture 3 -->

multiple route handlers --play with th code 
next()
next function error  and errors along with res.send()

app.use("/route ,  rh , [rh2 , rh3] , rh4 , rh5)


what is middlewares 
how express JS basically handles requests behind the scenes
the difference between app.use and app.all
write  dummy auth middleware for admin
and also for user for which user does not authenticated for login aksp

errorhandling app.use("/" , (err , req , res, next)=>{

})

<!-- http status codes -->


<!-- episode 6 -->

create a free culster
install mongoose
connect app to database
call connect db function before starting server
userSchema creation

//create /signup api and push some data





<!-- ========================================================= -->

what is the difference between javascript and json

JavaScript

What it is: A programming language used to build interactive and dynamic functionality on websites.

Type: Scripting language.

Usage: Can declare variables, write logic, create functions, manipulate DOM, handle APIs, etc.

Example:

let user = {
  name: "Vikrant",
  age: 21,
  isStudent: true
};

console.log(user.name); // Output: Vikrant

JSON (JavaScript Object Notation)

What it is: A data format (text-based), derived from JavaScript object syntax, but used purely for storing and exchanging data.

Type: Data interchange format (not a programming language).

Usage: Mainly used to transfer data between a server and a client (e.g., in APIs).

Rules:

Keys and string values must be in double quotes (" ")

No functions or methods allowed, only data

Example:

{
  "name": "Vikrant",
  "age": 21,
  "isStudent": true
}

✅ Key Differences
Feature	JavaScript	JSON
Type	Programming language	Data format (text)
Usage	Build logic, applications, websites	Store & exchange data (mainly APIs)
Syntax	Flexible (single/double quotes, funcs)	Strict (double quotes, no functions)
Executable?	Yes, can run in browser/Node.js	No, just text data
Example	{ name: "Vikrant", age: 21 }	{ "name": "Vikrant", "age": 21 }











Schema ,  model , instance------->
Schema → Blueprint of a house 🏠 (what structure should look like).

Model → Contractor 👷 who uses the blueprint to actually build houses.

Instance → A single house built from that blueprint.



doifference bt ja and json

✅ Key Differences
Feature	JavaScript	                     JSON
Type	Programming language	         Data format (text)
Usage	Build logic, applications,       websites	Store & exchange data (mainly APIs)
Syntax	Flexible (single/double quotes, funcs)	Strict (double quotes, no functions)
Executable?	Yes, can run in browser/Node.js	No, just text data
Example	{ name: "Vikrant", age: 21 }	{ "name": "Vikrant", "age": 21 }







🔹 findOne() in MongoDB

Definition: Returns the first document that matches the query filter.

If multiple documents match → it will not give all, only one.

Which one?
👉 By default, it returns the first matching document in the natural order (i.e., how documents are stored internally in the collection).








api gey+t user by email
API - feed API -GET/feed -get all the  users from the database
API-get user by ID
create a delete user API
difference but ween put and patch

create update 



explore schematype options from the documentation
add required , unique , lowercase , min , minLength , trim
add Default
create a custom validate function for gender
improve DB schema
add time stamps to schema
api level validation onpatch request and signup post api
data sanitization  app api validation or each field
install validator and explore validator password email
never trust req.body







<!-- ====================================================== -->
now we cant store data in hash format so we can


bcrypt is used for hash paassword and then decode it
validate data in signup
install bcrypt
create password hash using bcrypt.hash
create login api validate the data

login ap create jwt token
install jsonwebtoken 
and cookie-parseer
just send a dummy cookie to user
create get api and chek cookie  is you get the cookiie back
after email and pass validation  , create jwt token and send it to user
resd cookies inside your profile API and find the loggged user
userAuth middleware 
add the userauthMiddleware in profile API and a new sendConnectionRequest API
set the expiry of JWT token and cookies to  7 days
create a user schea methosd to get jwt token
create Userschema method to comparepassword()