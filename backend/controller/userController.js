import { userModal } from "../model/useerModal.js";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  let { name, email, password, bio, username } = req.body;
  password = await bcript.hash(password, 10);
  try {
    await userModal.create({ name, email, password, bio, username });
    res.status(200).json({
      success: true,
      msg: "User Registered Successfully"
    });
  } catch (error) {
    console.log("Error : ", error.message)
    res.status(500).json({
      success: false,
      msg: "Something Went Wrong, User Not Registered"
    });
  }
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
          data: userData
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "Password not matched"
        });
      }
    } else {
      res.status(400).json({
        success: false,
        msg: "User Not Found"
      });
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      success: false,
      msg: "Error in server"
    });
  }
};
const logout = (req, res) => {
  const cookieOptions = {
    expires: new Date(0), // Set the expiration date to the past
    httpOnly: true,
  };

  try {
    res.cookie("token", null, cookieOptions);
    res.status(200).json({
      success: true,
      msg: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Error In LogOut",
    });
  }
};


const profile = async (req, res) => {
  const userId = req.user.userId;
  const user = await userModal.findById(userId);
  return res.status(200).json({
    success: true,
    data: user,
  });
};

export { signup, login, logout, profile };
