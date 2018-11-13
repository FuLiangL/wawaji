function Rotate(obj) {
	this.target = obj[0];
	this.path = null;
	this.oSwitch = true;
	this.oTimer = null;
	this.i = 0;
	this.j = -0;
	this.big = 15;
	this.speed = 0.5;
	this.init();
}
Rotate.prototype = {
	reset: function() {
		var self = this;
		self.i = 0;
		self.j = 0;
		self.target.style.WebkitTransform = 'rotate(' + this.j + 'deg)';
	},
	init: function() {
		var self = this;
		if(this.path === "r") {
			this.oTimer = setInterval(function() {
				self.rotateLeft();
			}, 30);
		} else {
			this.oTimer = setInterval(function() {
				// 定义一开始为向右转动
				self.rotateRight();
			}, 30);
		}
	},
	rotateLeft: function() {
		this.left();
	},
	left: function() {
		var self = this.target;
		if(this.oSwitch) {
			this.i = this.i - this.speed;
			if(this.i <= -this.big) {
				this.oSwitch = false;
			}
		} else {
			this.i = parseFloat(this.i + this.speed);
			if(this.i == this.big) {
				this.oSwitch = true;
			}
		}
		self.style.WebkitTransform = 'rotate(' + this.i + 'deg)';
	},
	rotateRight: function() {
		this.right();
	},
	right: function() {
		var self = this.target;
		if(this.oSwitch) {
			this.j = parseFloat(this.j + this.speed);
			if(this.j >= this.big) {
				this.oSwitch = false;
			}
		} else {
			this.j = parseFloat(this.j - this.speed);
			if(this.j <= -this.big) {
				this.oSwitch = true;
			}
		}
		self.style.WebkitTransform = 'rotate(' + this.j + 'deg)';
	},
};