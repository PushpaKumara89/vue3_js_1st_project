const users = [
    {
        id:1,
        name: 'Vincent Porter',
        phone: '1',
        image:"https://bootdey.com/img/Content/avatar/avatar1.png",
        online:false,
        lastOnlineTime:"left 7 mins ago",
        roomId:{
            2:'room-1',
            3:'room-2',
            4:'room-3',
            5:'room-4',
            6:'room-5'
        }
    },
    {
        id:2,
        name: 'Aiden Chavez',
        phone: '2',
        image:"https://bootdey.com/img/Content/avatar/avatar2.png",
        online:true,
        lastOnlineTime:"online",
        roomId:{
            1:'room-1',
            3:'room-6',
            4:'room-7',
            5:'room-8',
            6:'room-9'
        }
    },
    {
        id:3,
        name: 'Mike Thomas',
        phone: '3',
        image:"https://bootdey.com/img/Content/avatar/avatar3.png",
        online:true,
        lastOnlineTime:"online",
        roomId:{
            1:'room-2',
            2:'room-6',
            4:'room-10',
            5:'room-11',
            6:'room-12',
        }
    },
    {
        id:4,
        name: 'Christian Kelly',
        phone: '4',
        image:"https://bootdey.com/img/Content/avatar/avatar7.png",
        online:false,
        lastOnlineTime:"left 10 hours ago",
        roomId:{
            1:'room-3',
            2:'room-7',
            3:'room-10',
            5:'room-13',
            6:'room-14',
        }
    },
    {
        id:5,
        name: 'Monica Ward',
        phone: '5',
        image:"https://bootdey.com/img/Content/avatar/avatar8.png",
        online:true,
        lastOnlineTime:"online",
        roomId:{
            1:'room-4',
            2:'room-8',
            3:'room-11',
            4:'room-13',
            6:'room-15',
        }
    },
    {
        id:6,
        name: 'Dean Henry',
        phone: '6',
        image:"https://bootdey.com/img/Content/avatar/avatar3.png",
        online:true,
        lastOnlineTime:"offline since Oct 21",
        roomId:{
            1:'room-5',
            2:'room-9',
            3:'room-12',
            4:'room-14',
            5:'room-15',
        }
    },
]

console.log(users)

module.exports = users;