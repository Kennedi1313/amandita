import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import Image from 'next/image'
import { BsCartDash, BsCartPlus, BsHeart, BsHeartFill, BsStar, BsStarFill, BsWhatsapp } from 'react-icons/bs';
import Head from 'next/head';
import { formatCurrency } from '@/lib/utils';
import Menu from '@/components/menu';
interface ItemProps {
    id: string,
    name: string,
    description: string,
    price: number,
    srcImg: string,
    profileImageId: string
}

export default function Details(props: ItemProps) {
    const router = useRouter();
    const { favoritesCount, addItemToFavorites } = useShoppingFavorites();
    const actualFavoritesCount = useRef(favoritesCount);
    const [qty, setQty] = useState(1);

    const [adding, setAdding] = useState(false);
    const toastId = useRef<string>();

    const handleOnAddToFavorites = () => {
            setAdding(true);
            addItemToFavorites(props);
    };

    useEffect(() => {
        if (favoritesCount == actualFavoritesCount.current) {
            return;
        } else {
            actualFavoritesCount.current = favoritesCount;
        }
        setAdding(false);
        toast.success(`${props.name} adicionado (a) aos favoritos!`, {
            id: toastId.current,
        })
        setQty(1);
    }, [favoritesCount]);

    return router.isFallback ?  (
        <>
            <Head>
                <title>Loading...</title>
            </Head>
            <p className="text-center text-lg py-12">Loading...</p>
        </>
        ) : (
        <>
            <Menu></Menu>
            <div className='md:container md:max-w-screen-lg mx-auto p-2 my-32 md:px-8 h-full'>
                <div className='flex flex-col md:flex-row justify-between items-center space-y-8 container pt-2 
                    md:pt-12 md:space-y-0 md:space-x-12 h-full'>
                    <div className='relative w-full md:w-[30rem] h-full bg-white'>
                        <img 
                            src={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${props.id}/${props.profileImageId}.jpg`}
                            alt='item'
                            className='object-scale-down rounded-md'
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 100vw,
                                33vw"/>
                    </div>
                    <div className='flex-1 flex-col max-w-md w-full rounded-md gap-2'>
                        <p className='text-2xl font-semibold'>{props.name}</p> 
                        <div className="mt-4 border-t pt-4">
                            <p className="text-gray-500">Preço:</p>
                            <p className="text-xl font-semibold">{formatCurrency(props.price)}</p>
                        </div>
                        <div className='mt-4 border-t pt-4'>
                            <p className="text-gray-500">Descrição:</p>
                            <p>{props.description}</p>
                        
                        </div>
                        <div className='flex flex-col w-full cursor-pointer'>
                            <a href={"https://api.whatsapp.com/send?phone=84981916989&text=Olá,%20tudo%20bem?%20Gostaria%20de%20comprar%20este%20produto:%20https://amandita.vercel.app/details/" + props.id}
                                target='blank'
                                className='rounded-md border-[1px] border-green-whatsapp flex flex-row text-green-whatsapp 
                                    bg-green-100 gap-2 justify-center items-center p-2 h-12 mt-4 w-full'>
                                    <BsWhatsapp className='w-5 h-5'></BsWhatsapp>
                                    <span className='font-bold text-[12px]'>COMPRAR AGORA</span>
                            </a>
                            <div className='rounded-md border-[1px] border-rose-400 flex flex-row text-rose-400 
                                    bg-rose-100 gap-2 justify-center items-center p-2 h-12 mt-2 w-full'
                                onClick={handleOnAddToFavorites}>
                                <BsHeartFill className='w-5 h-5'></BsHeartFill>
                                <span className='font-bold text-[12px]'>ADICIONAR AOS FAVORITOS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch("http://62.72.11.102:8088/api/v1/products");
    let products = await res.json();
    const paths = products.map((product: ItemProps) => ({
        params: { id: product.id.toString() },
    }))
    return { paths, fallback: true }
}
  
export async function getStaticProps({ params }: any) {
    try {
        const res = await fetch("http://62.72.11.102:8088/api/v1/products");
        let products = await res.json();
        const props = products?.find((product: ItemProps) => product.id.toString() === params.id) ?? {};
        return {
            props,
        };
    } catch (error) {
        console.log(error)
        return { notFound: true };
    }
}

