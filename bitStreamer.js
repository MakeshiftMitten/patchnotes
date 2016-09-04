function bitStreamer(x, y, orientation, velocity, lifeTime){	
	this.x = x;
	this.y = y;

	this.lastX = this.x;
	this.lastY = this.y;

	this.orientation = orientation;
	this.velocity = velocity;

	this.lifeTime = lifeTime;
	this.currentTime = 0;

	this.isActive = true;

	this.update = function(dt){
		this.lastX = this.x;
		this.lastY = this.y;

		this.x+= this.velocity*Math.cos(toRad(this.orientation))*dt;
		this.y+= this.velocity*Math.sin(toRad(this.orientation))*dt;		
	}

	this.draw = function(){
		if(this.isActive)
			draw.drawText(this.x, this.y, "0");
			draw.drawText(this.lastX, this.lastY, "1");
	}
}