<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Material;

class MaterialController extends Controller
{
    public function index()
    {
        return Inertia::render('AddMaterials');
    }

    public function indexs()
    {
        return Inertia::render('agent/MaterialAdd');
    }

    public function create()
    {
        $materials = Material::all();
        return Inertia::render('MaterialList', ['materials' => $materials]);
    }

    public function creates()
    {
        $materials = Material::all();
        return Inertia::render('agent/ListMaterials', ['materials' => $materials]);
    }

    public function show()
    {
        $materials = Material::all();
        return Inertia::render('Materials', [
            'materials' => $materials,
        ]);
    }

    public function view() {
        $materials = Material::all();
        return Inertia::render('user/Materials', [
            'materials' => $materials,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:50',
            'description' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'buy_price' => 'required|numeric',
            'image' => 'nullable|mimes:png,jpg,jpeg,webp|max:2048', // Ensure max size for security
            'status' => 'string',
        ]);

        $path = null;
        if ($request->has('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = 'Uploads/Materials/';
            $file->move(public_path($path), $filename);
        }

        Material::create([
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'buy_price' => $request->buy_price,
            'image' => $filename,
        ]);

        return redirect()->route('MaterialList.create')->with('success', 'Material added successfully.');
    }

    public function stores(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:50',
            'description' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'buy_price' => 'required|numeric',
            'image' => 'nullable|mimes:png,jpg,jpeg,webp|max:2048', // Ensure max size for security
            'status' => 'string',
        ]);

        $path = null;
        if ($request->has('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = 'Uploads/Materials/';
            $file->move(public_path($path), $filename);
        }

        Material::create([
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'buy_price' => $request->buy_price,
            'image' => $filename,
        ]);

        return redirect()->route('MaterialList.creates')->with('success', 'Material added successfully.');
    }

    public function edit(Request $request, Material $material)
    {
        $material->update([
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'buy_price' => $request->buy_price,
            'status' => $request->status,
        ]);

        return redirect()->route('MaterialList.create')->with('success', 'Material updated successfully.');
    }

    public function edits(Request $request, Material $material)
    {
        $material->update([
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'buy_price' => $request->buy_price,
            'status' => $request->status,
        ]);

        return redirect()->route('MaterialList.creates')->with('success', 'Material updated successfully.');
    }

    public function delete(Material $material)
    {
        $material->delete();

        return redirect()->route('MaterialList.create')->with('success', 'Material deleted successfully.');
    }

    public function deletes(Material $material)
    {
        $material->delete();

        return redirect()->route('MaterialList.creates')->with('success', 'Material deleted successfully.');
    }

    
}
