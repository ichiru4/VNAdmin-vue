import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import useAuthStore from '@/stores/useAuthStore'
import { useMenuStore } from '@/stores/useMenuStore'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { initDynamicRouter } from './modules/dynamicRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import("@/layouts/index.vue"),
      redirect: "/",
      children: []
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useAuthStore();
  const authStore = useMenuStore();

  const title = 'Vue3'
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  if (to.path.toLocaleLowerCase() === '/login') {
    if (userStore.token) { 
        return next(from.fullPath)

    }
    resetRouter();
    return next()
  }

  if (["/500"].includes(to.path)) return next();

  if (!userStore.token) return next({ path: '/login', replace: true })

  if (!authStore.authMenuListGet.length) {
    const userInfoStore = useUserInfoStore();
    userInfoStore.getUser();
    const MenuRequest: Menu.MenuRequest = { uid: userInfoStore.user?.Id || '' }
    await initDynamicRouter(MenuRequest)
    return next({ ...to, replace: true })
  }

  authStore.setRouteName(to.name as string)

  next()
})

export default router
function resetRouter() {
  const authStore = useMenuStore();
  authStore.flatMenuListGet.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name))
      router.removeRoute(name)
  })
}

