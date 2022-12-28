import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../styles/styles';
import styles from './main.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const LoginForm = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const payload = { email, password };

  const onSubmit = async (data: any) => {
    data.preventDefault();

    fetch('http://localhost:7070/auth/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((e) => {
      console.log(e);
    });

    try {
      navigate('/guilds');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          type="email"
          value={email}
          required
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </InputContainer>
      <Button className={styles.button}>Login</Button>
      <div className={styles.footerText}>
        <span>Don't have an Account? </span>
        <Link to="/register">
          <span>Register</span>
        </Link>
      </div>
    </form>
  );
};
