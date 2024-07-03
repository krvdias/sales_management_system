<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;
use Inertia\Inertia;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $materialId = $request->input('material_id');
        $quantity = $request->input('quantity');
        $material = Material::find($materialId);

        if (!$material) {
            return redirect()->route('Materials.show')->withErrors(['message' => 'Material not found.']);
        }

        $cart = session()->get('cart', []);

        if (isset($cart[$materialId])) {
            // Item already exists in cart, update quantity
            $cart[$materialId]['quantity'] += $quantity;
            $cart[$materialId]['total_price'] = $cart[$materialId]['unit_price'] * $cart[$materialId]['quantity'];

        } else {
            // Add new item to cart
            $cart[$materialId] = [
                'material_id' => $material->id,
                'name' => $material->name,
                'quantity' => $quantity,
                'unit_price' => $material->price,
                'total_price' => $material->price * $quantity,
                'image' => $material->image,
            ];
        }

        session()->put('cart', $cart);

        return redirect()->route('cart.index')->with('success', 'Material added to cart successfully!');
    }

    public function index()
    {
        $cart = session()->get('cart', []);
        $cartItems = array_values($cart);

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'items.*.material_id' => 'required|exists:materials,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);

        foreach ($request->items as $item) {
            if (isset($cart[$item['material_id']])) {
                $cart[$item['material_id']]['quantity'] = $item['quantity'];
                $cart[$item['material_id']]['total_price'] = $cart[$item['material_id']]['unit_price'] * $item['quantity'];
            }
        }

        session()->put('cart', $cart);

        return redirect()->route('cart.index');
    }

    public function remove($materialId)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$materialId])) {
            unset($cart[$materialId]);
            session()->put('cart', $cart);
        }

        return redirect()->route('cart.index');
    }
}
