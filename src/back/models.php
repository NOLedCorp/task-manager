<?php

require 'jwt.php';

class User
    {
        public $Id;
        public $Photo;
        public $Name;
    }

class Project
    {
        public $Id;
        public $Name;
        public $GitHubLink;
        public $ClientContact;
        public $File;
        public $CreateUserId;
        public $CreateDate;
    }

class Task{
        public $Id;
        public $Name;
        public $UserId;
        public $ProjectId;
        public $RequirementId;
        public $Description;
        public $PlanTime;
        public $FactTime;
        public $Type;
        public $Status;
        public $Priority;
        public $CreateUserId;
        public $CreateDate;
        
        public $Links;
        public $Files;
}

class Requirement{
        public $Id;
        public $Name;
        public $UserId;
        public $ProjectId;
        public $Description;
        public $Status;
        public $Priority;
        public $CreateUserId;
        public $CreateDate;
        
        public $Links;
        public $Files;
}

class Role
    {
        public $Id;
        public $Name;
        public $CreateDate;
    }

class Includes
    {
        public static $Items  = ["Полностью комбинированное страхование",
            "Неограниченный километраж",
            "Второй водитель бесплатно",
            "Доставка/возврат в любое время",
            "Дорожная карта в подарок",
            "Доставка в аэропорт Ираклиона",
            "Аренда машины на Крите без франшизы"];

        public static $ItemsEng = ["Fully comprehensive insurance",
            "Unlimited mileage",
            "Second driver free of charge",
            "Delivery/return at any time",
            "Road map as a gift",
            "Delivery to Heraklion airport",
            "Rent a car in Crete with no excess"];


    }
?>