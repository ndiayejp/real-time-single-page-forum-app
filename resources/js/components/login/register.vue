<template>
    <div class="container">
         <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card my-4">
                    <div class="card-body">
                        <h4 class="card-title">S'enregistrer</h4>
                         <form @submit.prevent="signup">
                             <div class="form-group">
                                <label for="name"> Nom   </label>
                                <input id="name"  v-model="form.name" type="text" class="form-control" required   autofocus>
                            </div>
                            <div class="form-group">
                                <label for="email"> E-Mail   </label>
                                <input id="email"  v-model="form.email" type="email" class="form-control" required   autofocus>
                            </div>
                            <div class="form-group">
                                <label for="password">Mot de passe</label>
                                <input id="password" v-model="form.password" type="password" class="form-control" required   autofocus>
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation">Confirmer le Mot de passe</label>
                                <input id="password" v-model="form.password_confirmation" type="password" class="form-control" required   autofocus>
                            </div>
                            <div class="form-group mb-0">
                                <button type="submit" class="btn btn-dark text-white">
                                    S'enregistrer
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
    name:"register",
    data(){
        return {
            form:{
                name                  :  null,
                email                 :  null,
                password              :  null,
                password_confirmation :  null
            },
            errors:{}
        }
    },
    methods:{
        signup(){
            axios.post('/api/auth/register',this.form)
            .then(res => {
                //User.responseAfterLogin(res)
                this.$router.push({path:'login'})
                })
            .catch(error => this.errors = error.response.data.errors)
        }
    }
}
</script>
