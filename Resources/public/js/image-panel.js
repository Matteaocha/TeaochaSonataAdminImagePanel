if(!window.ImagePanel){window.ImagePanel = (function(ImagePanel) {

$(document).ready(function(){

	//Images Panel
	//----------------------------------------------------
	
		var urlElementToUpdate
	
		function modalImagesPanel() {
			
			output = 
			'<div id="modal_images_panel">' +
			'</div>'
			return output
		
		}
	
		function imagesPanelImageTemplate(src) {
			
			output = 
			'<div class="images-panel-image loading">' +				
				'<img src="' + src + '" data-croppable=true/>' +
				'<i class="fa fa-search images-panel-preview" aria-hidden="true" title="preview"></i>' +
				'<i class="fa fa-crop images-panel-crop" aria-hidden="true" title="crop"></i>' +
				'<i class="fa fa-times images-panel-delete" aria-hidden="true" title="delete"></i>' +
				'<span></span>' +
			'</div>'
			return output
		
		}
		
		function doneCropping(dataURL) {			
			var newImageHtml = imagesPanelImageTemplate(dataURL)
			$('#images_panel_images_list').append(newImageHtml)
			
			var newImage = $('.images-panel-image').last()
			
			uploadImage(dataURL, function(err, data){
				if(err) {
					console.log(err)
					$(newImage).remove()
					return
				}
				
				$(newImage).attr('data-id', data.id)
				$($(newImage).children('img')[0]).attr('src', data.url)
				$(newImage).removeClass('loading')
			})
		}
		
		function doneGettingImageUrl(url) {
			var newImageHtml = imagesPanelImageTemplate(url)
			$('#images_panel_images_list').append(newImageHtml)
			
			var newImage = $('.images-panel-image').last()
			uploadImageFromUrl(url, function(err, data){
				if(err) {
					$(newImage).remove()
					return
				}				
				$(newImage).attr('data-id', data.id)
				$($(newImage).children('img')[0]).attr('src', data.url)
				$(newImage).removeClass('loading')
			})		
		}
		
		function uploadImage(dataURL, cb) {
	
			var uploadUrl = '/mediaprocess/uploadimage'
			var params = {}
		
			if(dataURL.indexOf('data:image/png') !== -1) {
				params.image = dataURL.substring("data:image/png;base64,".length, dataURL.length)
				params.contentType = 'image/png'
			}
			else {
				params.image = dataURL.substring("data:image/jepg;base64,".length, dataURL.length)
				params.contentType = 'image/jpeg'
			}
			
			$.ajax({
				method: 'POST',
				data: params,
				url: uploadUrl,
				success: function(response) {
					cb(null, response)
				},
				error: function(response) {
					cb(response)
				}
			})		
		}
		
		function uploadImageFromUrl(url, cb) {
	
			var uploadUrl = '/mediaprocess/imagefromurl'
			var params = {
				imageUrl : url
			}
			
			$.ajax({
				method: 'POST',
				data: params,
				url: uploadUrl,
				success: function(response) {
					cb(null, response)
				},
				error: function(response) {
					cb(response)
				}
			})		
		}
		
		function closeModalImagesPanel() {
			$('#modal_images_panel').remove()
		}
		
		function getUrlParam( paramName ) {
            var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' );
            var match = window.location.search.match( reParam );

            return ( match && match.length > 1 ) ? match[1] : null;
        }

        function returnImageToCkeditor(image) {
			var url = $(image).attr('src')
            var funcNum = getUrlParam( 'CKEditorFuncNum' )
            window.opener.CKEDITOR.tools.callFunction( funcNum, url )
            window.close()
        }
		
		function useImage(image) {		
			if(urlElementToUpdate) {
				$(urlElementToUpdate).val($(image).attr('src'))
			}
			closeModalImagesPanel()
		}
	
		$(document).on('click', '.images-panel-preview', function(e){
			e.preventDefault()
			var url = $($(this).siblings('img')[0]).attr('src')
			ModalImage.show(url)
		})
		
		$(document).on('click', '.images-panel-crop', function(e){
			e.preventDefault()
			var imgElement = $(this).parent()
			var url = $($(this).siblings('img')[0]).attr('src')
			ModalImage.crop(url, doneCropping)
		})
		
		$(document).on('click', '.images-panel-delete', function(e){
			e.preventDefault()
			var imgElement = $(this).parent()
			var imgId = $(imgElement).attr('data-id')
			var deleteUrl = '/mediaprocess/deleteimage/' + imgId
			
			$(imgElement).addClass('loading')
			
			$.ajax({
				method: 'GET',
				url: deleteUrl,
				success: function(){
					$(imgElement).remove()
				},
				error: function(){
					$(imgElement).removeClass('loading')
				}
			})
		})
		
		$(document).on('click', '#images_panel_upload_button', function(){
			$('#images_panel_file').click()			
		})
		
		$(document).on('change', '#images_panel_file', function(){
			var file = $('#images_panel_file')[0].files[0]
			if(file.type.match('image.*')) {			
				var reader = new FileReader()				
				reader.onload = function(e){
					ModalImage.crop(e.target.result, doneCropping)
				}				
				reader.readAsDataURL(file)
			}
		})
		
		$(document).on('click', '#images_panel_from_url_button', function(){
			$('#images_panel_url_form').removeClass('hidden')		
		})
		
		$(document).on('click', '#images_panel_url_form_cancel', function(){
			$('#images_panel_url_form').addClass('hidden')		
		})
		
		$(document).on('click', '#images_panel_url_form_ok', function(){
			var imageUrl = $('#images_panel_url_form_input').val()
			$('#images_panel_url_form_input').val('')
			$('#images_panel_url_form').addClass('hidden')	
			doneGettingImageUrl(imageUrl)
		})
		
		$(document).on('click', '.teaocha-image-panel-url-btn', function(){
			$('body').append(modalImagesPanel())
			urlElementToUpdate = $(this).parent().siblings('input')[0]
			$('#modal_images_panel').load('/admin/images/modal')
		})
		
		$(document).on('click', '#images_panel_close_button', function(){
			if($('#images_panel').attr('data-ckeditor') === 'true'){
				window.close()
			}
			else {
				closeModalImagesPanel()
			}
		})
		
		$(document).on('click', '.images-panel-image img', function(){
			var isModal = ($('#images_panel').attr('data-modal') === 'true')
			var isCkeditor = ($('#images_panel').attr('data-ckeditor') === 'true')
			var isLoading = $(this).parent().hasClass('loading')
			if(isModal && !isLoading && !isCkeditor){
				useImage(this)
			}
			
			if(isModal && !isLoading && isCkeditor) {
				returnImageToCkeditor(this)
			}
		})
	
	
	//----------------------------------------------------
})

})({})}