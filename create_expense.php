<?php
// get database connection
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// instantiate product object
include_once 'objects/expense.php';
$product = new Expense($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$product->name = $data->name;
$product->description = $data->description;
$product->category_id = $data->category_id;
$product->created = date('Y-m-d H:i:s');

// create the product
if($product->create()){
    echo "Expense was created.";
}

// if unable to create the product, tell the user
else{
    echo "Unable to create product.";
}
?>