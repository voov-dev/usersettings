import Vue from 'vue'
import App from './App'

import { translate, translatePlural } from '@nextcloud/l10n';

Vue.prototype.t = translate
Vue.prototype.n = translatePlural
Vue.prototype.OC = window.OC
Vue.prototype.OCA = window.OCA

export default new Vue({
	el: '#content',
	render: h => h(App),
})