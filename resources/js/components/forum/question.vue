<template>
    <router-link :to="data.path" class="question">
        <div class="card shadow-sm mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                         <div class="d-flex justify-content-between">
                             <div class="card-title"><h4>{{data.name}}</h4></div>
                            <div class="text-muted"><small>{{data.created_at}}</small></div>
                            <div>
                                <div class="mr-1 btn btn-sm btn-outline-secondary"> {{data.category}}</div>
                                <button class="ml-1 btn btn-info btn-sm text-white">{{data.reply_count}} <font-awesome-icon :icon="['fas', 'reply']" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="card-text" v-html="data.content"></p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props:['data']
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
