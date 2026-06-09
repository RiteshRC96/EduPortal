import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, Lock } from 'lucide-react';
import { register as registerApi } from '../../API/authApi';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  mobile: z.string().min(10, { message: 'Enter valid mobile number' }),
  password: z.string().min(8, { message: 'At least 8 characters' }),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ['confirm'],
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values: any) => {

    const payload = {
      email: values.email,
      mobile: values.mobile,
      password: values.password
    };

    console.log("Sending Register Request:", payload);

    try {
      const response = await registerApi(values.email, values.password, values.mobile);

      console.log("Response:", response.data.message);

      navigate('/verify-otp');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      className="page-container auth-page"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="card glass auth-card" style={{ maxWidth: '540px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px' }}>
          Join thousands of students applying to top colleges
        </p>

        <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <label>
              Email Address
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="email" placeholder="john@example.com" {...register('email')} style={{ paddingLeft: '44px' }} />
              </div>
              {errors.email && <small className="error">{String(errors.email.message)}</small>}
            </label>

            <label>
              Mobile Number
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="tel" placeholder="+1 234 567 8900" {...register('mobile')} style={{ paddingLeft: '44px' }} />
              </div>
              {errors.mobile && <small className="error">{String(errors.mobile.message)}</small>}
            </label>
          </div>

          <label>
            Password
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="password" placeholder="Create a strong password" {...register('password')} style={{ paddingLeft: '44px' }} />
            </div>
            {errors.password && <small className="error">{String(errors.password.message)}</small>}
          </label>

          <label>
            Confirm Password
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="password" placeholder="Confirm your password" {...register('confirm')} style={{ paddingLeft: '44px' }} />
            </div>
            {errors.confirm && <small className="error">{String(errors.confirm.message)}</small>}
          </label>

          <div className="form-actions" style={{ marginTop: '24px' }}>
            <button className="btn primary" type="submit">
              Create Account <ArrowRight size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0', color: 'var(--text-muted)' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
            </div>
            <button type="button" className="btn outline" onClick={() => alert('Google register placeholder')}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
              Sign up with Google
            </button>
          </div>

          <div className="muted-row" style={{ justifyContent: 'center' }}>
            <span>Already have an account? <Link to="/login">Sign in</Link></span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
