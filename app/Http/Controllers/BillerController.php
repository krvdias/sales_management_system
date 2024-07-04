<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Inertia\Inertia;

use Illuminate\Http\Request;

class BillerController extends Controller
{
    public function search($invoiceNo)
    {
        $order = Order::where('invoice_no', $invoiceNo)->get();
        return Inertia::route('agent/BillerSystem',[
            'total_amount' => $order->total_amount,
        ]);
    }
}
