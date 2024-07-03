import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/Layouts/AdminLayout';

export default function MaterialList({ auth, materials }) {
    const [editMaterialId, setEditMaterialId] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');

    const handleEdit = (material) => {
        setEditMaterialId(material.id);
        setName(material.name);
        setCategory(material.category);
        setDescription(material.description);
        setQuantity(material.quantity);
        setPrice(material.price);
        setImage(material.image);
        setStatus(material.status);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        Inertia.post(route('MaterialList.edit', editMaterialId), {
            name,
            category,
            description,
            quantity,
            price,
            image,
            status,
        }).then(() => {
            setEditMaterialId(null);
        });
    };

    const handleDelete = (materialId) => {
        Inertia.delete(route('MaterialList.delete', materialId));
    };

    const getImageUrl = (imagePath) => {
        return imagePath ? `/Uploads/Materials/${imagePath}` : 'default-image-path.png';
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Material Management</h2>}
        >
            <Head title="Materials" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                {materials.map((material) => (
                                    <div key={material.id} className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
                                        {material.id === editMaterialId ? (
                                            <div className="flex flex-col items-center">
                                                <input
                                                    type="file"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    className="mt-2 mb-4 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                />
                                                {image && <img src={getImageUrl(image)} alt={material.name} className="w-500 h-300 object-cover mb-4" style={{ width: '500px', height: '300px' }} />}
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Name"
                                                    className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                />
                                                <input
                                                    type="text"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    placeholder="Category"
                                                    className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                />
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    placeholder="Description"
                                                    className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                />
                                                <input
                                                    type="text"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    placeholder="Quantity"
                                                    className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                />
                                                <input
                                                    type="text"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    placeholder="Price"
                                                    className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                />
                                                <select
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                >
                                                    <option value="available">available</option>
                                                    <option value="empty">empty</option>
                                                </select>
                                                <button
                                                    onClick={handleUpdate}
                                                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <img src={getImageUrl(material.image)} alt={material.name} className="w-full h-300 object-cover mb-4 mx-auto" style={{ width: '500px', height: '300px' }} />
                                                <div className="text-center text-white">
                                                    <p><strong>Name:</strong> {material.name}</p>
                                                    <p><strong>Category:</strong> {material.category}</p>
                                                    <p><strong>Description:</strong> {material.description}</p>
                                                    <p><strong>Quantity:</strong> {material.quantity}</p>
                                                    <p><strong>Price: Rs.</strong> {material.price} .00</p>
                                                    <p><strong>Status:</strong> {material.status}</p>
                                                    <div className="mt-4 flex justify-center">
                                                        <button
                                                            onClick={() => handleEdit(material)}
                                                            className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 active:bg-yellow-600 disabled:opacity-25 transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(material.id)}
                                                            className="inline-flex items-center ml-2 px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}