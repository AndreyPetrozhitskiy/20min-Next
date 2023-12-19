'use client'
import '@/app/Styles/JoinProject.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const JoinProject = () => {
  const [cardsState, setCardsState] = useState([]);
  const [cards, setCards] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [searchInput, setSearchInput] = useState('');
 
  useEffect(() => {
    // Выполняем GET-запрос при монтировании компонента
    axios.get('http://74.119.192.138:5000/api/projects/')
      .then(response => {
        // Обновляем состояние cards данными из ответа сервера
        setCards(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только один раз при монтировании
  useEffect(() => {
    // Выполняем GET-запрос при монтировании компонента
    axios.get('http://74.119.192.138:5000/api/role/all-roles')
      .then(response => {
        // Обновляем состояние participants данными из ответа сервера
        setParticipants(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных об участниках:', error);
      });
  }, []);
  const handleCardToggle = (index) => {
    setCardsState((prevState) => {
      const newCardsState = [...prevState];
      newCardsState[index] = !newCardsState[index];
      return newCardsState;
    });
  };

 

  
return (
  <div className="Join__Project">
    <h1>ПРИСОЕДИНИТЬСЯ К ПРОЕКТУ</h1>
    <div className="Join__Project__search-block">
    <input
          type="text"
          placeholder="Найти проект"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      <img src="Lupa.png" />
    </div>
    {/* Тут функция MAP  */}
    {cards.filter((card) =>
          card.NameProject.toLowerCase().includes(searchInput.toLowerCase())
        )
    .map((card, index) => (
      <div
        key={index}
        className={`Join__Project__item${cardsState[index] ? '__extended' : ''}`}
      >
        <div className={`Join__Project__item${cardsState[index] ? '__extended' : ''}__number    `}>
          <p>{index + 1}</p>
        </div>
        <div className={`Join__Project__item${cardsState[index] ? '__extended' : ''}__h1`}>
          <h1>{card.NameProject}</h1>
          {/* Скрытое описание */}
          <div className={`Join__Project__item${cardsState[index] ? '__extended' : ''}__h1__description`} 
          onClick={() => handleCardToggle(index)}>
            <p>Описание</p>
            <img src="bottom__cross.png" />
          </div>
          {/* Раскрытое описание */}
          <div className={`Join__Project__item${cardsState[index] ? '__extended' : ''}__full-description`}>
          <p>{card.DescriptionProject}</p> 
          </div>
        </div>
        <div className={`Join__Project__item${cardsState[index] ? '__extended' : ''}__button`}>
          <div className={`
          Join__Project__item${cardsState[index] ? '__extended' : ''}__button__participants`}>
              <h1>Участники</h1>
              <div className={`
                Join__Project__item${cardsState[index] ? '__extended' : ''}__button__participants__users`}>
              {participants
                .filter(participant => participant.ProjectName === card.NameProject)
                .map((user, userIndex) => (
                  <p key={userIndex}>{`${userIndex + 1}. ${user.UserName} - ${user.Role}`}</p>
                ))}
                </div>
          </div>
          <input
            type="button"
            value="Участвовать"
          />
        </div>
      </div>
    ))}
  </div>
)
};

export default JoinProject;
