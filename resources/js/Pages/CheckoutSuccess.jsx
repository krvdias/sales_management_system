import React from 'react';
import Header from '../Components/Header';
import { Link, Head } from '@inertiajs/react';

export default function CheckoutSuccess({ auth }) {
    return (
        <>
        <Head title="Success" />
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header auth={auth} />
            <main className="pt-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-center mb-6">Order Placed Successfully!</h1>
                        <p className="text-center text-gray-700 mb-6">Thank you for your order. You will receive a confirmation email shortly.</p>
                        <div className="text-center">
                            <a
                                href="/"
                                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md"
                            >
                                Go to Home
                            </a>
                        </div>
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
