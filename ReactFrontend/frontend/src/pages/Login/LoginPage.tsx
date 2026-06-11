import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { login } from '../../API/authApi';

const schema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(
        data.email,
        data.password
      );

      console.log('Login Success:', response.data);

      localStorage.setItem(
        'token',
        response.data.token
      );

      localStorage.setItem(
        'role',
        response.data.role
      );

      localStorage.setItem(
        'email',
        response.data.email
      );
      if (response.data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error: any) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        'Invalid Email or Password'
      );
    }
  };

  return (
    <motion.div
      className="page-container auth-page"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        type: 'spring',
      }}
    >
      <div className="card glass auth-card">
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Welcome Back
        </h2>

        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            marginBottom: '32px',
          }}
        >
          Enter your details to access your portal
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-grid"
        >
          <label>
            Email Address

            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />

              <input
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                style={{ paddingLeft: '44px' }}
              />
            </div>

            {errors.email && (
              <small className="error">
                {String(errors.email.message)}
              </small>
            )}
          </label>

          <label>
            Password

            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />

              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                style={{ paddingLeft: '44px' }}
              />
            </div>

            {errors.password && (
              <small className="error">
                {String(errors.password.message)}
              </small>
            )}
          </label>

          <div
            className="form-actions"
            style={{ marginTop: '24px' }}
          >
            <button
              className="btn primary"
              type="submit"
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="muted-row">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>

            <span>
              Don't have an account?{' '}
              <Link to="/register">
                Create it
              </Link>
            </span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}