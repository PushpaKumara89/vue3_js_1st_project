import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "./components/HomeView";
import DcHearo from "./pages/DcHearo";
import MyCalendar from "./pages/MyCalendar";
import HomeDisplay from "./pages/HomeDisplay";
import CurdOperation from "./pages/CurdOperation";
import MarkDown from "@/pages/MarkDown";
import Clock from "@/pages/ClockR";
import ChatApp from "@/pages/ChatApp.vue";
import VueCharts from "@/pages/VueCharts";
import barCharts from "@/pages/charts/barCharts.vue";
import BubbleChart from "@/pages/charts/BubbleChart.vue";
import DoughNut from "@/pages/charts/DoughNut.vue";
import LineChart from "@/pages/charts/LineChart.vue";
import MixChart from "@/pages/charts/MixChart.vue";
import RadarChart from "@/pages/charts/RadarChart.vue";
import PageNotFound from "./pages/PageNotFound.vue";
import ChatApp2 from "@/pages/ChatApp2.vue";

const routes = [

    {
        path: '/', component: HomeView, children: [
            { path: '/', component: HomeDisplay },
            { path: '/dc-hero', component: DcHearo },
            { path: '/calendar', component: MyCalendar },
            { path: '/clock', component: Clock },
            { path: '/curd', component: CurdOperation },
            { path: '/markdown', component: MarkDown },
            { path: '/chat_app', component: ChatApp },
            { path: '/chat_gtp', component: ChatApp2 },
            {
                path: '/charts', component: VueCharts, children: [
                    { path: '/charts', redirect: '/charts/bar' },
                    { path: '/charts/bar', component: barCharts },
                    { path: '/charts/bubble_chart', component: BubbleChart },
                    { path: '/charts/dough_nut', component: DoughNut },
                    { path: '/charts/line_chart', component: LineChart },
                    { path: '/charts/mix_chart', component: MixChart },
                    { path: '/charts/radar_chart', component: RadarChart },

                ]
            },
        ]
    },
    { path: '/:pathMatch(.*)*', component: PageNotFound },

]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
