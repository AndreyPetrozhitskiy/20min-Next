'use client'
import React, { useState } from "react";
import '@/app/Styles/profile.scss';
import ModalPassword from "@/app/Components/ModalPassword";
import { useDispatch, useSelector } from 'react-redux';
import { me, logout } from '@/app/Redux/features/auth/authSlice';

export default function Profile() {
  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const openModalPassword = () => {
    setIsModalOpenPassword(true);
  };

  const closeModalPassword = () => {
    setIsModalOpenPassword(false);
  };

  const data = [
    { name: "NameProject", role: "Участник", status: "В разработке" },
    { name: "NameProject", role: "Участник", status: "В разработке" },
    { name: "NameProject", role: "Участник", status: "В разработке" },
    { name: "NameProject", role: "Участник", status: "В разработке" },
  ];

  return (
    <main>
      <ModalPassword isOpen={isModalOpenPassword} onClose={closeModalPassword} />
      <div className="Profile">
        <h1>Портфолио</h1>
        <input type="button" onClick={handleLogout} value={"Выйти"} />
        <div className="Profile__search">
          <div className="Profile__search__input">
            <input type="text" placeholder="Поиск" />
            <img src="/Lupa.png" alt="Search" />
          </div>
        </div>

        <div className="Profile__container">
          <div className="Profile__container__user">
            <div className="Profile__container__user__avatar">
              <img src="/pencil.png" alt="Avatar" />
            </div>
            <div className="Profile__container__user__login">
              <p>Логин</p>
              <input type="button" onClick={openModalPassword} value="Изменить пароль" />
            </div>
          </div>

          <div className="Profile__container__project">
            {data.map((item, index) => (
              <div className="Profile__container__project__item" key={index}>
                <div className="Profile__container__project__item__number">
                  <p>{index + 1}</p>
                </div>
                <div className="Profile__container__project__item__name">
                  <div className="Profile__container__project__item__name__h1">
                    <h1>{item.name}</h1>
                  </div>
                  <div className="Profile__container__project__item__name__role">
                    <p>{item.role}</p>
                    <p>{item.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
