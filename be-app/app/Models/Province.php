<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{

    protected $table = 'reg_provinces';

    public function regencies()
    {
        return $this->hasMany(Regency::class);
    }
}
