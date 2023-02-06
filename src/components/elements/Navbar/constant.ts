import { HomeIcon } from '@heroicons/react/24/outline'
import { Dashboardicon } from '@icons'

export const routes = [
  {
    path: '/',
    name: 'Home',
    requireAuth: false,
    icon: HomeIcon,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    requireAuth: true,
    icon: Dashboardicon,
  },
]
