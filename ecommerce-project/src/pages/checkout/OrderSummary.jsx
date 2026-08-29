import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
import axios from 'axios';
import { useState } from 'react';

export function OrderSummary({ deliveryOptions, cart, loadCart }) {

    const [updatingProductId, setUpdatingProductId] = useState(null);
    const [quantity, setQuantity] = useState(null);

    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                })

                const deleteCartItem = async () => {
                    await axios.delete(`/api/cart-items/${cartItem.productId}`)
                    await loadCart();
                }

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption
                                .estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(cartItem.product.priceCents)}
                                </div>
                                <div className="product-quantity">

                                    {updatingProductId === cartItem.productId ? (
                                        <>
                                            <select
                                                value={quantity}
                                                onChange={(event) => {
                                                    setQuantity(Number(event.target.value));
                                                }}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>

                                            <span
                                                className="update-quantity-link link-primary"
                                                onClick={async () => {
                                                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                                                        quantity: quantity
                                                    });

                                                    await loadCart();
                                                    setUpdatingProductId(null);
                                                }}
                                            >
                                                Save
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>
                                                Quantity:
                                                <span className="quantity-label">
                                                    {cartItem.quantity}
                                                </span>
                                            </span>

                                            <span
                                                className="update-quantity-link link-primary"
                                                onClick={() => {
                                                    setUpdatingProductId(cartItem.productId);
                                                    setQuantity(cartItem.quantity);
                                                }}
                                            >
                                                Update
                                            </span>
                                        </>
                                    )}

                                    <span
                                        className="delete-quantity-link link-primary"
                                        onClick={deleteCartItem}
                                    >
                                        Delete
                                    </span>

                                </div>
                            </div>

                            <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                        </div>
                    </div>
                );
            })}

        </div>
    );
}