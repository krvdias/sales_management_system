import React, { useState } from 'react';
import Header from '../Components/Header';
import { Inertia } from '@inertiajs/inertia';

export default function MaterialList({ auth, materials }) {
    const [search, setSearch] = useState('');
    const [quantities, setQuantities] = useState({});

    // Filter materials based on search input and status
    const filteredMaterials = materials
        .filter(material => material.name.toLowerCase().includes(search.toLowerCase()))
        .filter(material => material.status == 'available'); // Ensure status is not empty


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
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header auth={auth} />
            <main className="py-12">
                <div className="container mx-auto px-6 lg:px-8">
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
                                type="button" // Ensure type is set to "button" to prevent form submission
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                    <button
                                        className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md"
                                        onClick={() => handleAddToCart(material)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md"
                                        onClick={() => handleAddToCheckout(material)}
                                    >
                                        Buy Item
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
