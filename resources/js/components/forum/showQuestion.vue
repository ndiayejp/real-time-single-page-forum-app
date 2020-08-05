<template>
   <div class="container">
        <div class="row">
        <div class="col-md-12">
            <div class="card shadow-sm mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card-title"><h4>{{data.name}}</h4></div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex justify-content-end">
                                <span class="mr-1"> {{data.category}}</span>
                                <div class="ml-1 btn btn-warning btn-sm"> <strong>{{data.reply_count}} réponses</strong></div>
                            </div>
                        </div>
                    </div>

                    <p class="card-text"><small class="text-muted">{{data.created_at}}</small></p>
                    <p v-html="body"></p>

                </div>
                <div class="card-footer d-flex justify-content-between" v-if="owner">
                    <div><button @click="editing" class="btn btn-sm btn-primary">Modifier</button></div>
                    <div><button @click="destroy" class="btn btn-sm btn-danger">Supprimer</button></div>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>

<script>

export default {
    props:['data'],
    data(){
        return{

        }
    },
    computed:{
        body(){
             return md.parse(this.data.content)
        },
        owner(){
            return  User.owner(this.data.user_id)
        }
    },
    methods:{
        destroy(){
            axios.delete(`/api/question/${this.data.slug}`)
            .then((res)=>{
                this.$router.push('/forum')
            }).catch((err)=>{
                console.log(err)
            })
        },
        editing(){
            EventBus.$emit('startEdit')
        }
    }

}
</script>
