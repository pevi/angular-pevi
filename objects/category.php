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
                " . $this->table_name . "
            SET
                exp_name=:name, exp_desc=:description, category=:category, category_desc=:category_desc, exp_date=:created";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // posted values
    $this->name=htmlspecialchars(strip_tags($this->name));
    $this->description=htmlspecialchars(strip_tags($this->description));
    $this->category=htmlspecialchars(strip_tags($this->category));
    $this->category_desc=htmlspecialchars(strip_tags($this->category_desc));
    $this->created=htmlspecialchars(strip_tags($this->created));

    // bind values
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":description", $this->description);
    $stmt->bindParam(":category", $this->category);
    $stmt->bindParam(":category_desc", $this->category_desc);
    $stmt->bindParam(":created", $this->created);

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

