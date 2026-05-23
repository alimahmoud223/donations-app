import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema=new mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        minlength:[3,"Name must be at least 3 characters"],


    },
    
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
     password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
},
{
    timestamps: true,
  }
)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User=mongoose.model("User",UserSchema)
export default User;