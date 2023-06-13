import {createRouter, createWebHashHistory} from 'vue-router'
import DcHearo from "./pages/DcHearo";
import MyCalendar from "./pages/MyCalendar";
import HomeDisplay from "./pages/HomeDisplay";
import CurdOperation from "./pages/CurdOperation";
import MarkDown from "@/pages/MarkDown";
import Clock from "@/pages/ClockR";
import ChatApp from "@/pages/ChatApp";
import ChatApp2 from "@/pages/ChatApp2";

const routes = [
    { path: '/', component: HomeDisplay },
    { path: '/dc-hero', component: DcHearo },
    { path: '/calendar', component: MyCalendar },
    { path: '/clock', component: Clock },
    { path: '/curd', component: CurdOperation },
    { path: '/markdown', component: MarkDown },
    { path: '/chat_app', component: ChatApp },
    { path: '/chat_app2', component: ChatApp2 },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
