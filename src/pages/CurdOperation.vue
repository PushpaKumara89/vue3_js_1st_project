<template>
  <h1 class="text-center">Simple Curd Operations of user data</h1>
  <section>
    <div class="p-5">
      <table class="table ">
        <thead>
        <tr style="background-color: black; color: aliceblue">
          <th scope="col">Id</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col" class="d-flex justify-content-center">Option</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user">
          <th scope="row">{{user.id}}</th>
          <td>{{user.first_name}}</td>
          <td>{{user.last_name}}</td>
          <td>@{{user.email}}</td>
          <td class="d-flex justify-content-center">
            <i title="delete" type="button" class="fa-sharp fa-solid fa-xmark m-2" @click="deleteUser(user.id)"></i>
            <i type="button" class="fa-regular fa-pen-to-square m-2" @click="edit(user.id, user.first_name, user.last_name, user.email)"></i>
          </td>
        </tr>
        <tr style="background-color: rgba(0,0,0,0.73); color: aliceblue">
          <th scope="row">{{"Id : "+id}} </th>
          <td>
            <div class="input-group-sm">
              <input v-model="first_name" type="text" class="form-control" placeholder="First Name">
            </div>
          </td>
          <td>
            <div class="input-group-sm">
              <input v-model="last_name" type="text" class="form-control" placeholder="Last Name">
            </div>
          </td>
          <td>
            <div class="input-group-sm">
              <input v-model="email" type="email" class="form-control" placeholder="Email">
            </div>
          </td>
          <td class="d-flex justify-content-center ">
            <div class="input-group-sm">
              <button v-if="!buttonDisplay" :disabled="addOrButtonActivate" type="button" class="btn btn-primary btn-sm" @click="addUser()" title="Add user">Add User</button>
              <button v-else :disabled="addOrButtonActivate" type="button" class="btn btn-success btn-sm " @click="updateUser()" title="Update">Update * </button>
              <i title="clear" type="button" class="fa-sharp fa-solid fa-xmark ms-2" @click="clear()"></i>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  computed:{
    buttonDisplay(){
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.updateBtn
    },
    addOrButtonActivate(){
      return this.first_name === "" || this.last_name === ""  || this.email === ""
    }
  },
  data(){
    return{
      users:{},
      first_name:'',
      last_name:'',
      email:'',
      updateBtn: false,
      id: '#',

    }
  },
  methods:{
    getAllUsers(){
      fetch('http://localhost:8000/api/users/getAll')
          .then(response=> response.json())
          .then(data=> {
            this.users = data
            console.log(data)
          })
    },
    addUser(){
      fetch('http://localhost:8000/api/users/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          first_name:this.first_name,
          last_name: this.last_name,
          email: this.email
        })
      })
          .then(res=>res.json())
          .then(data=>{console.log(data)})
          .finally(()=>{
            this.getAllUsers()
            this.clear()
          })

    },
    clear(){
      this.first_name=''
      this.last_name=''
      this.email=''
      this.updateBtn = false;
      this.id='#'
    },
    edit(i, f, l , e){
      this.first_name = f;
      this.last_name = l;
      this.email = e;
      this.id = i;
      this.updateBtn = true;
    },
    deleteUser(id){
      fetch(`http://localhost:8000/api/users/delete/${id}`,{
        method:'DELETE',
      })
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
          })
          .finally(()=>{
            this.getAllUsers()
          })
    },
    updateUser(){
      fetch('http://localhost:8000/api/users/update',{
        method:'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          id:this.id,
          first_name:this.first_name,
          last_name: this.last_name,
          email: this.email
        })
      }).finally(()=>{
        this.clear();
        this.getAllUsers()
      })
    },
  },
  mounted() {
    this.getAllUsers()
  }
}
</script>
<style>

</style>