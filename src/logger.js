import { getLoggerBuilder } from '@nextcloud/logger'

export default getLoggerBuilder()
	.setApp('user-settings')
	.detectUser()
	.build()
