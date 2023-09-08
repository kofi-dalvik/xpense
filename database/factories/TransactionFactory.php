<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
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
        $user = User::where('email', 'test@test.com')->first();

        return [
            'user_id' => $user->id,
            'category_id' => $this->faker->numberBetween(1, $count),
            'description' => $this->faker->sentence(random_int(2, 6)),
            'date' => $this->faker->dateTimeBetween('-3 month', 'now'),
            'amount' => $this->faker->randomFloat(2, 0, 1000),
            'type' => $this->faker->randomElement(Transaction::TYPES),
        ];
    }
}
