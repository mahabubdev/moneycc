import Home from './../components/pages/home'
import About from './../components/pages/about'
import Contact from './../components/pages/contact'
import Notfound from './../components/pages/404'


const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '**', component: Notfound },
]


export default routes