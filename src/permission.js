import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度栏的风格
import { getToken } from '@/utils/auth' // 从cookie获取令牌
import getPageTitle from '@/utils/get-page-title'

// 进度条配置
NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login'] // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken()
  // 从登录页面点击login按钮之后 打印出同样两个admin
  // console.log('hasToken:' + hasToken);
  // console.log('token:' + store.getters.token);
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      // 确定用户是否通过getInfo获取了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 如没有获取权限角色表示为false
        next()
      } else {
        try {
          // 获取用户信息
          // note: 角色必须是对象数组！例如：['admin']或['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 根据角色生成可访问的路线图
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack方法确保addRoutes完整
          // 设置replace：true，因此导航不会留下历史记录
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // 删除令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有令牌*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 其他无权访问的页面将重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
