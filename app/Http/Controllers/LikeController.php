<?php

namespace App\Http\Controllers;
use App\Events\LikeEvent;
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
        broadcast(new likeEvent($reply->id,1))->toOthers();
   }
   public function unlikeIt(Reply $reply){
        $reply->likes()->where('user_id',auth()->id())->first()->delete();
        broadcast(new LikeEvent($reply->id,0))->toOthers();
   }
}
