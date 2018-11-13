function drawMove(obj, timeObj,  rotateObj, topBottomObj, getPlayContent, judgePosition) {
    this.target = obj;
    this.timeObj = timeObj;
    this.oSwitch = true;
    this.oTimer = null;
    this.oTimerDown = null;
    this.i = 0.33; //初始值设置为0.33
    this.small = 0.33; //最小值的左边距设置为0.33
    this.big = 5.33; //最大的左边距设置为5.33
    this.speed = 0.02; // 速度的基数
    this.width = 3.9; //初始化的宽度,总时间大概12s左右
    this.getPlayContent = getPlayContent;
    this.init();
}
drawMove.prototype = {
    reset: function() {
        var self = this;
        self.i = 0.33;
        self.width = 3.9;
        self.target.css('left', self.i + 'rem');
        self.timeObj.css('width', self.width + 'rem');
    },
    init: function() {
        var self = this;
        self.oTimer = setInterval(function() {
            self.move();
        }, 10);
        this.down();
    },
    down: function() {
        var self = this;
        self.oTimerDown = setInterval(function() {
            self.width = self.width-0.01;
            if(self.width<=0) {
                // 时间流逝已经结束了，直接回到重置
                clearInterval(self.oTimerDown);
                layer.open({
					content: '时间流逝完，正抓取...',
					skin: 'msg',
					time: 2,
				});
                $('.main .btns .star .darwBtn').hide();
                $('.main .btns .star .stopBtn').show();
                clearInterval(self.oTimer);
                clearInterval(rotateObj.oTimer);
                judgePosition(leftRightObj.i-5*Math.sin((rotateObj.j)*0.017453293));
                topBottomObj = new heightMove($('.rope'), $('.clawBox'), $('.getGift'), getPlayContent);
            }
            self.timeObj.css('width', self.width+'rem');
        }, 30);
    },
    move: function() {
        var self = this;
		if(self.oSwitch) {
			self.i = (self.i + self.speed);
			if(self.i >= self.big) {
				self.oSwitch = false;
			}
		} else {
			self.i = (self.i - self.speed);
			if(self.i <= self.small) {
                // 再次回来的时候进行
                // clearInterval(self.oTimer);
                self.oSwitch = true;
			}
		}
		self.target.css('left', self.i + 'rem');
    }
};