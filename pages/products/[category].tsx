import { useEffect, useMemo, useState } from 'react';
import Item from '../../components/item'
import { TbSearch } from 'react-icons/tb';
import Pagination from '@/components/pagination';
import { usePagination } from '@/components/Context/paginationContext';
import Head from 'next/head';
let PageSize = 12;
export default function Home({ products, category, itemsCount }: any) {
  const [productList, setProductList] = useState(products);
  const [productListSize, setProductListSize] = useState(itemsCount);
  const { currentPage, setCurrentPage } = usePagination();
  const pageSize = 8; 

  useEffect(() => {
    fetchProducts();
    console.log(category)
  }, [currentPage, category]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://api.amanditapratas.com.br/api/v1/products/by-category?category=${category}&page=${currentPage}&size=${pageSize}`);
      let products = await res.json();
      setProductList(products.content);
      setProductListSize(products.totalElements);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
      <>
        <Head>
          <title>Amandita | {category[0].toUpperCase() + category.substring(1)}</title>
        </Head>
        { productList && productListSize > 0 ? 
        <div>
          <div className="mt-40 md:max-w-screen-lg mx-auto flex items-center justify-center px-1 md:px-0 py-5 my-2">
            <div className='center grid lg:grid-cols-4 grid-cols-2 w-full gap-1 gap-y-6'>
              {productList.map((item: any) => {
                return (
                  <Item 
                    key={item.id}
                    id={item.id}
                    name={item.name} 
                    price={item.price} 
                    quantity={item.quantity}
                    srcImg={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${item.id}/${item.profileImageId}.jpg`}/>)
              })}
            </div>
          </div>
          <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={productListSize}
                pageSize={pageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
        </div>
        : 
          <div className="mt-40 md:max-w-screen-lg mx-auto flex flex-col items-center justify-center 
              px-1 md:px-0 py-5 my-2">
                <h1>NENHUM PRODUTO CADASTRADO NESSA CATEGORIA</h1>
          </div>
        }
      </>
    )
}

export async function getStaticPaths() {
  const paths = [
    {params: { category: 'promocional' }},
    {params: { category: 'aneis' }},
    {params: { category: 'brincos' }},
    {params: { category: 'colares' }},
    {params: { category: 'correntes' }},
    {params: { category: 'pulseiras' }},
    {params: { category: 'tornozeleiras' }},
    {params: { category: 'pingentes' }},
    {params: { category: 'conjuntos' }},
  ]
  return { paths, fallback: false }
}

 export const getStaticProps = async ({ params }: any) => {
   //const res = await fetch("http://62.72.11.102:8088/api/v1/products");
   const res = await fetch(`https://api.amanditapratas.com.br/api/v1/products/by-category?category=${params.category}&page=${0}&size=${8}`);
   let products = await res.json();
   return {
     props: {
        products: products.content,
        category: params.category,
        itemsCount: products.totalElements
     }
   }
}