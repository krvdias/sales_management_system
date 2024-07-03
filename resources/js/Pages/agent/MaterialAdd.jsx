import React from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FileInput from '@/Components/FileInput';
import { Head, useForm } from '@inertiajs/react';

export default function AddMaterial({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '',
        description: '',
        quantity: '',
        price: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('AddMaterial.stores'));
    };

    return (
        <AgentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add Material</h2>}
        >
            <Head title="Add Material" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" className="text-white" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="category" value="Category" className="text-white" />
                                    <TextInput
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="category"
                                        onChange={(e) => setData('category', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.category} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description" className="text-white" />
                                    <TextInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="description"
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="quantity" value="Quantity" className="text-white" />
                                    <TextInput
                                        id="quantity"
                                        name="quantity"
                                        value={data.quantity}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="quantity"
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Price" className="text-white" />
                                    <TextInput
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="price"
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="image" value="Image" className="text-white" />
                                    <FileInput
                                        id="image"
                                        name="image"
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4 inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={processing}>
                                        Add Material
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
}
