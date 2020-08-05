<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Model\Category;
use App\Model\Question;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Question::class, function (Faker $faker) {
    $title = $faker->sentence;
    return [
        "name"=>$title,
        "slug"=>Str::slug($title),
        "content"=>$faker->text,
        "category_id"=>function(){
            return Category::all()->random();
        },
        "user_id"=>function(){
            return User::all()->random();
        }
    ];
});
