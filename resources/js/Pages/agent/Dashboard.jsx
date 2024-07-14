// resources/js/Pages/AgentDashboard.jsx

import React, { useState } from 'react';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head } from '@inertiajs/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function AgentDashboard({ auth, customers, admins, agents, orders, totalIncome, pendingIncome }) {
    const [date, setDate] = useState(new Date());
    const [calendarVisible, setCalendarVisible] = useState(false);

    // Function to format date to "Today is [date] [day]"
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    };

    const toggleCalendarVisibility = () => {
        setCalendarVisible(!calendarVisible);
    };

    return (
        <AgentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Agent Dashboard</h2>}
        >
            <Head title="Agent Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="text-gray-900 dark:text-gray-100 text-3xl mb-4">
                                Hello, {auth.user.name}!
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total Customers</h3>
                                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">{customers}</p>
                                </div>
                                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total Admins</h3>
                                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">{admins}</p>
                                </div>
                                <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total Agents</h3>
                                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">{agents}</p>
                                </div>
                                <div className="p-4 bg-purple-100 dark:bg-orange-700 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total Orders</h3>
                                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">{orders}</p>
                                </div>
                                <div className="p-4 bg-purple-100 dark:bg-green-700 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Success Income</h3>
                                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">Rs. {totalIncome} .00</p>
                                </div>
                                <div className="p-4 bg-purple-100 dark:bg-red-600 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Pending Income</h3>
                                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">Rs. {pendingIncome} .00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="max-w-2xl sm:px-3 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        
                            <div className="flex justify-center">
                                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Today is {formatDate(date)}
                                </p>
                            </div>
                            {calendarVisible && (
                                <div className="flex justify-center mt-4">
                                    <Calendar
                                        onChange={setDate}
                                        value={date}
                                        className="custom-calendar"
                                        tileClassName={({ date }) =>
                                            date.toDateString() === new Date().toDateString()
                                                ? 'highlight-today'
                                                : ''
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
}
