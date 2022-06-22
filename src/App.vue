<template>
    <Content app-name="usersettings">
        <AppContent>
            <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At aspernatur est explicabo dicta eaque, optio ex accusamus odio tenetur facilis itaque ad dolore alias exercitationem aperiam reprehenderit nisi harum vitae pariatur obcaecati. Pariatur laboriosam tenetur itaque veritatis at ab aspernatur, ad voluptatibus.</h1>
        </AppContent>
    </Content>
</template>

<script>
import AppContent from '@nextcloud/vue/dist/Components/AppContent'
import Content from '@nextcloud/vue/dist/Components/Content'

export default {
	name: 'App',
    components: {
        AppContent, 
        Content
    }
}
</script>