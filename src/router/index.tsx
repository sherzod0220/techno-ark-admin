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
                <Route path="main/*" element={<MainLayout/>}>
                    <Route index element={<React.Suspense fallback={<h1  className='w-screen h-screen flex justify-center items-center'><Spinner/></h1>}><Products/></React.Suspense>}/>
                    <Route path="products/:id" element={<SingleProduct/>}/>
                    <Route path="categories" element={<Categories/>}/>
                    <Route path="categories/:id" element={<SubCategory/>}/>
                    <Route path="brands" element={<Brands/>}/>
                    <Route path="brand-categories" element={<BrandCategories/>}/>
                    <Route path="ads" element={<Ads/>}/>
                    <Route path="stock" element={<Stock/>}/>
                    <Route path="setting" element={<Setting/>}/>
                </Route>
            </Route>
            </Route>
        )
    )
  return <RouterProvider router={router}/>
}

export default Index
