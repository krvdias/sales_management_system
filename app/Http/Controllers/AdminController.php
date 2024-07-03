<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{
    public function index()
    {
        $admins = User::where('role', 'admin')->get();
        return Inertia::render('AdminList', ['admins' => $admins]);
    }

    public function create()
    {
        return Inertia::render('AddAdmin');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => 'required|string|min:8',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'role' => '',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role,
        ]);

        event(new Registered($user));

        return redirect()->route('AddAdmin.store');
    }

    // Update the specified Admin in storage.
    public function edit(Request $request, User $admin)
    {
        $admin->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('AdminList.index');
    }

    // Remove the specified Admin from storage.
    public function delete(User $admin)
    {
        $admin->delete();

        return redirect()->route('AdminList.index');
    }
}
