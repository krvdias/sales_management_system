import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Header from '../Components/Header';
import { Link, Head } from '@inertiajs/react';

export default function CartPage({ auth, cartItems }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    const handleRemoveItem = async (material_id) => {
        await Inertia.post(route('cart.remove', { material_id }), {}, {
            onSuccess: () => {
                const updatedItems = items.filter(item => item.material_id !== material_id);
                setItems(updatedItems);
            },
            onError: (errors) => {
                console.error('Failed to remove item from cart:', errors);
            }
        });
    };

    const handleRoute = (e) => {
        Inertia.get(route('checkout.show'));
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
    };

    return (
        <>
            <Head title="Cart" />
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header auth={auth} />
            <main className="pt-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-3xl font-bold">Your Cart</h1>
                    </div>
                    {items.length > 0 ? (
                        <div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Quantity</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item.material_id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={`/Uploads/Materials/${item.image}`}
                                                            alt={item.name}
                                                            className="w-16 h-16 object-cover mr-4"
                                                        />
                                                        <div>
                                                            <div className="text-lg font-bold">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-lg font-bold">Rs.{item.unit_price}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-lg font-bold">{item.quantity}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-lg font-bold">Rs.{item.unit_price * item.quantity}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(item.material_id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between mt-6">
                                <Link
                                    href={route('Materials.show')}
                                    className="bg-green-600 text-white py-2 px-4 rounded"
                                >
                                    Continue Buying
                                </Link>

                            </div>
                            <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md mt-6 ml-auto">
                                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>Rs.{calculateTotal()} .00</span>
                                </div>
                                
                                <div className="flex justify-between mb-6 text-xl text-red-500 font-bold">
                                    <span>Total</span>
                                    <span>Rs.{calculateTotal()} .00</span>
                                </div>
                                <button
                                    onClick={(e) => handleRoute()}
                                    className="bg-green-600 text-white py-2 px-4 rounded inline-block"
                                >
                                    Checkout Item
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p>Your cart is empty.</p>
                            <div className="flex justify-between mt-6">
                                <Link
                                    href={route('Materials.show')}
                                    className="bg-green-600 text-white py-2 px-4 rounded"
                                >
                                    Continue Buying
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <br/>
            <footer className="bg-gray-500 text-white py-6">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Contact Section */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-2">
                                    <h3>Phone :</h3>
                                    <i className="fas fa-phone"></i>
                                    <span>+94 111223330</span>
                                </div>
                            </div>

                            {/* WeChat and Fax Section */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-2">
                                    <h3>Fax :</h3>
                                    <i className="fab fa-weixin"></i>
                                    <span>+94 111223331</span>
                                </div>
                            </div>

                            {/* Email Section */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-2">
                                    <h3>Email :</h3>
                                    <i className="fas fa-envelope"></i>
                                    <span>info@hardware.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        
                    </div>
                </footer>
        </div>
        </>
    );
}
