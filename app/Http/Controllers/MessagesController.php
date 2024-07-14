<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function index()
    {
        $messages = Message::with('user', 'admin')->get();
        return Inertia::render('Messages/Index', ['messages' => $messages]);
    }

    public function store(Request $request)
    {
        $message = Message::create([
            'user_id' => auth()->id(),
            'admin_id' => $request->admin_id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => $message]);
    }

    public function userChat()
    {
        $messages = Message::where('user_id', auth()->id())->with('user', 'admin')->get();
        return Inertia::render('ChatUser', ['messages' => $messages, 'auth' => auth()->user()]);
    }

    public function adminChat(Request $request)
    {
        $userId = $request->user_id ?? User::first()->id;
        $messages = Message::where('user_id', $userId)->with('user', 'admin')->get();
        $users = User::where('role', 'user')->get();
        return Inertia::render('ChatAdmin', ['messages' => $messages, 'users' => $users, 'auth' => auth()->user()]);
    }

}

