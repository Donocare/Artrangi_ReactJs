import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/Home";
// import Blog from "./pages/blog/Blog";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Order from "./pages/order/Order";

function App(){
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/order" element={
            <ProtectedRoutes>
                <Order/>
            </ProtectedRoutes>
          }/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin>
              <Dashboard/>
            </ProtectedRoutesForAdmin>
          }/>
          <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin>
              <AddProduct/>
            </ProtectedRoutesForAdmin>
          }/>
          <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct/>
            </ProtectedRoutesForAdmin>
          }/>
          <Route path="/productindo/:id" element={<ProductInfo/>}/>
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>

  )
}

export default App;

//user
export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

//admin
export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === 'bhilai.abhijeet@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}
