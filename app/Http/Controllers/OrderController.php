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

        if ($storeQuantity == 0 || $storeQuantity < 0) {
            $material->update(['status' => 'empty']);
        }

        return redirect()->route('checkout.success');
    }

    public function success() {
        return Inertia::render('CheckoutSuccess');
    }

    //for agent
    public function index()
    {
        $orders = Order::all();

        return Inertia::render('agent/OrderView', [
            'orders' => $orders, 
        ]);
    }

    public function getOrderItems(Order $order)
    {
        $orderItems = OrderItem::where('order_id', $order->id)->get();

        return Inertia::render('agent/OrderView', [
            'orderItems' => $orderItems
        ]);
    }

    public function updateStatus(Request $request,Order $order)
    {
        // Validate the request

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->route('agent/orders.index')->with('message', 'Order status updated successfully');
    }

    //for admin
    public function indexs()
    {
        $orders = Order::all();

        return Inertia::render('ViewOrder', [
            'orders' => $orders, 
        ]);
    }

    public function getItems(Order $order)
    {
        $orderItems = OrderItem::where('order_id', $order->id)->get();

        return Inertia::render('ViewOrder', [
            'orderItems' => $orderItems
        ]);
    }

    public function update(Request $request,Order $order)
    {
        // Validate the request

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->route('orders.indexs')->with('message', 'Order status updated successfully');
    }
}
