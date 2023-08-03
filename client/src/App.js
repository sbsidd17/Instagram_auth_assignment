import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/signin'} element={<SignIn />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/edit-profile'} element={<EditProfile />} />
          <Route path={'/forgot-password'} element={<ForgotPassword />} />
          <Route path={'/reset-password'} element={<ResetPassword />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
