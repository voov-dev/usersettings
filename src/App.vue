<template>
    <router-view />
</template>

<script>
import axios from '@nextcloud/axios'

export default {
	name: 'App',
	async beforeMount() {
		let data = {}

		await axios
			.get(`${window.location.origin}/settings/users`)
			.then(function (response) {
				const doc = document.createElement("div")

				doc.innerHTML = response.data
				data = JSON.parse(doc.querySelector('#serverData').dataset.server)
			})
			.catch(function (error) {
				// handle error
				console.error('error: load serverData');
			})

		this.$store.commit('setServerData', data)
	},
}
</script>

<style lang="scss">
#body-user {
  overflow-x: scroll;
  min-height: 100%;
  height: auto;

  .app-user-settings {
    max-width: 100%;
    width: 100%;
    padding-top: 0;
  }

  #app-content.user-list-grid {
    display: grid;
    grid-column-gap: 20px;
    grid-auto-rows: minmax(60px, max-content);
  }

  #app-content.user-list-grid .row {
    display: flex;
    display: grid;
    min-height: 60px;
    grid-row-start: span 1;
    grid-gap: 3px;
    align-items: center;
    grid-template-columns: 44px minmax(190px, 1fr) minmax(160px, 1fr) minmax(
        160px,
        1fr
      ) minmax(240px, 1fr) minmax(240px, 1fr) repeat(
        auto-fit,
        minmax(160px, 1fr)
      );
    border-bottom: var(--color-border) 1px solid;
  }

  #app-content.user-list-grid .row.disabled {
    opacity: 0.5;
  }

  #app-content.user-list-grid .row .name,
  #app-content.user-list-grid .row .password,
  #app-content.user-list-grid .row .mailAddress,
  #app-content.user-list-grid .row .languages,
  #app-content.user-list-grid .row .storageLocation,
  #app-content.user-list-grid .row .userBackend,
  #app-content.user-list-grid .row .lastLogin {
    min-width: 160px;
  }

  #app-content.user-list-grid .row .name doesnotexist:-o-prefocus,
  #app-content.user-list-grid .row .name .strengthify-wrapper,
  #app-content.user-list-grid .row .password doesnotexist:-o-prefocus,
  #app-content.user-list-grid .row .password .strengthify-wrapper,
  #app-content.user-list-grid .row .mailAddress doesnotexist:-o-prefocus,
  #app-content.user-list-grid .row .mailAddress .strengthify-wrapper,
  #app-content.user-list-grid .row .languages doesnotexist:-o-prefocus,
  #app-content.user-list-grid .row .languages .strengthify-wrapper,
  #app-content.user-list-grid
    .row
    .storageLocation
    doesnotexist:-o-prefocus
    #app-content.user-list-grid
    .row
    .storageLocation
    .strengthify-wrapper,
  #app-content.user-list-grid .row .userBackend doesnotexist:-o-prefocus,
  #app-content.user-list-grid .row .userBackend .strengthify-wrapper,
  #app-content.user-list-grid .row .lastLogin doesnotexist:-o-prefocus,
  #app-content.user-list-grid .row .lastLogin .strengthify-wrapper {
    color: var(--color-text-dark);
    vertical-align: baseline;
    text-overflow: ellipsis;
  }

  #app-content.user-list-grid .row:not(.row--editable).name,
  #app-content.user-list-grid .row:not(.row--editable).password,
  #app-content.user-list-grid .row:not(.row--editable).displayName,
  #app-content.user-list-grid .row:not(.row--editable).mailAddress,
  #app-content.user-list-grid .row:not(.row--editable).userBackend,
  #app-content.user-list-grid .row:not(.row--editable).languages {
    overflow: hidden;
  }

  #app-content.user-list-grid .row .groups,
  #app-content.user-list-grid .row .subadmins,
  #app-content.user-list-grid .row .quota {
    min-width: 160px;
  }

  #app-content.user-list-grid .row .groups .multiselect,
  #app-content.user-list-grid .row .subadmins .multiselect,
  #app-content.user-list-grid .row .quota .multiselect {
    width: 100%;
    color: var(--color-text-dark);
    vertical-align: baseline;
  }

  #app-content.user-list-grid .row .obfuscated {
    width: 400px;
    opacity: 0.7;
  }

  #app-content.user-list-grid .row .userActions {
    display: flex;
    justify-content: flex-end;
    position: sticky;
    right: 0px;
    min-width: 88px;
    background-color: var(--color-main-background);
  }

  #app-content.user-list-grid .row .subtitle {
    color: var(--color-text-maxcontrast);
    vertical-align: baseline;
  }

  #app-content.user-list-grid .row#grid-header {
    position: sticky;
    align-self: normal;
    background-color: var(--color-main-background);
    z-index: 100;
    top: 50px;
  }

  #app-content.user-list-grid .row#grid-header.sticky {
    box-shadow: 0 -2px 10px 1px var(--color-box-shadow);
  }

  #app-content.user-list-grid .row#grid-header {
    color: var(--color-text-maxcontrast);
    border-bottom-width: thin;
  }

  #app-content.user-list-grid .row#grid-header #headerDisplayName,
  #app-content.user-list-grid .row#grid-header #headerPassword,
  #app-content.user-list-grid .row#grid-header #headerAddress,
  #app-content.user-list-grid .row#grid-header #headerGroups,
  #app-content.user-list-grid .row#grid-header #headerSubAdmins,
  #app-content.user-list-grid .row#grid-header #theHeaderUserBackend,
  #app-content.user-list-grid .row#grid-header #theHeaderLastLogin,
  #app-content.user-list-grid .row#grid-header #headerQuota,
  #app-content.user-list-grid .row#grid-header #theHeaderStorageLocation,
  #app-content.user-list-grid .row#grid-header #headerLanguages {
    padding-left: 7px;
    text-transform: none;
    color: var(--color-text-maxcontrast);
    vertical-align: baseline;
  }

  #app-content.user-list-grid
    .row:hover
    input:not([type="submit"]):not(:focus):not(:active) {
    border-color: var(--color-border) !important;
  }

  #app-content.user-list-grid .row:hover:not(#grid-header) {
    box-shadow: 5px 0 0 var(--color-primary-element) inset;
  }

  #app-content.user-list-grid .row > form {
    width: 100%;
  }

  #app-content.user-list-grid .row > div,
  #app-content.user-list-grid .row > .displayName > form,
  #app-content.user-list-grid .row > form {
    grid-row: 1;
    display: inline-flex;
    color: var(--color-text-lighter);
    flex-grow: 1;
  }

  #app-content.user-list-grid .row > div > input:not(:focus):not(:active),
  #app-content.user-list-grid
    .row
    > .displayName
    > form
    > input:not(:focus):not(:active),
  #app-content.user-list-grid .row > form > input:not(:focus):not(:active) {
    border-color: transparent;
    cursor: pointer;
  }

  #app-content.user-list-grid .row > div > input:focus + .icon-confirm,
  #app-content.user-list-grid .row > div > input:active + .icon-confirm,
  #app-content.user-list-grid
    .row
    > .displayName
    > form
    > input:focus
    + .icon-confirm,
  #app-content.user-list-grid
    .row
    > .displayName
    > form
    > input:active
    + .icon-confirm,
  #app-content.user-list-grid .row > form > input:focus + .icon-confirm,
  #app-content.user-list-grid .row > form > input:active + .icon-confirm {
    display: block !important;
  }

  #app-content.user-list-grid
    .row
    > div:not(.userActions)
    > input:not([type="submit"]),
  #app-content.user-list-grid
    .row
    > .displayName
    > form:not(.userActions)
    > input:not([type="submit"]),
  #app-content.user-list-grid
    .row
    > form:not(.userActions)
    > input:not([type="submit"]) {
    width: 100%;
    min-width: 0;
  }

  #app-content.user-list-grid .row > div.name,
  #app-content.user-list-grid .row > .displayName > form.name,
  #app-content.user-list-grid .row > form.name {
    word-break: break-all;
  }

  #app-content.user-list-grid .row > div.displayName > input,
  #app-content.user-list-grid .row > div.mailAddress > input,
  #app-content.user-list-grid .row > .displayName > form.displayName > input,
  #app-content.user-list-grid .row > .displayName > form.mailAddress > input,
  #app-content.user-list-grid .row > form.displayName > input,
  #app-content.user-list-grid .row > form.mailAddress > input {
    text-overflow: ellipsis;
    flex-grow: 1;
  }

  #app-content.user-list-grid .row > div.name,
  #app-content.user-list-grid .row > div.userBackend,
  #app-content.user-list-grid .row > .displayName > form.name,
  #app-content.user-list-grid .row > .displayName > form.userBackend,
  #app-content.user-list-grid .row > form.name,
  #app-content.user-list-grid .row > form.userBackend {
    line-height: 1.3em;
    max-height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  #app-content.user-list-grid .row > div.quota,
  #app-content.user-list-grid .row > .displayName > form.quota,
  #app-content.user-list-grid .row > form.quota {
    display: flex;
    justify-content: left;
    white-space: nowrap;
    position: relative;
  }

  #app-content.user-list-grid .row > div.quota progress,
  #app-content.user-list-grid .row > .displayName > form.quota progress,
  #app-content.user-list-grid .row > form.quota progress {
    width: 150px;
    margin-top: 35px;
    height: 3px;
  }

  #app-content.user-list-grid .row > div .icon-confirm,
  #app-content.user-list-grid .row > .displayName > form .icon-confirm,
  #app-content.user-list-grid .row > form .icon-confirm {
    flex: 0 0 auto;
    cursor: pointer;
  }

  #app-content.user-list-grid .row > div .icon-confirm:not(:active),
  #app-content.user-list-grid
    .row
    > .displayName
    > form
    .icon-confirm:not(:active),
  #app-content.user-list-grid .row > form .icon-confirm:not(:active) {
    display: none;
  }

  #app-content.user-list-grid .row > div.avatar,
  #app-content.user-list-grid .row > .displayName > form.avatar,
  #app-content.user-list-grid .row > form.avatar {
    height: 32px;
    width: 32px;
    margin: 6px;
  }

  #app-content.user-list-grid .row > div.avatar img,
  #app-content.user-list-grid .row > .displayName > form.avatar img,
  #app-content.user-list-grid .row > form.avatar img {
    display: block;
  }

  #app-content.user-list-grid .row > div.userActions,
  #app-content.user-list-grid .row > .displayName > form.userActions,
  #app-content.user-list-grid .row > form.userActions {
    display: flex;
    justify-content: flex-end;
  }

  #app-content.user-list-grid .row > div.userActions #newsubmit,
  #app-content.user-list-grid .row > .displayName > form.userActions #newsubmit,
  #app-content.user-list-grid .row > form.userActions #newsubmit {
    width: 100%;
  }

  #app-content.user-list-grid .row > div.userActions .toggleUserActions,
  #app-content.user-list-grid
    .row
    > .displayName
    > form.userActions
    .toggleUserActions,
  #app-content.user-list-grid .row > form.userActions .toggleUserActions {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--color-main-background);
  }

  #app-content.user-list-grid
    .row
    > div.userActions
    .toggleUserActions
    .icon-more,
  #app-content.user-list-grid
    .row
    > .displayName
    > form.userActions
    .toggleUserActions
    .icon-more,
  #app-content.user-list-grid
    .row
    > form.userActions
    .toggleUserActions
    .icon-more {
    width: 44px;
    height: 44px;
    opacity: 0.5;
    cursor: pointer;
  }

  #app-content.user-list-grid
    .row
    > div.userActions
    .toggleUserActions
    .icon-more:focus,
  #app-content.user-list-grid
    .row
    > div.userActions
    .toggleUserActions
    .icon-more:hover,
  #app-content.user-list-grid
    .row
    > div.userActions
    .toggleUserActions
    .icon-more:active,
  #app-content.user-list-grid
    .row
    > .displayName
    > form.userActions
    .toggleUserActions
    .icon-more:focus,
  #app-content.user-list-grid
    .row
    > .displayName
    > form.userActions
    .toggleUserActions
    .icon-more:hover,
  #app-content.user-list-grid
    .row
    > .displayName
    > form.userActions
    .toggleUserActions
    .icon-more:active,
  #app-content.user-list-grid
    .row
    > form.userActions
    .toggleUserActions
    .icon-more:focus,
  #app-content.user-list-grid
    .row
    > form.userActions
    .toggleUserActions
    .icon-more:hover,
  #app-content.user-list-grid
    .row
    > form.userActions
    .toggleUserActions
    .icon-more:active {
    opacity: 0.7;
    background-color: var(--color-background-dark);
  }

  #app-content.user-list-grid .row > div.userActions .feedback,
  #app-content.user-list-grid .row > .displayName > form.userActions .feedback,
  #app-content.user-list-grid .row > form.userActions .feedback {
    display: flex;
    align-items: center;
    white-space: nowrap;
    transition: opacity 200ms ease-in-out;
  }

  #app-content.user-list-grid .row > div.userActions .feedback .icon-checkmark,
  #app-content.user-list-grid
    .row
    > .displayName
    > form.userActions
    .feedback
    .icon-checkmark,
  #app-content.user-list-grid
    .row
    > form.userActions
    .feedback
    .icon-checkmark {
    opacity: 0.5;
    margin-right: 5px;
  }

  #app-content.user-list-grid .row > div .multiselect.multiselect-vue,
  #app-content.user-list-grid
    .row
    > .displayName
    > form
    .multiselect.multiselect-vue,
  #app-content.user-list-grid .row > form .multiselect.multiselect-vue {
    width: 100%;
  }

  #app-content.user-list-grid .infinite-loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row-start: span 4;
  }

  #app-content.user-list-grid .users-list-end {
    opacity: 0.5;
    user-select: none;
  }
}

.toastify.dialogs.toast-error {
    border-left: 3px solid var(--color-error);
}

.toastify.dialogs.toastify-top {
    right: 10px;
}

.toastify.dialogs {
    min-width: 200px;
    background: none;
    background-color: var(--color-main-background);
    color: var(--color-main-text);
    box-shadow: 0 0 6px 0 var(--color-box-shadow);
    padding: 12px;
    padding-right: 34px;
    margin-top: 45px;
    position: fixed;
    z-index: 10100;
    border-radius: var(--border-radius);
}
</style>