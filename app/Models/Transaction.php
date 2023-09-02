<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public const EXPENSE = 'expense';
    public const INCOME = 'income';
    public const TYPES = [self::EXPENSE, self::INCOME];

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
