// resources/js/Pages/Contact.jsx

import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Contact({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <>
            <Head title="Contact" />
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <Header auth={auth} />
                <main className="py-12">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                    {errors.name && <div className="text-red-600 mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                    {errors.email && <div className="text-red-600 mt-1">{errors.email}</div>}
                                </div>
                                <div>
                                    <label className="block text-gray-700">Message</label>
                                    <textarea
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                    {errors.message && <div className="text-red-600 mt-1">{errors.message}</div>}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                        disabled={processing}
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
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