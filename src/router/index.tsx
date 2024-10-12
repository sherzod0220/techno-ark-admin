import React from 'react'
import { Spinner } from '@components'
import { 
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Outlet
 } 
 from "react-router-dom";
import App from "../App";
const SuspenseLayout = () => (
    <React.Suspense fallback={<h1 className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}>
      <Outlet />
    </React.Suspense>
  );  
import { SignIn,SignUp,MainLayout,Products,Categories,Brands,BrandCategories,Ads,Stock,Setting,SubCategory,SingleProduct } from "@pages";
const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<SuspenseLayout/>}>
            <Route path="/" element={<App/>}>
                <Route index element={<SignIn/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="main/*" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><MainLayout/></React.Suspense>}>
                    <Route index element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><Products/></React.Suspense>}/>
                    <Route path="products/:id" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><SingleProduct/></React.Suspense>}/>
                    <Route path="categories" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><Categories/></React.Suspense>}/>
                    <Route path="categories/:id" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><SubCategory/></React.Suspense>}/>
                    <Route path="brands" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><Brands/></React.Suspense>}/>
                    <Route path="brand-categories" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><BrandCategories/></React.Suspense>}/>
                    <Route path="ads" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><Ads/></React.Suspense>}/>
                    <Route path="stock" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><Stock/></React.Suspense>}/>
                    <Route path="setting" element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center position-relative'><Spinner/></h1>}><Setting/></React.Suspense>}/>
                </Route>
            </Route>
            </Route>
        )
    )
  return <RouterProvider router={router}/>
}

export default Index
