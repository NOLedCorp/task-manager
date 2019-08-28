<?php
require 'project.repository.php';
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
            case 'check-project-user':
                echo json_encode($ctxt->checkProjectUser($jwt->decodeJWT($_GET['Token'])->Id, $_GET['ProjectId']));
                break;
            
            //----------------Получение данных-----------------
            
            case 'get-project':
                echo json_encode($ctxt->getProject($jwt->decodeJWT($_GET['Token'])->Id, $_GET['ProjectId']));
                break;
                
            case 'get-project-tasks':
                echo json_encode($ctxt->getProjectTasks($jwt->decodeJWT($_GET['Token'])->Id, $_GET['ProjectId']));
                break;
                
            case 'get-project-team':
                echo json_encode($ctxt->getProjectTeam($jwt->decodeJWT($_GET['Token'])->Id, $_GET['ProjectId']));
                break;
                
            case 'get-project-reqs':
                echo json_encode($ctxt->getProjectReqs($jwt->decodeJWT($_GET['Token'])->Id, $_GET['ProjectId']));
                break;
                
            case 'get-tasks':
                echo json_encode($ctxt->getTasks($jwt->decodeJWT($_GET['Token'])->Id));
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
        throw new Exception('Пользователь не авторизован.');
    }
    
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>