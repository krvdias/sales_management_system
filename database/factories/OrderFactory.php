<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'invoice_no' => $this->faker->randomNumber(),
            'user_id' => $this->faker->randomNumber(),
            'total_amount' => $this->faker->randomFloat(2, 10, 1000),
        ];
    }
}
