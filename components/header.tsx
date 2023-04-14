import Image from 'next/image'

// images

import logoKR from '../public/KR-logo-3.png';
import Link from 'next/link';


export default function Header() {
    return (
        <header className='fixed top-0 w-full z-50 flex justify-between items-center px-8 py-2 bg-gray-50'>
        <Link href={'/'} className='flex gap-2'>
          <Image 
            src={logoKR} 
            alt='logo-alt'
            width={25}
            className='bg-transparent h-auto'
            priority/>
        </Link>
        <div className='absolute divide-x divide-solid divide-stone-300 right-4 md:mx-4'>
          
          <button className='text-gray-500 text-xs pr-4'>
            Contato
          </button>
          <button className='text-gray-500 text-xs pl-4'>
            Quem Somos
          </button>
        </div>
      </header>
    )
}