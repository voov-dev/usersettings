import Vue from 'vue'
import Router from 'vue-router'
import { generateUrl } from '@nextcloud/router'

// Dynamic loading
const Users = () => import('./views/Users')

Vue.use(Router)

export default new Router({
	mode: 'history',
	// if index.php is in the url AND we got this far, then it's working:
	// let's keep using index.php in the url
	base: generateUrl(''),
	linkActiveClass: 'active',
	routes: [
		{
			path: '/:index(index.php/)?apps/usersettings',
			component: Users,
			props: true,
			name: 'users',
			children: [
				{
					path: ':selectedGroup',
					name: 'group',
					component: Users,
				},
			],
		},	
	],
})
