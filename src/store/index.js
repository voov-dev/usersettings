import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import users from './users'
import settings from './settings'
import oc from './oc'
import { showError } from '@nextcloud/dialogs'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const mutations = {
	API_FAILURE(state, error) {
		try {
			const message = error.error.response.data.ocs.meta.message
			showError(t('settings', 'An error occured during the request. Unable to proceed.') + '<br>' + message, { isHTML: true })
		} catch (e) {
			showError(t('settings', 'An error occured during the request. Unable to proceed.'))
		}
		console.error(state, error)
	},
}

export default new Store({
	modules: {
		users,
		settings,
		oc,
	},
	strict: debug,

	mutations,
})
