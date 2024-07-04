import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AgentLayout from '@/Layouts/AgentLayout';
import { Head } from '@inertiajs/react';

export default function BillerSystem({ auth }) {
    const [invoiceNo, setInvoiceNo] = useState('');
    const [totalPayment, setTotalPayment] = useState(null);
    const [amountPaid, setAmountPaid] = useState('');
    const [balance, setBalance] = useState(null);
    //const [paymentStatus, setPaymentStatus] = useState('');

    const handleInvoiceSearch = (e) => {
        e.preventDefault();
        console.log(`Searching for invoice: ${invoiceNo}`);
        Inertia.get(route('bill.search', invoiceNo))
            .then(response => {
                console.log('Invoice search response:', response);
                const { total_amount } = response.data;
                setTotalPayment(total_amount);
                setBalance(null);
            })
            .catch(error => {
                console.error('Error searching invoice:', error);
            });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        console.log(`Processing payment: ${amountPaid}`);
        const paid = parseFloat(amountPaid);
        const total = parseFloat(totalPayment);
        if (paid >= total) {
            alert('Payment Successful');
            setBalance(paid - total);
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

                            {totalPayment !== null && (
                                <>
                                    <div className="mb-6 text-white">
                                        <h3 className="text-2xl">Total Payment: Rs.{totalPayment}.00</h3>
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
                                        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                                            Pay
                                        </button>
                                    </form>

                                    {balance !== null && (
                                        <div className="mt-6 text-white">
                                            <h3 className="text-2xl">Balance: Rs.{balance}.00</h3>
                                        </div>
                                    )}

                                    {/*{paymentStatus && (
                                        <div className="mt-6 text-white">
                                            <h3 className="text-2xl">{paymentStatus}</h3>
                                        </div>
                                    )}*/}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
};
