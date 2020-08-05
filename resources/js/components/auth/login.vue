<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card my-4">
                    <div class="card-body">
                        <h4 class="card-title">Connexion</h4>
                         <form @submit.prevent="signin">
                            <div class="form-group">
                                <label for="email"> E-Mail   </label>
                                <input id="email"  v-model="form.email" type="email" class="form-control" required   autofocus>
                            </div>
                            <div class="form-group">
                                <label for="email">Mot de passe</label>
                                <input id="password" v-model="form.password" type="password" class="form-control" required   autofocus>
                            </div>
                            <div class="form-group mb-0 d-flex justify-space-between">
                                <button type="submit" class="mr-auto btn btn-dark text-white">
                                    Connexion
                                </button>
                                <router-link to="/signup" class="card-link ml-4 ">S'enregistrer</router-link>
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
    name:"login",
    data(){
        return {
            form:{
                email       : null,
                password    : null
            },
            errors:{}
        }
    },
    created(){
        if(User.loggedIn()){
            this.$router.push({path:'forum'})
        }
    },
    methods:{
        signin(){
            User.login(this.form)

        }
    }
}
</script>
