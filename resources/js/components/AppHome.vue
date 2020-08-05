<template>
    <div>
        <toolbar></toolbar>
        <main role="main"  class="flex-shrink-0" style="min-height:500px">
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
