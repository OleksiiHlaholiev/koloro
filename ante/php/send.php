<?php
    if(
        (isset($_POST['user-name'])&&$_POST['user-name']!="") &&
        (isset($_POST['user-contact'])&&$_POST['user-contact']!="")&&
        (isset($_POST['user-text'])&&$_POST['user-text']!="")
        ){ 
    // form validation: is sent and is not empty
        $to = 'ante.sale7@gmail.com'; // email addresses
        $subject = 'Обратный звонок с сайта ante.com.ua/ante-ooo'; // text subject
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['user-name'].'</p>
                        <p>Контакт: '.$_POST['user-contact'].'</p>
                        <p>Сообщение: '.$_POST['user-text'].'</p>                        
                    </body>
                </html>'; // text to send, via HTML tag
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; // mail coding
        $headers .= "From: Заказ <ante.sale7@gmail.com>\r\n"; // sender's name and email
        mail($to, $subject, $message, $headers); // send email via function -  mail
    }
?>