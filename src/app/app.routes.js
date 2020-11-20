// import Home from '../views/Home'
import OrderView from './OrderView'
import OnlineInspectionView from './OnlineInspectionView'

export default [
  {
    path: '/',
    redirect: {
      name: 'OrderView'
    }
  },
  {
    path: '/online',
    component: OnlineInspectionView,
    name: 'OnlineInspectionView'
  },
  {
    path: '/order',
    component: OrderView,
    name: 'OrderView'
  }
]
