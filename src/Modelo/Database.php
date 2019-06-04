<?php
namespace Modelo;

class Database{

	private $database;

	public function __construct($container)
	{
		$this->database = $container->database;
	}

	public function getNoticias($estado){
		$arr = $this->database->select('noticia', ['id', 'titular','estado'],["estado"=>$estado]);
		return $arr;
	}


	public function getNoticia($idNoticia){
		$arr = $this->database->get('noticia', ['id', 'titular','lead','cuerpo'],["id"=>$idNoticia]);
		return $arr;
	}	
}