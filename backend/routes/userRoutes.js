import {Router} from "express"
import { login, logout, profile, signup, deleteAll, editProfile, forgotPassword, resetPassword } from "../controller/userController.js"
import uploadSingle from "../middleware/multer.js"
import { jwtAuth, loginValidator, signupValidator,  } from "../middleware/userMiddleware.js"

const userRouter = Router()

userRouter.get("/", (req,res)=>{
    res.send("Backend Server")
})

userRouter.post("/v1/user/signup", uploadSingle, signupValidator, signup)
userRouter.post("/v1/user/login", loginValidator, login)
userRouter.get("/v1/user/logout", logout)
userRouter.post("/v1/user/reset", forgotPassword)
userRouter.post("/v1/user/reset/:resetToken", resetPassword)
userRouter.get("/v1/user/profile", jwtAuth, profile)
userRouter.put("/v1/user/edit-profile", uploadSingle, editProfile)
userRouter.delete("/v1/user/deleteAll", deleteAll)

export default userRouter; 