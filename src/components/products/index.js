import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addToCart } from '../../features/products/productsSlice';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);

    useEffect(() => {
        const prods = [
            { id: 1, name: 'Item 1', price: 10 },
            { id: 2, name: 'Item 2', price: 220 },
            { id: 3, name: 'Item 3', price: 3 },
            { id: 4, name: 'Item 4', price: 25 },
            { id: 5, name: 'Item 5', price: 17 },
        ];
        dispatch(setProducts(prods));
    }, [dispatch]);

    const handleAdd = (product) => {
        dispatch(addToCart(product));
    };

    const card = products.reduce((arr, i) => {
        arr.push(
            <div className="col-md-4 mb-4" key={i.id}>
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{i.name}</h5>
                        <p className="card-text">${i.price}</p>
                        <button className="btn btn-primary" onClick={() => handleAdd(i)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
        return arr;
    }, []);

    return (
        <div className="container mt-4">
            <h2 className='text-center'>Products</h2>
            <div className="row mt-5"> {card} </div>
        </div>
    );
};

export default ProductsPage;