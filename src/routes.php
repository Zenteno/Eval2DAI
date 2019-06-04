<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
	$container = $app->getContainer();

	$app->get('/', function (Request $request, Response $response) use ($container) {
		//$container->get('logger')->info("Slim-Skeleton '/' route");
		return $container->get('renderer')->render($response, 'radiograma.phtml');
	});

	$app->get('/noticias/leidas', function (Request $request, Response $response) {
		$db = new \Modelo\Database($this);
		return $response->withJson($db->getNoticias(0));
	});
	$app->get('/noticias/porLeer', function (Request $request, Response $response) {
		$db = new \Modelo\Database($this);
		return $response->withJson($db->getNoticias(1));
	});

	$app->get('/noticia/{id}', function (Request $request, Response $response,$args) {
		$db = new \Modelo\Database($this);
		return $response->withJson($db->getNoticia($args["id"]));
	});
};
