import React, { useState } from 'react';
import Header from '../Components/Header';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/react';

export default function MaterialList({ auth, materials }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [quantities, setQuantities] = useState({});

    const categories = [
        'Build', 'Wood and Timber', 'Metals', 'Roof', 'Insulation', 'Flooring', 
        'Finishes', 'Plumbing', 'Electrical', 'Fasteners', 'Glass', 'Landscaping', 
        'Doors and Window', 'Fixtures and Fittings'
    ];

    // Filter materials based on search input and selected category
    const filteredMaterials = materials
        .filter(material => material.name.toLowerCase().includes(search.toLowerCase()))
        .filter(material => material.status === 'available')
        .filter(material => selectedCategory === '' || material.category === selectedCategory);

    const handleAddToCart = (material) => {
        const quantity = quantities[material.id] || 1;
        if (material.quantity < quantity) {
            alert(`We have only ${material.quantity} units of ${material.name}`);
            return;
        }
        Inertia.post(route('cart.add', { material_id: material.id, quantity }));
    };

    const handleAddToCheckout = (material) => {
        const quantity = quantities[material.id] || 1;
        if (material.quantity < quantity) {
            alert(`We have only ${material.quantity} units of ${material.name}`);
            return;
        }
        Inertia.get(route('checkout.add', { material_id: material.id, quantity }));
    };

    const handleQuantityChange = (material_id, newQuantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [material_id]: newQuantity
        }));
    };

    return (
        <>
        <Head title="Materials" />
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header auth={auth} />
            <main className="pt-24">
                <div className="container mx-auto px-6 lg:px-8 flex">
                    <aside className="w-1/6 pr-6">
                        <h2 className="text-xl font-bold mb-4">Categories</h2>
                        <ul className="space-y-2">
                            {categories.map(category => (
                                <li key={category}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`block w-full text-left px-3 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => setSelectedCategory('')}
                                    className={`block w-full text-left px-4 py-2 rounded-md ${selectedCategory === '' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
                                >
                                    All Categories
                                </button>
                            </li>
                        </ul>
                    </aside>
                    <div className="w-5/6">
                        <div className="flex justify-between mb-6">
                            <h1 className="text-3xl font-bold">Materials</h1>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Search materials..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="px-4 py-2 border rounded-l-md"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {filteredMaterials.map(material => (
                                <div key={material.id} className="bg-white p-6 rounded-lg shadow-md">
                                    <img
                                        src={`/Uploads/Materials/${material.image}`}
                                        alt={material.name}
                                        className="w-full h-32 object-cover mb-4"
                                    />
                                    <h2 className="text-2xl font-bold">{material.name}</h2>
                                    <p className="mt-2 text-gray-600">{material.description}</p>
                                    <p className="mt-2 text-red-500 font-bold">Rs.{material.price}.00</p>
                                    <div className="mt-2">
                                        <label className="block text-gray-700">Quantity:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantities[material.id]}
                                            onChange={(e) => handleQuantityChange(material.id, parseInt(e.target.value))}
                                            className="w-full px-4 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                        <button
                                            className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md"
                                            onClick={() => handleAddToCart(material)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
                                            onClick={() => handleAddToCheckout(material)}
                                        >
                                            Buy Item
                                        </button>
                                    </div>
                                </div>
                            ))}
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
