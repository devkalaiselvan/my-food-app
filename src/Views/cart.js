import React from 'react'
import trash from './delete.png'
import { useCart,useDispatchCart } from './ContextReducer'

function cart() {
  let data =useCart();
  let dispatch=useDispatchCart();
  if(data===0){
    return(
      <div>
        <div className='m-5 w-100 text-center fs-3'>The cart is Empty</div>
      </div>
    )
  }
  let totalPrice=data.reduce((total,food)=>total+food.price,0)
  return (
    <div>
      <div className='container m-auto mt-5 table-responsion table-responsion-sm  table-responsion-md'>
        <table className='table table-hover'>
            <thead className='text-success fs-4'>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Quanity</th>
                    <th scope='col'>option</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'></th>
                </tr>
            </thead>
            <tbody>
              {data.map((food,index)=>(
                <tr>
                  <th scope='row'>{index+1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td><button type='button' className='btn p-0>'><img src={trash} alt='delete' onClick={()=>{dispatch({type:"REMOVE",index:index})}}><FontAwesomeIcon icon="fa-regular fa-trash" /></img></button></td>
                </tr>
              ))}
            </tbody>
        </table>
        <div><h1 className='fs-2'>Total price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5'>Check out</button>
        </div>
      </div>
    </div>
  )
}

export default cart
