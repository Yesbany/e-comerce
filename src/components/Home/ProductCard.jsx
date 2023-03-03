import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProductCart } from '../../store/slices/cart.slice'
import "./styles/ProductCard.css"

const ProductCard = ({product}) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const handleCkickProduct = () => {
        navigate(`/products/${product.id}`)
    }

    const handleClickAddProduct = (e) => {
        e.stopPropagation()
        const data = {
            quantity: 1,
            productId: product.id
        }
        dispatch(addProductCart(data))
    }

  return (
    <article className='productCard' onClick={handleCkickProduct}>
        <header className='productCard__header'>
            <div className='productCard__img'>
                <img src={product.images[0].url} alt="" />
                <img src={product.images[1].url} alt="" />
            </div>
        </header>
        <section className='productCard__info'>
            <h4 className='productCard__brand'>{product.brand}</h4>
            <h3 className='productCard__title'>{product.title}</h3>
            <h4 className='productCard__priceTitle'>Price</h4>
            <h5 className='productCard__price'>$ {product.price}</h5>
            <button className='productCard__btn' onClick={handleClickAddProduct}><i className='bx bx-cart'></i></button>
        </section>
    </article>
  )
}

export default ProductCard