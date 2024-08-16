import React from 'react'

const MODEL_STYLES={
    position:'fixed',
    top:'50%',
    left:'50%',
    backgroundColor:'rgb(30,34,34)',
    transform:'translate(-50% ,-50%)',
    zIndex:1000,
    height:'90%',
    width:'90%'
}

const OVERLAY_STYLES={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgbA(0,0,0,.7)',
    zIndex:1000
    
}


function Model({children,onClose}) {
    
  return (ReactDom.createPortal(
    <>
        <div style={OVERLAY_STYLES}/>
        <div><button className='btn bg-danger fs-4' style={{marginLeft:"90",marginTop:"-35"}} onClick={onClose}>X</button></div>
    </>,
    document.getElementById('cart-root')
  )
  )
}

export default Model                 
