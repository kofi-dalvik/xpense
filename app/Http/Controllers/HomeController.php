<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->check()) {
            return Redirect::route('dashboard');
        }
        
        return Inertia::render('Welcome');
    }
}
