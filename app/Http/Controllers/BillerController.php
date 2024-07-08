<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Inertia\Inertia;

use Illuminate\Http\Request;

class BillerController extends Controller
{
    public function search($invoiceNo)
    {
        $order = Order::where('invoice_no', $invoiceNo)->first(); // Use first() to get a single instance
        
        if ($order) {
            $totalamount = $order->pluck('total_amount');

            return Inertia::render('agent/BillerSystem', [
                'total_amount' => $totalamount
            ]);
        } 
    }


    public function view()
    {   
        return Inertia::render('agent/BillerSystem');
    }
}
