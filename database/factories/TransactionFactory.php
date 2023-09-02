<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $count = Category::count();

        return [
            'category_id' => $this->faker->numberBetween(1, $count),
            'title' => $this->faker->sentence(random_int(2, 6)),
            'description' => $this->faker->sentence,
            'date' => $this->faker->dateTime,
            'amount' => $this->faker->randomFloat(2, 0, 1000),
            'type' => $this->faker->randomElement(Transaction::TYPES),
        ];
    }
}
