OCA.Theming = OCP.InitialState.loadState('theming', 'data')

document.addEventListener('DOMContentLoaded', function() {

    const oldUserMenuItem = document.querySelector('[data-id="core_users"]');
    if (oldUserMenuItem) {
        oldUserMenuItem.remove();
    }
})
