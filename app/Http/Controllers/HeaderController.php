<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class HeaderController extends Controller
{
    public function index()
    {
        return Inertia::render('About');
    }

    public function view()
    {
        return Inertia::render('Contacts');
    }
}
