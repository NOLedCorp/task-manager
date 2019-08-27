<?php
require '../models.php';
class DataBase {
    
    /**
     * Подключение к базе данных
     */
    public $db;
    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_task;charset=UTF8','nomokoiw_task','1HlQ&Ai*');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }

    /**
     * Загрузка файла на хост
     * 
     * Позволяет загрузить файл на хост и сохранить путь к нему в указанную таблицу, строку и колонку
     * 
     * @param string $l логин пользователя
     * @param string $p пароль пользователя
     * @param string $pid id строки в которую необходимо вставить адрес файла
     * @param blob $files файл для вставки из глобального массива $_FILES
     * @param string $t таблица, в которую вставить адрес файла
     * @param string $column столбец для вставки адреса файла
     */
    public function uploadFile($l, $p, $pid, $files, $t, $column='Photo'){
        if($this->checkAdmin($l, $p)){
            $img=$this->getImage($pid, $t, $column);
            if($img){
                $this->removeFile($img);
            }
            $url = "http://client.nomokoiw.beget.tech/satoga/";
            $n = basename($t."_".$pid."__".$files['Data']['name']);
            //$tid=ucfirst($t)."Id";
            $tid="Id";
            $d = "Files/$n";
            if(file_exists("Files")){
                
                if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                    $s = $this->db->prepare("UPDATE $t SET $column=? WHERE $tid=?");
                    $s->execute(array($url.$d, $pid));
                    return($url.$d);
                }else{
                    return($_FILES['Data']['tmp_name']);
                }
            }else{
                mkdir("Files");
                if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                    $s = $this->db->prepare("UPDATE $t SET $column=? WHERE $tid=?");
                    $s->execute(array($url.$d, $pid));
                    return($url.$d);
                }else{
                    return($_FILES['Data']['tmp_name']);
                }
            }
            
