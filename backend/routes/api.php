<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'items'], function() {
    Route::get('/', 'ItemController@index');
});

Route::group(['prefix' => 'points'], function() {
    Route::post('/', 'PointController@create');
    Route::get('/', 'PointController@index');
    Route::get('/{id}', 'PointController@show');
});