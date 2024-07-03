<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Material;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function place(Request $request)
    {
        $request->validate([
            'material_id' => 'required|exists:materials,id',
            'quantity' => 'required|integer',
            'paymentMethod' => 'required',
            'invoiceNumber' => 'string | required'
        ]);

        $material = Material::find($request->material_id);
        $quantity = $request->quantity;
        $totalPrice = $material->price * $quantity;
        $storeQuantity = $material->quantity;

        $order = Order::create([
            'invoice_no' => $request->input('invoiceNumber'),
            'user_id' => Auth::id(),
            'total_amount' => $totalPrice + 50,
            'payment' => $request->input('paymentMethod'),
            'status' => 'pending'
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'material_id' => $request->input('material_id'),
            'quantity' => $request->input('quantity'),
            'unit_price' => $material->price,
            'total_price' => $totalPrice + 50,
        ]);

        $storeQuantity -= $request->input('quantity');
        $material->update(['quantity' => $storeQuantity]);

        return redirect()->route('checkout.success');
    }

    public function success() {
        return Inertia::render('CheckoutSuccess');
    }

    public function index()
    {
        $orders = Order::all();

        return Inertia::render('agent/OrderView', ['orders' => $orders]);
    }

    public function getOrderItems(Order $order)
    {
        $orderItems = OrderItem::where('order_id', $order->id)->get();

        return $orderItems->map(function ($orderItem) {
            return [
                'id' => $orderItem->id,
                'product_name' => $orderItem->material_id, // Example: Assuming there's a product relationship
                'quantity' => $orderItem->quantity,
                'unit_price' => $orderItem->unit_price,
                'total_price' => $orderItem->total_price,
            ];
        });
    }

    public function updateStatus(Request $request,Order $order)
    {
        // Validate the request

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->route('agent/orders.index')->with('message', 'Order status updated successfully');
    }
}
