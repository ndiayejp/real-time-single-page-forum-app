<?php

namespace App\Model;

use App\User;
use App\Model\Reply;
use App\Model\Category;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['name','content','category_id','user_id','slug'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function replies(){
        return $this->hasMany(Reply::class)->latest();
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function getRouteKeyName(){
        return "slug";
    }

    public function getPathAttribute(){
        return "question/$this->slug";
    }
}
