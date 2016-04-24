<?php
require_once('class.phpmailer.php');
$errors = array();  	// array to hold validation errors
$data = array(); 		// array to pass back data
$body = "I have discovered your awesome page and to contact you !";
// validate the variables ======================================================
	if (empty($_POST['userEmail']))
		$errors['userEmail'] = 'Email is required.';

// return a response ===========================================================
	// response if there are errors
	if ( ! empty($errors)) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;

	} else {
		$mail = new PHPMailer(); // create a new object
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPAuth = true; // authentication enabled
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
        $mail->Username   = 'peter.vidis@gmail.com'; // SMTP account username
        $mail->Password   = 'Fornetti2*19889358';
        //$mail->SMTPDebug = 1;
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465; // or 587
        $mail->IsHTML(true);
        $mail->Subject = "Y-Web Contact mail from e-mail: " .$_POST['userEmail']. "";
        $mail->Body = "I have discovered your awesome page and to contact you !";
        $mail->AddAddress("peter.vidis@gmail.com"); //Pass the e-mail that you setup
         if(!$mail->Send())
            {
                    echo "Mailer Error: " . $mail->ErrorInfo;
            }
            else
            {
                $data['success'] = true;
                $data['message'] = 'Thank you for sending e-mail.';
            }


	}
	echo json_encode($data);