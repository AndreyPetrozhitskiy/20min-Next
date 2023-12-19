'use client'
import Link from "next/link";
import '@/app/Styles/Footer.scss';

export default function Footer() {
    return (
      <footer className="Footer">
        <img className="Footer__logo" src='/Logo__footer.png' />
        <div className="Footer__link">
          <Link href="/about" className="Footer__link-a">
            О нас
          </Link> 
          <Link  href="/newproject" className="Footer__link-a">
            Создать проект
          </Link> 
          <Link  href="/join" className="Footer__link-a">
            Присоединиться
          </Link> 
          <Link  href="/faq" className="Footer__link-a">
            FAQ
          </Link>  
        </div>
        <div className="Footer__contacts">
          <h1>Контакты</h1>
          <div className="Footer__contacts-img">
          <Link  href="/"> <img src="Instagram.png" /> </Link>  
          <Link  href="/">  <img src="/Telegram.png" /></Link>  
          </div>
        </div>
      </footer>
    )
  }