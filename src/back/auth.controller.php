<?php
require 'auth.repository.php';
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");
$client_id = "6833515";
$secret = "Hdc3faiQp2lQGKPSHD2n";
$redirect_uri="http://client.nomokoiw.beget.tech/task_manager/auth.controller.php";
$ctxt = new DataBase();
if(isset($_GET['code'])){
    $params = array(
        'client_id' => $client_id,
        'client_secret' => $secret,
        'code' => $_GET['code'],
        'redirect_uri' => $redirect_uri
    );
    if (!$token = @file_get_contents('https://oauth.vk.com/access_token?' .urldecode( http_build_query($params)))) {
		$error = error_get_last();
		 echo json_encode($error);
	}
	$token = json_decode($token);
	if(isset($token->access_token)){
	    $params = array(
            'user_ids'         => $token->user_id,
            'fields'       => 'uid,first_name,last_name,photo_big',
            'access_token' => $token->access_token,
            'v'            => '5.101'
        );
        $userInfo = json_decode(file_get_contents('https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params))), true);
        
        
        if (isset($userInfo['response'][0]['id'])) {
            
            $userInfo = $userInfo['response'][0];
            $result = true;
            header('Location: http://localhost:4200/#/auth?token='.$ctxt->addUser($userInfo));
            
        }
	}
    
}

    
?>