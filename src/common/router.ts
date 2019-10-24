import Vue from 'vue';
import Router from 'vue-router';
import AppMail from '@/app-mail/components/app-mail/AppMail.vue';
import AppChat from '@/app-chat/components/app-chat/AppChat.vue';
import App from './components/app/App.vue';

import {
    appStoreInitialization,
    appContactsStoreInitialization,
    appMailStoreInitialization,
} from '@/common/di';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'root',
            beforeEnter: (to, from, next) => {
                Promise.all([
                    appStoreInitialization(),
                    appContactsStoreInitialization(),
                    appMailStoreInitialization(),
                ])
                .then(() => next());
            },
            component: App,
            children: [
                {
                    path: 'app-mail',
                    name: 'app-mail',
                    component: AppMail,
                },
                {
                    path: 'app-chat',
                    name: 'app-chat',
                    component: AppChat,
                },
            ],
        },
        // {
        // path: '/about',
        // name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        // },
    ],
});
