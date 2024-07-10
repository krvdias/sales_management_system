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
                <main className="pt-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center lg:items-start">
                                <img
                                    
                                />
                               
                                <div className="mt-6 flex justify-center">
                                   
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center lg:items-start">
                                <img
                                    
                                />
                                
                                <div className="mt-6 flex justify-center">
                                    
                                </div>
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
