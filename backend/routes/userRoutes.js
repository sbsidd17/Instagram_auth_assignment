import {Router} from "express"
import { login, logout, profile, signup } from "../controller/userController.js"
import { jwtAuth, loginValidator, signupValidator } from "../middleware/userMiddleware.js"

const userRouter = Router()

userRouter.get("/", (req,res)=>{
    res.send("Backend Server")
})

userRouter.post("/v1/user/signup", signupValidator, signup)
userRouter.post("/v1/user/login", loginValidator, login)
userRouter.get("/v1/user/logout", logout)
userRouter.get("/v1/user/profile", jwtAuth, profile)

export default userRouter; 