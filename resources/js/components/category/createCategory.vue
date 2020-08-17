<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card shadow-sm mb-2">
                    <div class="card-header bg-primary mb-3 text-white"><h4 class="mb-0">Ajouter une catégorie</h4></div>
                    <div class="card-body">
                            <div class="alert alert-danger" role="alert" v-if="errors">
                               {{errors.name[0]}}
                            </div>
                            <form @submit.prevent="submit">
                              <div class="form-group">
                                  <label for="name">Nom</label>
                                  <input type="text" v-model="form.name" class="form-control">
                              </div>
                              <div class="form-group">
                                    <button v-if="!editSlug" type="submit" class="btn btn-success btn-lg" :disabled="!form.name">
                                        <font-awesome-icon :icon="['fas', 'save']"/> Enregistrer
                                    </button>
                                     <button v-else type="submit" class="btn btn-dark text-white btn-lg">
                                        <font-awesome-icon :icon="['fas', 'check']"/> Modifier
                                    </button>
                              </div>
                            </form>
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col" class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(category,index) in categories" :key="category.name">
                                        <td>{{category.name}}</td>
                                        <td class="text-right">
                                            <button @click="edit(index)" class="btn btn-sm btn-info text-white">
                                                <font-awesome-icon :icon="['fas', 'pen']"/>
                                            </button>
                                            <button @click="destroy(category.slug,index)" class="btn btn-sm btn-danger">
                                                <font-awesome-icon :icon="['fas', 'trash']"/>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                name:null
            },
            categories:{},
            editSlug:null,
            errors:null
        }
    },
    created(){
        if(!User.loggedIn()){
            return this.$router.push('/forum')
        }
        axios.get('/api/getcat')
        .then((res)=>{
            this.categories = res.data.data
        }).catch((err)=>{
        })
    },
    methods:{
        submit(){
            this.editSlug ? this.update() : this.create()
        },
        destroy(slug,index){
            axios.delete(`/api/category/${slug}`)
            .then(res=> this.categories.splice(index,1))
            .catch((err)=>{
                console.log(err)
            })
        },
        edit(index){
            this.form.name = this.categories[index].name
            this.editSlug= this.categories[index].slug
            this.categories.splice(index,1)
        },
        create(){
            axios.post('/api/category',this.form)
            .then((res)=>{
                this.form.name = ""
                this.categories.unshift(res.data)
            }).catch((err)=>{

                this.errors = err.response.data.errors
            })
        },
        update(){
            axios.patch(`/api/category/${this.editSlug}`,this.form)
            .then((res)=>{
                this.form.name = ""
                this.categories.unshift(res.data)
                this.editSlug = ""
            }).catch((err)=>{ })
        },

    }
}
</script>
