
const routes:any= [
    {
      path: '/',
      name: 'Home',
      redirect: "/clock",
      component: () => import('@/layout/index.vue'),
      children:[
        {
          path: '/clock',
          name: 'clock',
          component: () => import('@/views/clock/index.vue'),
        },
        {
            path:'calendar',
            name:'calendar',
            component:()=>import('@/views/calendar/index.vue')
        },
        {
            path:'overview',
            name:'overview',
            component:()=>import('@/views/overview/index.vue') 
        },
        {
            path:'setting',
            name:'setting',
            component:()=>import('@/views/setting/index.vue') 
        },
        {
          path:'sample',
          name:'sample',
          component:()=>import('@/views/sample/index.vue') 
      }
      ]
    }
]

  
  
  export default routes