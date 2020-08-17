<template>
  <div>
    <a href="#" class="nav-link dropdown-toggle" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <font-awesome-icon :icon="['fas', 'bell']" size="lg" :style="{ color,cursor:'pointer' }"/>
        <span class="badge badge-danger" style="position:relative;right:9px;top:-9px">{{unreadcount}}</span>
        <div class="dropdown-menu py-0" aria-labelledby="dropdown">
          <div class="dropdown-item text-primary" href="#" v-for="item in unread" :key="item.id">
              <router-link :to="item.path"><span @click="readIt(item)">{{item.question}}</span></router-link>
          </div>
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
                unreadcount:0,
                sound:"http://soundbible.com/mp3/sms-alert-5-daniel_simon.mp3"
            }
        },
        created(){
            if(User.loggedIn()){
                this.getNotifications()
            }

            Echo.private('App.User.' + User.id())
            .notification((notification) => {
                this.playSound()
                this.unread.unshift(notification)
                this.unreadcount ++
            });
        },
        computed:{
            color(){
                return this.unreadcount > 0 ? '#ffffff' : '#DDDDD'
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
            },
            playSound(){
                let alert = new Audio(thi.sound)
                alert.play()
            }
        }
    }
</script>

<style>
.dropdown-toggle::after{
    margin-left:-7px !important;
}
</style>
