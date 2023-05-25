<template>
  <div class="container-fluid" v-if="showScreen">

    <div class="row">

      <div class="col-md-4">
        <div class="user-list-card">
          <div class="user-card"
               :class="user?.phone === selectedUser?.phone ? 'active':''"
               v-for="user in userList" :key="user.phone"
               @click="selectUserHandler(user?.phone)"
          >
            <img :src="require('../assets/chat/'+user?.image)"
                 :alt="user?.name"
                 class="avatar"
            />
            <p class="username"> {{user?.name}}</p>
          </div>
        </div>
      </div>

      <div class="col-md-8">

        <div class="chat-container">
          <section v-if="selectedUser">
            <div class="chat-header">
              <img :src="require('../assets/chat/'+selectedUser?.image)"
                   :alt="selectedUser?.name"
                   class="avatar"
              />
              <p class="username"> {{selectedUser?.name}}</p>

            </div>

            <div class="chat-body">
              <div v-for="item in messages" :class=" item?.user === currentUser?.name ?'same-user':''" :key="item.user">
                <p class="message-container m-1 p-1"> {{item?.message}}</p>
              </div>
            </div>

            <div class="chat-footer">
              <div class="row">
                <div class="col-md-10">
                  <div class="form-group mb-0">
                    <input type="text"
                           placeholder="type a message"
                           class="form-control"
                           v-model="newMessage"
                           @keyup="$event.keyCode === 13 && sendMessage()"
                    />
                  </div>
                </div>
                <div class="col-md-2 text-center align-self-center">
                  <button class="btn btn-primary btn-sm px-3"
                          @click="sendMessage()"
                  > send </button>
                </div>
              </div>
            </div>
          </section>
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


      phone:'',
      showScreen:false,
      userList: [
        {
          id:1,
          name: 'The Swag Coder',
          phone: '151545',
          image:"prof1.jpg",
          roomId:{
            2:'room-1',
            3:'room-2',
            4:'room-3'
          }
        },
        {
          id:2,
          name: 'Wade Warren',
          phone: '74565',
          image:"prof2.jpg",
          roomId:{
            1:'room-1',
            3:'room-4',
            4:'room-5'
          }
        },
        {
          id:3,
          name: 'Albert Flores',
          phone: '335782',
          image:"prof3.jpg",
          roomId:{
            1:'room-2',
            2:'room-4',
            4:'room-6'
          }
        },
        {
          id:4,
          name: 'Dainne Ruseli',
          phone: '54354',
          image:"prof4.jpg",
          roomId:{
            1:'room-3',
            2:'room-5',
            3:'room-6'
          }
        }
      ],
      currentUser:{},
      selectedUser:'',
    };
  },
  mounted() {
    this.socket = io("http://192.168.1.100:3000"); // Replace with your server URL

    this.socket.on("user joined", () => {
      console.log("A user joined the room");
      // Handle the event as needed
    });

    this.socket.on("new message", (data) => {
      console.log("New message received:", data);
      this.messages.push(data);
      console.log("Updated messages:", this.messages);
    });

  },
  methods: {
    joinRoom(room, user) {
      const data = {
        room: room,
        user: user,
      };
      this.socket.emit("join", data);
    },
    sendMessage() {
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

    login(){
      this.currentUser =this.userList.find((user) => user.phone === this.phone.toLowerCase());
      this.userList = this.userList.filter((user)=>user.phone!== this.phone.toLowerCase());
      if (this.currentUser){
        this.showScreen = true;
      }
    },
    selectUserHandler(phone){
      this.selectedUser = this.userList.find((user) => user.phone === phone);
      this.roomId = this.selectedUser.roomId[this.selectedUser.id];
      this.joinRoom(this.roomId, this.selectedUser.name)
      this.messages = []
    }
  }
};
</script>

<style scoped>
body{
  background-color: #e5e5e5;
}

.container-fluid{
  padding: 50px 200px;
  overflow: hidden;
}

.user-list-card{
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  height: calc(100vh - 100px);
  padding: 10px;
}

.user-card {
  display: flex;
  padding: 10px;
  cursor: pointer;

  /*&.active {*/
  /*   background-color: #EDEDED;*/
  /* }*/
}

.chat-container {
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  height: calc(100vh - 100px);
  position: relative;
  overflow: hidden;
}

.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 15px 0 0;
}
.username{
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-card:not(:last-child) {
  border-bottom: 1px solid #bbbbbb;
}
.message-container {
  background-color: white;
  padding: 7px;
  border-radius: 5px;
  width: fit-content;
  max-width: 90%;
  margin-bottom: 15px;
}

.chat-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #EDEDED;
  padding: 10px 20px;

}
.form-control{
  background-color: white;
  border: 1px solid #D8DDEC;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 1rem;
  color: black;
}
.message-container {
  background-color: lightskyblue;
}
.same-user{
  display: flex;
  justify-content: flex-end;
}
.chat-body {
  background-image: url('@/assets/chat/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: calc(100vh - 125px);
  overflow-y: auto;
}


.chat-header {
  height: 70px;
  background-color: #EDEDED;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.avatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 20px;
}
.username{
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
