<template>
  <div>
      <font-awesome-icon :icon="['fas', 'heart']" size="lg" :style="{ color,cursor:'pointer' }" @click="likeIt" />{{count}}
  </div>
</template>

<script>
export default {
    props:['reply'],
    data(){
        return{
            liked:this.reply.liked,
            count:this.reply.like_count
        }
    },
    computed:{
        color(){
            return this.liked ? '#b91d19' : '#ea8a87'
        }
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
                this.count++
            })

        },
        decr(){
            axios.delete(`/api/like/${this.reply.id}`)
            .then(()=>{
                this.count--
            })
        }
    }
}
</script>

<style>

</style>
