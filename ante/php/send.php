<?php
    if(
        (isset($_POST['user-name'])&&$_POST['user-name']!="") &&
        (isset($_POST['user-contact'])&&$_POST['user-contact']!="")&&
        (isset($_POST['user-text'])&&$_POST['user-text']!="")
        ){ 
    //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'oleksii.hlaholiev@gmail.com, kozitskyi@koloro.ua, m.kozitskyi@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Обратный звонок с сайта landos.ante.com.ua'; //Загаловок сообщения
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
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Отправитель <oleksii.hlaholiev@gmail.com>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
    }
?>