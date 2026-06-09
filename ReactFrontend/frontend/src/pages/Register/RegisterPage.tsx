import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { register as registerApi } from '../../API/authApi';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password
      };

      console.log('Register Payload:', payload);

      const response = await registerApi(
        data.name,
        data.email,
        data.password
      );

      console.log(response.data);

      alert('Registration Successful');

      navigate('/login');
    } catch (error: any) {
      console.error(error);

      if (error?.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Registration Failed');
      }
    }
  };

  return (
    <motion.div
      className="page-container auth-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="card glass auth-card"
        style={{ maxWidth: '550px' }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '10px'
          }}
        >
          Create Account
        </h2>

        <p
          style={{
            textAlign: 'center',
            color: 'gray',
            marginBottom: '30px'
          }}
        >
          Register to access EduPortal
        </p>

        <form
          className="form-grid"
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* NAME */}

          <label>
            Full Name

            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />

              <input
                type="text"
                placeholder="Enter your name"
                style={{ paddingLeft: '42px' }}
                {...register('name', {
                  required: 'Name is required'
                })}
              />
            </div>

            {errors.name && (
              <small className="error">
                {String(errors.name.message)}
              </small>
            )}
          </label>

          {/* EMAIL */}

          <label>
            Email

            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />

              <input
                type="email"
                placeholder="Enter email"
                style={{ paddingLeft: '42px' }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email'
                  }
                })}
              />
            </div>

            {errors.email && (
              <small className="error">
                {String(errors.email.message)}
              </small>
            )}
          </label>

          {/* PASSWORD */}

          <label>
            Password

            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />

              <input
                type="password"
                placeholder="Enter password"
                style={{ paddingLeft: '42px' }}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Minimum 8 characters'
                  }
                })}
              />
            </div>

            {errors.password && (
              <small className="error">
                {String(errors.password.message)}
              </small>
            )}
          </label>

          {/* CONFIRM PASSWORD */}

          <label>
            Confirm Password

            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />

              <input
                type="password"
                placeholder="Confirm password"
                style={{ paddingLeft: '42px' }}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === watch('password') ||
                    'Passwords do not match'
                })}
              />
            </div>

            {errors.confirmPassword && (
              <small className="error">
                {String(errors.confirmPassword.message)}
              </small>
            )}
          </label>

          <button
            className="btn primary"
            type="submit"
          >
            Create Account
            <ArrowRight size={18} />
          </button>

          <div
            style={{
              textAlign: 'center',
              marginTop: '20px'
            }}
          >
            Already have an account?{' '}
            <Link to="/login">
              Sign In
            </Link>
          </div>

        </form>
      </div>
    </motion.div>
  );
}