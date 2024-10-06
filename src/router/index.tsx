import { 
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
 } 
 from "react-router-dom";
import App from "../App";  
import { SignIn,SignUp,MainLayout,Products,Categories,Brands,BrandCategories,Ads,Stock,Setting,SubCategory } from "@pages";
const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<SignIn/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="main/*" element={<MainLayout/>}>
                    <Route index element={<Products/>}/>
                    <Route path="categories" element={<Categories/>}/>
                    <Route path="categories/:id" element={<SubCategory/>}/>
                    <Route path="brands" element={<Brands/>}/>
                    <Route path="brand-categories" element={<BrandCategories/>}/>
                    <Route path="ads" element={<Ads/>}/>
                    <Route path="stock" element={<Stock/>}/>
                    <Route path="setting" element={<Setting/>}/>
                </Route>
            </Route>
        )
    )
  return <RouterProvider router={router}/>
}

export default Index
