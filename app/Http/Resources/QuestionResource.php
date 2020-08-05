<?php

namespace App\Http\Resources;

use App\Http\Resources\ReplyResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name'        =>    $this->name,
            'slug'        =>    $this->slug,
            'path'        =>    $this->path,
            'content'        =>    $this->content,
            'replies'     =>    ReplyResource::collection($this->replies),
            'reply_count' =>    $this->replies->count(),
            'created_at'  =>    $this->created_at->diffForHumans(),
            'user'        =>    $this->user->name,
            'user_id'     =>    $this->user_id,
            'category'    =>    $this->category->name,
            'category_id'=>$this->category->id
        ];
    }
}
