import { lazy } from 'react';

import SignIn from './sign-in'
import SignUp  from './sign-up'
// import MainLayout from './main-layout'
const MainLayout = lazy(() => import('./main-layout')) 
const Products = lazy(() => import('./products')) 
const SingleProduct = lazy(() => import('./single-product')) 
const Categories = lazy(() => import('./categories')) 
const SubCategory = lazy(() => import('./sub-category')) 
const Brands = lazy(() => import('./brands')) 
const BrandCategories = lazy(() => import('./brand-categories')) 
const Ads = lazy(() => import('./ads')) 
const Stock = lazy(() => import('./stock')) 
const Setting = lazy(() => import('./setting')) 
export { SignIn,SignUp,MainLayout,Products,Categories,Brands,BrandCategories,Ads,Setting,Stock,SubCategory,SingleProduct }