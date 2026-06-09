import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OTPVerification(){
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();

  useEffect(()=>{
    if(seconds<=0) return;
    const t = setTimeout(()=>setSeconds(s=>s-1),1000);
    return ()=>clearTimeout(t);
  },[seconds]);

  const handleChange = (index: number, value: string) =>{
    if(!/^[0-9]?$/.test(value)) return;
    const copy = [...otp];
    copy[index]=value;
    setOtp(copy);
    if(value && index<5){
      const next = document.getElementById(`otp-${index+1}`);
      next && next.focus();
    }
  };

  const verify = ()=>{
    console.log('verify', otp.join(''));
    navigate('/');
  };

  return (
    <motion.div className="page-container auth-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="card glass auth-card">
        <h2>Verify OTP</h2>
        <p className="muted">Enter the 6-digit code sent to your phone/email</p>
        <div className="otp-row">
          {otp.map((v,i)=> (
            <input key={i} id={`otp-${i}`} className="otp-input" maxLength={1} value={v} onChange={e=>handleChange(i,e.target.value)} />
          ))}
        </div>
        <div className="muted-row">
          <button className="btn primary" onClick={verify}>Verify OTP</button>
          <button className="btn outline" onClick={()=>{ setSeconds(60); alert('Resend placeholder'); }}>Resend OTP</button>
        </div>
        <div className="muted">Expires in: {seconds}s</div>
      </div>
    </motion.div>
  );
}
