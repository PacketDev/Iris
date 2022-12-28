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
import { loginEndpoint } from '../../utils/API';

export const LoginForm = () => {
  const [payload, setPayload] = useState({
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
      const { password, username } = payload;
      const { data } = await axios.post(loginEndpoint, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastNotificationData);
      }

      if (data.status === true) {
        localStorage.setItem('iris-app', JSON.stringify(data.user));
        toast.info('Logged In.', toastNotificationData);

        navigate('/guilds');
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = payload;

    if (username === '') {
      toast.error('Username & Password is required.', toastNotificationData);
      return false;
    } else if (password === '') {
      toast.error('Username & Password is required.', toastNotificationData);
    }
    return true;
  };

  const handleChange = (event: any) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="username">Username</InputLabel>
          <InputField
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e: any) => handleChange(e)}
            min="3"
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
      <Button className={styles.button}>Login</Button>
      <div className={styles.footerText}>
        <span>Don't have an Account? </span>
        <Link to="/register">
          <span>Register</span>
        </Link>
      </div>
      <ToastContainer />
    </form>
  );
};
