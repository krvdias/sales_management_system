<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Mail\PaymentSuccessMail;

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
            return redirect()->route('bill.view')->with('error', 'Order not found.');
        }
    }

    public function updatePaymentStatus ( $invoice_no)
    {
        $order = Order::where('invoice_no', $invoice_no)->with('user')->first();


        if ($order) {
            $order->update(['status' => 'success']);
            // Send payment success email
            Mail::to($order->user->email)->send(new PaymentSuccessMail($order));
            return redirect()->route('bill.view')->with('success', 'Payment status updated successfully.');
        } else {
            return redirect()->route('bill.view')->with('error', 'Order not found.');
        }
    }



    public function view()
    {   
        return Inertia::render('agent/BillerSystem');
    }
}
