<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['invoice_no','user_id', 'total_amount','payment', 'status'];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
