<template>
    <div class="col-md-12">
        <a :href="data.path" class="question">
            <div class="card shadow-sm mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card-title">{{data.name}}</div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex justify-content-end">
                                <span class="mr-1"> {{data.category}}</span>
                                <span class="ml-1 text-primary"> <strong>{{data.reply_count}}</strong></span>
                            </div>
                        </div>
                    </div>

                    <p class="card-text"><small class="text-muted">{{data.created_at}}</small></p>
                    <p class="card-text"> {{data.content}}</p>

                </div>
            </div>
        </a>
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
