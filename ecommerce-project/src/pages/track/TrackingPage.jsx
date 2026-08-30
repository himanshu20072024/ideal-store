import './TrackingPage.css';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {

    const [searchParams] = useSearchParams();

    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');

    const [order, setOrder] = useState(null);

    useEffect(() => {

        axios.get('/api/orders?expand=products')
            .then((response) => {

                const orders = response.data;

                const selectedOrder = orders.find((order) => {
                    return order.id === orderId;
                });

                setOrder(selectedOrder);
            });

    }, [orderId]);


    if (!order) {
        return (
            <>
                <Header cart={cart} />
                <div>Loading...</div>
            </>
        );
    }


    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.product.id === productId;
    });


    if (!orderProduct) {
        return (
            <>
                <Header cart={cart} />
                <div>Product not found.</div>
            </>
        );
    }


    return (
        <>
            <title>Tracking</title>

            <Header cart={cart} />

            <div className="tracking-page">

                <div className="order-tracking">

                    <a
                        className="back-to-orders-link link-primary"
                        href="/orders"
                    >
                        View all orders
                    </a>

                    <div className="delivery-date">
                        Arriving on{' '}
                        {dayjs(
                            orderProduct.estimatedDeliveryTimeMs
                        ).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img
                        className="product-image"
                        src={orderProduct.product.image}
                    />

                    <div className="progress-labels-container">

                        <div className="progress-label">
                            Preparing
                        </div>

                        <div className="progress-label current-status">
                            Shipped
                        </div>

                        <div className="progress-label">
                            Delivered
                        </div>

                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>

                </div>

            </div>
        </>
    );
}