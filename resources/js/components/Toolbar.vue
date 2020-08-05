<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark question">
            <div class="container">
                <router-link class="navbar-brand" to="/">Real estate</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto"  >
                        <li class="nav-item active" v-for="item in items" :key="item.title"  >
                          <router-link  :to="item.to" class="nav-link"> {{item.title}}</router-link>
                        </li>

                    </ul>
                    <ul class="navbar-nav ml-auto nav-flex-icons">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Connexion</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">S'enregistrer</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>


<script>
export default {
    data(){
        return {
            items: [
                { title: "Forum", to: "/forum" },
                { title: "Connnexion", to: "/login"},
                { title: "S'enregistrer", to: "/signup"},
                { title: "Logout", to: "/logout" }
            ]
        }
    }
}
</script>