            return false;
        }else{
            return null;
        }
    }

    /**
     * Получение адреса изображения или файла
     * 
     * @param number $id id строки
     * @param string $t таблица для поиска адреса изображения
     * @param string $column столбец для поиска изображения
     * @return string адрес файла
     */
    public function getImage($id, $t, $column){
        // $tid=ucfirst($t)."Id";
        $tid="Id";
        $s = $this->db->prepare("SELECT $column FROM $t WHERE $tid=?");
        $s->execute(array($id));
        return $s->fetch()[$column];
    }

    /**
     * Генерация запроса вставки
     * 
     * @param mixed $ins объект для вставки, столбцы объекта должны соответсвовать столбцам таблицы
     * @param string $t таблица для вставки
     * @return array массив, первым элементом которого является строка запроса, вторым - массив вставляемых значений
     */
    private function genInsertQuery($ins, $t){
        $res = array('INSERT INTO '.$t.' (',array());
        $q = '';
        for ($i = 0; $i < count(array_keys($ins)); $i++) {
            $res[0] = $res[0].array_keys($ins)[$i].',';
            $res[1][]=$ins[array_keys($ins)[$i]];
            $q=$q.'?,';
            
        }
        $res[0]=rtrim($res[0],',');
        $res[0]=$res[0].') VALUES ('.rtrim($q,',').');';
        
        return $res;
        
    }

    /**
     * Генерация запроса обновления
     * 
     * @param array $keys стобцы таблицы, которые надо обновить
     * @param array $values значения, которые надо вставить в указанные стобцы
     * @param string $t таблица для вставки
     * @return array массив, первым элементом которого является строка запроса, вторым - массив вставляемых значений
     */
    private function genUpdateQuery($keys, $values, $t, $id, $id_name){
        $res = array('UPDATE '.$t.' SET ',array());
        $q = '';
        for ($i = 0; $i < count($keys); $i++) {
            if($values[$i]!='now()'){
                $res[0] = $res[0].$keys[$i].'=?, ';
                $res[1][]=$values[$i];
            }
            else{
                $res[0] = $res[0].$keys[$i].'=now(), ';
            }
            
            
        }
        $res[0]=rtrim($res[0],', ');
        $res[0]=$res[0]." WHERE $id_name = ".$id;
        
        return $res;
        
    }
    
    /**
     * Удаление файла с хоста
     * 
     * @param string $filelink путь к файлу
     */
    private function removeFile($filelink){
        $path = explode('satoga/',$filelink);
        if($path[1]){
            unlink($path[1]);
        }
        
    }
    
    
    private function mergeCollection($t, $main_id_name, $main_id, $new_items){
        $sth = $this->db->prepare("DELETE FROM $t WHERE $main_id_name=?");
        $sth->execute(array($main_id));
        for($i = 0; $i<count($new_items); $i++){
            $new_items[$i][$main_id_name]=$main_id;
            $res = $this->genInsertQuery($new_items[$i], $t);
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
    }
    
    
    public function checkProjectUser($user_id, $project_id){
        $s = $this->db->prepare("SELECT Id FROM projects WHERE Id=? AND CreateUserId=? UNION SELECT Id FROM projectusers WHERE ProjectId=? AND UserId=?");
        $s->execute(array($project_id, $user_id, $project_id, $user_id));
        
        return count($s->fetchAll())>0;
    }
    
    public function getProject($user_id, $project_id){
        if(!$this->checkProjectUser($user_id, $project_id)){
            return false;
        }
        $s = $this->db->prepare("SELECT * FROM projects WHERE Id=?");
        $s->execute(array($project_id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Project');
        
        return $s->fetch();
    }
    
    public function getProjectTasks($user_id, $project_id){
        if(!$this->checkProjectUser($user_id, $project_id)){
            return false;
        }
        $s = $this->db->prepare("SELECT * FROM tasks WHERE ProjectId=?");
        $s->execute(array($project_id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Task');
        
        return $s->fetchAll();
    }
    
    public function getProjectReqs($user_id, $project_id){
        if(!$this->checkProjectUser($user_id, $project_id)){
            return false;
        }
        $s = $this->db->prepare("SELECT * FROM requirements WHERE ProjectId=?");
        $s->execute(array($project_id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Requirement');
        
        return $s->fetchAll();
    }
    
    public function getProjectTeam($user_id, $project_id){
        if(!$this->checkProjectUser($user_id, $project_id)){
            return false;
        }
        $s = $this->db->prepare("SELECT pu.Id as ProjectUserId, u.Id, u.Name, u.Photo FROM projectusers pu JOIN users u ON pu.UserId=u.Id WHERE ProjectId=?");
        $s->execute(array($project_id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $users = [];
        while($user = $s->fetch()){
            $user['Roles']=$this->getUserRoles($user['ProjectUserId']);
        }
        return $users;
    }
    
    private function getUserRoles($user_id){
        $s = $this->db->prepare("SELECT * FROM roles WHERE ProjectUserId=?");
        $s->execute(array($user_id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Role');
        
        return $s->fetchAll();
    }

    // ------------------------       Запросы на добавление данных в базу      ------------------------
    

    public function addItem($l, $p, $table, $item){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $res = $this->genInsertQuery($item,$table);
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        
        return $this->db->lastInsertId();
    }
    
    public function removeItem($l, $p, $table, $id){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        $this->remove($table, $id);
    }
    
    private function remove($table, $id){
        $s = $this->db->prepare("DELETE FROM $table WHERE Id=?");
        $s->execute(array($id));
    }
    
    public function removeItems($l, $p, $table, $items){
        if(!$this->checkAdmin($l, $p)){
            return;
        }
        for ($i = 0; $i < count($items); $i++) {
            if($items[$i]['Photo']!=null){
                $this->removeFile($items[$i]['Photo']);
            }
            
            $this->remove($table, $items[$i]['Id']);
            
        }
    }

   
    
    // ------------------------       Запросы на изменение данных в базе       ------------------------
    
    public function updateItem($l, $p, $new, $table){
        if($this->checkAdmin($l, $p)){
            $id = $new['Id'];
            unset($new['Id']);
            $a = $this->genUpdateQuery(array_keys($new), array_values($new), $table, $id, 'Id');
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    
   
    
    
}
?>