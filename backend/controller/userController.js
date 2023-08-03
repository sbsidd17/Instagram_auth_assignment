import { userModal } from "../model/useerModal.js";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const signup = async (req, res) => {
  let { name, email, password, bio, username } = req.body;

  // upload image to cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
    transformation: [
      { width: 250, height: 250, crop: "fill", gravity: "faces" },
    ],
  });

  const profile_url = cloudinaryResponse.secure_url;

  password = await bcript.hash(password, 10);
  try {
    await userModal.create({
      name,
      email,
      password,
      bio,
      username,
      profile_url,
    });
    res.status(200).json({
      success: true,
      msg: "User Registered Successfully",
    });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({
      success: false,
      msg: "Something Went Wrong, User Not Registered",
    });
  }

  // Delete file from server after upload to cloudinary
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await userModal.findOne({ username }).select("+password");

    if (userData) {
      const passwordMatched = await bcript.compare(password, userData.password);
      if (passwordMatched) {
        userData.password = undefined;
        const payload = {
          userId: userData._id,
          username: userData.username,
        };
        const secretKey = process.env.JWT_SECRATE_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
        res.cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.status(200).json({
          success: true,
          data: userData,
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "Password not matched",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        msg: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      msg: "Error in server",
    });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      msg: "User logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Error In LogOut",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModal.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: "false",
      msg: "User Not Found",
    });
  }

  // Generate resetToken
  const resetToken = crypto.randomBytes(20).toString("hex");

  // ADD more encription layer on resetToken before save it to database
  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // store encripted token in db
  try {
    await userModal.findOneAndUpdate({ email }, { forgotPasswordToken });
  } catch (error) {
    console.log(error.message);
  }

  const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const subject = "Reset Password";
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

  try {
    await sendEmail(email, subject, message)
    res.status(200).json({
      success: true,
      msg: `Reset password token has been sent to ${email} successfully`
  })
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `Reset password Failed`
  })
  }
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  console.log(resetToken)

  let { password } = req.body;

  const forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

  const user = await userModal.findOne({
      forgotPasswordToken
  });

  if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Token"
      })
  }

  password = await bcript.hash(password, 10);
  

  await userModal.findOneAndUpdate({forgotPasswordToken},{
    password,
    forgotPasswordToken:undefined
  })


  res.status(200).json({
      success: true,
      message: 'Password changed successfully!'
  })
}

const profile = async (req, res) => {
  const userId = req.user.userId;
  const user = await userModal.findById(userId);
  return res.status(200).json({
    success: true,
    data: user,
  });
};

const deleteAll = async (req, res) => {
  try {
    await userModal.deleteMany({});
    res.status(200).json({
      success: true,
      msg: "All Data Clear",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const editProfile = async (req, res) => {
  let { name, bio, username, email, profile_url } = req.body;

  // upload image to cloudinary
  if (req.file) {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      transformation: [
        { width: 250, height: 250, crop: "fill", gravity: "faces" },
      ],
    });

    profile_url = cloudinaryResponse.secure_url;

    // Delete file from server after upload to cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  }

  try {
    await userModal.findOneAndUpdate(
      { email },
      { name, bio, username, profile_url }
    );
    res.status(200).json({
      success: true,
      msg: "User Profile Edited Successfully",
    });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({
      success: false,
      msg: "Something Went Wrong, User Not Registered",
    });
  }
};
export {
  signup,
  login,
  logout,
  profile,
  deleteAll,
  editProfile,
  resetPassword,
  forgotPassword,
};
