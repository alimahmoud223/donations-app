import jwt from "jsonwebtoken"
import User from "../model/users.model.js";
const signUp=async(req,res)=>{
    try{
        const{name,email,password}=req.body
        const existUser=await User.findOne({email})
        if(existUser){
            return res.status(409).json({
                success:false,
                message: "Email already exists",
            })
        }
        const user = await User.create({
              name,
              email,
              password,
              role: "user",
            });
        
            return res.status(201).json({
              success: true,
              message: "User registered successfully",
              data: {
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  createdAt: user.createdAt,
                },
              },
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Server error during sign up",
              error: error.message,
            });
          }
        };
        
      
        const signIn = async (req, res) => {
          try {
            const { email, password } = req.body;
        
            const user = await User.findOne({ email });
        
            if (!user) {
              return res.status(401).json({
                success: false,
                message: "Invalid email or password",
              });
            }
        
            const isMatched = await user.comparePassword(password);
        
            if (!isMatched) {
              return res.status(401).json({
                success: false,
                message: "Invalid email or password",
              });
            }
        const token=jwt.sign(
            {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      })
       return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during sign in",
      error: error.message,
    })
    }
    
}

const getMyDonations = async (req, res) => {
  // Placeholder implementation
  res.status(200).json({ success: true, message: "My donations" });
};

export { signUp, signIn, getMyDonations };