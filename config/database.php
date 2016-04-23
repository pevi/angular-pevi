<?php class Database{ // specify your own database credentials private $host = "localhost"; private $db_name = "5phpangularcrudlevel1"; private $username = "root"; private $password = ""; public $conn; // get the database connection 
public function getConnection(){ $this->conn = null;
         
        try{
            $this->conn = new PDO("mysql:host=localhost;dbname=angular", "angular", "angular");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
         
        return $this->conn;
    }
}
?>