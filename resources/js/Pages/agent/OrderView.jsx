import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AgentLayout from '@/Layouts/AgentLayout';

const OrderView = ({ auth, orders }) => {
    const [editOrderId, setEditOrderId] = useState(null);
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('newer');

    const handleEdit = (order) => {
        setEditOrderId(order.id);
        setStatus(order.status);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        Inertia.post(route('orders.update', editOrderId), {
            status,
        }).then(() => {
            setEditOrderId(null);
        });
    };

    const handleViewItems = (order) => {
        Inertia.get(route('agent/orders.items', order.id))
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (sortOrder === 'newer') {
            return new Date(b.order_date) - new Date(a.order_date);
        } else {
            return new Date(a.order_date) - new Date(b.order_date);
        }
    });

    const filteredOrders = sortedOrders.filter(order =>
        order.invoice_no.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AgentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Order Management</h2>}
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between mb-6">
                                <h1 className="text-3xl font-bold text-white">Orders</h1>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={sortOrder}
                                        onChange={handleSortChange}
                                        className="ml-4 px-6 py-2 border rounded-md dark:bg-gray-600 text-white"
                                    >
                                        <option value="newer">Newest</option>
                                        <option value="older">Oldest</option>
                                    </select>
                                    <div>
                                    <input
                                        type="text"
                                        placeholder="Invoice_No without '#' .."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="px-4 py-2 border rounded-l-md dark:bg-gray-600 text-white"
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-r-md"
                                    >
                                        Search
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr className="text-center">
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Invoice No</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Amount</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Status</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order Date</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredOrders.map((order) => (
                                        <React.Fragment key={order.id}>
                                            <tr className="text-center">
                                                <td className="px-6 py-4 whitespace-nowrap text-white">#{order.invoice_no}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{order.user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">Rs.{order.total_amount} .00</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{order.payment}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                                    {order.id === editOrderId ? (
                                                        <select
                                                            value={status}
                                                            onChange={(e) => setStatus(e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="success">Success</option>
                                                        </select>
                                                    ) : (
                                                        <span>{order.status}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{order.order_date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {order.id === editOrderId ? (
                                                        <button
                                                            onClick={handleUpdate}
                                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                                        >
                                                            Update
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEdit(order)}
                                                                className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 active:bg-yellow-600 disabled:opacity-25 transition"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleViewItems(order)}
                                                                className="ml-2 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                                            >
                                                                View Items
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
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

export default OrderView;
