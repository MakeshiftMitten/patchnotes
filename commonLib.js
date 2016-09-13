function commonLib(){
	this.convertGameCoordToArrayCoord = function(coord){
		return coord+Math.floor(game.dimensions/2)
	}

	this.convertArrayCoordToGameCoord = function(coord){
		return coord-Math.floor(game.dimensions/2)
	}

	this.rgb2hex = function(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  	}

  	this.hex2rgb = function(hex) {
        // long version
        r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (r) {
                return r.slice(1,4).map(function(x) { return parseInt(x, 16); });
        }
        // short version
        r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (r) {
                return r.slice(1,4).map(function(x) { return 0x11 * parseInt(x, 16); });
        }
        return null;
  	}

    this.randInt = function(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }


}

