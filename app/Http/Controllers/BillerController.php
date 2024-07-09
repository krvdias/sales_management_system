<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Inertia\Inertia;

use Illuminate\Http\Request;

class BillerController extends Controller
{
    public function search($invoiceNo)
    {
        $order = Order::where('invoice_no', $invoiceNo)->first(); 
        
        if ($order) {
            return Inertia::render('agent/Bill', [
                'order' => $order,
            ]);
        } else {
            return redirect()->route('Bill.view')->with('error', 'Order not found.');
        }
    }

    public function updatePaymentStatus ( $invoice_no)
    {
        $order = Order::where('invoice_no', $invoice_no)->first();

        if ($order) {
            $order->update(['status' => 'success']);
            return redirect()->route('Bill.view')->with('success', 'Payment status updated successfully.');
        } else {
            return redirect()->route('Bill.view')->with('error', 'Order not found.');
        }
    }



    public function view()
    {   
        return Inertia::render('agent/BillerSystem');
    }
}
