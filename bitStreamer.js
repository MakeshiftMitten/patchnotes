function bitStreamer(x, y, orientation, velocity, lifeTime){	
	this.x = x;
	this.y = y;

	this.lastX = this.x;
	this.lastY = this.y;

	this.orientation = orientation;
	this.velocity = velocity;

	this.lifeTime = lifeTime;
	this.currentTime = 0;

	this.text = game.common.randInt(0, 2);

	this.isActive = true;

	this.update = function(dt){
		this.lastX = this.x;
		this.lastY = this.y;

		this.currentTime+=dt;
		if(this.currentTime >= this.lifeTime)
			this.isActive = false;
//		this.x+= this.velocity*Math.cos(toRad(this.orientation))*dt;
//		this.y+= this.velocity*Math.sin(toRad(this.orientation))*dt;		
	}

	this.draw = function(){
		var color = game.common.hex2rgb("#FF0000");

		color[0] = Math.floor(color[0]*(this.lifeTime-this.currentTime)/this.lifeTime);
		
		color = game.common.rgb2hex(color[0], color[1], color[2]);

		draw.drawText(this.x, this.y, this.text, color);		
	}
}