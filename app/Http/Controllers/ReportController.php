<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // Basic summaries
        $totalOrders = Order::count();
        $totalSuccess = Order::where('status', 'success')->sum('total_amount');
        $totalPending = Order::where('status', 'pending')->sum('total_amount');
        $totalCustomers = User::where('role', 'customer')->count();
        $totalAdmins = User::where('role', 'admin')->count();
        $totalAgents = User::where('role', 'agent')->count();

        // Date range for reports
        $startDate = $request->input('start_date', Carbon::now()->subMonth()->format('Y-m-d'));
        $endDate = $request->input('end_date', Carbon::now()->format('Y-m-d'));

        // Sales Reports
        $totalSales = Order::whereBetween('created_at', [$startDate, $endDate])->sum('total_amount');
        $salesByCategory = DB::table('order_items')
            ->join('materials', 'order_items.material_id', '=', 'materials.id')
            ->select('materials.category', DB::raw('SUM(order_items.total_price) as total_sales'))
            ->whereBetween('order_items.created_at', [$startDate, $endDate])
            ->groupBy('materials.category')
            ->get();

        $salesByPaymentMethod = Order::select('payment', DB::raw('COUNT(*) as count'), DB::raw('SUM(total_amount) as total_sales'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('payment')
            ->get();

        // User Reports
        $activeUsers = User::where('status', 'active')->count();
        $userRegistrations = User::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->get();

        $usersByRole = User::select('role', DB::raw('COUNT(*) as count'))
            ->groupBy('role')
            ->get();

        // Material Reports (formerly Product Reports)
        $inventoryStatus = Material::all();
        $mostSoldMaterials = DB::table('order_items')
            ->select('material_id', DB::raw('SUM(quantity) as total_sold'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('material_id')
            ->orderBy('total_sold', 'desc')
            ->get()
            ->map(function ($item) {
                $material = Material::find($item->material_id);
                $totalCost = $material->buy_price * $item->total_sold; // Calculate total cost
                return [
                    'name' => $material->name,
                    'total_sold' => $item->total_sold,
                    'buy_price' => $material->buy_price,
                    'total_cost' => $totalCost,
                ];
            });

        // Calculate total cost for all materials sold
        $totalCost = $mostSoldMaterials->sum('total_cost');

        // Calculate total income (totalSales - totalCost)
        $totalIncome = $totalSales - $totalCost;

        $lowStockMaterials = Material::where('quantity', '<', 10)->get();

        // Order Reports
        $ordersByStatus = Order::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $averageOrderValue = Order::average('total_amount');

        return Inertia::render('reports/index', [
            'totalOrders' => $totalOrders,
            'totalSuccess' => $totalSuccess,
            'totalPending' => $totalPending,
            'totalCustomers' => $totalCustomers,
            'totalAdmins' => $totalAdmins,
            'totalAgents' => $totalAgents,
            'totalSales' => $totalSales,
            'salesByCategory' => $salesByCategory,
            'salesByPaymentMethod' => $salesByPaymentMethod,
            'activeUsers' => $activeUsers,
            'userRegistrations' => $userRegistrations,
            'usersByRole' => $usersByRole,
            'inventoryStatus' => $inventoryStatus,
            'mostSoldMaterials' => $mostSoldMaterials,
            'lowStockMaterials' => $lowStockMaterials,
            'ordersByStatus' => $ordersByStatus,
            'averageOrderValue' => $averageOrderValue,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'totalIncome' => $totalIncome,
        ]);
    }

    public function generateReport(Request $request)
    {
        //
    }
}
