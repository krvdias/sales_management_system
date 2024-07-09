import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AgentLayout from '@/Layouts/AgentLayout';

export default function CustomerList({ auth, customers }) {
    const [editCustomerId, setEditCustomerId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [search, setSearch] = useState('');
    const [address, setAddress] = useState('');

    const handleEdit = (customer) => {
        setEditCustomerId(customer.id);
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setAddress(customer.address);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        Inertia.post(route('CustomerList.update', editCustomerId), {
            name,
            email,
            phone,
            address,
        }).then(() => {
            setEditCustomerId(null);
        });
    };

    const handleDelete = (customerId) => {
        
        Inertia.delete(route('CustomerList.destroy', customerId));
    };

    const filtereCustomer = customers.filter(customer =>
        customer.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AgentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Customer Management</h2>}
        >
            <Head title="Customers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">

                            <div className="flex justify-between mb-6">
                                <h1 className="text-3xl font-bold text-white">Customers</h1>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Customer name .."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="px-4 py-2 border rounded-l-md dark:bg-gray-600 text-white"
                                    />
                                    <button
                                        type="button" // Ensure type is set to "button" to prevent form submission
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-r-md"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr className="text-center">
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Customer Id
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Mobile Number
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filtereCustomer.map((customer) => (
                                        <React.Fragment key={customer.id}>
                                        {customer.id === editCustomerId ? (
                                            <tr key={customer.id} className="text-center">
                                                <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="text"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="text"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={handleUpdate}
                                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={customer.id} className="text-center">
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{customer.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{customer.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{customer.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{customer.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{customer.address}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleEdit(customer)}
                                                        className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 active:bg-yellow-600 disabled:opacity-25 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(customer.id)}
                                                        className="inline-flex items-center ml-2 px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
};
