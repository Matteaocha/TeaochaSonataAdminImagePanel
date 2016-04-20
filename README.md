# TeaochaSonataAdminImagePanel
Symfony2 bundle that adds a page and modal popup to the sonata admin that lets you upload, crop, and browse images

![alt tag](https://s3.amazonaws.com/matteaocha-images/TeaochaImagePanel1.jpg)

###How it works
- Install the bundle
- Add the bundle routing and redirect sonata to use the bundle's template
- Create a service that handles the image data uploaded and returns a url to a preview image
- An image panel option appears in the menu
- You can upload, browse, delete, and crop images in the panel
- You can also upload urls for external images
- You can add a button next to any text box on an edit page that opens the panel in a modal view and returns the selected image's url into the text box

###Installing
First require the bundle:

```
composer require teaocha\image-panel
```

Add it to your kernel

```
class AppKernel extends Kernel
{
  public function registerBundles()
  {
    $bundles = array(
      new Teaocha\SonataAdminImagePanelBundle\TeaochaSonataAdminImagePanelBundle(),
    );
  }
}
```

Add the routing:

```
teaocha_image_panel:
  resource: '@TeaochaSonataAdminImagePanelBundle/Resources/config/routing.yml'
```

Tell sonata to use the bundle's layout:

```
sonata_admin:
  templates:
    layout:  "@TeaochaSonataAdminImagePanelBundle/Resources/views/admin_layout.html.twig"
```

###Creating the request handler
Given that there are all sorts of ways you may want to store your or process your images I thought it best to leave the image handling
up to you, so in order for the bundle to work you have to create a service that handles the requests.

Here's what it should look like:

```
use Teaocha\SonataAdminImagePanelBundle\Request\RequestHandlerInterface;
use Teaocha\SonataAdminImagePanelBundle\Request\RequestResult;

class ImagePanelRequestHandler implements RequestHandlerInterface
{
  public function imageUpload($imageData, $contentType){

    //Do something with the image data

    $requestResult = new RequestResult()
    $requestResult->setPreviewUrl($url);
    $requestResult->setId($id);		
    return $requestResult;		
  }

  public function imageUrlUpload($imageUrl){

    //Do something with the url

    $requestResult = new RequestResult()
    $requestResult->setPreviewUrl($url);
    $requestResult->setId($id);		
    return $requestResult;	
  }

  public function deleteImage($id){
    //Delete the image
  }

  public function listImages(){

    //Generate an array of RequestResult objects

    return $results;
  }
}
```

Your service should implement the **RequestHandler** interface

There are then four functions for you to fill in:

**imageUpload** receives a **base64** encoded data string (NOT including 'data:image/*;base64,'), and a content type (e.g. 'image/jpeg')
which you should process in your own way and return a RequestResult object (see below)

**imageUrlUpload** receives a url from an external image. Again, do what you will with it and return a RequestResult object.

**deleteImage** receives an id that should refer to a record of an image previously uploaded. You don't need to return anything.

**listImages** is used to populate the image panel. It should return an array of RequestResult objects

**RequestResult** is a simple object that requires two fields to be set:
- setPreviewUrl()
- setId()
The 'preview url' being a url that will be used to show the image in the panel, and the 'id' being a numeric id that refers to that image

Once you've done that, add the service and tag it with **teaocha.image_panel.request_handler**:

```
app.image_panel_request_handler:
  class: AppBundle\Services\ImagePanelRequestHandler
  tags:
    - { name: teaocha.image_panel.request_handler }
```

###Adding a button to a text field
You can add a button to any text input in the admin that looks like so:

![alt tag](https://s3.amazonaws.com/matteaocha-images/TeaochaImagePanel2.JPG)

Do this by adding a button with class **teaocha-image-panel-url-btn** to the help option of the admin field:

```
protected function configureFormFields(FormMapper $formMapper)
{
  parent::configureFormFields($formMapper);

  $imagePanelButton = '<button class="teaocha-image-panel-url-btn btn btn-danger">Open image panel...</button>';

  $formMapper
  ->with('New product')
    ->add('title', 'text')
  	->add('content', 'textarea', array('attr' => array('class' => 'ckeditor')))
  	->add('productImageUrl', 'text', array('help' => $imagePanelButton))
  ->end();
}
```

###Credits
Additional credits go to [Cropper](http://fengyuanchen.github.io/cropperjs/), because that's what i've used for image cropping 

###Notes
Right now the panel only uploads data strings in the jpeg format
