import Signup from "./components/Signup/Signup"
import Login from "./components/Login/Login"
import WelcomePage from "./components/Home/Home"
import AdminRegister from "./components/Signup/AdminRegister"
import Adminhome from "./components/Admin/Adminhome"
import Adminbook from "./components/Admin/Adminbook"
import "./components/Signup/Signup.css"
import "./components/Login/Login.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<WelcomePage />}></Route>
          <Route path='/adminhome' element={<Adminhome />}></Route>
          <Route path='/adminregister' element={<AdminRegister />}></Route>
          <Route path='/adminbook' element={<Adminbook />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
