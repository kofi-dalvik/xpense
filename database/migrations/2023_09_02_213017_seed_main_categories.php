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
            ['name' => 'Income', 'icon' => 'mdi-cash-multiple', 'color' => 'success'],
            ['name' => 'Food', 'icon' => 'mdi-food', 'color' => 'pink'],
            ['name' => 'Transportation', 'icon' => 'mdi-car', 'color' => 'secondary'],
            ['name' => 'Shopping', 'icon' => 'mdi-shopping', 'color' => 'indigo'],
            ['name' => 'Entertainment', 'icon' => 'mdi-gamepad-variant', 'color' => 'warning'],
            ['name' => 'Health', 'icon' => 'mdi-heart-pulse', 'color' => 'danger'],
            ['name' => 'Education', 'icon' => 'mdi-school', 'color' => 'info'],
            ['name' => 'Investment', 'icon' => 'mdi-bank', 'color' => 'dark']
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
