<template>

  <div class="container" v-if="showScreen">
    <div class="row clearfix">
      <div class="col-lg-12">
        <div class="card chat-app">
          <div id="plist" class="people-list">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Search...">
            </div>

            <ul class="list-unstyled chat-list mt-2 mb-0">
              <li class="clearfix" v-for="user in userList" :key="user.phone"
                  @click="selectUserHandler(user?.phone)"
                  :class="user?.phone === selectedUser?.phone ? 'active':''"
              >
                <img :src="user?.image"
                     :alt="user?.name"
                     class="avatar"
                />
                <div class="about">
                  <div class="name">{{user?.name}}</div>
                  <div class="status">
                    <i :class="user?.online ? 'fa fa-circle online' :'fa fa-circle offline'"></i>
                    {{user?.lastOnlineTime}}
                  </div>
                </div>
              </li>
            </ul>

          </div>
          <div class="chat" v-if="selectedUser" >
            <div class="chat-header clearfix">
              <div class="row">
                <div class="col-lg-6">
                  <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    <img :src="selectedUser.image" alt="avatar">
                  </a>
                  <div class="chat-about">
                    <h6 class="m-b-0">{{ selectedUser.name }}</h6>
                    <small>{{selectedUser.lastOnlineTime}}</small>
                  </div>
                </div>
                <div class="col-lg-6 hidden-sm text-right">
                  <a href="javascript:void(0);" class="btn btn-outline-secondary"><i class="fa fa-camera"></i></a>
                  <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
                  <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
                  <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
                </div>
              </div>
            </div>
            <div class="chat-history">
              <ul class="m-b-0">
                <li class="clearfix" v-for="item in messages" :key="item.user">
                  <div class="message-data" :class="item?.user === currentUser?.name ?'text-end':''">
                    <span class="message-data-time me-2">10:10 AM, Today</span>
                    <img :src="item?.user === currentUser?.name ? currentUser.image: selectedUser.image" alt="avatar">
                  </div>
                  <div class="message" :class="item?.user === currentUser?.name ?'float-right other-message':'my-message'">
                    <p v-if="item?.type === 'text'">{{ item?.message }}</p>
                    <img style="width: 50%;height: 50%; overflow: hidden" v-if="item?.type === 'img'" :src=item?.message>
                  </div>
                </li>
              </ul>
            </div>
            <div class="chat-message clearfix">
              <div class="input-group mb-0">
                <div class="input-group-prepend">
                  <span @click="sendMessage()" class="input-group-text"><i class="fa fa-send"></i></span>
                </div>
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fa-solid fa-paperclip btn position-absolute" @click="clickTiger()"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Enter text here..."
                       v-model="newMessage"
                       @keyup="$event.keyCode === 13 && sendMessage()"
                />
                <!--file selector-->
                <input style="display: none" id="addFile" class="m-2" type="file" ref="fileInput" accept="image/*" @change="addFile($event)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center vh-100" v-if="!showScreen">
    <input class="input-group-sm m-3" v-model="phone" type="text" placeholder="Enter Number">
    <button class="btn btn-sm btn-success m-3" type="button" @click="login()">login</button>
  </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: "",
      file: null,

      phone:'',
      showScreen:false,
      userList: require('./test'),
      currentUser:{},
      selectedUser:'',
    };
  },
  mounted() {
    console.log(this.userList)
    this.socket = io("http://192.168.1.100:3000"); // Replace with your server URL

    this.socket.on("user joined", (r) => {
      console.log(r)
      console.log("A user joined the room");
      // Handle the event as needed
    });

    this.socket.on("new message", (data) => {
      console.log("New message received:", data);
      this.messages.push(data);
      console.log("Updated messages:", this.messages);
    });

    this.socket.on("new file", (data) => {
      this.messages.push(data);
      console.log("New file received:", data);
    });

  },
  methods: {
    clickTiger(){
      let btn = document.getElementById("addFile")
      btn.click()
    },
    joinRoom(room, user) {
      const data = {
        room: room,
        user: user,
      };
      this.socket.emit("join", data);
    },
    sendMessage() {
      if (this.file !== null){
        this.sendFile(this.roomId, this.currentUser.name, this.file)
        this.file = null;
        return
      }
      if (this.newMessage.trim() !== "") {
        const messageData = {
          room: this.roomId,
          user: this.currentUser.name,
          message: this.newMessage,
        };
        this.socket.emit("message", messageData);
        this.newMessage = "";
      }
    },

    addFile(event){
      this.file = event.target.files[0]
      console.log(this.file)
      // this.sendFile(this.roomId, this.currentUser.name, file)
    },
    sendFile(room, user, file) {
      const reader = new FileReader();
      reader.onload = () => {
        // const fileData = event.target.result;
        const fileData = reader.result.split(',')[1];
        const filename = file.name;

        // Emit the 'file' event to the server
        this.socket.emit('file', { room, user, fileData, filename });
      };
      reader.readAsDataURL(file);
    },

    login(){
      this.currentUser =this.userList.find((user) => user.phone === this.phone.toLowerCase());
      this.userList = this.userList.filter((user)=>user.phone!== this.phone.toLowerCase());
      if (this.currentUser){
        this.showScreen = true;
      }
    },
    selectUserHandler(phone){
      this.selectedUser = this.userList.find((user) => user.phone === phone);
      this.roomId = this.selectedUser.roomId[this.currentUser.id];
      this.joinRoom(this.roomId, this.selectedUser.name)
      this.messages = []
    }
  }
};
</script>

<style scoped>
body{
  background-color: #f4f7f6;
  margin-top:20px;
}
.card {
  background: #fff;
  transition: .5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: .55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7
}

.chat-app .chat {
  margin-left: 280px;
  border-left: 1px solid #eaeaea
}

.people-list {
  -moz-transition: .5s;
  -o-transition: .5s;
  -webkit-transition: .5s;
  transition: .5s
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer
}

.people-list .chat-list li.active {
  background: #efefef
}

.people-list .chat-list li .name {
  font-size: 15px
}

.people-list .chat-list img {
  width: 45px;
  border-radius: 50%
}

.people-list img {
  float: left;
  border-radius: 50%
}

.people-list .about {
  float: left;
  padding-left: 8px
}

.people-list .status {
  color: #999;
  font-size: 13px
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px
}

.chat .chat-history {
  padding: 20px;
  border-bottom: 2px solid #fff
}

.chat .chat-history ul {
  padding: 0
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px
}

.chat .chat-history .message-data {
  margin-bottom: 15px
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px
}

.chat .chat-history .message {
  color: #444;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px
}

.chat .chat-history .my-message {
  background: #efefef
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #efefef;
  border-width: 10px;
  margin-left: -10px
}

.chat .chat-history .other-message {
  background: #e8f1f3;
  text-align: right
}

.chat .chat-history .other-message:after {
  border-bottom-color: #e8f1f3;
  left: 93%
}

.chat .chat-message {
  padding: 20px
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle
}

.online {
  color: #86c541
}

.offline {
  color: #e47297
}

.me {
  color: #1d8ecd
}

.float-right {
  float: right
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0
}

@media only screen and (max-width: 767px) {
  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none
  }
  .chat-app .people-list.open {
    left: 0
  }
  .chat-app .chat {
    margin: 0
  }
  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0
  }
  .chat-app .chat-history {
    height: 300px;
    overflow-x: auto
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto
  }
  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto
  }
  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto
  }
}
</style>