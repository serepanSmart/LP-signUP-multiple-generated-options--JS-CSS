<?php
$to = "example@gmail.com";
$subject ='order';
$message .= " \r\n";
$message .= "Answers: ".$_POST['desc']. "\r\n";
$message .= "Name: ".$_POST['name']. "\r\n";
$message .= "Phone: ".$_POST['phone']. "\r\n"; 
$headers  = 'MIME-Version: 1.0' . "\r\n"; 
  $headers .= 'Content-type: text/html; charset=utf-8'."\r\n"; 
  if (mail($to,$subject,$message,"from:example@example.com")) {
    echo 'good';
    echo $to,$subject,$message ;
  } else {
    echo 'error';
  }
?>