<template>
    <div>
        <toolbar></toolbar>
        <main role="main"  class="flex-shrink-0" >
            <router-view></router-view>
        </main>
        <app-footer></app-footer>
    </div>
</template>


<script>
import Toolbar from "./Toolbar"
import AppFooter from "./AppFooter"
export default {
    data(){
        return {

        }
    },
    components:{
        Toolbar, AppFooter
    }
}
</script>
