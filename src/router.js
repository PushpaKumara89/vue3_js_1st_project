import {createRouter, createWebHashHistory} from 'vue-router'
import DcHearo from "./pages/DcHearo";
import MyCalendar from "./pages/MyCalendar";
import HomeDisplay from "./pages/HomeDisplay";
import CurdOperation from "./pages/CurdOperation";
import MarkDown from "@/pages/MarkDown";
import GoogleMaps from './pages/GoogleMaps'

const routes = [
    { path: '/', component: HomeDisplay },
    { path: '/dc-hero', component: DcHearo },
    { path: '/calendar', component: MyCalendar },
    { path: '/curd', component: CurdOperation },
    { path: '/markdown', component: MarkDown },
    { path: '/googlemaps', component: GoogleMaps },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
