<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card shadow-sm mb-2">
                    <div class="card-body">
                        <form @submit.prevent = "update">
                            <div class="form-group">
                                <label for="name">Sujet</label>
                                <input type="text" v-model="form.name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="name">Catégorie</label>
                                <select v-model="form.category_id" class="form-control">
                                    <option value="">Choisissez une catégorie</option>
                                    <option v-for="(cat,index) in categories" :key="cat.id"
                                     :selected="index === data.category_id ? 'selected' : ''"
                                    :value="cat.id">{{cat.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="content">Contenu</label>
                                <markdown-editor  v-model="form.content" ref="markdownEditor"></markdown-editor>
                            </div>
                            <div class="form-group">
                                    <button type="submit" class="btn btn-success text-white">
                                        <font-awesome-icon :icon="['fas', 'save']" /> Enregistrer
                                    </button>
                                    <button type="submit" class="btn btn-dark text-white" @click="cancel">
                                        <font-awesome-icon :icon="['fas', 'times']" /> Annuler
                                    </button>
                              </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import markdownEditor  from 'vue-simplemde'
    export default {
        props:['data'],
        data(){
            return{
                form:{
                    name        :null,
                    content     :null,
                    category_id :null
                },
                categories:{},
            }
        },
        mounted(){
            this.form = this.data
            this.loadCats()
         },
        components:{
            markdownEditor
        },
        methods:{
            cancel(){
                EventBus.$emit('cancelEdit', this.data.content)
            },
            update(){
                axios.patch(`/api/question/${this.data.slug}`,this.form)
                .then((res)=>{
                    this.cancel()
                }).catch((err)=>{
                    console.log(err)
                })
            },
            loadCats(){
                axios.get('/api/category')
                .then((res)=>{
                    this.categories = res.data.data
                }).catch((err)=>{
                    console.log(err)
                })
            },
        }
    }
</script>
