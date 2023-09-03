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

    public const DAILY = 'daily';
    public const WEEKLY = 'weekly';
    public const MONTHLY = 'monthly';
    public const YEARLY = 'yearly';

    public const RECUR_TYPES = [
        self::DAILY,
        self::WEEKLY,
        self::MONTHLY,
        self::YEARLY,
    ];

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeWhereCategory($query, $category_id)
    {
        return $query->where(function ($query) use ($category_id) {
            $query->where('category_id', $category_id)
                ->orWhereHas('category', function ($query) use ($category_id) {
                    $query->where('parent_id', $category_id);
                });
        });
    }
}
