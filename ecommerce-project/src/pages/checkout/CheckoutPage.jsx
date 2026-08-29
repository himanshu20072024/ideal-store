import './CheckoutPage.css';
import './Checkout-header.css';
import { PaymentSummary } from './PaymentSummary';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { CheckoutHeader } from './CheckoutHeader';


export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);
        }
        fetchCheckoutData();

    }, []);

    useEffect(() => {
        const reloadPaymentSummary = async () => {
            let response = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data);
        }
        reloadPaymentSummary();
    }, [cart]);

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions}  loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}