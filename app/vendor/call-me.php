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
    $mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'no-reply@muratov.kz';                 // SMTP username
    $mail->Password = 'gkqadrgsqutmxqfe';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to
    $input_name2 = $_POST["name2"];
    $input_phone2 = $_POST["phone2"];
    //Recipients       
    $mail->addAddress('sanch941@gmail.com', 'Green');

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
        <p class='blue'>Имя клиента: </p> {$input_name2}
      </div>
      <div class='client'>
        <p class='green'>Телефон клиента: </p> {$input_phone2}
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

