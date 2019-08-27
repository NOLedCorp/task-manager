<?php
require 'user.repository.php';
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
$jwt = new JWT();
if(isset($_GET['Token']))
{
    if($jwt->checkJWT($_GET['Token'])){
        switch ($_GET['Key']) {

            //-----------------Пользователь--------------------
            case 'get-user-info':
                echo json_encode($ctxt->getUserInfo($jwt->decodeJWT($_GET['Token'])->Id));
                break;
            
            case 'get-user-projects':
                echo json_encode($ctxt->getUserProjects($jwt->decodeJWT($_GET['Token'])->Id));
                break;
            
            case 'check-user-id':
                echo json_encode($jwt->decodeJWT($_GET['Token'])->Id==$_GET['Id']);
                break;
            
    
            // --------------- Добавление данных ---------------
    
    
            case 'add-item':
                
                $b = json_decode(file_get_contents('php://input'), true);
                //echo json_encode($ctxt->addItem($_GET['Login'], $_GET['Password'], $_GET['Table'], $b));
                break;
                
            
                
                // --------------- Обновление данных ---------------
                
            case 'update-item':
                $b = json_decode(file_get_contents('php://input'), true);
                //echo json_encode($ctxt->updateItem($_GET['Login'], $_GET['Password'], $b, $_GET['Table']));
                break;
            
                
                // --------------- Загрузка файлов ---------------
                
            case 'upload-file':
                $inp = json_decode(file_get_contents('php://input'), true);
                if($_GET['Column'] == null){
                    //echo json_encode(array($ctxt->uploadFile($_GET['Login'], $_GET['Password'], $_GET['Id'], $_FILES, $_GET['Type'])));
                }else{
                    //echo json_encode(array($ctxt->uploadFile($_GET['Login'], $_GET['Password'], $_GET['Id'], $_FILES, $_GET['Type'], $_GET['Column'])));
                }
                
                break;
            default:
                echo "Введенный ключ несуществует";
            
        }
    }else{
        echo false;
    }
    
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>