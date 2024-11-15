import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Header from '../Components/Header';
import { Link, Head } from '@inertiajs/react';

export default function BuyCheckout({ auth, material, quantity }) {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isDelivery, setIsDelivery] = useState(false);

    useEffect(() => {
        const generateInvoiceNumber = () => {
            const randomPart = Math.floor(Math.random() * 1000000); // 6 digit random number
            return `${randomPart}`;
        };

        const savedInvoiceNumber = localStorage.getItem('invoiceNumber');
        if (savedInvoiceNumber) {
            setInvoiceNumber(savedInvoiceNumber);
        } else {
            const newInvoiceNumber = generateInvoiceNumber();
            setInvoiceNumber(newInvoiceNumber);
            localStorage.setItem('invoiceNumber', newInvoiceNumber);
        }
    }, []);

    const deliveryCharge = isDelivery ? 500 : 0; 

    const handlePlaceOrder = () => {
        console.log('Placing order with:', {
            material_id: material.id,
            quantity,
            invoiceNumber,
            paymentMethod,
            deliveryCharge,
        });

        Inertia.post(route('checkout.place'), {
            material_id: material.id,
            quantity,
            invoiceNumber,
            paymentMethod,
            deliveryCharge,   
        });
        localStorage.removeItem('invoiceNumber');
    };

    const cardPaymentContent = (
        <div>
            <br/>
            <h2 className="text-xl font-bold mb-2">Card Payment Instructions</h2>
            <p className="text-gray-700 mb-2">We did't activate Card Payment yet..</p>
        </div>
    );

    // Additional content for Bank Transfer option
    const bankTransferContent = (
        <div className="flex flex-col md:flex-row mb-4">
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
            <br/>
            <h2 className="text-xl font-bold mb-2">Bank Transfer Instructions</h2>
            <p className="text-gray-700 mb-2">Please transfer the total amount to the following bank account :</p>
            <p className="text-gray-700 mb-2"><strong>Bank :</strong> BOC Bank</p>
            <p className="text-gray-700 mb-2"><strong>Account Number :</strong> 1234567890</p>
            <p className="text-gray-700 mb-2"><strong>Account Name :</strong> SGP Materials</p>
            <br/>
            <p className="text-gray-700 mb-2"><strong>After Bank Transfer Send the Bankslip to our WHATSAPP NUMBER with your INVOICE NUMBER</strong></p>
        
            <p className="text-gray-700 mb-2">GET our WHATSAPP NUMBER <strong>Scan the QR CODE</strong> below :</p>
            </div>
            <div>
            <img
                src="/Uploads/Other/whatsapp.jpg"
                alt="Bank Transfer Instructions"
                className="w-3/4 rounded-lg"
            />
            </div>
        </div>
    );

    
    return (
        <>
        <Head title="Invoice" />
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header auth={auth} />
            <main className="pt-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-bold">Invoice</h1>
                            <div>
                                <p className="text-gray-700"><strong>Invoice #:</strong> {invoiceNumber}</p>
                                <p className="text-gray-700"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                        <hr className="mb-6" />
                        <div className="flex flex-col md:flex-row mb-4">
                            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                                <h2 className="text-xl font-bold">Customer Details</h2>
                                <p className="text-gray-700"><strong>Name:</strong> {auth.user.name}</p>
                                <p className="text-gray-700"><strong>Email:</strong> {auth.user.email}</p>
                            </div>
                            <div className="flex-2">
                                <h2 className="text-xl font-bold">Delivery Details</h2>
                                <p className="text-gray-700"><strong>Address:</strong> </p>
                                <p className="text-gray-700"><strong>Phone:</strong> +94 112224443</p>
                            </div>
                        </div>
                        <hr className="mb-6" />
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg shadow-md">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                            <img
                                                src={`/Uploads/Materials/${material.image}`}
                                                alt={material.name}
                                                className="w-16 h-16 object-cover mr-4"
                                            /> 
                                            <div>
                                                <div className="text-lg font-bold">{material.name}</div>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-lg font-bold">Rs.{material.price}.00</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-lg font-bold">{quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-lg font-bold">Rs.{material.price * quantity}.00</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between mb-6">
                                <span className="text-lg font-bold">Subtotal :</span>
                                <span className="text-lg font-bold">Rs.{material.price * quantity}.00</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="delivery"
                                    name="delivery"
                                    checked={isDelivery}
                                    onChange={(e) => setIsDelivery(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="delivery" className="text-gray-700">Add Delivery (Rs.500.00)</label>
                            </div>
                            <div className="flex justify-between mb-6">
                                <span className="text-lg font-bold">Delivery :</span>
                                <span className="text-lg font-bold">Rs.{isDelivery ? 500 : 0}.00</span>
                            </div>
                            <div className="flex justify-between mb-6">
                                <span className="text-xl font-bold">Total :</span>
                                <span className="text-red-700 font-bold text-xl">Rs.{material.price * quantity + deliveryCharge}.00</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">Payment Method</h2>
                            <div className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    id="cash"
                                    name="paymentMethod"
                                    value="Cash"
                                    checked={paymentMethod === 'Cash'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="cash" className="text-gray-700">Cash</label>
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    id="bank"
                                    name="paymentMethod"
                                    value="Bank"
                                    checked={paymentMethod === 'Bank'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="bank" className="text-gray-700">Bank Transfer</label>
                            </div>
                            {/*<div className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    id="card"
                                    name="paymentMethod"
                                    value="Card"
                                    checked={paymentMethod === 'Card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="card" className="text-gray-700">Card</label>
                            </div>*/}
                            {paymentMethod === 'Bank' && bankTransferContent} {/* Conditionally render bank transfer content */}
                            {paymentMethod === 'Card' && cardPaymentContent}
                            
                            
                        </div>
                        <button
                            className="w-full bg-green-600 text-white py-2 px-4 rounded"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
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
