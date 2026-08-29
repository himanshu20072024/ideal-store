import axios from 'axios';
import { useEffect, useState } from 'react';
import './HomePage.css';
import { Header } from '../../components/Header';

import {ProductsGrid} from './ProductsGrid';

export function HomePage( { cart } ) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let response = async () => {
            await axios.get('/api/products');
            setProducts(response.data);
        }
        response();
    }, [])

    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}