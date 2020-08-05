<template>
    <div class="col-md-12">
        <router-link :to="data.path" class="question">
            <div class="card shadow-sm mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card-title"><h4>{{data.name}}</h4></div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex justify-content-end">
                                <div class="mr-1 btn btn-sm btn-primary"> {{data.category}}</div>
                                <div class="ml-1 btn btn-danger btn-sm "> <strong>{{data.reply_count}} réponses</strong></div>
                            </div>
                        </div>
                    </div>

                    <p class="card-text"><small class="text-muted">{{data.created_at}}</small></p>
                    <p class="card-text"> {{data.content}}</p>

                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {

        }
    }
}
</script>
<style>
a.question{
    text-decoration:none;
    color:#333
}
a.question:hover .card-title{
    color:blue
}
</style>
