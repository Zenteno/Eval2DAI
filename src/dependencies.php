<?php

use Slim\App;
use Medoo\Medoo;
return function (App $app) {
    $container = $app->getContainer();

    // view renderer
    $container['renderer'] = function ($c) {
        $settings = $c->get('settings')['renderer'];
        return new \Slim\Views\PhpRenderer($settings['template_path']);
    };

    // Registra la base de datos
    $container['database'] = function () {
        return new Medoo([
            'database_type' => 'mysql',
            'database_name' => 'radio',
            'server' => 'localhost:3306',
            'username' => 'homestead',
            'password' => 'secret',
            'charset' => 'utf8'
        ]); 
    };


    // monolog
    $container['logger'] = function ($c) {
        $settings = $c->get('settings')['logger'];
        $logger = new \Monolog\Logger($settings['name']);
        $logger->pushProcessor(new \Monolog\Processor\UidProcessor());
        $logger->pushHandler(new \Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
        return $logger;
    };
};
