import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AgentLayout from '@/Layouts/AgentLayout';

const OrderView = ({ auth, orders }) => {
    const [editOrderId, setEditOrderId] = useState(null);
    const [viewOrderId, setViewOrderId] = useState(null);
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const [orderItems, setOrderItems] = useState([]);

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

    const fetchOrderItems = (orderId) => {
        Inertia.get(route('orders.items', orderId)).then(response => {
            setOrderItems(response); // Assuming response is already formatted as an array of order items
        }).catch(error => {
            console.log('Error fetching order items:', error);
        });
    };

    const handleViewItems = (orderId) => {
        if (viewOrderId === orderId) {
            setViewOrderId(null); // Collapse the items if already viewed
        } else {
            setViewOrderId(orderId);
            fetchOrderItems(orderId);
        }
    };

    const filteredOrders = orders.filter(order =>
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
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Invoice_No without '#' .."
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
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Invoice No</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Amount</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Status</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredOrders.map((order) => (
                                        <React.Fragment key={order.id}>
                                            <tr className="text-center">
                                                <td className="px-6 py-4 whitespace-nowrap text-white">#{order.invoice_no}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-white">{order.user_id}</td>
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
                                                                onClick={() => handleViewItems(order.id)}
                                                                className="ml-2 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                                            >
                                                                View Items
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                            {order.id === viewOrderId && (
                                                <tr>
                                                    <td colSpan="6">
                                                        <div className="p-4">
                                                            <h2 className="text-xl font-semibold mb-2 text-white">Order Items</h2>
                                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                                <thead className="bg-gray-50 dark:bg-gray-700">
                                                                    <tr className="text-center">
                                                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Material Name</th>
                                                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                                                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Unit Price</th>
                                                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                                    {orderItems.map((item) => (
                                                                        <tr key={item.id} className="text-center">
                                                                            <td className="px-6 py-4 whitespace-nowrap text-white">{item.material_id}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-white">{item.quantity}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-white">Rs.{item.unit_price}.00</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap text-white">Rs.{item.total_price}.00</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
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

export default OrderView;
