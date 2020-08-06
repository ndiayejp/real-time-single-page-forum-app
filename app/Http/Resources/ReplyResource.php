<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ReplyResource extends JsonResource
{
    /**
     * Transform the resource collection into an array
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            =>  $this->id,
            'reply'         =>  $this->content,
            'user'          =>  $this->user->name,
            'user_id'       =>  $this->user_id,
            'question_slug' =>  $this->question->slug,
            'like_count'    =>  $this->likes->count(),
            'liked'         =>  !! $this->likes->where('user_id',auth()->id())->count(),
            'created_at'    =>  $this->created_at->diffForHumans()
        ];
    }
}
