import MenuItem from "./menuItem";
import MenuItemNode from "./menuItemNode";
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { BsCart, BsPerson } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import Head from 'next/head'

export default function Menu() {
  const [hasMounted, setHasMounted] = useState(false);
  function toggleMenu() {
      var menu = document.getElementById('menu');
      menu?.classList.toggle('hidden');
      menu?.classList.toggle('w-full');
      menu?.classList.toggle('h-screen');
      menu?.classList.toggle('z-50');
      var toggle = document.getElementById('toggle-button');
      toggle?.classList.toggle('color-white');
      toggle?.classList.toggle('z-100');
  }

  const { totalPrice, cartCount } = useShoppingCart();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
    return (
      <div id="menu-container" className="fixed top-0 w-full h-14 md:p-2 z-50 bg-white shadow-sm shadow-slate-200">
        <Head>
          <title>13geekstore</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''}/>
          <link href="https://fonts.googleapis.com/css2?family=Unlock&display=swap" rel="stylesheet"></link>
        </Head>
      <button id="toggle-button"
        className="fixed right-5 pl-6 w-12 h-14 block md:hidden"
        onClick={toggleMenu}>
        <FaBars className="w-6 h-8"></FaBars>
      </button>
      
      <menu id="menu" className="
        fixed hidden top-0 right-0 px-10 py-16 bg-black-1000 z-40 shadow-sm
        md:top-0 md:h-fit md:bg-white md:py-0 md:block md:w-full">
        <div className='w-full md:flex mx-auto justify-center'>
          <li className="md:hidden z-90 fixed top-4 right-6">
              <button className="text-right text-white text-4xl"
                  onClick={toggleMenu}>&times;</button>
          </li>
          
          <MenuItemNode onClick={toggleMenu} name="Filmes" src="/products/filmes">
          </MenuItemNode>

          <MenuItemNode onClick={toggleMenu} name="Séries" src="/products/series">
          </MenuItemNode>
          
          <MenuItemNode onClick={toggleMenu} name="Jogos" src="/products/jogos">
          </MenuItemNode>
        
          <MenuItemNode onClick={toggleMenu} name="Geek" src="/products/geek">
          </MenuItemNode>
        </div>
      </menu>
      <Link 
            href={'/'}
            className="text-4xl text-black-1000 font-extrabold font-unlock flex items-center absolute left-8 top-2 md:top-3 md:z-50 z-40">
              13 <span className="text-lg self-end font-mono">{" "}GeekStore</span>
          </Link>
        <Link href="/cart" id="cart" className="absolute right-20 md:h-14 h-14 flex center z-40 md:z-50">
          <span className="absolute h-[25px] w-[25px] top-[5px] right-[-10px] 
            bg-black text-white font-semibold text-sm rounded-full z-40 justify-center flex items-center">
              {cartCount}
          </span>
          <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
            <div className="relative">
              <BsCart className="w-7 h-7 flex-shrink-0" />
            </div>
          </div>
        </Link>
      </div>
    )
}