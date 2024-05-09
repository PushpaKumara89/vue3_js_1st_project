<template>

  <div class="p-3">
    <h1>Chat private chatGTP</h1>
    <div class="chatbox p-1" id="chatbox">
<!--      <p >{{messages}}</p>-->
      <article  v-for="(msg, index) in messages" :key="index" class="w-100 border right p-2 fntZ" :class="msg.from==='send'? 'bg-secondary':'bg-primary'" v-html="msg.content"></article>
      <p v-if="message!==''" class="bg-success p-2 w-100 fntZ">{{message}}</p>
    </div>
    <input type="text" id="message" placeholder="Type your message here..." v-model="newMessage">
    <button class="w-100" id="send" @click="sendMessage">Send</button>
  </div>

</template>

<script>
import { io } from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      message: "",
      messages: [
      ],
      /*dcHeros: [
        {from:"send", content:"e"},
        {from:"send", content:"e"},
        {from:"send", content:"e"},
        {from:"send", content:"e"}
      ],*/
      newMessage: ""

    };
  },
  mounted() {
    this.socket = io("http://192.168.1.100:8000"); // Replace with your server URL

    this.socket.on('connect' ,()=>{
      this.socket.send("User connected!")
    })

    this.socket.on("message", (data) => {
      console.log("New message received:", data);
      this.message+=data
      console.log("Updated messages:", this.message);
    });
  },
  methods: {
    sendMessage() {
      if (this.message !==""){
        this.messages.push({from:"receive", content:this.message})
        this.message=''
      }
      if (this.newMessage.trim() !== "") {
        // const messageData = {
        //   user: "pk",
        //   message: this.newMessage,
        // };
        this.socket.emit("message", this.newMessage);
        this.messages.push({from:"send", content:this.newMessage})
        // this.dcHeros.push({from:"send", content:this.newMessage})
        this.newMessage = "";
      }
    },
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
}
.chatbox {
  height: 400px;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 10px;
}
.message {
  margin-bottom: 10px;
}
.user {
  color: blue;
}
.bot {
  color: green;
}
input[type="text"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.fntZ{
  font-size: 15px;
}
</style>
