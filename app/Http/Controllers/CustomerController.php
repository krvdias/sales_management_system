<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
class CustomerController extends Controller
{
    //for admin
    public function index()
    {
        $customers = User::where('role', 'customer')->get();
        return Inertia::render('CustomerList', ['customers' => $customers]);
    }

    public function create()
    {
        return Inertia::render('AddCustomer');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => 'required|string|min:8',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        event(new Registered($user));

        return redirect()->route('CustomerList.index');
    }

    // Update the specified customer in storage.
    public function update(Request $request, User $customer)
    {
        $customer->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('CustomerList.index');
    }

    // Remove the specified customer from storage.
    public function destroy(User $customer)
    {
        $customer->delete();

        return redirect()->route('CustomerList.index');
    }


    //for agent
    public function open()
    {
        $customers = User::where('role', 'customer')->get();
        return Inertia::render('agent/Customer', ['customers' => $customers]);
    }

    public function generate()
    {
        return Inertia::render('agent/CustomerAdd');
    }

    public function place(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => 'required|string|min:8',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        event(new Registered($user));

        return redirect()->route('agent/Customers.open');
    }

    // Update the specified customer in storage.
    public function regene(Request $request, User $customer)
    {
        $customer->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('agent/Customers.open');
    }

    // Remove the specified customer from storage.
    public function del(User $customer)
    {
        $customer->delete();

        return redirect()->route('agent/Customers.open');
    }
}
