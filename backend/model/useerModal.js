import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLenght: [5, "Name should be greater than 5 charachers"],
      maxLenght: [50, "Name should be less than 50 charachers"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "User name is required"],
      minLenght: [5, "User Name should be greater than 5 charachers"],
      maxLenght: [50, "User Name should be less than 50 charachers"],
      trim: true,
      lovercase : true,
      unique : true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      maxLenght: [50, "Email should be less than 50 charachers"],
      trim: true,
      lovercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      select: false,
    },
    bio : {
        type : String,
        required: [true, "Bio is required"],
        maxLenght: [100, "Bio should be less than 100 charachers"],
    }
  },
  { timestamps: true }
);

const userModal = mongoose.model("instagramUser", userSchema);

export { userModal };
