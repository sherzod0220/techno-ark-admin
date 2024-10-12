import { lazy } from 'react';

import SignIn from './sign-in'
import SignUp  from './sign-up'
// import MainLayout from './main-layout'
const MainLayout = lazy(() => import('./main-layout')) 
const Products = lazy(() => import('./products')) 
import SingleProduct from './single-product'
const Categories = lazy(() => import('./categories')) 
import SubCategory from './sub-category'
const Brands = lazy(() => import('./brands')) 
import BrandCategories from './brand-categories'
import Ads from './ads'
import Stock from './stock'
import Setting from './setting'
export { SignIn,SignUp,MainLayout,Products,Categories,Brands,BrandCategories,Ads,Setting,Stock,SubCategory,SingleProduct }