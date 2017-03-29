function CoordinatesDemo(coordsUrl) {
    this.coordsRequestsRunning = false;
    this.coordsCache = {};

    this.width = 0;
    this.height = 0;
    this.coordsUrl = coordsUrl;
}

CoordinatesDemo.prototype.GetCoords = function (sceneWidth, sceneHeight) {
    var self = this;

    if (self.coordsRequestsRunning)
        return null;

    if (!this.coordsUrl)
        return null;

	//Set the width and height of the scene image so we get the correct matched coordinates for the given size.
    var coordsUrl = this.coordsUrl + "&width=" + sceneWidth + "&height=" + sceneHeight;

    if (this.coordsCache[coordsUrl]) {
        return this.coordsCache[coordsUrl];
    }

    self.coordsRequestsRunning = true;

    $.ajax({
		url: coordsUrl,
        type: "GET",
        async: true,
        success: function (response) {
            self.coordsCache[coordsUrl] = response;
            self.coordsRequestsRunning = false;
        },
        error: function (ex, ex1, ex2) {
            self.coordsRequestsRunning = false;
        }
    });
	
    return null;
}

CoordinatesDemo.prototype.OnMouseDown = function (jqEvent, self) {
	var width = jqEvent.target.clientWidth;
    var height = jqEvent.target.clientHeight;
	
    var offsetX = (jqEvent.offsetX !== undefined) ? jqEvent.offsetX : (jqEvent.pageX - $(jqEvent.target).offset().left);
	var offsetY = (jqEvent.offsetY !== undefined) ? jqEvent.offsetY : (jqEvent.pageY - $(jqEvent.target).offset().top);
	
    var x = Math.round(offsetX);
    var y = Math.round(offsetY);

	var objectNumber = this.GetObjectNumberByCoords(x, y, width, height);
	
	var objectNumberText = objectNumber > -1 ? "You've selected object # " + objectNumber : 'No object found at the current mouse position.';
    $('h3#objectNumber').text(objectNumberText);
}

CoordinatesDemo.prototype.GetObjectNumberByCoords = function (x, y, sceneWidth, sceneHeight) {
    var coords = this.GetCoords(sceneWidth, sceneHeight);
    if (coords) {
		// Find all the coordinates that have a matching Y coordinate
        var yCollection = _.where(coords.coordsList, { y: y });
        if (yCollection.length > 0) {
            var lastNumber = -1;
			// The x coordinates are the end points of the objects in a scene on the give y-coordinate line.
            for (var i = 0; i < yCollection.length; i++) {
				// If the provided x is smaller than the x of the current object you are hovering over that object.
                if (x < yCollection[i].x) {
                    return lastNumber;
                }
                lastNumber = yCollection[i].objectNr;
            }
			
			//This returns the objectnumber if there is only one object on the given line.
            return lastNumber;
        }
    } else {
        return -2;
    }
            
    return -1;
}