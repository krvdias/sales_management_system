<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;


use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Send the email
        Mail::to('krvishandias@gmail.com')->send(new ContactFormMail($request->all()));

        return redirect()->back()->with('success', 'Your message has been sent successfully!');
    }
}
