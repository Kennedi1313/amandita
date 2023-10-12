import MenuItem from "./menuItem";
import Image from 'next/image'
import MenuItemNode from "./menuItemNode";
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import logo from '../public/logo2.png'
import { useEffect, useState } from "react";
import { BsCart, BsPerson } from 'react-icons/bs'
import { FaBars, FaTimes, FaXRay, FaXing } from 'react-icons/fa'
import Head from 'next/head'
import { TbHeartFilled } from "react-icons/tb";

export default function Menu() {
  const [hasMounted, setHasMounted] = useState(false);
  function toggleMenu() {
      var menu = document.getElementById('menu');
      menu?.classList.toggle('hidden');
      menu?.classList.toggle('w-full');
      menu?.classList.toggle('h-screen');
      var toggle = document.getElementById('toggle-button');
      toggle?.classList.toggle('color-white');
      var bar = document.getElementById('bar-icon');
      bar?.classList.toggle('hidden');
      var times = document.getElementById('times-icon');
      times?.classList.toggle('hidden');
  }

  const { totalPrice, favoritesCount } = useShoppingFavorites();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
    return (
      <div id="menu-container" className="fixed top-0 w-full h-20 
        z-50 bg-rose-1000">
        <Head>
          <title>Amandita</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''}/>
          <link href="https://fonts.googleapis.com/css2?family=Unlock&display=swap" rel="stylesheet"></link>
        </Head>
        <button id="toggle-button"
          className="fixed left-4 pl-6 w-12 h-14 block md:hidden z-[100] top-6"
          onClick={toggleMenu}>
          <FaBars id='bar-icon' className="w-6 h-8"></FaBars>
          <FaTimes id='times-icon' className="w-6 h-8 hidden"></FaTimes>
        </button>
      
        <menu id="menu" className="
          fixed hidden top-0 right-0 shadow-sm
          md:top-0 md:h-fit bg-rose-1000 md:py-0 md:block md:w-full">

          <div className="top-24 fixed w-full p-2 h-14 justify-center
                z-50 bg-rose-1000 md:border-solid md:border-brown-1000 md:border-t-[1px]
                md:shadow-sm md:shadow-gray-400 items-center">
            <ul className='flex flex-col md:flex-row items-center justify-center w-full'>
              <Link href={'/products/index'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>TUDO
              </Link>
              <Link href={'/products/aneis'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>ANÉIS
              </Link>
              <Link href={'/products/brincos'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>BRINCOS
              </Link>
              <Link href={'/products/colares'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>COLARES
              </Link>
              <Link href={'/products/conjuntos'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>CONJUNTOS
              </Link>
              <Link href={'/products/pulseiras'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>PULSEIRAS
              </Link>
              <Link href={'/products/bolsas'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>BOLSAS
              </Link>
              <Link href={'/products/sandalias'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>SANDÁLIAS
              </Link>
            </ul>
          </div>
        </menu>
        <div id="menu-container" className="fixed top-0 w-full h-24 flex flex-row justify-start md:justify-between
                   bg-rose-1000 border-solid border-brown-1000 border-t-[10px] items-center">
            <div className='w-1/4 md:w-1/3'>
            </div>
            <Link href={'/products/index'} className='w-52 h-20 relative mx-6 overflow-hidden'>
              <Image 
                  src={logo}
                  alt='item'
                  priority
                  fill
                  className='object-cover'
                  sizes="(max-width: 768px) 50vw,
                  (max-width: 1200px) 50vw,
                  33vw"/>
            </Link>
            <Link className='w-1/4 md:w-1/3 flex justify-start' href={'/favorites'}>
              <TbHeartFilled className='text-4xl font-bold text-rose-400'></TbHeartFilled>
            </Link>
          </div>
          
      </div>
    )
}