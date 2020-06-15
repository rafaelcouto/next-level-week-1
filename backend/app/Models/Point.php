<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Point
 *
 * @property int $id
 * @property string $image
 * @property string $name
 * @property string $email
 * @property string $whatsapp
 * @property float $latitude
 * @property float $longitude
 * @property string $city
 * @property string $uf
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereUf($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Point whereWhatsapp($value)
 * @mixin \Eloquent
 */
class Point extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'email',
        'whatsapp',
        'latitude',
        'longitude',
        'city',
        'uf'
    ];

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Item::class);
    }
    
}
