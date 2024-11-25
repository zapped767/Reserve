import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfileManagement from './pages/ProfileManagement';
import CreateUser from './pages/CreateUser';
import ManagerPage from './pages/ManagerPage';
import ChefPage from './pages/ChefPage';
import WaiterPage from './pages/WaiterPage';
import SecurityPage from './pages/SecurityPage';
import DishwasherPage from './pages/DishwasherPage';
import './App.css';
import AddItem from './pages/AddItem';
import AllItems from './pages/AllItems';
import UpdateItem from './pages/UpdateItem';
import Admin from './pages/Admin';
import AllMenu from './pages/AllMenu';
import AllMenuUser from './pages/AllMenuUser';
import Login from './pages/Login';
import Order from './pages/Order';
import Signup from './pages/Signup';
import UpdateMenu from './pages/UpdateMenu';
import Homepage from './pages/Homepage';
import MakeReservationPage from './pages/MakeReservationPage';
import ReservationPage from './pages/ReservationPage';
import ReservationTable from './pages/ReservationTable';
import TableDetailsPage from './pages/TableDetailsPage';



function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/profile-management">Profile Management</Link></li>
            <li><Link to="/create-user">Create User</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/profile-management" element={<ProfileManagement users={users} />} />
          <Route path="/create-user" element={<CreateUser addUser={addUser} />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/chef" element={<ChefPage />} />
          <Route path="/waiter" element={<WaiterPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/dishwasher" element={<DishwasherPage />} />
          <Route path="/AddItem" element={<AddItem />}/>
          <Route path="/AllItems" element={<AllItems />} />
          <Route path="/update" element={<UpdateItem />}/>
          <Route path="/Admin" element={<Admin />}/>
          <Route path="/AllMenu" element={<AllMenu />}/>
          <Route path="/AllMenuUser" element={<AllMenuUser />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Order" element={<Order />}/>
          <Route path="/Signup" element={<Signup />}/>
          <Route path="/UpdateMenu" element={<UpdateMenu />}/>
          <Route path="/Homepage" element={<Homepage/>}/>
          <Route path="/" element={<ReservationPage />} />
        <Route path="/make-reservation" element={<MakeReservationPage />} />
        <Route path="/" element={<ReservationTable />} />
        <Route path="/table-details" element={<TableDetailsPage />} />
        <Route path="/" element={<ReservationPage />} />
        <Route path="/index" element={<index />} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
