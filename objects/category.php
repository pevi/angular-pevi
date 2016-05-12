<?php
class Category{

    // database connection and table name
    private $conn;
    private $category_table = "category";

    // object properties
    public $id_cat;
    public $cat_name;
    public $cat_desc;
    public $cat_priority;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
function readAllCategories(){

    // select all query
    $query = "SELECT
                id_cat, cat_name, cat_desc, cat_priority
            FROM
                " . $this->category_table . "
            ORDER BY
                id_cat ASC";

    // prepare query statement
    $stmt = $this->conn->prepare( $query );

    // execute query
    $stmt->execute();

    return $stmt;
}
        // read products
function readAll(){

    // select all query
    $query = "SELECT
                id_cat, cat_name
            FROM
                " . $this->category_table . "
            ORDER BY
                id_cat ASC";

    // prepare query statement
    $stmt = $this->conn->prepare( $query );

    // execute query
    $stmt->execute();

    return $stmt;
}

// create product
function create(){

    // query to insert record
    $query = "INSERT INTO
                " . $this->category_table . "
            SET
                cat_name=:name, cat_desc=:description, cat_priority=:priority";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // posted values
    $this->name=htmlspecialchars(strip_tags($this->name));
    $this->description=htmlspecialchars(strip_tags($this->description));
    $this->priority=htmlspecialchars(strip_tags($this->priority));

    // bind values
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":description", $this->description);
    $stmt->bindParam(":priority", $this->priority);

    // execute query
    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";

        return false;
    }
}

}

