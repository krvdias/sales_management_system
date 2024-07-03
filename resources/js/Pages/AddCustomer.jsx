import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function AddCustomer({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('AddCustomer.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add Customer</h2>}
        >
            <Head title="Add Customer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" className="text-white"/>
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
                                    <InputLabel htmlFor="email" value="Email" className="text-white" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" className="text-white"/>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Phone" className="text-white" />
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="tel"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="address" value="Address" className="text-white"/>
                                    <TextInput
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full dark:bg-gray-700 text-gray-200"
                                        autoComplete="street-address"
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4 inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={processing}>
                                        Add Customer
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
