import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Waves from '../Waves/Waves';

const Signup = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType2, setPasswordType2] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  const togglePassword2 = () => {
    if (passwordType2 === 'password') {
      setPasswordType2('text');
    } else {
      setPasswordType2('password');
    }
  };

  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const navigate = useNavigate();

  const regUser = (e) => {
    e.preventDefault();
    setUser({
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    });
  };

  if (localStorage.getItem('token')) {
    window.location = '/dashboard';
  }

  useEffect(() => {
    axios
      .post('http://localhost:3001/auth/register', user)
      .then((res) => {
        console.log(res.data);
        if ('error' in res.data) {
          console.log(res.data.error);
        } else {
          alert('User successfully registered');
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, user]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      {/* <img className='neon relative' src={neon} alt='neon' /> */}
      <div className='box absolute flex flex-col'>
        <div className='header flex justify-center text-5xl text-slate-900 rounded-t-lg px-8 py-1'>
          Hermes
        </div>
        <div className='flex px-8 py-6 text-left bg-slate-900 shadow-lg rounded-b-lg'>
          <form onSubmit={regUser}>
            <div className='mt-4'>
              <div>
                <i className='text-cyan-600 fas fa-user'></i>
                <label className=' text-cyan-500 pl-2' for='Username'>
                  Username
                </label>
                <input
                  type='text'
                  placeholder='Enter your username...'
                  name='username'
                  className='w-full px-4 py-2 mt-2 text-white border-b-2 focus:outline-none border-cyan-600 bg-slate-900'
                  autoComplete='off'
                />
              </div>
              <div className='mt-4'>
                <i className='text-cyan-600 fas fa-envelope'></i>
                <label className=' text-cyan-500 pl-2' for='email'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='Enter your email...'
                  name='email'
                  className='w-full px-4 py-2 mt-2 text-white border-b-2 focus:outline-none border-cyan-600 bg-slate-900'
                  autoComplete='off'
                />
              </div>
              <div className='mt-4'>
                <i className='text-cyan-600 fa-solid fa-key hover'></i>
                <label className=' text-cyan-500 pl-2'>Password</label>
                <input
                  type={passwordType}
                  placeholder='Enter your password...'
                  name='password'
                  className='w-full px-4 py-2 mt-2 text-white border-b-2 focus:outline-none border-cyan-600 bg-slate-900'
                  autoComplete='off'
                />
                {passwordType === 'password' ? (
                  <i
                    className='fas fa-eye-slash text-cyan-600 absolute right-10 mt-4 cursor-pointer'
                    onClick={togglePassword}
                  ></i>
                ) : (
                  <i
                    className='fas fa-eye text-cyan-600 absolute right-10 mt-4 cursor-pointer'
                    onClick={togglePassword}
                  ></i>
                )}
              </div>
              <div className='mt-4'>
                <label className=' text-cyan-500'>Confirm Password</label>
                <input
                  type={passwordType2}
                  placeholder='Enter your password again...'
                  className='w-full px-4 py-2 mt-2 text-white border-b-2 focus:outline-none border-cyan-600 bg-slate-900'
                  autoComplete='off'
                />
                {passwordType2 === 'password' ? (
                  <i
                    className='fas fa-eye-slash text-cyan-600 absolute right-10 mt-4 cursor-pointer'
                    onClick={togglePassword2}
                  ></i>
                ) : (
                  <i
                    className='fas fa-eye text-cyan-600 absolute right-10 mt-4 cursor-pointer'
                    onClick={togglePassword2}
                  ></i>
                )}
              </div>
              <div className='flex'>
                <button className='btn w-full px-6 py-2 mt-4 text-gray-300 font-semibold text-md rounded-lg'>
                  Create Account
                </button>
              </div>
              <div className='mt-6 text-gray-300'>
                Already have an account?
                <Link
                  to='/login'
                  className='text-cyan-500 hover:underline pl-2'
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <Waves/>
      </footer>
    </div>
  );
};

export default Signup;
