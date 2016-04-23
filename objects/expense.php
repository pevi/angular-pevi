<?php
class Expense{

    // database connection and table name
    private $conn;
    private $table_name = "expenses";
    private $category_table = "category";

    // object properties
    public $id_exp;
    public $exp_name;
    public $exp_desc;
    public $cat_name;
    public $cat_desc;
    public $exp_date;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
function readAll(){

    // select all query
    $query = "SELECT
                id_exp, exp_name, exp_desc, exp_date, cat_name, cat_desc
            FROM
                " . $this->table_name . "
            INNER JOIN " . $this->category_table . "
            ON " . $this->category_table . ".id_cat = " . $this->table_name . ".category
            ORDER BY
                id_exp ASC";

    // prepare query statement
    $stmt = $this->conn->prepare( $query );

    // execute query
    $stmt->execute();

    return $stmt;
}

        // read products
function readOne(){

    // select all query
    $query = "SELECT
                id_exp, exp_name, exp_desc, exp_date, id_cat, cat_name, cat_desc
            FROM
                " . $this->table_name . "
            INNER JOIN " . $this->category_table . "
            ON " . $this->category_table . ".id_cat = " . $this->table_name . ".category
            WHERE id_exp=:id_exp";

    // prepare query statement
    $stmt = $this->conn->prepare( $query );

    $this->id_exp=htmlspecialchars(strip_tags($this->id_exp));

    $stmt->bindParam(":id_exp", $this->id_exp);

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
                 exp_name=:name, exp_desc=:description, category=:category_id, exp_date=:created";

     // prepare query
     $stmt = $this->conn->prepare($query);

     // posted values
     $this->name=htmlspecialchars(strip_tags($this->name));
     $this->description=htmlspecialchars(strip_tags($this->description));
     $this->category_id=htmlspecialchars(strip_tags($this->category_id));
     $this->created=htmlspecialchars(strip_tags($this->created));

     // bind values
     $stmt->bindParam(":name", $this->name);
     $stmt->bindParam(":description", $this->description);
     $stmt->bindParam(":category_id", $this->category_id);
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

 // update expense
  function update(){

      // query to insert record
      $query = "UPDATE
                  " . $this->table_name . "
              SET
                    exp_name=:name, exp_desc=:description, category=:category_id
              WHERE
                    id_exp=:id_exp";

      // prepare query
      $stmt = $this->conn->prepare($query);

      // posted values
      $this->name=htmlspecialchars(strip_tags($this->name));
      $this->description=htmlspecialchars(strip_tags($this->description));
      $this->category_id=htmlspecialchars(strip_tags($this->category_id));
      $this->created=htmlspecialchars(strip_tags($this->created));

      // bind values
      $stmt->bindParam(":name", $this->name);
      $stmt->bindParam(":description", $this->description);
      $stmt->bindParam(":category_id", $this->category_id);
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

 // delete expense
 function delete(){

     // query to insert record
     $query = "DELETE FROM
                 " . $this->table_name . "
             WHERE
                 id_exp=:id";

     // prepare query
     $stmt = $this->conn->prepare($query);

     // posted values
     $this->id_exp=htmlspecialchars(strip_tags($this->id_exp));

     // bind values
     $stmt->bindParam(":id", $this->id_exp);

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

