import './styles/home.css';
import './styles/app.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Overview from './pages/Overview.jsx';
import Admin from './pages/Admin.jsx';
import Account from './pages/Account.jsx';
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import RequireAuth from './components/RequireAuth.jsx';

function App() {

  return (
    <>
      <div className='App'>
        <Routes>

        {/* public routes */}
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        
        {/* protected routes */}
        <Route element={<RequireAuth />}>

            {/* user routes */}
            <Route path="/" element={<Home/>}></Route>
            <Route path="/overview" element={<Overview/>}></Route>
            <Route path="/account" element={<Account/>}></Route>
         
            {/* admin routes */}
            <Route path="/admin" element={<Admin/>}></Route>

        </Route>

          {/* catch all */}
          <Route path="*" element={
            <div style={{
                        fontSize: "30px", 
                        margin: "100px auto", 
                        border: "1px solid rebeccapurple", 
                        width: "max-content",
                        padding: "15px"}}>
              Invalid directory <div style={{fontSize: "20px"}}>Please navigate to /login or /signup</div>
            </div>
          }></Route>

        </Routes>
      </div>
    </>
  );
}

export default App;
