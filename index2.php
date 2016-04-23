<!DOCTYPE html>
<html lang="en" ng-app="peviApp">
<head>
 
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
      
    <title>Pevi</title>
     
    <!-- include material design CSS -->
    <link rel="stylesheet" href="libs/css/materialize.min.css" />

    <link rel="stylesheet" href="libs/css/style.css" />
     
    <!-- include material design icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

    <script src="js/app.js"></script>

    <!-- page content and controls will be here -->
 
	<!-- include jquery -->
	<script type="text/javascript" src="libs/js/jquery.js"></script>
	 
	<!-- material design js -->
	<script src="libs/css/js/materialize.min.js"></script>
	 
	<!-- include angular js -->
	<script src="libs/js/angular.js"></script>
	

    <!-- custom CSS -->
 
	<style>
	.width-30-pct{
	    width:30%;
	}
	 
	.text-align-center{
	    text-align:center;
	}
	 
	.margin-bottom-1em{
	    margin-bottom:1em;
	}
	</style>
     
</head>
<body>

	<div ng-view></div>
	
</body>
</html>