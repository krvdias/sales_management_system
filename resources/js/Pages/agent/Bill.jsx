import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AgentLayout from '@/Layouts/AgentLayout';

const Bill = ({ auth, order }) => {
    const [totalPayment, setTotalPayment] = useState(parseFloat(order.total_amount)); // Initialize with total_amount
    const [amountPaid, setAmountPaid] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    const handleUpdateStatus = (invoice_no) => {
        Inertia.get(route('bill.update', invoice_no));
    };

    const handlePayment = (e) => {
        e.preventDefault();
        const paid = parseFloat(amountPaid);
        const total = parseFloat(totalPayment);
        if (isNaN(paid) || paid <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (paid >= total) {
            alert('Payment Successful');
            setBalance((paid - total).toFixed(2)); 
            handleUpdateStatus(order.invoice_no);
        } else {
            alert('Insufficient Payment');
            setBalance(null);
        }
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
                            {totalPayment !== null && (
                                <>
                                    <div className="mb-6 text-white">
                                        <h3 className="text-2xl">Total Payment: Rs.{totalPayment.toFixed(2)}</h3>
                                    </div>
                                    <form onSubmit={handlePayment}>
                                        <label htmlFor="amountPaid" className="block text-white mb-2">Amount Paid:</label>
                                        <input
                                            type="number"
                                            id="amountPaid"
                                            value={amountPaid}
                                            onChange={(e) => setAmountPaid(e.target.value)}
                                            className="px-4 py-2 border rounded-md dark:bg-gray-600 text-white"
                                        />
                                        <button
                                            type="submit"
                                            className="ml-2 px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-600 disabled:opacity-25 transition"
                                        >
                                            Pay
                                        </button>
                                    </form>

                                    {balance !== null && (
                                        <div className="mt-6 text-white">
                                            <h3 className="text-2xl">Balance: Rs.{balance}</h3>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="mt-6 text-red-600">
                                            <p>{error}</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
};

export default Bill;
