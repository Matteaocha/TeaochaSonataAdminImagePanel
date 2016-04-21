<?php

namespace Teaocha\SonataAdminImagePanelBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * AdminMedia controller.
 */
class ImagePanelController extends Controller
{
    /**
     * @Template()
     */
    public function indexAction()
    {
        $admin_pool = $this->get('sonata.admin.pool');
		
		$imageHandler = $this->get('teaocha.image_panel.request_handler_provider')->getHandler();
		$images = $imageHandler->listImages();
        
        return array(
            'admin_pool' => $admin_pool,
            'name' => 'media',
			'images' => $images
        );
    }
	
	/**
     * @Template()
     */
    public function openModalImagePanelAction()
    {		
		$imageHandler = $this->get('teaocha.image_panel.request_handler_provider')->getHandler();
		$images = $imageHandler->listImages();
        
        return array(
			'images' => $images
        );
    }
	
	/**
     * @Template()
     */
    public function ckeditorImagePanelAction()
    {		
		$imageHandler = $this->get('teaocha.image_panel.request_handler_provider')->getHandler();
		$images = $imageHandler->listImages();
        
        return array(
			'images' => $images
        );
    }

}
