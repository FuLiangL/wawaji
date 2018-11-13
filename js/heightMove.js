function heightMove(obj, parentObj, giftObj, callBack, refreshAgainData) {
    this.target = obj;
    this.parentTarget = parentObj;
    this.giftObj = giftObj;
    this.oSwitch = true;
    this.oTimer = null;
    this.i = 1; //初始值设置为1
    this.small = 1; //最小值的高度设置为1
    this.big = 4; //最大的高度设置为4
    this.speedDown = 0.04;
    this.speedUp = 0.02;
    this.callBack = callBack;
    this.refreshAgainData = refreshAgainData;
    this.init();
    this.status = false; // 已经收到了返回值
    this.resCodeFalse = false; // 判断是否为code为0错误
}
heightMove.prototype = {
    reset: function() {
        var self = this;
        self.i = 1;
        self.giftObj.hide();
        self.target.css('height', self.i + 'rem');
        self.parentTarget.css('height', (self.i-0+1.05) + 'rem');
    },
    init: function() {
        var self = this;
        self.callBack(); //调用请求数据
        self.oTimer = setInterval(function() {
            self.move();
        }, 10);
    },
    move: function() {
        var self = this;
		if(self.oSwitch) {
			self.i = (self.i + self.speedDown);
			if(self.i >= self.big) {
				self.oSwitch = false;
			}
		} else {
            if(self.status) {
                // 必须等待返回值
                if(self.resCodeFalse) {
                    // 返回的时候code==0
                    setTimeout(function() {
                        // 发生错误的时候直接进行页面重置
                        self.refreshAgainData();
                    }, 2000);
                } else {
                    // 正常的返回礼物值
                    self.i = (self.i - self.speedUp);
                    self.giftObj.show();
                    if(self.i <= self.small) {
                        // 再次回来的时候进行
                        clearInterval(self.oTimer);
                        $('.getGIft').show();
                    }
                }
            } else {}
		}
        self.target.css('height', self.i + 'rem');
        self.parentTarget.css('height', (self.i-0+1.05) + 'rem');
    }
};