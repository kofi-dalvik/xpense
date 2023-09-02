<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $params = $this->getDashboardData();

        return Inertia::render('Dashboard/Index', $params);
    }

    public function getDashboardData()
    {
        return [
            'cats' => $this->getCategories(),
            'trans' => $this->getTransactions(),
        ];
    }

    public function getCategories()
    {
        return Category::orderBy('order')->get()->map(function ($cat) {
            $cat->total = random_int(1, 10000);
            return $cat;
        });
    }

    public function getTransactions()
    {
        return Transaction::with('category')->orderBy('date', 'desc')->get();
    }
}
