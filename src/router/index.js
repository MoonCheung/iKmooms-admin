import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * //所有权限通用路由表
 * //如首页和登录页和一些不用权限的公用页面
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/admin',
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/admin/index'),
        meta: {
          title: '仪盘表',
          icon: 'dashboard'
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * //异步挂载的路由
 * //动态需要根据权限加载的路由表
 */
export const asyncRoutes = [
  {
    path: '/art',
    component: Layout,
    redirect: '/article/artlist',
    name: 'Article',
    meta: {
      title: '文章管理',
      icon: 'webcreate'
    },
    children: [
      {
        path: 'artlist',
        name: 'ArtList',
        component: () => import('@/views/article/articleList'),
        meta: {
          title: '文章列表',
          icon: 'documenttext'
        }
      },
      {
        path: 'catglist',
        name: 'CatgList',
        component: () => import('@/views/article/articleCatg'),
        meta: {
          title: '分类目录',
          icon: 'webfolder',
          noCache: true // 不会被 <keep-alive> 缓存
        }
      },
      {
        path: 'artpub',
        name: 'ArtPub',
        component: () => import('@/views/article/articlePub'),
        meta: {
          title: '发布文章',
          icon: 'webdoneall'
        }
      },
      {
        path: 'arttag',
        name: 'ArtTag',
        component: () => import('@/views/article/articleTag'),
        meta: {
          title: '文章标签',
          icon: 'pricetags',
          noCache: true // 不会被 <keep-alive> 缓存
        }
      }
    ]
  },
  {
    path: '/cmt',
    component: Layout,
    redirect: '/cmt/cmtlist',
    name: 'Comment',
    alwaysShow: true, // 一直显示根路由
    meta: {
      title: '评论管理',
      icon: 'webchatboxes'
    },
    children: [
      {
        path: 'cmtlist',
        name: 'commentList',
        component: () => import('@/views/comment/commentList'),
        meta: {
          title: '评论列表',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'config',
        component: () => import('@/views/config/index'),
        meta: {
          title: '全局设置',
          icon: 'settings'
        }
      }
    ]
  },
  // 404 page must be placed at the end!!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
