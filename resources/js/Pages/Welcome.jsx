// resources/js/Pages/Welcome.jsx

import React from 'react';
import { Link, Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        // Handle image errors if needed
    };

    // Sample data for item cards (replace with your actual data)
    const itemCards = [
        {
            id: 1,
            title: 'Generators',
            image: '/Uploads/Other/Generator.png', // Replace with actual image URL
            link: 'https://example.com/item1',
        },
        {
            id: 2,
            title: 'Grinders',
            image: '/Uploads/Other/Grinder.png', // Replace with actual image URL
            link: 'https://example.com/item2',
        },
        {
            id: 3,
            title: 'Water Tanks',
            image: '/Uploads/Other/WaterTank.png', // Replace with actual image URL
            link: 'https://example.com/item3',
        },
        {
            id: 4,
            title: 'Water Pumps',
            image: '/Uploads/Other/WaterPump.png', // Replace with actual image URL
            link: 'https://example.com/item4',
        },
    ];

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Number of slides to show at once
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <Header auth={auth} />
                <main className="pt-24">
                    <div className="container mx-auto px-6 lg:px-8">
                        {/* Image Holder Section */}
                        <div id="image-holder" className="bg-white rounded-lg shadow-md mb-8">
                            <img
                                src="/Uploads/Other/mainImage.png"
                                alt="Main Image"
                                className="w-full rounded-lg"
                            />
                        </div>

                        <div className="w-full mb-8">
                            {/* Slider Section */}
                            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                                <Slider {...sliderSettings}>
                                    {itemCards.map((item) => (
                                        <div key={item.id} className="text-center">
                                            <img src={item.image} alt={item.title} className="rounded-lg mb-4" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                                            <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
                                            <p className="text-gray-700 mt-3">{item.description}</p>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                        {/* Image Holder Section */}
                        <div id="image-holder" className="bg-white rounded-lg shadow-md mb-8">
                            <img
                                src="/Uploads/Other/second.png"
                                alt="Main Image"
                                className="w-full rounded-lg"
                                style={{ maxWidth: '100%', maxHeight: '600px' }}
                            />
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
