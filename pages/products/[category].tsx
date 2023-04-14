import Head from 'next/head'
import Item from '../components/item'
import SearchMenu from '../components/searchMenu'
import products from '../../public/items-sample.json'
import { useRouter } from "next/router";

export default function Home() {
  const { query: queryParams } = useRouter();
  const category = queryParams.category != undefined ? queryParams.category : "default";
  let productsArray = products
  if (category !== "index") 
    productsArray = productsArray.filter(product => product.categories.includes(category.toString()))
  return (
    <>
      <Head>
        <title>Ship</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
          <SearchMenu itemsCount={productsArray.length} />
          <div className='flex items-center justify-center px-8 py-5 my-8'>
            {/*<SideMenu/>*/}
            <div className='container center grid lg:grid-cols-3 md:grid-cols-2 w-full gap-8 sm:grid-cols-1 '>
              {productsArray.map(item => {
                return (
                  <Item 
                    key={item.id}
                    id={item.id}
                    name={item.name} 
                    gender={item.gender}
                    price={item.price} 
                    srcImg={item.srcImg}/>)
              })}
            </div>
          </div>
        </div>
    </>
  )
}