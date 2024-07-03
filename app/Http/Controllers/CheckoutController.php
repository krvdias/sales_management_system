<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Material;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function show()
    {
        $order = session()->get('cart', []);
        $orderItems = array_values($order);

        return Inertia::render('CartCheckout', [
            'orderItems' => $orderItems,
        ]);
    }

    public function add(Request $request)
    {
        $material_id = $request->input('material_id');
        $quantity = $request->input('quantity');

        $material = Material::find($material_id);

        return Inertia::render('BuyCheckout', [
            'material' => $material,
            'quantity' => $quantity,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'paymentMethod' => 'required',
            'invoiceNumber' => 'string | required'
        ]);

        $item = session()->get('cart', []);
        $items = array_values($item);
        $userId = Auth::id();

        if (empty($items)) {
            return redirect()->route('Materials.show')->withErrors(['cart' => 'Your cart is empty']);
        }

        $order = Order::create([
            'invoice_no' => $request->input('invoiceNumber'),
            'user_id' => $userId,
            'total_amount' => 0,
            'payment' => $request->input('paymentMethod'),
            'status' => 'pending',
        ]);

        $totalAmount = 0;

        foreach ($items as $item) {
        
            $totalItemPrice = $item['unit_price']* $item['quantity'];

            OrderItem::create([
                'order_id' => $order->id,
                'material_id' => $item['material_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total_price' => $totalItemPrice,
            ]);

            $totalAmount += $totalItemPrice;
        }

        $order->update(['total_amount' => $totalAmount]);

        session()->forget('cart');

        return redirect()->route('checkout.success');
    }

}
