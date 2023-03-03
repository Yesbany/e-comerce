import React from 'react'
import { formatDateDDMMYYYY } from '../../utils/date'
import "./styles/PurchaseCard.css"

const PurchaseCard = ({purchase}) => {

  return (
    <article className='purchase'>
      <div className='purchase__img'>
        <div><img src={purchase.product.images[0].url} alt="" /></div>
      </div>
      <h4 className='purchase__title'>{purchase.product.title}</h4>
      <div className='purchase__container'>
        <h4 className='purchase__fecha'>{formatDateDDMMYYYY(purchase.createdAt)}</h4>
        <div className='purchase__quantity'>
          <h4>{purchase.quantity}</h4>
        </div>
        <h4 className='purchase__price'>$ {purchase.product.price}</h4>
      </div>
    </article>
  )
}

export default PurchaseCard