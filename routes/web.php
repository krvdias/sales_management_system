<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\BillerController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\HeaderController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MaterialController;



Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware('guest')
    ->name('password.request');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.update');


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/Materials', [MaterialController::class, 'show'])->name('Materials.show');
Route::get('/About', [HeaderController::class, 'index'])->name('About.index');
Route::get('/Contacts', [HeaderController::class, 'view'])->name('Contacts.view');
Route::post('/contact', [ContactController::class, 'send']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/welcome', function () {
        return Inertia::render('Welcome');
    })->name('welcome');

    Route::get('/dashboard', function () {
        $user = Auth::user();
        if ($user->role === 'admin') {
            return Inertia::render('admin/Dashboard');
        } elseif ($user->role === 'agent') {
            return Inertia::render('agent/Dashboard');
        } else {
            return Inertia::render('Welcome');
        }
    })->name('dashboard');

    Route::post('/checkout/place', [OrderController::class, 'place'])->name('checkout.place');
    Route::get('/checkout/success', [OrderController::class, 'success'])->name('checkout.success');

    Route::get('/checkout/add', [CheckoutController::class, 'add'])->name('checkout.add');
    Route::get('/checkout/show', [CheckoutController::class, 'show'])->name('checkout.show');
    Route::post('/checkout/store', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('/cart/{material_id}', [CartController::class, 'update'])->name('cart.update');
    Route::post('/cart/remove/{material_id}', [CartController::class, 'remove'])->name('cart.remove');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('admin/Dashboard', [
                'customerCount' => User::where('role', 'customer')->count(),
                'adminCount' => User::where('role', 'admin')->count(),
                'agentCount' => User::where('role', 'agent')->count(),
                'orderCount' => Order::count(),
                'totalIncome' => Order::where('status', 'success')->sum('total_amount'),
                'pendingIncome' => Order::where('status', 'pending')->sum('total_amount'),
            ]);
        }
    })->name('admin/dashboard');

    //for customers
    Route::get('/CustomerList', [CustomerController::class, 'index'])->name('CustomerList.index');
    Route::get('/AddCustomer', [CustomerController::class, 'create'])->name('AddCustomer.create');
    Route::post('/AddCustomer', [CustomerController::class, 'store'])->name('AddCustomer.store');
    Route::post('/CustomerList/{customer}', [CustomerController::class, 'update'])->name('CustomerList.update');
    Route::delete('/CustomerList/{customer}', [CustomerController::class, 'destroy'])->name('CustomerList.destroy');

    //for admins
    Route::get('/AdminList', [AdminController::class, 'index'])->name('AdminList.index');
    Route::get('/AddAdmin', [AdminController::class, 'create'])->name('AddAdmin.create'); //both admin and agents
    Route::post('/AddAdmin', [AdminController::class, 'store'])->name('AddAdmin.store'); //both admin and agents
    Route::post('/AdminList/{admin}', [AdminController::class, 'edit'])->name('AdminList.edit');
    Route::delete('/AdminList/{admin}', [AdminController::class, 'delete'])->name('AdminList.delete');

    //for agents
    Route::get('/AgentList', [AgentController::class, 'open'])->name('AgentList.open');
    Route::post('/AgentList/{agent}', [AgentController::class, 'change'])->name('AgentList.change');
    Route::delete('/AgentList/{agent}', [AgentController::class, 'del'])->name('AgentList.del');

    //materials
    Route::get('/MaterialList', [MaterialController::class, 'create'])->name('MaterialList.create');
    Route::get('/AddMaterial', [MaterialController::class, 'index'])->name('AddMaterial.index');
    Route::post('/AddMaterial', [MaterialController::class, 'store'])->name('AddMaterial.store');
    Route::post('/MaterialList/{material}', [MaterialController::class, 'edit'])->name('MaterialList.edit');
    Route::delete('/MaterialList/{material}', [MaterialController::class, 'delete'])->name('MaterialList.delete');

    //orders
    Route::get('/orders', [OrderController::class, 'indexs'])->name('orders.indexs');
    Route::get('/orders/{order}', [OrderController::class, 'getItems'])->name('orders.item');
    Route::post('/orders/{order}', [OrderController::class, 'update'])->name('orders.updates');

    //for reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::post('/reports/generate', [ReportController::class, 'generateReport'])->name('reports.generate');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/agent/dashboard', function () {
        if (Auth::user()->role === 'agent')
        {
            return Inertia::render('agent/Dashboard', [
                'customers' => User::where('role', 'customer')->count(),
                'admins' => User::where('role', 'admin')->count(),
                'agents' => User::where('role', 'agent')->count(),
                'orders' => Order::count(),
                'totalIncome' => Order::where('status', 'success')->sum('total_amount'),
                'pendingIncome' => Order::where('status', 'pending')->sum('total_amount'),
            ]);
        }
    })->name('agent/dashboard');

    Route::get('agent/Customers', [CustomerController::class, 'open'])->name('agent/Customers.open');
    Route::get('agent/CustomerAdd', [CustomerController::class, 'generate'])->name('agent/CustomerAdd.generate');
    Route::post('agent/CustomerAdd', [CustomerController::class, 'place'])->name('agent/CustomerAdd.place');
    Route::post('agent/Customers/{customer}', [CustomerController::class, 'regene'])->name('agent/Customers.regene');
    Route::delete('agent/Customers/{customer}', [CustomerController::class, 'del'])->name('agent/Customers.del');

    //materials
    Route::get('agent/MaterialList', [MaterialController::class, 'creates'])->name('MaterialList.creates');
    Route::get('agent/AddMaterial', [MaterialController::class, 'indexs'])->name('AddMaterial.indexs');
    Route::post('agent/AddMaterial', [MaterialController::class, 'stores'])->name('AddMaterial.stores');
    Route::post('agent/MaterialList/{material}', [MaterialController::class, 'edits'])->name('MaterialList.edits');
    Route::delete('agent/MaterialList/{material}', [MaterialController::class, 'deletes'])->name('MaterialList.deletes');
    

    Route::get('agent/orders', [OrderController::class, 'index'])->name('agent/orders.index');
    Route::get('agent/orders/{order}', [OrderController::class, 'getOrderItems'])->name('agent/orders.items');
    Route::post('agent/orders/{order}', [OrderController::class, 'updateStatus'])->name('orders.update');

    Route::get('bill/{invoiceNo}', [BillerController::class, 'search'])->name('bill.search');
    Route::get('bill', [BillerController::class, 'view'])->name('bill.view');
    Route::get('bill/update/{invoiceNo}', [BillerController::class, 'updatePaymentStatus'])->name('bill.update');

});


// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test-email', function () {
    Mail::raw('This is a test email', function ($message) {
        $message->to('k.r.v.dias@gmail.com')
                ->subject('Test Email');
    });
    return 'Email sent!';
});

require __DIR__.'/auth.php';
