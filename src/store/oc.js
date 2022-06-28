import api from './api'
import { generateOcsUrl } from '@nextcloud/router'

const state = {}
const mutations = {}
const getters = {}
const actions = {
	/**
	 * Set application config in database
	 *
	 * @param {object} context store context
	 * @param {object} options destructuring object
	 * @param {string} options.app Application name
	 * @param {boolean} options.key Config key
	 * @param {boolean} options.value Value to set
	 * @return {Promise}
	 */
	setAppConfig(context, { app, key, value }) {
		return api.requireAdmin().then((response) => {
			return api.post(generateOcsUrl('apps/provisioning_api/api/v1/config/apps/{app}/{key}', { app, key }), { value })
				.catch((error) => { throw error })
		}).catch((error) => context.commit('API_FAILURE', { app, key, value, error }))
	},
}

export default { state, mutations, getters, actions }
