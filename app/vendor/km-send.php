<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'autoload.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'sanch941@gmail.com';                 // SMTP username
    $mail->Password = '153624sanch_94';                           // SMTP password
    $mail->SMTPSecure = true;                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to
    $input_name = $_POST["name"];
    $input_phone = $_POST["phone"];
    //Recipients
    $mail->setFrom('sanch941@gmail.com', 'Client');
    $mail->addAddress('info@kazarm.kz', 'Kazarm');



    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Заявка с главной мобильной версии Kazarm.kz';
    $mail->Body    = "
    <html>
      <head>
        <style>
          body {
            font-size:17px;
          }
          .client {
            display:flex;
            align-items:center;
          }
          .green {
            color: green;
          }
          .blue {
            color: #042E52;
          }
        </style>
      </head>
      <body>
      <div class='client'>
        <p class='blue'>Имя клиента: </p> {$input_name}
      </div>
      <div class='client'>
        <p class='green'>Телефон клиента: </p> {$input_phone}
      </div>
      </body>
    </html>



    ";
    $mail->AltBody = 'Заявка';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}

?>

Сообщение отправлено
