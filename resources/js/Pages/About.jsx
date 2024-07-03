// resources/js/Pages/About.jsx

import React from 'react';
import { Link, Head } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function About({ auth }) {
    return (
        <>
            <Head title="About" />
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <Header auth={auth} />
                <main className="py-12">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center lg:items-start">
                                <img
                                    src="https://laravel.com/img/logotype.min.svg"
                                    alt="Laravel Logo"
                                    className="h-12 mb-4"
                                />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    About Us
                                </h2>
                                <p className="text-gray-700 mt-3">
                                    Learn more about our team and our mission to deliver top-notch web applications using Laravel and other modern web technologies.
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        href="/contact"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center lg:items-start">
                                <img
                                    src="https://laravel.com/img/logotype.min.svg"
                                    alt="Laravel Logo"
                                    className="h-12 mb-4"
                                />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Our Values
                                </h2>
                                <p className="text-gray-700 mt-3">
                                    Discover the core values that drive our team to achieve excellence in every project we undertake.
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        href="/services"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        Our Services
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="bg-white p-6 text-center shadow-md">
                    <div className="text-gray-800 text-sm">
                        &copy; 2024 Your Company. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}
