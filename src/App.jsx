import './App.css'
import NavBar from './Components/NavBar'
import CartContainer from './Components/CartContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { calculateTotals, getCartItems } from './features/Cart/cartSlice';

function App() {
  const { cartItems } = useSelector(store => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems());
  }, [])

  return (
    <main>
      <NavBar />
      <CartContainer />
    </main>
  )
}

export default App
