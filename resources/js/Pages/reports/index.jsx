import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Reports({
    auth,
    totalOrders,
    totalSuccess,
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
    endDate,
    totalIncome
}){
    const pieData = {
        labels: salesByCategory.map(category => category.category),
        datasets: [
            {
                label: 'Sales by Category',
                data: salesByCategory.map(category => category.total_sales),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ]

            }
        ]
    };

    const barData = {
        labels: salesByPaymentMethod.map(method => method.payment),
        datasets: [
            {
                label: 'Cash',
                data: salesByPaymentMethod.map(method => method.total_sales),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }
        ]
    };

    const barOptions = {
        scales: {
            x: {
                ticks: {
                    color: 'white' // Change x-axis labels to white
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Change x-axis grid lines to a lighter color
                }
            },
            y: {
                ticks: {
                    color: 'white' // Change y-axis labels to white
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Change y-axis grid lines to a lighter color
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white' // Change legend labels to white
                }
            }
        }
    };

    const pieOptions = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                        //weight: 'bold'
                    },
                    color: 'black', // Change label color to black
                }
            }
        }
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
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Success Income</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">Rs.{totalSuccess}.00</p>
                                    </div>
                                    <div className="bg-teal-700 dark:bg-teal-600 p-2 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Pending Income</h3>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">Rs.{totalPending}.00</p>
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
                                    {/* Total Income Card */}
                                    <div className="bg-teal-700 dark:bg-teal-800 p-4 rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Total Income</h3>
                                        <p className="text-2xl font-bold text-teal-100 dark:text-teal-200">Rs.{totalIncome}.00</p>
                                    </div>

                                    {/* Total Sales Card */}
                                    <div className="bg-teal-700 dark:bg-teal-800 p-4 rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Total Sales</h3>
                                        <p className="text-2xl font-bold text-teal-100 dark:text-teal-200">Rs.{totalSales}.00</p>
                                    </div>

                                    {/* Sales by Category */}
                                    <div className="bg-teal-700 dark:bg-teal-600 p-4 rounded-lg shadow-mdd">
                                        <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">Sales by Category</h3>
                                        <div className="grid grid-cols-2">
                                        <ul className="list-disc text-lg pl-5 text-indigo-100 dark:text-indigo-100">
                                            <br/>
                                            {salesByCategory.map((category) => (
                                                <li key={category.category}>
                                                    {category.category}: Rs.{category.total_sales}
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ height: '300px' }}>
                                            <Pie data={pieData} options={pieOptions} />
                                        </div>
                                        </div>
                                    </div>

                                    {/* Sales by Payment Method */}
                                    <div className="bg-teal-700 dark:bg-teal-800 p-4 rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">Sales by Payment Method</h3>
                                        <div className="grid grid-cols-2">
                                        <ul className="list-disc text-lg pl-5 text-green-100 dark:text-green-200 mb-4">
                                            <br/>
                                            {salesByPaymentMethod.map((method) => (
                                                <li key={method.payment}>
                                                    {method.payment}: Rs.{method.total_sales}
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ height: '200px' }}>
                                            {/* Uncomment the one you want to use */}
                                            {/* <Pie data={pieData} /> */}
                                            <Bar data={barData} options={barOptions} />
                                        </div>
                                        </div>
                                    </div>
                                        </div>
                                    </div>

                            {/* User Reports Section */}
                            <div className="bg-gray-400 dark:bg-gray-700 rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">User Reports</h2>
                                <div className="space-y-4">
                                    <p className="text-lg text-white font-medium">Active Users: {activeUsers}</p>
                                    <div>
                                        <h3 className="text-lg text-gray-200 font-semibold m-2">User Registrations Over Time:</h3>
                                        <ul className="list-disc text-lg text-white pl-7">
                                            {userRegistrations.map((registration) => (
                                                <li key={registration.date}>{registration.date}: {registration.count}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg text-gray-200 font-semibold m-2">Users by Role:</h3>
                                        <ul className="list-disc text-lg text-white pl-7">
                                            {usersByRole.map((role) => (
                                                <li key={role.role}>{role.role}: {role.count}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Material Reports Section */}
                            <div className="bg-gray-400 dark:bg-gray-900 rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">Material Reports</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg text-white font-semibold">Inventory Status:</h3>
                                        <br/>
                                        <ul className="list-disc text-lg pl-5">
                                            {inventoryStatus.map((material) => (
                                                <li
                                                    key={material.id}
                                                    className={`${
                                                        material.quantity < 10
                                                            ? 'text-red-900 dark:text-red-600'
                                                            : 'text-green-900 dark:text-green-600'
                                                    }`}
                                                >
                                                    <span className="mr-3">{material.name}</span>
                                                    <span className="ml-3">: {material.quantity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <br/>
                                    <div>
                                        <h3 className="text-lg text-white font-semibold">Most Sold Materials:</h3>
                                        <br/>
                                        <ul className="list-disc text-lg text-white pl-5">
                                            {mostSoldMaterials.map((material) => (
                                                <li key={material.name}>
                                                    <span className="mr-2">{material.name}</span>
                                                    <span className="ml-4">: {material.total_sold}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/*<div>
                                        <h3 className="text-lg font-semibold">Low Stock Materials:</h3>
                                        <ul className="list-disc pl-5">
                                            {lowStockMaterials.map((material) => (
                                                <li key={material.id}>{material.name}: {material.quantity}</li>
                                            ))}
                                        </ul>
                                    </div>*/}
                                </div>
                            </div>

                            {/* Order Reports Section */}
                            <div className="bg-gray-400 dark:bg-gray-700 rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">Order Reports</h2>
                                <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white m-2">Orders by Status:</h3>
                                    <ul className="list-disc pl-5">
                                        {ordersByStatus.map((status) => (
                                            <li
                                                key={status.status}
                                                className={`${
                                                    status.status.toLowerCase() === 'pending'
                                                        ? 'text-yellow-600 dark:text-yellow-400'
                                                        : status.status.toLowerCase() === 'success'
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-white'
                                                }`}
                                            >
                                                {status.status}: {status.count}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                    <p className="text-lg text-gray-200 font-medium">Average Order Value: Rs.{averageOrderValue}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
