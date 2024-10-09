import React, { Fragment, useEffect, useRef, useState } from 'react';
import "./LoginSignUp.css";
import Loader from '../layout/Loader/loader';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from '../../actions/userAction';
import { useAlert } from "react-alert";

function LoginSignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const RegisterTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    if (avatar) {
      myForm.set("avatar", avatar);
    }
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split('=')[1] : '/account';

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect); 
    } 
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);
  

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      RegisterTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
      RegisterTab.current.classList.add("shiftToRight");
      loginTab.current.classList.add("shiftToNeutral");
    } else if (tab === "register") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");
      RegisterTab.current.classList.remove("shiftToRight");
      loginTab.current.classList.add("shiftToLeft");
      RegisterTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToNeutral");
    }
  };

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
              <div>
                <div className='login_signUp_toggle'>
                  <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                <div className='loginEmail'>
                  <MailOutlineIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className='loginPassword'>
                  <LockOpenIcon />
                  <input
                    type='password'
                    placeholder='Password'
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password</Link>
                <input type='submit' value='Login' className='loginBtn' />
              </form>

              <form className='signUpForm' ref={RegisterTab} onSubmit={registerSubmit}>
                <div className='signUpName'>
                  <FaceIcon />
                  <input
                    type='text'
                    placeholder='Name'
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className='SignUpEmail'>
                  <MailOutlineIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className='SignUpPassword'>
                  <LockOpenIcon />
                  <input
                    type='password'
                    placeholder='Password'
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id='registerImage'>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type='file'
                    name="avatar"
                    accept='image/*'
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className='signUpBtn' />
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  );
}

export default LoginSignUp;
