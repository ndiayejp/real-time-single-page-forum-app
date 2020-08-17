<template>
  <div>
      <font-awesome-icon :icon="['fas', 'heart']" size="lg" :style="{ color,cursor:'pointer' }" @click="likeIt" />
      <strong>{{count}}</strong>
  </div>
</template>

<script>
export default {
    props:['reply'],
    data(){
        return{
            liked   :   this.reply.liked,
            count   :   this.reply.like_count
        }
    },
    computed:{
        color(){
            return this.liked ? '#b91d19' : '#ea8a87'
        }
    },
    created(){
        Echo.channel('likeChannel')
        .listen('LikeEvent', (e) => {
            console.log(e)
            if(this.reply.id == e.id){
                e.type==1 ? this.count ++ : this.count --
            }
        });
    },
    methods:{
        likeIt(){
            if(User.loggedIn()){
                this.liked ? this.decr() : this.incr()
                this.liked = !this.liked
            }
        },
        incr(){
            axios.post(`/api/like/${this.reply.id}`)
            .then(()=>{
                this.count ++
            })
        },
        decr(){
            axios.delete(`/api/like/${this.reply.id}`)
            .then(()=>{
                this.count --
            })
        }
    }
}
</script>

<style>

</style>
