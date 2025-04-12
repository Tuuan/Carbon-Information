import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const AuthForm = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', confirm: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            if (isSignup) {
                if (form.password !== form.confirm) return alert("Mật khẩu không khớp!");
                await createUserWithEmailAndPassword(auth, form.email, form.password);
                alert("Đăng ký thành công! Đăng nhập nhé.");
                setIsSignup(false);
            } else {
                await signInWithEmailAndPassword(auth, form.email, form.password);
                navigate('/map');
            }
        } catch (err) {
            alert("Lỗi: " + err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isSignup ? 'Đăng ký' : 'Đăng nhập'}</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} />
            {isSignup && (
                <input type="password" name="confirm" placeholder="Xác nhận mật khẩu" onChange={handleChange} />
            )}
            <button onClick={handleSubmit}>{isSignup ? 'Đăng ký' : 'Đăng nhập'}</button>
            <p style={{ cursor: 'pointer' }} onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
            </p>
        </div>
    );
};

export default AuthForm;
