<?php
// get database connection
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// instantiate product object
include_once 'objects/expense.php';
$expense = new Expense($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$expense->id_exp = $data->id_exp;

// create the product
if($expense->delete()){
    echo "Expense was deleted.";
}

// if unable to create the product, tell the user
else{
    echo "Unable to delete expense.";
}
?>