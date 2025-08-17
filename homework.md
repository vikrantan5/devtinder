

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