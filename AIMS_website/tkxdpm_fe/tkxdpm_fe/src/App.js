
import { Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react'
import './App.css';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Login from './components/Pages/Login';
import Menu from './components/Pages/Menu';
import Cart from './components/Pages/Cart';
import Product from './components/Pages/Product/product';
import Signup from './components/Pages/Sign up/signUp';
import AdminPage from './components/Pages/Admin/admin';
import Home from './components/Pages/Home/home';
import Info from './components/Pages/Info/info';
import ProtectRoutes from './ProtectRoutes';
import ProtectRoutesUser from './ProtectRoutesUser';
import getCart from './api/cartApi';
import getDish, { getCate } from './api/dishApi';
import ErrorPage from './components/Pages/404 Page/errorPage';
import Forgetpass from './components/Pages/Forget Pass/forgetPass';
import Sendsuccess from './components/Pages/Forget Pass/sendSuccess';
import EnterNewPass from './components/Pages/EnterNewPass/enterNewPass';
import ListOrdersUser from './components/Pages/ListOrders';
import Invoice from './components/Pages/Invoice/invoice';
import Search from './components/Pages/Search';
import ReturnPage from './components/Pages/Return/returnPage';
import ReturnPageCash from './components/Pages/Return/returnPageCash';

export const AddContext = createContext();
function App() {

  const [cateList, setCateList] = useState ([]);
  const [cartItems, setCartItems] = useState([]);
  const [mediaListReal, setMediaListReal] = useState([]);

  // update cart by user
  useEffect(() => {
    // call api
    (async () => {
      const mediaList = await getDish();
      const cate = await getCate();
      setMediaListReal (mediaList.filter (media => !media.isDeleted))
      setCateList (cate);
      const res = await getCart()
      setCartItems (res.products)
    })()
  }, [])

  function onAdd(product) {
    const exist = cartItems.find(x => x.id === product.id);

    if (exist) {
      setCartItems(cartItems.map(x => x.id === product.id ? { ...exist } : x));
      
    }
    else {
      setCartItems([...cartItems, { ...product, quantity: 1, totalPrice: product.price }]);
    }
  }

  function onRemove(product) {
    // for (let i = 0; i < cartItems.length; i++) {
    //   if (cartItems[i].id === product.id) {
    //     setCartItems(cartItems.splice(i, 1));
    //     console.log(cartItems);
    //   }
    // }
    setCartItems (cartItems.filter ((cartItem) => {
      return cartItem.id !== product.id
    }) )
  }

  return (
    <>

      <AddContext.Provider value={{cartItems, setCartItems}}>
        <Routes>
          <Route path="/Menu" element={<Menu mediaList={mediaListReal} cateList={cateList} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPass" element={<Forgetpass />} />
          <Route path="/sendSuccess" element={<Sendsuccess />} />
          <Route path="/Product/:_id" element={<Product cartItems={cartItems} onAdd={onAdd} mediaList={mediaListReal} />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/EnterNewPassword" element={<EnterNewPass />} />
          <Route path='/ListOrdersUser' element={<ListOrdersUser />} />
          <Route path='/Search' element={<Search categories={cateList}/>} />

          <Route element={<ProtectRoutesUser />}>
            <Route path="/Cart" element={<Cart onRemove={onRemove} />} />
            <Route path="/info" element={<Info />} />
          </Route>
          <Route path="/ReturnPage" element={<ReturnPage/>}></Route>
          <Route path="/ReturnPageCash" element={<ReturnPageCash/>}></Route>
          <Route path="/invoice" element={<Invoice />} />

          <Route path="/" element={<Home mediaList={mediaListReal} cateList={cateList}/>} />
          <Route path="*" element={<ErrorPage />} />

          {/*Admin route */}

          <Route element={<ProtectRoutes />}>
            <Route path="/admin/*" element={<AdminPage />} />
          </Route>

        </Routes>
      </AddContext.Provider>


    </>
  )
}

export default App;
