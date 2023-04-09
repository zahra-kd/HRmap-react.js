import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './Pages/MainLayout/MainLayout';
import Dashboard from './Pages/Dashboard/Dashboard';
import Departements from './Pages/Departements/Departements';
import Employees from './Pages/Employees/Employees';
import Leave from './Pages/Leave/Leave';
import MyLeave from './Pages/Leave/MyLeave';
import Document from './Pages/Document/Document';
import RequestDocument from './Pages/Document/RequestDocument';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Authentication/Login';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import ResetPassword from './Pages/Authentication/ResetPassword';
import AuthContext from './Context/Context';
import { useEffect, useState } from 'react';
import AllMyLeaves from './Pages/Leave/AllMyLeaves';
import MyDocRequestHistory from './Pages/Document/MyDocRequestHistory';





function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(localStorage.getItem("user") && localStorage.getItem("user") !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='/menu' element={<MainLayout/>}>
        {user?.role === 'admin' ?
        <>
          <Route path='' element={<Dashboard/>} />
          <Route path='departements' element={<Departements />}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='employees' element={<Employees/>}/>
          <Route path='all-leaves' element={<Leave/>}/>
          <Route path='request-leave' element={<MyLeave/>}/>
          <Route path='all-my-leaves' element={<AllMyLeaves/>}/>
          <Route path='all-documents' element={<Document/>}/>
          <Route path='request-document' element={<RequestDocument/>}/>
          <Route path='all-my-documents' element={<MyDocRequestHistory/>}/>
          </>
          :<>
          <Route path='' element={<Profile/>}/>
          <Route path='request-leave' element={<MyLeave/>}/>
          <Route path='all-my-leaves' element={<AllMyLeaves/>}/>
          <Route path='request-document' element={<RequestDocument/>}/>
          <Route path='all-my-documents' element={<MyDocRequestHistory/>}/>
          </>
        }
      </Route>
    </Routes>
    </AuthContext.Provider>
  );
}

export default App;
