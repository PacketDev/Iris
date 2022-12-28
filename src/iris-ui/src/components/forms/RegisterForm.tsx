import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../styles/styles';
import styles from './main.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerEndpoint } from '../../utils/API';

export const RegisterForm = () => {
  const [payload, setPayload] = useState({
    email: '',
    username: '',
    password: '',
  });

  const toastNotificationData: object = {
    position: 'bottom-right',
    autoClose: 7000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('iris-app')) {
      navigate('/guilds');
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, username, email } = payload;
      const { data } = await axios.post(registerEndpoint, {
        email,
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastNotificationData);
      }

      if (data.status === true) {
        localStorage.setItem('iris-app', JSON.stringify(data.user));
        navigate('/login');

        toast.info('Created Account.', toastNotificationData);
      }
    }
  };

  const handleValidation = () => {
    const { password, email, username } = payload;

    if (username.length < 3) {
      toast.error(
        'Username should be greater than 3 characters.',
        toastNotificationData
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        'Password should be greater than 8 characters.',
        toastNotificationData
      );
      return false;
    } else if (email === '') {
      toast.error('Email is required.', toastNotificationData);
      return false;
    }
    return true;
  };

  const handleChange = (event: any) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e: any) => handleChange(e)}
        />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="username">Username</InputLabel>
          <InputField
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e: any) => handleChange(e)}
          />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e: any) => handleChange(e)}
        />
      </InputContainer>
      <Button className={styles.button}>Create Account</Button>
      <div className={styles.footerText}>
        <span>Already have an Account? </span>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
      <ToastContainer />
    </form>
  );
};
