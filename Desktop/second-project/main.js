"use strict";
(function() {
	let canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	w = canvas.width = innerWidth,
	h = canvas.height = innerHeight,
	particles = [],
	properties = {
		bgColor: 'rgba(17, 17, 19, 1)', 
		particleColor: 'rgba(255, 40, 40, 1)', 
		particleRaduis: 2,
		particleCount: 60,
		particleMaxVelocty: 0.1,
		lineLength: 150,
		particleLife: 6,
	} 

	window.onresize = () => {
		w = canvas.width = innerWidth,
		h = canvas.height = innerHeight;
	}

	class Particle{
		constructor() {
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.velocityX = Math.random() * (properties.particleMaxVelocty * 2) - properties.particleMaxVelocty;
			this.velocityY = Math.random() * (properties.particleMaxVelocty * 2) - properties.particleMaxVelocty;
			this.life = Math.random() * properties.particleLife * 60; 
		}
		position() {
			if (this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0)
				this.velocityX *= -1;
			else
				this.velocityX;

			if (this.y + this.velocityY > w && this.velocityY > 0 || this.Y + this.velocityY < 0 && this.velocityY < 0)
				this.velocityY *= -1;
			else
				this.velocityY;

			this.x += this.velocityX;
			this.y += this.velocityY;
		}
		reDraw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, properties.particleRaduis, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = properties.particleColor;
			ctx.fill();
		}
		reCalculateLife() {
			if (this.life < 1) {
				this.x = Math.random() * w;
				this.y = Math.random() * h;
				this.velocityX = Math.random() * (properties.particleMaxVelocty * 2) - properties.particleMaxVelocty;
				this.velocityY = Math.random() * (properties.particleMaxVelocty * 2) - properties.particleMaxVelocty;
				this.life = Math.random() * properties.particleLife * 60; 
			}
			this.life--;
		}
	}

	function reDrawBackground() {
		ctx.fillStyle = properties.bgColor;
		ctx.fillRect(0, 0, w, h); 
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.font = '60px Geargio';
		ctx.fillText("Face to Face", w / 2, h / 4);
	}

	function drawLines() {
		let x1, y1, x2, y2, length, opacity;
		for (let i in particles) {
			for (let j in particles) {
				x1 = particles[i].x;
				y1 = particles[i].y;
				x2 = particles[j].x;
				y2 = particles[j].y;
				length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

				if (length < properties.lineLength) {
					opacity = 1 - length / properties.lineLength;
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')';
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
	}

	function reDrawParticles() {
		for (let i in particles) {
			particles[i].reCalculateLife();
			particles[i].position();
			particles[i].reDraw();
		}	
	}

	function loop() {
		reDrawBackground();
		reDrawParticles();
		drawLines();
		requestAnimationFrame(loop);
	}

	function init() {
		for (let i = 0; i < properties.particleCount; ++i) {
			particles.push(new Particle);
		}
		loop();
	}

	init();

}())



function pass() {
	let password = document.querySelector('.password');
	if (password.type === 'password') {
		password.type = 'text';
	}
	else {
		password.type = 'password';
	}
}

