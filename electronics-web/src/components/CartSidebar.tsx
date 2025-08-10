"use client";
import React from 'react';
import { useCart } from '@/store/CartContext';
import { X, Trash, Plus, Minus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const CartSidebar = () => {
    const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity } = useCart();

    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.displayPrice?.replace('$', '') || '0');
        return total + price * item.quantity;
    }, 0);

    return (
        <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                    <button onClick={closeCart} className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                {cart.length > 0 ? (
                    <div className="flex-grow p-6 overflow-y-auto">
                        <div className="space-y-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-start gap-4 pb-6 border-b border-gray-200">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-gray-800 font-bold">{item.displayPrice}</p>
                                            {item.originalPrice && (
                                                <p className="text-gray-500 line-through">{item.originalPrice}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-gray-300 rounded-lg">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 font-semibold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                        <ShoppingCart className="w-20 h-20 text-gray-300" />
                        <h3 className="mt-6 text-xl font-semibold text-gray-800">Your cart is empty</h3>
                        <p className="mt-2 text-gray-500">Add some products to get started!</p>
                        <button onClick={closeCart} className="mt-6 bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                            Continue Shopping
                        </button>
                    </div>
                )}

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-lg font-semibold text-gray-800">Subtotal</p>
                            <p className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 text-center mb-4">Shipping and taxes will be calculated at checkout.</p>
                        <Link href="/payment" onClick={closeCart} className="w-full block text-center bg-gray-900 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-all">
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
