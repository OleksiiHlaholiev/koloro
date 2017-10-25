<?php
    if(
        (isset($_POST['user-name'])&&$_POST['user-name']!="") &&
        (isset($_POST['user-tel'])&&$_POST['user-tel']!="")&&
        (isset($_POST['user-email'])&&$_POST['user-email']!="")
        ){ 
    // form validation: is sent and is not empty
        $to = 'oleksii.hlaholiev@gmail.com'; // email addresses
        //        agromag4722@mail.ru
        $subject = 'Обратный звонок с сайта RemBek'; // text subject
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['user-name'].'</p>
                        <p>Телефон: '.$_POST['user-tel'].'</p>
                        <p>E-mail: '.$_POST['user-email'].'</p>                        
                    </body>
                </html>'; // text to send, via HTML tag
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; // mail coding
        $headers .= "From: Заказ <oleksii.hlaholiev@gmail.com>\r\n"; // sender's name and email
        mail($to, $subject, $message, $headers); // send email via function -  mail
    }
?>