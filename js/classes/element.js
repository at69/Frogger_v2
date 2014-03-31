/* Function for the ennemies elements */
var Element = function (x, y, image, line, w) {

	var _positionX = x;				// coordinates of the element
	var _positionY = y;
	var _width = w;						//width on the element on the picture
	var _picture = image;				// element's picture
	
	Object.defineProperties(this, {
	
		positionX:	{
						get: function() { return _positionX; },
						set: function(newValue) {
							_positionX = newValue; 
						}
					},
		positionY:	{
						get: function() { return _positionY; },
						set: function(newValue) {
							_positionY = newValue; 
						}
					},
		picture:	{
						get: function() { return _picture; },
						set: function(newValue) {
							_picture = newValue; 
						}
					},
		lineId:		{ 
						value: line,
						writable: true,
						configurable: true,
						enumerable: true, 
					},
		width:		{
						get: function() { return _width; },
						set: function(newValue) {
							_width = newValue; 
						}
					}			
	});
}

/* Function for the frog */

var Frog = function (x, y, image, line) {

	Element.apply(this, [x, y, image, line]);
	
	var _lives = 3;	//you can lose 3 times before losing your game
	
	Object.defineProperties(this, {
	
		lives: {
						get: function() { return _lives; },
						set: function(newValue) {
							_lives = newValue; 
						}
					}
	});
}

Frog.prototype = Object.create(Element.prototype);			// Frog inherits Element

// Function for the water lilies

var WaterLily = function (x1, x2, taken) {

	var _positionX1 = x1;				// coordinates of the element
	var _positionX2 = x2;
	var _taken = taken;
	
	Object.defineProperties(this, {
	
		positionX1:	{
						get: function() { return _positionX1; },
						set: function(newValue) {
							_positionX1 = newValue; 
						}
					},
		positionX2:	{
						get: function() { return _positionX2; },
						set: function(newValue) {
							_positionX2 = newValue; 
						}
					},
		taken:	{
						get: function() { return _taken; },
						set: function(newValue) {
							_taken = newValue; 
						}
					},			
	});
}