import React from 'react';
import Header from '../Components/Header';

export default function CheckoutSuccess({ auth }) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header auth={auth} />
            <main className="py-12">
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
        </div>
    );
}
