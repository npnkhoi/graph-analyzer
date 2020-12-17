
import Clock from '../components/Clock.vue'
import Grapher from '../components/Grapher.vue'
import About from '../components/About.vue'


export default [
    {
        path: '/',
        component: Grapher
    },
    {
        path: '/clock',
        component: Clock
    },
    {
        path: '/about',
        component: About
    },
]