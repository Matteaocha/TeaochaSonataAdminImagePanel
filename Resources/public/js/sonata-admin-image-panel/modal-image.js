if(!window.ModalImage){window.ModalImage = (function(ModalImage) {

	var imageUrl = ""
	var uploadUrl = ""	
	var doneCallback	
	var dataURL = ""
	
	ModalImage.getDataURL = function() {
		return dataURL
	}

	function modalCropper(url) { 
		output = 
		'<div id="modal_cropper">' +
			'<div id="modal_cropper_holder">' +
				'<img id="modal_cropper_image" src="' + url + '" />' +
			'<div id="modal_cropper_buttons">' +
				'<button id="modal_cropper_button_done" class="btn btn-primary ar-btn">Done</button>' +
				'<button id="modal_cropper_button_free_ar" class="btn btn-primary ar-btn">Free AR</button>' +
				'<button id="modal_cropper_button_ar_set" class="btn btn-secondary ar-btn">Set</button>' +
				'<input id="modal_cropper_ar_input" placeholder="Aspect ratio (e.g. 16/9)">' +				
			'</div>' +
		'</div>'
		return output
	}
	
	function modalShow(url) { 
		output = 
		'<div id="modal_cropper">' +
			'<div id="modal_cropper_holder">' +
				'<img id="modal_cropper_image" src="' + url + '" />' +
		'</div>'
		return output
	}

	function openModalCropper() {
	
		$('body').append(modalCropper(imageUrl))
		
		$('#modal_cropper').click(ModalImage.removeModalCropper)
		
		$('#modal_cropper_buttons').click(function(e){
			e.preventDefault()
			return false;
		})
		$('#modal_cropper_holder').click(function(e){
			e.preventDefault()
			return false;
		})
		
		$('#modal_cropper_image').cropper({background:false})
		
		$('#modal_cropper_button_ar_set').click(function(){
			var arval = $('#modal_cropper_ar_input').val()
			var match = arval.match(/^([0-9]+)\/([0-9]+)$/)
			if(match){				
				resetModalCropper(arval.split('/')[0]/arval.split('/')[1])
				return
			}
			match = arval.match(/^([0-9]+):([0-9]+)$/g)
			if(match){
				resetModalCropper(arval.split(':')[0]/arval.split(':')[1])
				return
			}
		})
		
		$('#modal_cropper_button_free_ar').click(function(){
			resetModalCropper()
		})
		
		$('#modal_cropper_button_done').click(function(){
			doneCropping()
		})
	}
	
	function openModalShow() {
	
		$('body').append(modalShow(imageUrl))
		
		$('#modal_cropper').click(ModalImage.removeModalCropper)
		
		$('#modal_cropper_holder').click(function(e){
			e.preventDefault()
			return false;
		})
	}
	
	function resetModalCropper(aspectRatio) {
		$('#modal_cropper_image').cropper('destroy')

		if(aspectRatio !== null) {
			$('#modal_cropper_image').cropper({background:false, aspectRatio: aspectRatio})
		}
		else {	
			$('#modal_cropper_image').cropper({background:false})
		}
	}
	
	function doneCropping() {
		$('#modal_cropper_button_done').addClass('loading').html('')

		dataURL = $('#modal_cropper_image').cropper('getCroppedCanvas').toDataURL('image/jpeg', 1.0)
		while(dataURL.length > 1000000) {
			dataURL = $('#modal_cropper_image').cropper('getCroppedCanvas').toDataURL('image/jpeg', Math.sqrt(1000000.0/dataURL.length))
		}
		
		$('#modal_cropper_image').cropper('destroy')
		ModalImage.removeModalCropper()
		
		doneCallback(dataURL)
	}
	
	ModalImage.crop = function(srcUrl, cb) {
		doneCallback = cb
		imageUrl = srcUrl
		openModalCropper()
	}
	
	ModalImage.show = function(srcUrl) {
		imageUrl = srcUrl
		openModalShow()
	}
	
	ModalImage.removeModalCropper = function() {	
		$('#modal_cropper').remove()		
	}
	
	return ModalImage
})({})}
