import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Reports({
    auth,
    totalOrders,
    totalIncome,
    totalPending,
    totalCustomers,
    totalAdmins,
    totalAgents,
    totalSales,
    salesByCategory,
    salesByPaymentMethod,
    activeUsers,
    userRegistrations,
    usersByRole,
    inventoryStatus,
    mostSoldMaterials,
    lowStockMaterials,
    ordersByStatus,
    averageOrderValue,
    startDate,
    endDate
}) {
    const [reportType, setReportType] = useState('');

    const handleGenerateReport = (e) => {
        e.preventDefault();
        Inertia.post(route('reports.generate'), { reportType });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Reports and Analysis</h2>}
        >
            <Head title="Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">

                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Reports and Analysis</h1>

                            {/* Summary Section */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Summary</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {/* Card */}
                                    <div className="bg-teal-700 dark:bg-teal-600 p-2 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Orders</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{totalOrders}</p>
                                    </div>
                                    <div className="bg-teal-700 dark:bg-teal-600 p-2 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Income</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">Rs.{totalIncome.toLocaleString()}.00</p>
                                    </div>
                                    <div className="bg-teal-700 dark:bg-teal-600 p-2 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Pending Income</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">Rs.{totalPending.toLocaleString()}.00</p>
                                    </div>
                                    <div className="bg-teal-700 dark:bg-teal-600 p-2 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Customers</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{totalCustomers}</p>
                                    </div>
                                    <div className="bg-teal-700 dark:bg-teal-600 p-2 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Admins</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{totalAdmins}</p>
                                    </div>
                                    <div className="bg-teal-700 dark:bg-teal-600 p-2 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Agents</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{totalAgents}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sales Reports Section */}
                            <div className="bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-6">
                                <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-200 mb-6">Sales Reports</h2>
                                <div className="space-y-6">
                                    {/* Total Sales Card */}
                                    <div className="bg-teal-700 dark:bg-teal-800 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-teal-100 dark:text-teal-200 mb-2">Total Sales</h3>
                                        <p className="text-2xl font-bold text-teal-100 dark:text-teal-200">Rs.{totalSales.toLocaleString()}.00</p>
                                    </div>

                                    {/* Sales by Category */}
                                    <div className="bg-indigo-700 dark:bg-indigo-800 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-indigo-100 dark:text-indigo-200 mb-2">Sales by Category</h3>
                                        <ul className="list-disc pl-5 text-indigo-100 dark:text-indigo-200">
                                            {salesByCategory.map((category) => (
                                                <li key={category.category}>
                                                    {category.category}: Rs.{category.total_sales.toLocaleString()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Sales by Payment Method */}
                                    <div className="bg-green-700 dark:bg-green-800 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-green-100 dark:text-green-200 mb-2">Sales by Payment Method</h3>
                                        <ul className="list-disc pl-5 text-green-100 dark:text-green-200">
                                            {salesByPaymentMethod.map((method) => (
                                                <li key={method.payment}>
                                                    {method.payment}: Rs.{method.total_sales.toLocaleString()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* User Reports Section */}
                            <div className="bg-yellow-200 dark:bg-yellow-600 rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">User Reports</h2>
                                <div className="space-y-4">
                                    <p className="text-lg font-medium">Active Users: {activeUsers}</p>
                                    <div>
                                        <h3 className="text-lg font-semibold">User Registrations Over Time:</h3>
                                        <ul className="list-disc pl-5">
                                            {userRegistrations.map((registration) => (
                                                <li key={registration.date}>{registration.date}: {registration.count}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Users by Role:</h3>
                                        <ul className="list-disc pl-5">
                                            {usersByRole.map((role) => (
                                                <li key={role.role}>{role.role}: {role.count}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Material Reports Section */}
                            <div className="bg-purple-200 dark:bg-purple-600 rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">Material Reports</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Inventory Status:</h3>
                                        <ul className="list-disc pl-5">
                                            {inventoryStatus.map((material) => (
                                                <li key={material.id}>{material.name}: {material.quantity}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Most Sold Materials:</h3>
                                        <ul className="list-disc pl-5">
                                            {mostSoldMaterials.map((material) => (
                                                <li key={material.name}>{material.name}: {material.total_sold}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Low Stock Materials:</h3>
                                        <ul className="list-disc pl-5">
                                            {lowStockMaterials.map((material) => (
                                                <li key={material.id}>{material.name}: {material.quantity}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Order Reports Section */}
                            <div className="bg-pink-200 dark:bg-pink-600 rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold text-pink-900 dark:text-pink-100 mb-4">Order Reports</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Orders by Status:</h3>
                                        <ul className="list-disc pl-5">
                                            {ordersByStatus.map((status) => (
                                                <li key={status.status}>{status.status}: {status.count}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="text-lg font-medium">Average Order Value: Rs.{averageOrderValue.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Generate Report Form */}
                            <form onSubmit={handleGenerateReport} className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
                                <div className="mb-4">
                                    <label htmlFor="reportType" className="block text-gray-700 dark:text-gray-300 mb-2">Report Type:</label>
                                    <select
                                        name="reportType"
                                        id="reportType"
                                        value={reportType}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm dark:bg-gray-600 text-white"
                                    >
                                        <option value="">Select Report Type</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                >
                                    Generate Report
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
