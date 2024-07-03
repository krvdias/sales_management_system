// resources/js/Pages/Welcome.jsx

import React from 'react';
import { Link, Head } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('hidden');
        document.getElementById('docs-card')?.classList.add('row-span-1');
        document.getElementById('docs-card-content')?.classList.add('flex-row');
        document.getElementById('background')?.classList.add('hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <Header auth={auth} />
                <main className="py-12">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div id="docs-card" className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center lg:items-start row-span-2">
                                <div id="docs-card-content" className="flex items-center">
                                    <img
                                        src="https://laravel.com/img/logotype.min.svg"
                                        alt="Laravel Logo"
                                        className="h-12 mb-4"
                                    />
                                    <div className="ml-4 text-center lg:text-left">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Documentation
                                        </h2>
                                        <p className="text-gray-700 mt-3">
                                            Laravel has wonderful documentation covering every aspect of the framework. Whether you are a novice or an experienced developer, there's something for everyone.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        href="https://laravel.com/docs"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        Explore the docs
                                    </Link>
                                </div>
                            </div>
                            <div id="screenshot-container" className="bg-white p-6 rounded-lg shadow-md row-span-2">
                                
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center lg:items-start row-span-2">
                                <img
                                    src="https://laravel.com/img/logotype.min.svg"
                                    alt="Laravel Logo"
                                    className="h-12 mb-4"
                                />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Laravel News
                                </h2>
                                <p className="text-gray-700 mt-3">
                                    Stay up to date with the latest Laravel news, articles, and tutorials from the Laravel community worldwide.
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        href="https://laravel-news.com"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        Visit Laravel News
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
                                    Community
                                </h2>
                                <p className="text-gray-700 mt-3">
                                    Join the vibrant Laravel community and connect with fellow developers from around the world.
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <Link
                                        href="https://laracasts.com/discuss"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        Join the community
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="bg-white p-6 text-center shadow-md">
                    <div className="text-gray-800 text-sm">
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </div>
                </footer>
            </div>
        </>
    );
}
