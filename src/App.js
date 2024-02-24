import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Address from './Components/Address/Address';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Orders from './Components/Orders/Orders';
import Product from './Components/Product/Product';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import AuthContextProvider from './contexts/AuthContext';
import AuthProtectedRoute from './Components/protectedRoute/AuthProtectedRoute';
import { ToastContainer } from 'react-toastify';
import CartContextProvider from './contexts/CartContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import SpecificCategory from './Components/Categories/SpecificCategory';
import SpecificBrand from './Components/Brands/SpecificBrand';
import Login from './Components/Authentication/Login/Login.jsx';
import Register from './Components/Authentication/Register/Register.jsx';
import ProtectedRoute from './Components/protectedRoute/ProtectedRoute';
import ForgetPassword from './Components/Authentication/ForgetPassword/ForgetPassword.jsx';
import VerifyResetCode from './Components/Authentication/ForgetPassword/VerifyResetCode.jsx';
import ChangeMyPassword from './Components/Authentication/ChangeMyPassword/ChangeMyPassword.jsx';
import WishList from './Components/WishList/WishList.jsx';
import WishListProvider from './contexts/WishContext.jsx';
import WishListItem from './Components/WishList/WishListItem.jsx';






function App() {
const router= createHashRouter([
  {path:'', element: <Layout/>, children:[
    {path:"", element: <Navigate to={"home"}/>},
    

    {path:"login", element: <AuthProtectedRoute> <Login/> </AuthProtectedRoute> },
    {path:"register", element:<AuthProtectedRoute><Register/> </AuthProtectedRoute> },

    {path:"home", element:<ProtectedRoute> <Home/></ProtectedRoute>},
    {path:"adress/:cartId", element:<ProtectedRoute> <Address/></ProtectedRoute> },
    {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"cart", element:<ProtectedRoute>  <Cart/></ProtectedRoute>},
    {path:"wishist", element:<ProtectedRoute>  <WishList/></ProtectedRoute>},
    {path:"wishistitem", element:<ProtectedRoute>  <WishListItem/></ProtectedRoute>},
    {path:"categories", element:<ProtectedRoute>  <Categories/></ProtectedRoute>},
    {path:"allorders", element:<ProtectedRoute> <Orders/></ProtectedRoute> },
    {path:"product", element:<ProtectedRoute><Product/></ProtectedRoute>  },
    {path:"productdetails", element:<ProtectedRoute> <ProductDetails/></ProtectedRoute> },
    {path:"products", element:<ProtectedRoute>  <Products/></ProtectedRoute>},
    {path:"productDetails/:id", element:<ProtectedRoute>  <ProductDetails/></ProtectedRoute>},
    {path:"specificcategory/:categoryId", element:<ProtectedRoute>  <SpecificCategory/></ProtectedRoute>},
    {path:"specificbrand/:brandId", element:<ProtectedRoute>  <SpecificBrand/></ProtectedRoute>},
    {path:"forgetpassword", element: <ForgetPassword/>},
    {path:"verifyresetcode", element:<VerifyResetCode/>},
    {path:"changemypassword", element:<ChangeMyPassword/>},

    
   
    {path:"*", element:<NotFound/>}
  ]
}])

const queryClient = new QueryClient()
  return <>

  <QueryClientProvider client={queryClient}>
<AuthContextProvider>
<CartContextProvider>
<WishListProvider>
<RouterProvider router={router}></RouterProvider>
</WishListProvider>
</CartContextProvider>
</AuthContextProvider>
</QueryClientProvider>

<ToastContainer/>
  </>
}

export default App;