<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgentController extends Controller
{
    public function open()
    {
        $agents = User::where('role', 'agent')->get();
        return Inertia::render('AgentList', ['agents' => $agents]);
    }

    // Update the specified Admin in storage.
    public function change(Request $request, User $agent)
    {
        $agent->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('AgentList.open');
    }

    // Remove the specified Admin from storage.
    public function del(User $agent)
    {
        $agent->delete();

        return redirect()->route('AgentList.open');
    }
}
