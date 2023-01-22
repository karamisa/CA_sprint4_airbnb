import { useState, useEffect } from 'react';
import { userService } from '../services/user.service.local';
import { ImgUploader } from '../cmps/img-uploader';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { login, signup } from '../store/user.actions';
import { BtnSquareColor } from './ui/buttons/btn-square-color';
import { BtnSquare } from './ui/buttons/btn-square';
import { BtnSquareBlack } from './ui/buttons/btn-square-black';
import {BtnNavRounded} from './ui/buttons/btn-nav-rounded'

export function LoginSignup({ closeModal }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  });
  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const users = await userService.getUsers();
    setUsers(users);
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' });
    setIsSignup(false);
  }

  function handleChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  }

  async function onLogin(ev = null) {
    console.log('onLogin');
    if (ev) ev.preventDefault();
    if (!credentials.username) return;

    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome: ${user.fullname}`);
      closeModal()
    } catch (err) {
      showErrorMsg('Cannot login');
    }
    clearState();
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return;
    onSignup(credentials);
    clearState();
  }

  function toggleSignup() {
    setIsSignup(!isSignup);
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl });
  }

  return (
    <div className='login-page'>
      <header className='login-signup-header'>
        <h1>Login in or sign up</h1>
      </header>
      {!isSignup && (
        <form className='login-form' onSubmit={onLogin}>
          {/* <select
            name='username'
            value={credentials.username}
            onChange={handleChange}>
            <option value=''>Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.fullname}
              </option>
            ))}
          </select> */}
          <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
          <BtnSquareColor>
            Login
          </BtnSquareColor>
        </form>

      )}
      <div className='demo-login-btns'>
        <BtnSquare onClick={() => {
          credentials.username = 'host';
          onLogin();
        }}>
          DEMO: login as Muki Host
        </BtnSquare>
        <BtnSquareBlack onClick={() => {
          credentials.username = 'guest';
          onLogin();
        }}>
          DEMO: login as Puki Guest
        </BtnSquareBlack>
      </div>
      <div className='signup-section'>
        {isSignup && (
          <form className='signup-form' onSubmit={onSignup}>
            <input
              type='text'
              name='fullname'
              value={credentials.fullname}
              placeholder='Fullname'
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='username'
              value={credentials.username}
              placeholder='Username'
              onChange={handleChange}
              required
            />
            <input
              type='password'
              name='password'
              value={credentials.password}
              placeholder='Password'
              onChange={handleChange}
              required
            />
            <ImgUploader onUploaded={onUploaded} />
            <button>Signup!</button>
          </form>
        )}
      </div>
      <div className='sign-up-btn-container'>
        <BtnNavRounded className='btn-link' onClick={toggleSignup}>
          {!isSignup ? 'Signup' : 'Login'}
        </BtnNavRounded>
      </div>
    </div>
  );
}
