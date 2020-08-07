<template>
  <div>
    <a href="#" class="nav-link dropdown-toggle" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <font-awesome-icon :icon="['fas', 'bell']" size="lg" :style="{ color,cursor:'pointer' }"/>
        <span class="badge badge-danger" style="position:absolute;right:5px">{{unreadcount}}</span>
        <div class="dropdown-menu py-0" aria-labelledby="dropdown">
          <router-link :to="item.path" class="dropdown-item text-primary" href="#" v-for="item in unread" :key="item.id">
              <span @click="readIt(item)">{{item.question}}</span>
          </router-link>
          <div style="padding:0.25rem 1.5rem" v-for="item in read" :key="item.id">
                <span>{{item.question}}</span>
          </div>
        </div>
    </a>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                read:{},
                unread:{},
                unreadcount:0
            }
        },
        created(){
            if(User.loggedIn()){
                this.getNotifications()
            }
        },
        computed:{
            color(){
                return this.unreadcount > 0 ? '#ffffff' : '#ea8a87'
            },
            loggedIn(){
                return User.loggedIn()
            }
        },
        methods:{
            getNotifications(){
                axios.post('/api/notifications')
                .then((res)=>{
                    this.read        = res.data.read
                    this.unread      = res.data.unread
                    this.unreadcount = res.data.unread.length
                })
            },
            readIt(notification){
                axios.post('/api/markAsRead',{id:notification.id}).then((res)=>{
                    this.read.push(notification)
                    this.unread.splice(notification,1)
                    this.unreadcount--
                })
            }
        }
    }
</script>

<style>

</style>
