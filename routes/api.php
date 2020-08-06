<?php


use Illuminate\Support\Facades\Route;


Route::apiResource('/question','questionController');
Route::apiResource('/category', 'CategoryController');
Route::apiResource('/question/{question}/reply','ReplyController');

Route::get('/getcat','CategoryController@getCats');

Route::post('/like/{reply}','likeController@likeIt');
Route::delete('/like/{reply}','likeController@unlikeIt');

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::post('payload','AuthController@payload');

});
