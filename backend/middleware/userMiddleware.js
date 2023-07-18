import jwt from "jsonwebtoken"
import emailValidator from "email-validator"

const signupValidator = (req, res, next)=>{
    const {name, email, password, bio, username} = req.body;
    if(!name || !email || !password || !bio || !username){
        return res.status(401).send({ msg: "All Fields Required" });
    }

    const validEmail = emailValidator.validate(email)

    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }

    next()

}

const loginValidator = (req, res, next)=>{
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is mandatory'
        });
    }
    next();
}

const jwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    
  
    if (!token) {
      return res.status(404).send({ msg: "Not Aurthorised" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRATE_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(404).send({ msg: error.message });
    }
  };
  

export {signupValidator, loginValidator,  jwtAuth}