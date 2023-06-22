import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/db'

const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      scrollBehavior() {
            return { top: 0, behavior: 'smooth' }
      },
      routes: [
            { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
            {
                  path: '/team',
                  name: 'team',
                  component: () => import('../views/TeamView.vue')
            },
            {
                  path: '/gallery',
                  name: 'gallery',
                  component: () => import('../views/GalleryView.vue')
            },
            {
                  path: '/contact',
                  name: 'contact',
                  component: () => import('../views/ContactView.vue')
            },
            {
                  path: '/offer',
                  name: 'offer',
                  component: () => import('../views/OfferView.vue')
            },
            {
                  path: '/blog',
                  name: 'blog',
                  component: () => import('../views/BlogView.vue'),
                  children: [
                        {
                              path: '',
                              name: 'blog-previews',
                              component: () => import('../views/BlogPostsView.vue')
                        },
                        {
                              path: '/blog/blog-post-1',
                              name: 'blog-post',
                              component: () => import('../views/BlogPostView.vue')
                        }
                  ]
            },
            {
                  path: '/admin-login',
                  name: 'admin-login',
                  component: () => import('../views/AdminLoginView.vue')
            },
            {
                  path: '/admin-panel',
                  name: 'admin panel',
                  component: () => import('../views/AdminPanelView.vue'),

                  meta: { requiresAuth: true },
                  // beforeEnter: async (to, from, next) => {
                  //       if (to.path.includes('/admin-panel') && !auth.currentUser) {
                  //             next('/admin-login')
                  //             return
                  //       } else {
                  //             next()
                  //       }
                  // },

                  children: [
                        {
                              path: '',
                              name: 'messages',
                              component: () => import('../views/AdminPanelMessageView.vue')
                        },
                        {
                              path: 'add-img',
                              name: 'add img',
                              component: () => import('../views/AdminGalleryAddImgView.vue')
                        },
                        {
                              path: 'manage-gallery',
                              name: 'manage gallery',
                              component: () => import('../views/AdminGalleryManageImgView.vue')
                        },
                        {
                              path: 'add-post',
                              name: 'add post',
                              component: () => import('../views/AdminBlogView.vue')
                        }
                  ]
            },
            {
                  path: '/:catchAll(.*)',
                  name: 'not-found',
                  component: () => import('../views/NotFoundView.vue')
            }
      ]
})

export default router
