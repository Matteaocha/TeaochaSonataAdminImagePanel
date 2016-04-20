<?php

namespace Teaocha\SonataAdminImagePanelBundle\Request;

class RequestResult
{
	/**
     * @var string
     */
	private $previewUrl;
	
	/**
     * @var int
     */
	private $id;
	
	
	/**
     * Gets the preview Url
     *
     * @return string
     */
	public function getPreviewUrl() {
		return $this->previewUrl;
	}
	
	/**
     * Sets the preview Url
     *
     * @param string $url
     */
	public function setPreviewUrl($url) {
		$this->previewUrl = $url;
	}
	
	/**
     * Gets the id of the image the url refers to
     *
     * @return int
     */
	public function getId() {
		return $this->id;
	}
	
	/**
     * Sets the id of the image the url refers to
     *
     * @param int $id
     */
	public function setId($id) {
		$this->id = $id;
	}

}
