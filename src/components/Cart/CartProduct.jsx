import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductCart, updateProductCart } from '../../store/slices/cart.slice'
import "./styles/CartProduct.css"

const CartProduct = ({product}) => {

  const dispatch = useDispatch()

  const handleDeleteCartProduct = () => {
    dispatch(deleteProductCart(product.id))
  }

  const handleClickPlus = () => {
    const newQuantity = product.quantity + 1
    const data = {
      quantity: newQuantity
    }
    dispatch(updateProductCart(product.id, data))
  }

  const handleClickLess = () => {
    const newQuantity = product.quantity - 1
    if(newQuantity <= 0) {
      dispatch(deleteProductCart(product.id))
    } else {
      const data = {
        quantity: newQuantity
      }
      dispatch(updateProductCart(product.id, data))
    }
  }

  return (
    <article className='cartProduct'>
        <section className='cartProduct_container'>
          <div className='cartProduct__img'><img src={product.product.images[0].url} alt="" /></div>
          <section className='cartProduct__container-one'>
            <h3 className='cartProduct__container-one__title'>{product.product.title}</h3>
            <div className='cartProduct__container-one__quantity'>
                <div className='cartProduct__btnLess' onClick={handleClickLess}>-</div>
                <h3 className='cartProduct__quantity'>{product.quantity}</h3>
                <div className='cartProduct__btnPlus' onClick={handleClickPlus}>+</div>              
            </div>
          </section>
        </section>

        <section className='cartProduct__container-two'>
          <i onClick={handleDeleteCartProduct} className='bx bx-trash cartProduct__container-two__delete'></i>
          <h3 className='cartProduct__container-two__title'>Total:</h3>
          <h3 className='cartProduct__container-two__price'>$ {product.quantity * product.product.price}</h3>
        </section>
    </article>
  )
}

export default CartProduct