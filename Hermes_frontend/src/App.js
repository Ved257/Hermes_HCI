import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Face from './components/Face/Face'
import { SocketContext, socket } from './context/socket';
import './App.css';
import { useEffect, useState } from 'react';
// const ENDPOINT = 'http://localhost:3001';

const App = () => {
  const [, setResp] = useState('');

  useEffect(() => {
    socket.on('EstabConn', (data) => {
      console.log(data);
      setResp(data);
    });
  }, []);
  return (
    <div>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/face' element={<Face />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
