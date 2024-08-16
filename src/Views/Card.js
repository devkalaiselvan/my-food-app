import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    // Ensure props.foodItem is defined and contains the necessary properties
    const foodItem = props.foodItems || {};
    
    const option = props.options || [];
    const imgSrc = foodItem.img || ''; // Provide a fallback image or empty string
    
    const name = foodItem.name || 'Unknown Item'; // Provide a fallback name

    const priceOption = option.length ? Object.keys(option[0]) : [];
    const finalPrice = qty * (size ? parseInt(option[0][size]) : 0);

    // Set initial size when the component mounts
    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, []);

    const handleAddToCart = async () => {
        await dispatch({
            type: "ADD",
            id: foodItem._id,
            name: name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: imgSrc
        });
        console.log(data);
    };

    return (
        <div>
            <div>
                <div className="card" style={{ width: "18rem", maxHeight: "400px" }}>
                    <img src={imgSrc} className="card-img-top" alt={name} style={{ height: "160px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">Some quick example text to build </p>
                        <div className='container w-100'>
                            <select className='m-2 bg-success rounded text-white' onChange={(e) => setQty(parseInt(e.target.value, 10))}>
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <select className='m-2 bg-success rounded text-white' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOption.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                            <div className='m-2 fs-5 d-inline'>₹{finalPrice}/-</div>
                        </div>
                        <hr></hr>
                        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
