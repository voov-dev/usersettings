<template>
	<AppNavigationItem :key="id"
		:exact="true"
		:title="title"
		:to="{ name: 'group', params: { selectedGroup: encodeURIComponent(id) } }"
		icon="icon-group"
		:loading="loadingRenameGroup"
		:menu-open="openGroupMenu"
		@update:menuOpen="handleGroupMenuOpen">
		<template #counter>
			<CounterBubble v-if="count">
				{{ count }}
			</CounterBubble>
		</template>
		<template #actions>
			<ActionInput v-if="id !== 'admin' && id !== 'disabled' && settings.isAdmin"
				ref="displayNameInput"
				icon="icon-edit"
				type="text"
				:value="title"
				@submit="renameGroup(id)">
				{{ t('usersettings', 'Rename group') }}
			</ActionInput>
			<ActionButton v-if="id !== 'admin' && id !== 'disabled' && settings.isAdmin"
				icon="icon-delete"
				@click="removeGroup(id)">
				{{ t('usersettings', 'Remove group') }}
			</ActionButton>
		</template>
	</AppNavigationItem>
</template>

<script>
import ActionInput from '@nextcloud/vue/dist/Components/ActionInput'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import CounterBubble from '@nextcloud/vue/dist/Components/CounterBubble'
import AppNavigationItem from '@nextcloud/vue/dist/Components/AppNavigationItem'

export default {
	name: 'GroupListItem',
	components: {
		ActionInput,
		ActionButton,
		CounterBubble,
		AppNavigationItem,
	},
	props: {
		id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: false,
		},
	},
	data() {
		return {
			loadingRenameGroup: false,
			openGroupMenu: false,
		}
	},
	computed: {
		settings() {
			return this.$store.getters.getServerData
		},
	},
	methods: {
		handleGroupMenuOpen() {
			this.openGroupMenu = true
		},
		async renameGroup(gid) {
			// check if group id is valid
			if (gid.trim() === '') {
				return
			}

			const displayName = this.$refs.displayNameInput.$el.querySelector('input[type="text"]').value

			// check if group name is valid
			if (displayName.trim() === '') {
				return
			}

			try {
				this.openGroupMenu = false
				this.loadingRenameGroup = true
				await this.$store.dispatch('renameGroup', {
					groupid: gid.trim(),
					displayName: displayName.trim(),
				})

				this.loadingRenameGroup = false
			} catch {
				this.openGroupMenu = true
				this.loadingRenameGroup = false
			}
		},
		removeGroup(groupid) {
			const self = this
			// TODO migrate to a vue js confirm dialog component
			OC.dialogs.confirm(
				t('usersettings', 'You are about to remove the group {group}. The users will NOT be deleted.', { group: groupid }),
				t('usersettings', 'Please confirm the group removal '),
				function(success) {
					if (success) {
						self.$store.dispatch('removeGroup', groupid)
					}
				}
			)
		},
	},
}
</script>
