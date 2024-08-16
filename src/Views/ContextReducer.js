import React, { createContext, useContext, useReducer } from 'react';

// Create Contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle actions
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {
                id: action.id,
                name: action.name,
                qty: action.qty,
                size: action.size,
                price: action.price,
                img: action.img
            }];
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}

// Custom hook to use the Cart State
export const useCart = () => useContext(CartStateContext);

// Custom hook to use the Cart Dispatch
export const useDispatchCart = () => useContext(CartDispatchContext);
