<?php

namespace Teaocha\SonataAdminImagePanelBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Image;

class MediaProcessController extends Controller
{

	public function imageFromUrlAction(Request $request) {
	
		if(!$request->request->has('imageUrl')) {
			$response = new Response();
			$response->setContent("Bad request");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		$imageHandler = $this->get('teaocha.image_panel.request_handler_provider')->getHandler();
		
		try{
			$result = $imageHandler->imageUrlUpload($request->request->get('imageUrl'));
			return new JsonResponse(array('id' => $result->getId(), 'url' => $result->getPreviewUrl()));
		}
		catch(Exception $e) {
			$response = new Response();
			$response->setContent($e->getMessage());
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;		
		}
				
	}

	public function uploadImageAction(Request $request) {
	
		if(!$request->request->has('image') || !$request->request->has('contentType')) {
			$response = new Response();
			$response->setContent("Bad request");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		$imageData = $request->request->get('image');
		$contentType = $request->request->get('contentType');
		
		$imageHandler = $this->get('teaocha.image_panel.request_handler_provider')->getHandler();
		
		try{	
			$result = $imageHandler->imageUpload($imageData, $contentType);
			return new JsonResponse(array('id' => $result->getId(), 'url' => $result->getPreviewUrl()));
		}
		catch(Exception $e) {
			$response = new Response();
			$response->setContent($e->getMessage());
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;		
		}			 
	
		return new JsonResponse(array('id' => $imageEntity->getId(), 'url' => $imageEntity->getUrl()));		
	}
	

	public function deleteImageAction($id) {
	
		$imageHandler = $this->get('teaocha.image_panel.request_handler_provider')->getHandler();
		
		try{
			$result = $imageHandler->deleteImage($id);
			$response = new Response();
			$response->setStatusCode(Response::HTTP_OK);
			return $response;
		}
		catch(Exception $e) {
			$response = new Response();
			$response->setContent($e->getMessage());
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;		
		}	
	}

}
