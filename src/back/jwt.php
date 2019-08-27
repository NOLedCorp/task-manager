<?php

class JWT {
    private $jkey = 'KESRdV2f';
    
    public function getJWT($info){
        $header = array('alg'=>'HS256', 'typ'=>'JWT');
        $utoket = base64_encode(json_encode($header)).'.'.base64_encode(json_encode($info));
        $sign=hash_hmac('sha256', $utoken, $this->jkey);
        
        return $utoket.'.'.$sign;
    }
    
    public function checkJWT($jwt){
        $jwt_arr = explode('.', $jwt);
        $utoket = $jwt_arr[0].'.'.$jwt_arr[1];
        
        return hash_hmac('sha256', $utoken, $this->jkey)==$jwt_arr[2];
    }
    
    public function decodeJWT($jwt){
        
        $jwt_arr = explode('.', $jwt);
        
        return json_decode(base64_decode($jwt_arr[1]));
    }
}

?>