//IMPORTANT: fill in your own XPO URL and API key!
var xpoUrl = "";
var xpoApiKey = "";
var modelName = "";

$(document).ready(function () {
	var meshes, materials;	
	loadAllModels();
	
	//Create a new babylon sdk engine with a given XPO URL, API key and canvas selector.
	//Added an example on how to use the callback for a click on a mesh.
	var engine = new BabylonSdk.BabylonEngine(xpoUrl, xpoApiKey, "renderCanvas", function(pickedMesh){		
		var foundMeshes = meshes.filter(function(mesh){
			return mesh.name == pickedMesh.id;
		});
		
		if(foundMeshes.length)
			console.log(foundMeshes[0]);
	});
	
	//Load a specific model and environment to display inside Babylon.
	if(modelName){
		var model = engine.loadModelWithEnvironment(modelName, "White room with reflecting floor", function(){
			meshes = engine.getModelMeshInfo();			
			displayMeshes();			
		});
	}
	
	//Show the material information on screen so the user can click on a material to apply it to a specific mesh.
	function displayMaterials(meshName){
		html = '';
		
		for(var i=0; i<materials.length; i++){
			html += '<img width="75" src="' + materials[i].displayDiffuseUrl + '" id="' + materials[i].id + '" alt="' + materials[i].name + '" title="' + materials[i].name + '">';
		}
		
		$(".objectsContainer .innerContainer[id='" + meshName + "'] .imageContainer")[0].innerHTML = html;
		
		$(".objectsContainer .innerContainer[id='" + meshName + "'] .imageContainer img").on('click', function(){
			var id = this.id;
			var meshName = $(this).closest('.innerContainer')[0].id;
			var foundMaterials = materials.filter(function(material){
				return material.id == id;
			});
			
			var foundMeshes = meshes.filter(function(mesh){
				return mesh.name == meshName;
			});
			
			if(foundMeshes.length){
				if(foundMaterials.length)
					engine.addMaterialToMesh(foundMaterials[0].name, foundMeshes[0].name)
			}
		});
	}
	
	//Show the meshes that can be edited in the loaded model.
	function displayMeshes(){
		var html = '';
		for(var i=0; i<meshes.length; i++){
			html += '<div class="innerContainer" id="'+ meshes[i].name +'">';
			html += '<h2>'+ meshes[i].displayName +'</h2><img class="open" title="open" src="Images/open.png" />';			
			html += '<div class="imageContainer"></div>';
			html += '</div>';
		}
		$(".objectsContainer")[0].innerHTML = html;
		
		$('.objectsContainer h2, .objectsContainer img.open').on('click', function(){
			var name = "1";
			if(!$(this).parent().find('.imageContainer').is(":visible")){
				$(this).parent().parent().find('.imageContainer').hide();
				$(this).parent().find('.imageContainer').toggle();
				name = $(this).parent()[0].id;
			}
			else        
				$(this).parent().parent().find('.imageContainer').hide();
			
			var foundMeshes = meshes.filter(function(mesh){
				return mesh.name == name;
			});
			
			if(foundMeshes.length){
				var mesh = foundMeshes[0];
				engine.getAllowedMaterials(mesh.name).then(function(innerMaterials){
					materials = innerMaterials.values;
					displayMaterials(mesh.name);
				});
			}
			
			//Zoom in on the model, this is just an example on how to do this.
			//You have to tweak these settings so the camera is facing the right way for each mesh.			
			engine.setCameraPositionAndTarget(-1,1,3,.1,.2,.3);
		});
	}
	
	//Load all the available models from XPO to display in a dropdown so the user can switch between models.
	function loadAllModels(){
		if(!xpoUrl || !xpoApiKey)
			return;
		
		$.ajax({
			type: 'POST',
			url: xpoUrl + '/xpo/api/v2/models/query?api_key=' + xpoApiKey,
			data: {
				skip: 0,
				take: 25
			},
			success: function (innerModels) {
				models = innerModels.values;
				displayModels();
			}
		});
	}
	
	//Add the models to a dropdown list
	function displayModels(){
		var html = '<option value="">Select a model</option>';
		for(var i =0; i<models.length; i++){
			html += '<option value="' + models[i].name + '">' + models[i].name + '</option>';
		}		
		$("select#modelList")[0].innerHTML = html;
		
		if(models.length)
			$("select#modelList").show();
		else
			$("select#modelList").hide();
		
		$("select#modelList").on('change', function(){
			if($(this).val()){
				var model = engine.loadModelWithEnvironment($(this).val(), "White room with reflecting floor", function(){
					meshes = engine.getModelMeshInfo();			
					displayMeshes();			
				});
			}
		});
		
		//Only load first model if there isn't already a model to load
		if(models.length && !modelName){
			$("select#modelList").val(models[0].name);
			$("select#modelList").trigger('change');
		}
	}
});