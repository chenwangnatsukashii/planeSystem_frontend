import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/base/base')
      }
    ]
  },
  // {
  //   path: '/base',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //   },
  //   children: [
  //     {
  //       path: 'base-list',
  //       name: 'base-list',
  //       meta: {title: '基本信息', icon: 'ios-book'},
  //       component: () => import('@/view/base/base')
  //     }
  //   ]
  // },
  {
    path: '/base',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'base-add',
        name: 'base-add',
        meta: {title: '飞机基本情况', icon: 'ios-book'},
        component: () => import('@/view/base/base-add')
      }
    ]
  },
  {
    path: '/resume',
    name: 'resume',
    meta: {
      title: '履历本',
      icon: 'md-menu',
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'resume-j11',
        name: 'resume-j11',
        meta: {title: '履历本-歼11', icon: 'ios-book'},
        component: () => import('@/view/resume/resume_j11')
      },
      {
        path: 'resume-j11b',
        name: 'resume-j11b',
        meta: {title: '履历本-歼11B', icon: 'ios-book'},
        component: () => import('@/view/resume/resume_j11b')
      },
      {
        path: 'resume-j8',
        name: 'resume-j8',
        meta: {title: '履历本-教8', icon: 'ios-book'},
        component: () => import('@/view/resume/resume_j8')
      },
      {
        path: 'resume-j9',
        name: 'resume-j9',
        meta: {title: '履历本-教9', icon: 'ios-book'},
        component: () => import('@/view/resume/resume_j9')
      }
    ]
  },
  {
    path: '/inspection',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'inspection-list',
        name: 'inspection-list',
        meta: {title: '定期检查', icon: 'ios-book'},
        component: () => import('@/view/inspection/inspection')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

