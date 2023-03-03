import React from 'react'
import { useSelector } from 'react-redux'
import "./styles/Notification.css"

const Notification = () => {

  const {error} = useSelector(store => store.cart)
  return (
    <article className='notification'>
      <h3>Product already added to cart</h3>
    </article>
  )
}

export default Notification