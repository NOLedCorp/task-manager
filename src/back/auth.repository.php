<?php
require 'jwt.php';
class DataBase {
    private $db;
    private $jwt;
    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_task;charset=UTF8','nomokoiw_task','1HlQ&Ai*');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        $this->jwt = new JWT();
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
    
    
    public function addUser($user){
        $s = $this->db->prepare("SELECT * FROM users WHERE Id=?");
        $s->execute(array($user['id']));
        $params['Id']=$user['id'];
        $params['Name']=$user['first_name'].' '.$user['last_name'];
        $params['Photo']=$user['photo_big'];
        if(count($s->fetchAll())==0){
            
            
            $res = $this->genInsertQuery($params,"users");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }else{
            $this->updateUser($user);
        }
        return $this->jwt->getJWT($params);
    }
    
    public function updateUser($user){
        $params = array(
            'Name' => $user['first_name'].' '.$user['last_name'],
            'Photo' => $user['photo_big']
        );
        $res = $this->genUpdateQuery(array_keys($params), array_values($params),"users",$user['id'],"Id");
        $s = $this->db->prepare($res[0]);
        $s->execute($res[1]);
    }
    
    


    
}
?>