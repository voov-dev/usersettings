<?php
	script('usersettings', 'usersettings-main');
	style('usersettings', 'users');
?>

<div id="user-settings" data-server="<?php p(json_encode($_['serverData'])); ?>"></div>
