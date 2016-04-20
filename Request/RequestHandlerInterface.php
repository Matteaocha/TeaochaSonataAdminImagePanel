<?php

namespace Teaocha\SonataAdminImagePanelBundle\Request;

interface RequestHandlerInterface
{

	/**
     * Handles the image data from an image upload request
	 * Return a RequestResult object that contains a url to a preview of the image and an id that refers to it
     *
	 * @param string $imageData A base64 encoded string of the image data
	 * @param string $contentType The MIME type of the image
	 *
     * @return RequestResult
     */
	public function imageUpload($imageData, $contentType);

	/**
     * Handles an image url upload request
	 * Return a RequestResult object that contains a url to a preview of the image and an id that refers to it (preview could be the url that was sent)
     *
	 * @param string $imageUrl The url of the image to be saved
	 *
     * @return RequestResult
     */
	public function imageUrlUpload($imageUrl);
	
	/**
     * Handles a request to delete an image (nothing to return, throw an exception to indicate failure)
     *
	 * @param int $id The id of the image to be removed
     */
	public function deleteImage($id);
	
	/**
     * Gets the list of images you want to display in the images panel
	 * Return an array of RequestResults with all the preview images and their ids
	 *
     * @return RequestResult[]
     */
	public function listImages();

}
