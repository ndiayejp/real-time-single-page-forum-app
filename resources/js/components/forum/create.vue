<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card shadow-sm mb-2 rounded-0">
                    <div class="card-header">
                        <h4>Ajouter une question</h4>
                    </div>
                    <div class="card-body">

                          <form @submit.prevent="create">
                              <div class="form-group">
                                  <label for="name">Sujet</label>
                                  <input type="text" v-model="form.name" class="form-control">
                              </div>
                              <div class="form-group">
                                  <label for="category">Categorie</label>
                                  <select v-model="form.category_id" class="form-control">
                                      <option value="">Choisissez une catégorie</option>
                                      <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label for="content">Contenu</label>
                                  <markdown-editor v-model="form.content" ref="markdownEditor" ></markdown-editor>
                              </div>
                              <div class="form-group">
                                   <button type="submit" :disabled="!FormIsValid" class="btn btn-success text-white btn-lg rounded-0">
                                         <font-awesome-icon :icon="['fas', 'save']"/>  Enregistrer
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
    data(){
        return {
            form:{
                name:null,
                category_id:null,
                content:null
            },
            categories:{},
            errors:{}
        }
    },
    created(){
        this.loadCats()
    },
    computed:{
        FormIsValid(){
            return this.form.content && this.form.name && this.form.category !==""
        }
    },
    components: {
        markdownEditor
    },
    methods:{
        loadCats(){
            axios.get('/api/category')
            .then((res)=>{
                this.categories = res.data.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        create(){
            axios.post('/api/question',this.form)
            .then((res)=> this.$router.push(res.data.path))
            .catch(err=>Exception.handle(err))
        }
    }
}
</script>
