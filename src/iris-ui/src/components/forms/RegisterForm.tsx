import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../styles/styles';
import styles from './main.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);

    const ohnutest = { username, email, password };

    fetch('http://localhost:7070/auth/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ohnutest),
    }).then((e) => {
      console.warn(JSON.stringify(e.json()));

      if (e.status === 404) {
        setError('Failed to find endpoint.');
      }
      console.log('Error');
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register('email', { required: true })}
        />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="username">Username</InputLabel>
          <InputField
            type="text"
            id="username"
            {...register('username', { required: true })}
          />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
      </InputContainer>
      <Button className={styles.button}>Create Account</Button>
      <div className={styles.footerText}>
        <span>Already have an Account? </span>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </form>
  );
};
