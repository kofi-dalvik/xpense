<?php

use App\Models\Category;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $categories = [
            ['name' => 'Food', 'icon' => 'mdi-food', 'color' => 'text-primary'],
            ['name' => 'Transportation', 'icon' => 'mdi-car', 'color' => 'text-secondary'],
            ['name' => 'Shopping', 'icon' => 'mdi-shopping', 'color' => 'text-success'],
            ['name' => 'Entertainment', 'icon' => 'mdi-gamepad-variant', 'color' => 'text-warning'],
            ['name' => 'Health', 'icon' => 'mdi-heart-pulse', 'color' => 'text-danger'],
            ['name' => 'Education', 'icon' => 'mdi-school', 'color' => 'text-info'],
            ['name' => 'Investment', 'icon' => 'mdi-bank', 'color' => 'text-dark']
        ];

        foreach ($categories as $index => $category) {
            Category::create([
                'name' => $category['name'],
                'order' => $index,
                'ui' => [
                    'icon' => $category['icon'],
                    'color' => $category['color']
                ]
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
