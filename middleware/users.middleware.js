import validator from 'validator';
const ValidateSignUp=(req,res,next)=>{
    let {name,email,password}=req.body
if (!name || !email || !password){
    return res.status(400).json({
        success:false,
        message:"name , email , and password are required",
    })
}
if (typeof name !== "string" || name.length < 3) {
  return res.status(400).json({
    success: false,
    message: "Name must be a string and least 3 characters ",
  });
}
name = name.trim();


  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }
   if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }
  next()
}

const ValidateSignIn = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  next();
};

export { ValidateSignUp, ValidateSignIn };
