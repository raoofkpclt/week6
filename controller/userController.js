const userSchema = require("../model/userModel");
const bcrypt = require('bcrypt');
const saltRound = 10;

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const users = await userSchema.findOne({email});
        console.log(users);
        if (users) {
            return res.render('user/register',{message:'User Already Exists'})
        }

        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = new userSchema({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.render('user/login',{message:'User Created Successfully'});
    } catch (error) {
        console.error(error.message);
        res.render('user/register',{message:"Something Went Wrong"})
    }
};

const loadRegister=(req,res)=>{
    res.render('user/register')
}



const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Request body:", req.body);
  
      const user = await userSchema.findOne({email}); 
      console.log("User found:", user);
  
      if (!user) {
        return res.render('user/login', { message: 'User Does not Exist' });
      }
  
      const isMach = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMach);
  
      if (!isMach) {
        return res.render('user/login', { message: 'Incorrect Password' });
      }
  
      res.render('user/home', { message: 'Login Successfully' });
    } catch (error) {
      console.error("Error during login:", error);
      res.render('user/login', { message: "Something Went Wrong" });
    }
  };
  



const loadLogin=(req,res)=>{
    res.render('user/login')
}

const loadHome=(req,res)=>{
    res.render('user/userHome')
}

module.exports={
    registerUser,
    loadLogin,
    loadRegister,
    login,
    loadHome,
}