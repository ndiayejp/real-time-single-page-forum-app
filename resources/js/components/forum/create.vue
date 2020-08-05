<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card shadow-sm mb-2">
                    <div class="card-body">
                          <h4 class="card-title">Ajouter une question</h4>
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
                                  <vue-simplemde v-model="form.content" ref="markdownEditor" />
                              </div>
                              <div class="form-group">
                                   <button type="submit" class="btn btn-dark text-white">
                                        Ajouter le sujet
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
            .then((res)=> this.$router.push(res.data.path)).catch(err=>{
               this.errors = err.response.data.errors
            })
        }
    }
}
</script>
