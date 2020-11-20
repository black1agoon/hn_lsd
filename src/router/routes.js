import Login from '../views/Login'
import NotFoundView from '../views/404.vue'
import DashView from '../views/Dash.vue'
import AppRoutes from '../app/app.routes'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }, {
    path: '/',
    component: DashView,
    children: AppRoutes
  }
]
export default routes
