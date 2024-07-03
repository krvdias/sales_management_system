<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

        // Create agent user
        User::create([
            'name' => 'agent',
            'email' => 'agent@example.com',
            'password' => bcrypt('agent123'),
            'role' => 'agent',
        ]);

        // Create regular user
        User::create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => bcrypt('user123'),
            'role' => 'customer',
        ]);

    }
}
