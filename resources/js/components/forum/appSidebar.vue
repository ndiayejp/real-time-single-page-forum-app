<template>
    <div>
        <ul class="list-group ">
            <li class="list-group-item d-flex justify-content-between align-items-center border" v-for="cat in categories" :key="cat.name">
                {{cat.name}}
                <span class="badge badge-info text-white badge-pill">{{cat.questions}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            categories:{}
        }
    },
    created(){
        this.loadCats()
    },
    methods:{
       loadCats(){
            axios.get('/api/category')
            .then((res)=>{
                this.categories = res.data.data
            }).catch(err=>Exception.handle(err))
        },
    }
}
</script>
