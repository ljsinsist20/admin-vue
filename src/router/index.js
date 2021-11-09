import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
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
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/core/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },



  {
    path: '/core/student',
    component: Layout,
    redirect: '/core/student/list',
    name: 'student',
    meta: { title: '学生', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'StudentList',
        component: () => import('@/views/core/student/list'),
        meta: { title: '学生列表', icon: 'table' }
      }
    ]
  },

  
  {
    path: '/core/teacher',
    component: Layout,
    redirect: '/core/teacher/list',
    name: 'teacher',
    meta: { title: '辅导员列表', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'TeacherList',
        component: () => import('@/views/core/teacher/list'),
        meta: { title: '辅导员列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/core/class',
    component: Layout,
    redirect: '/core/class/list',
    name: 'class',
    meta: { title: '班级', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'TeacherList',
        component: () => import('@/views/core/class/list'),
        meta: { title: '班级列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/core/dorm',
    component: Layout,
    redirect: '/core/dorm/list',
    name: 'dorm',
    meta: { title: '宿舍', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'dormList',
        component: () => import('@/views/core/dorm/list'),
        meta: { title: '宿舍列表', icon: 'table' }
      },
      {
        path: 'setting',
        name: 'settingList',
        component: () => import('@/views/core/dorm/setting'),
        meta: { title: '宿舍设置', icon: 'table' }
      },
    ]
  },

  {
    path: '/core/admin',
    component: Layout,
    redirect: '/core/admin/list',
    name: 'admin',
    meta: { title: '管理员', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'adminList',
        component: () => import('@/views/core/admin/list'),
        meta: { title: '管理员列表', icon: 'table' }
      },
      {
        path: 'setting',
        name: 'settingList',
        component: () => import('@/views/core/admin/setting'),
        meta: { title: '管理员设置', icon: 'table' }
      }
    ]
  },


  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
