import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/Cart/CartProduct'
import { getAllCartProducts, purchaseCart } from '../store/slices/cart.slice'
import "./styles/Cart.css"

const Cart = () => {

  const {products} = useSelector((store) => store.cart)
  console.log(products)

  const dispatch = useDispatch()

  const totalPriceCart = products.reduce((total, product) => total + product.quantity * product.product.price, 0)

  const handlePurchaseCart = () => {
    dispatch(purchaseCart())
  }

  useEffect(() => {
    dispatch(getAllCartProducts())
  }, [])

  return (
    <main className='cart'>
      <section className='cart__product'>
        {
          products.map((product) => <CartProduct
          key={product.id} product={product} />)
        }        
      </section>
      <hr />
      <section className='cart__footer'>
        <div className='cart__footer_container'>
          <h3 className='cart__footer_title'>Total:</h3>
          <h3 className='cart__footer_price'>$ {totalPriceCart}</h3>
        </div>
        <button className='cart__footer-button' onClick={handlePurchaseCart}>Checkout</button>
      </section>
    </main>
  )
}

export default Cart