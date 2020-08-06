<?php

namespace App\Http\Controllers;


use App\Model\Reply;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{

   /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('JWT');
    }

    public function likeIt(Reply $reply){
        $reply->likes()->create(['user_id' => auth()->id()]);
   }
   public function unlikeIt(Reply $reply){
        $reply->likes()->where('user_id',auth()->id())->first()->delete();
   }
}
