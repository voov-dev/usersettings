import Vue from 'vue'
import VTooltip from 'v-tooltip'
import { sync } from 'vuex-router-sync'
import { translate, translatePlural } from '@nextcloud/l10n';

import App from './App'
import router from './router'
import store from './store'

Vue.use(VTooltip, { defaultHtml: false })

sync(store, router)

// CSP config for webpack dynamic chunk loading
// eslint-disable-next-line camelcase
__webpack_nonce__ = btoa(OC.requestToken)

Vue.prototype.t = translate
Vue.prototype.n = translatePlural
Vue.prototype.OC = window.OC
Vue.prototype.OCA = window.OCA
// eslint-disable-next-line camelcase
Vue.prototype.oc_userconfig = oc_userconfig

const app = new Vue({
    router,
	store,
	render: h => h(App),
}).$mount('#user-settings')

export { app, router, store }
