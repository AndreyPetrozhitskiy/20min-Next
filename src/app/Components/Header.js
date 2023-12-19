'use client'
import Link from "next/link";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me, logout } from '@/app/Redux/features/auth/authSlice';
import '@/app/Styles/header.scss';

export default function Header({ openModal }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.ID);
  const userInfo = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (userId) {
      dispatch(me(userId));
    }
  }, [dispatch, userId]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="Header">
      <div className="Header__logo">
        <Link href="/">
          <img src="Logo__header.png" alt="Logo" />
        </Link>
      </div>

      <div className="Header__nav">
        <div className="Header__nav-link">
          <Link href="/about">О нас</Link>
          <Link href="/newproject">Создать проект</Link>
          <Link href="/join">Присоединиться</Link>
          <Link href="/projects">Проекты</Link>
          {isLoading ? (
            <span>Loading...</span>
          ) : userInfo ? (
            <>
              <span>{userInfo.Name}</span>
              <button onClick={handleLogout}>Выйти</button>
              <Link href={`/profile/${userInfo.ID}`}>
                <img src="usericon.png" alt="User" />
              </Link>
            </>
          ) : (
            <input type="button" onClick={() => openModal("login")} value="Войти" />
          )}
        </div>
      </div>
    </header>
  );
}

