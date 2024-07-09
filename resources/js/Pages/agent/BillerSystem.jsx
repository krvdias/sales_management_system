import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head } from '@inertiajs/react';

export default function BillerSystem({ auth }) {
    const [invoiceNo, setInvoiceNo] = useState('');

    const handleInvoiceSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('bill.search', { invoiceNo }));
    };

    return (
        <AgentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Billing System</h2>}
        >
            <Head title="Billing System" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <form onSubmit={handleInvoiceSearch} className="mb-6">
                                <label htmlFor="invoiceNo" className="block text-white mb-2">Invoice Number:</label>
                                <input
                                    type="text"
                                    id="invoiceNo"
                                    value={invoiceNo}
                                    onChange={(e) => setInvoiceNo(e.target.value)}
                                    className="px-4 py-2 border rounded-md dark:bg-gray-600 text-white"
                                />
                                <button type="submit" className="ml-2 px-4 py-2 bg-yellow-600 text-white rounded-md">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
};
