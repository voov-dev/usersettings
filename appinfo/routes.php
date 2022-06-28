<?php
/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\UserSettings\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
    'resources' => [
		'AuthSettings' => ['url' => '/settings/personal/authtokens' , 'root' => ''],
	],
    'routes' => [
        ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'page#do_echo', 'url' => '/echo', 'verb' => 'POST'],
        ['name' => 'page#setDisplayName', 'url' => '/{username}/displayName', 'verb' => 'POST' , 'root' => ''],
		['name' => 'page#setEMailAddress', 'url' => '/{id}/mailAddress', 'verb' => 'PUT' , 'root' => ''],
		['name' => 'page#setUserSettings', 'url' => '/{username}/settings', 'verb' => 'PUT' , 'root' => ''],
		['name' => 'page#getVerificationCode', 'url' => '/{account}/verify', 'verb' => 'GET' , 'root' => ''],
		['name' => 'page#usersListByGroup', 'url' => '/{group}', 'verb' => 'GET', 'requirements' => ['group' => '.+'] , 'root' => ''],
		['name' => 'page#setPreference', 'url' => '/preferences/{key}', 'verb' => 'POST' , 'root' => ''],
    ]
];
