<?php
// get database connection
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// instantiate product object
include_once 'objects/category.php';
$category = new Category($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$category->name = $data->name;
$category->description = $data->description;
$category->priority = $data->priority;

// create the product
if($category->create()){
    echo "Category was created.";
}

// if unable to create the product, tell the user
else{
    echo "Unable to create category.";
}
?>