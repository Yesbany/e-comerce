import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/Home/ProductCard'
import { addProductCart } from '../store/slices/cart.slice'
import { axiosEcommerce } from '../utils/configAxios'
import "./styles/Product.css"

const arrayClasesSlider = ["first", "second", "third"]

const Product = () => {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [similarProducts, setSimilarProducts] = useState([])
  const [indexSlider, setIndexSlider] = useState(0)

  const {id} = useParams()

  const dispatch = useDispatch()
  
  const handlePlus = () => setQuantity(quantity + 1)

  const  handleLess = () => {
    const newQuantity = quantity - 1
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleClickAddProduct = () => {
    const data = {
        quantity,
        productId: product.id
    }
    dispatch(addProductCart(data))
}

const handleClickNext = () => {
  const newIndexSlider = indexSlider + 1
  const lastPosition = arrayClasesSlider.length - 1
  if (newIndexSlider > lastPosition) {
    setIndexSlider(0)
  } else {
    setIndexSlider(newIndexSlider)
  }
}

const handleClickPrevius = () => {
  const newIndexSlider = indexSlider - 1
  const lastPosition = arrayClasesSlider.length - 1
  if (newIndexSlider < 0) {
    setIndexSlider(lastPosition)
  } else {
    setIndexSlider(newIndexSlider)
  }
}

  useEffect(() => {
    axiosEcommerce
      .get(`products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
  }, [id])

  useEffect(() => {
    if (product) {
      axiosEcommerce.get(`/products?categoryId=${product?.categoryId}`)
        .then((res) => {
          const newSimilarProducts = res.data.filter(productByCategory => productByCategory.id !== product.id)
          setSimilarProducts(newSimilarProducts)
        })
        .catch((err) => console.log(err))
    }
    
  }, [product])

  useEffect(() => {
    setQuantity(1)
  }, [id])

  return (
    <main className='product'>
      <section className='product__detail'>
        {/* Parte superior */}
        <section className='product__slider'>
          <section className={`product__detail-imgContainer ${arrayClasesSlider[indexSlider]}`}>
            <div className='product__detail-img'>
              <img src={product?.images[0].url} alt="" />
            </div>
            <div className='product__detail-img'>
              <img src={product?.images[1].url} alt="" />
            </div>
            <div className='product__detail-img'>
              <img src={product?.images[2].url} alt="" />
            </div>
          </section>
          <div onClick={handleClickPrevius} className='product__btnLeft'>
            <i className='bx bx-chevron-left'></i>
          </div>
          <div onClick={handleClickNext} className='product__btnRight'>
            <i className='bx bx-chevron-right' ></i>
          </div>
        </section>

        {/* Parte Inferior */}
        <section className='product__detail-infoContainer'>
          <h4 className='product__detail-brand'>{product?.brand}</h4>
          <h3 className='product__detail-title'>{product?.title}</h3>

          <div className='product__detail-quantityContainer'>
            <div className='product__detail-priceContainer'>
              <h4 className='product__detail-priceTitle'>Price</h4>
              <h3 className='product__detail-price'>$ {product?.price}</h3>    
            </div>

            <div className='product__detail-quantity'>
              <h4 className='product__detail-quantityTitle'>Quantity</h4>
              <div className='product__detail-counter'>
                <div className='product__detail-counter_item' onClick={handleLess}>-</div>
                <h4 className='product__detail-counter_item'>{quantity}</h4>
                <div className='product__detail-counter_item' onClick={handlePlus}>+</div>
              </div>
            </div>
          </div>

          <button className='product__detail-btn' onClick={handleClickAddProduct}>
            Add to Cart <i className='bx bx-cart'></i>
          </button>

          <p className='product__detail-text'>{product?.description}</p>

        </section>
      </section>

      <h2 className='product__titlesimilar'>Discover similar items</h2>
      <section className='product__similarContainer'>
        {
          similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </section>
    </main>
  )
}

export default Product