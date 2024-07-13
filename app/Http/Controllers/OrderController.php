<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Material;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\Mail;
use App\Mail\LowQuantityNotification; 

class OrderController extends Controller
{
    public function place(Request $request)
    {
        $request->validate([
            'material_id' => 'required|exists:materials,id',
            'quantity' => 'required|integer',
            'paymentMethod' => 'required',
            'invoiceNumber' => 'string | required',
            'deliveryCharge' => 'required'
        ]);

        $material = Material::find($request->material_id);
        $quantity = $request->quantity;
        $totalPrice = $material->price * $quantity + $request->deliveryCharge;
        $storeQuantity = $material->quantity;
        $invoiceNumber = $request->invoiceNumber;
        $auth = $request->user();
        

        $order = Order::create([
            'invoice_no' => $request->input('invoiceNumber'),
            'user_id' => Auth::id(),
            'total_amount' => $totalPrice,
            'payment' => $request->input('paymentMethod'),
            'status' => 'pending'
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'material_id' => $request->input('material_id'),
            'quantity' => $request->input('quantity'),
            'unit_price' => $material->price,
            'total_price' => $totalPrice,
        ]);

        $storeQuantity -= $request->input('quantity');
        $material->update(['quantity' => $storeQuantity]);

        if ($storeQuantity == 0 || $storeQuantity < 0) {
            $material->update(['status' => 'empty']);
        }

        if ($material->quantity < 10) { 
            $this->sendLowQuantityNotification($material);
        }

        $delevary = $request->deliveryCharge;
        $payment = $request->input('paymentMethod');
        // Send email
        Mail::to($auth->email)->send(new InvoiceMail($auth, $material, $quantity, $invoiceNumber,$delevary, $totalPrice, $payment));

        return redirect()->route('checkout.success');
        
    }

    public function success() {
        return Inertia::render('CheckoutSuccess');
    }

    //for agent
    public function index()
    {
        $orders = Order::with('user')->get();

        return Inertia::render('agent/OrderView', [
            'orders' => $orders, 
        ]);
    }

    public function getOrderItems(Order $order)
    {
        $orderItems = OrderItem::where('order_id', $order->id)->with('material')->get();

        return Inertia::render('agent/OrderItemView', [
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
        $orders = Order::with('user')->get();

        return Inertia::render('ViewOrder', ['orders' => $orders]);
    }

    public function getItems(Order $order)
    {
        $orderItems = OrderItem::where('order_id', $order->id)->with('material')->get();

        
        return Inertia::render('ViewOrderItems', [
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

    private function sendLowQuantityNotification(Material $material)
    {
        $adminsAndAgents = User::whereIn('role', ['admin', 'agent'])->get(); 

        foreach ($adminsAndAgents as $user) {
            Mail::to($user->email)->send(new LowQuantityNotification($material, $user));
        }
    }
}
