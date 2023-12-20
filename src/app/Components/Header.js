'use client'
import Link from "next/link";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '@/app/Redux/features/auth/authSlice';
import '@/app/Styles/header.scss';

export default function Header({ openModal }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.ID);
  const userInfo = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth?.isLoading);


  useEffect(() => {
    if (userId) {
      dispatch(me(userId));
    }
  }, [dispatch, userId]);

  
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
          ) : userId ? (
            <>
              <span>{userInfo}</span>
             
              <Link href={`/profile/${userId}`}>
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

