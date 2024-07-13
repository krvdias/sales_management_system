<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Material;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvoiceMail2;
use App\Mail\LowQuantityNotification2;


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
            'invoiceNumber' => 'string | required',
            'deliveryCharge' => 'required',
            'totalPrice' => 'required|numeric',
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

            $material = Material::find($item['material_id']);
            $storeQuantity = $material->quantity;
            $storeQuantity -= $item['quantity'];

            $material->update(['quantity' => $storeQuantity]);

            if ($storeQuantity == 0 || $storeQuantity < 0) {
                $material->update(['status' => 'empty']);
            }

            if ($material->quantity < 10) {
                $lowQuantityMaterials[] = $material;
            }
            
            $storeQuantity = 0;
        }
        
        $totalAmount += $request->input('deliveryCharge');

        $order->update(['total_amount' => $totalAmount]);

        session()->forget('cart');

        if (!empty($lowQuantityMaterials)) {
            $this->sendLowQuantityNotification($lowQuantityMaterials);
        }

        $deliveryCharge = $request->deliveryCharge;
        $auth = Auth::user()->name;

         // Send the email
        Mail::to(Auth::user()->email)->send(new InvoiceMail2($auth, $order, $items, $totalAmount, $deliveryCharge));

        return redirect()->route('checkout.success');
    }

    private function sendLowQuantityNotification($lowQuantityMaterials)
    {
        $adminsAndAgents = User::whereIn('role', ['admin', 'agent'])->get(); 

        foreach ($adminsAndAgents as $user) {
            Mail::to($user->email)->send(new LowQuantityNotification2($lowQuantityMaterials, $user));
        }
    }

}
