var CoordUtils = {
	// Converts from degrees to radians.
	radians: function(degrees) {
		return (degrees * Math.PI) / 180.0;
	},

	// Converts from radians to degrees.
	degrees: function(radians) {
		return (radians * 180.0) / Math.PI;
	},

	getQuadrant: function(dx, dy) {
		var dx_ = 1*(dx<0);
		var dy_ = 1*(dy<0);
		var dz_ = dx_*(1-dy_);
		return dy_*180 + dz_*360;
	},

	getBearing: function(startPt, endPt) {
		var dx = endPt.x - startPt.x;
		var dy = endPt.y - startPt.y;
		var quad = CoordUtils.getQuadrant(dx,dy);
		var bearing = CoordUtils.degrees(Math.atan(dx / dy));
		return bearing + quad;
	},

	getDistance: function(startPt, endPt) {
		var dx = endPt.x - startPt.x;
		var dy = endPt.y - startPt.y;
		return Math.sqrt( Math.pow(dx,2) + Math.pow(dy,2));
	},

	getRelativeLocation: function(startPt, distance, bearing) {
		var endPt = {
			x: startPt.x + (distance * Math.sin( CoordUtils.radians(bearing))),
			y: startPt.y + (distance * Math.cos( CoordUtils.radians(bearing)))
		};
		return endPt;
	},

	toString: function(pobjCoords) {
		return "X:"+ pobjCoords.x+ ",Y:"+ pobjCoords.y;
	}
};

/* Test

				var arrCoords= [
					{x:200,y:200}, {x:200,y:300}, {x:300,y:300},
					{x:300,y:200}, {x:300,y:100}, {x:200,y:100},
					{x:100,y:100}, {x:100,y:200}, {x:100,y:300}
				];
				var numCoord;

				for (numCoord=1; numCoord<arrCoords.length; numCoord+=1) {
					alert( numCoord+ ") "+
						CoordUtils.getBearing(arrCoords[0],arrCoords[numCoord])+ ", "+
						CoordUtils.getDistance(arrCoords[0],arrCoords[numCoord]));
				}
*/
