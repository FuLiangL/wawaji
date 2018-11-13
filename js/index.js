var leftRightObj = null; //左右的控件
var topBottomObj = null; //上下的控件
var rotateObj = null; //旋转的控件
var globalPosition = 1; //定义的爪子下落的位置
$(function() {
	/* 
		之前进行饮料区和公众号区域的划分
		这份demo直接进行对应的饮料区的逻辑简介
	*/
	$('.main .gifts .public').hide();
	$('.main .gifts .drink').show();
	/* 
		一上来就获得数据
		获得排行榜的数据
		所有物品的数据
		获取中奖信息的数据
		请求弹幕的数据
	*/
	getRankData();
	getProductData();
	winningRecordData();
	getBarrageData();
	/* 
		禁止首页进行滑动
		设置所有的弹出层的默认事件进行取消	
	*/
	$('.main').on('touchmove', function(e) {
		e.preventDefault(false);
	});
	$('.shouActivityBg').on('touchmove', function(e) {
		e.preventDefault(false);
	});
	$('.productListBg').on('touchmove', function(e) {
		e.preventDefault(false);
	});
	$('.rankListBg').on('touchmove', function(e) {
		e.preventDefault(false);
	});
	$('.winningRecordBg').on('touchmove', function(e) {
		e.preventDefault(false);
	});
	$('.ruleActivityBg').on('touchmove', function(e) {
		e.preventDefault(false);
	});
	$('.getGIftBg').on('touchmove', function(e) {
		e.preventDefault(false);
	});
	/* 
		设置弹簧效果
		滚动事件进行监听	
		iscoll对应的内容展示，对应的东西为（商品列表、今日、7日、单次、中奖记录、规则）
	*/
	var oMainOne = document.getElementsByClassName('wrapperIscoll')[0];
	var oMainTwo = document.getElementsByClassName('wrapperIscoll')[1];
	var oMainThree = document.getElementsByClassName('wrapperIscoll')[2];
	var oMainFour = document.getElementsByClassName('wrapperIscoll')[3];
	var oMainFive = document.getElementsByClassName('wrapperIscoll')[4];
	var oMainSix = document.getElementsByClassName('wrapperIscoll')[5];
	var myScrollOne, myScrollTwo, myScrollThree, myScrollFour, myScrollFive, myScrollSix;
	myScrollOne = new IScroll(oMainOne, {
		probeType: 3,
	});
	myScrollTwo = new IScroll(oMainTwo, {
		probeType: 3,
	});
	myScrollThree = new IScroll(oMainThree, {
		probeType: 3,
	});
	myScrollFour = new IScroll(oMainFour, {
		probeType: 3,
	});
	myScrollFive = new IScroll(oMainFive, {
		probeType: 3,
	});
	myScrollSix = new IScroll(oMainSix, {
		probeType: 3,
	});
	/* 
		商品列表的打开（对应Iscroll组建刷新）、关闭
	*/
	$('.moreSoming').click(function() {
		$('.productList').show();
		myScrollOne.refresh();
	});
	$('.productList .close').click(function() {
		$('.productList').hide();
	});
	/* 
		排行榜的弹窗显示
		弹窗的3块区域之间的切换
		排行榜的弹窗关闭
	*/
	$('.main .rankListBtn').click(function() {
		$('.rankList').show();
		myScrollTwo.refresh();
		myScrollThree.refresh();
		myScrollFour.refresh();
	});
	$('.rankList .box .btns span').click(function() {
		var index = $(this).index();
		var spanArr = $('.rankList .box .btns span');
		for(var i=0; i<spanArr.length; i++) {
			$(spanArr[i]).removeClass('active');
			$('.rankList .box .wrapper').eq(i).hide();
		}
		$(this).addClass('active');
		$('.rankList .box .wrapper').eq(index).show();
		myScrollTwo.refresh();
		myScrollThree.refresh();
		myScrollFour.refresh();
	});
	$('.rankList .close').click(function() {
		$('.rankList').hide();
	});
	/* 
		点击规则说明弹窗打开（对应Iscroll组建刷新）、关闭
	*/
	$('.main .ruleBtn').click(function() {
		$('.ruleActivity').show();
		myScrollSix.refresh();
	});
	$('.ruleActivity .close').click(function() {
		$('.ruleActivity').hide();
	});
	/* 
		点击进行购买的页面
		每一次点击购买数目、金币进行加1操作，并提示购买成功
	*/
	$('.main .btns .buy .btn').on('touchstart', function() {
		$('.main .btns .buy .btn').css('background-image', 'url(http://dianliao.oss-cn-shenzhen.aliyuncs.com/test/test-2018-01-25-2627.png)');
	});
	$('.main .btns .buy .btn').on('touchend', function() {
		$('.main .btns .buy .btn').css('background-image', 'url(http://dianliao.oss-cn-shenzhen.aliyuncs.com/test/test-2018-01-24-7201.png)');
		layer.open({
			content: '购买成功啦~',
			skin: 'msg',
			time: 2,
		});
		$('.record .gold').html($('.record .gold').html()-0+1);
		$('.record .num').html($('.record .num').html()-0+1);
	});
	/* 
		点击中奖记录的弹窗
		让对应的Isroll组建进行刷新
		中奖记录弹窗关闭
	*/
	$('.main .btns .collect .btn').on('touchstart', function() {
		$('.main .btns .collect .btn').css('background-image', 'url(http://dianliaotools.oss-cn-shenzhen.aliyuncs.com/test/test-2018-04-23-8517.png)');
	});
	$('.main .btns .collect .btn').on('touchend', function() {
		$('.winningRecord').show();
		myScrollFive.refresh();
	});
	$('.winningRecord .close').click(function() {
		$('.winningRecord').hide();
	});
	/* 
		礼品弹窗的确定按钮，弹窗消失，让对应的游戏进行重置
	*/
	$('.getGIft .box .sure').click(function() {
		$('.getGIft').hide();
		refreshAgainData();
	});
	/* 
		抓娃娃的过程，先是进行开始左右进行移动，然后上下进行移动
		点击开始进行玩游戏,左右进行移动
		开始左右的移动,必须进行的是次数减少1
	*/
	$('.main .btns .star .starBtn').on('touchstart', function() {
		$('.main .btns .star .starBtn').addClass('active');
	});
	$('.main .btns .star .starBtn').on('touchend', function() {
		$('.main .btns .star .starBtn').removeClass('active');
		if($('.main .btns .record .num').html()<=0) {
			layer.open({
				content: '没有金币咯，请购买啦~',
				skin: 'msg',
				time: 2,
			});
		} else {
			$('.main .btns .record .gold').html($('.main .btns .record .num').html()-1);
			$('.main .btns .record .num').html($('.main .btns .record .num').html()-1);
			$('.main .btns .star .starBtn').hide();
			$('.main .btns .star .darwBtn').show();
			rotateObj = new Rotate(document.getElementsByClassName('clawBox'));
			leftRightObj = new drawMove($('.clawBox'), $('.timeDown'), rotateObj, topBottomObj, getPlayContent, judgePosition);
		}
	});
	// 进行抓取娃娃的操作，上下进行移动
	$('.main .btns .star .darwBtn').on('touchstart', function() {
		$('.main .btns .star .darwBtn').addClass('active');
	});
	$('.main .btns .star .darwBtn').on('touchend', function() {
		$('.main .btns .star .darwBtn').removeClass('active');
		$('.main .btns .star .darwBtn').hide();
		$('.main .btns .star .stopBtn').show();
		// 开始上下的移动，左右停止、旋转停止
		// console.log('left为'+leftRightObj.i);
		// console.log('角度为'+rotateObj.j);
		// 设置为下落的位置的函数的判断方法
		clearInterval(leftRightObj.oTimerDown);
		clearInterval(leftRightObj.oTimer);
		clearInterval(rotateObj.oTimer);
		judgePosition(leftRightObj.i-5*Math.sin((rotateObj.j)*0.017453293));
		topBottomObj = new heightMove($('.rope'), $('.clawBox'), $('.getGift'), getPlayContent, refreshAgainData);
	});
});
/* 
	抓取到娃娃的内容，进行次数的扣减和相应礼物的抓取

*/
function getPlayContent() {
	var url = "json/gift"+globalPosition+getRaNum()+".json";
	$.getJSON(url, function(res) {
		if(res.code) {
			if(res.hasOwnProperty('reward_info')) {
				if(res.reward_info.hasOwnProperty('get_icon')) {
					$('.main .clawArea .clawBox .getGift').css('background-image', 'url('+res.reward_info.get_icon+')');
					$('.getGIft .box .giftIcon').css('background-image', 'url('+res.reward_info.icon+')');
					$('.getGIft .box .info').html(res.reward_info.name+' '+res.reward_info.price+'元友宝余额');
					topBottomObj.status = true;
					topBottomObj.resCodeFalse = false;
				} else {}
			} else {}
		} else {
			topBottomObj.status = true;
			topBottomObj.resCodeFalse = true;
			setTimeout(function() {
				layer.open({
					content: '失败，正在重新加载游戏...',
					skin: 'msg',
					time: 2,
				});
			}, 2000);
		}
	});
}
/* 
	取出1-4之间的随机数
*/
function getRaNum() {
	var arr = [0,1,2,3,4,0,1,2,3,4,];
	var num = Math.floor(Math.random()*10);
	if(arr[num]==0) {
		return getRaNum();
	} else {
		return arr[num];
	}
}
/* 
	排行榜的数据请求
*/
function getRankData() {
	$.getJSON('json/getListOne.json', function(res) {
		if(res.code) {
			var htmlOne = '';
			for(var i=0; i<res.data.length; i++) {
				htmlOne += '<li>'+
								'<img class="icon" src='+res.data[i].icon+' />'+
								'<div class="numbel">'+res.data[i].number+'</div>'+
								'<div class="count">'+res.data[i].total+'次</div>'+
								'<div class="money"><p>'+res.data[i].money+'元</p><p>(友宝余额)</p></div>'+
							'</li>';
			}
			$(".rankList .box .wrapperOne .content").html(htmlOne);
		} else {
			config.layerMsg(res.msg, 2);
		}
	});
	$.getJSON('json/getListTwo.json', function(res) {
		if(res.code) {
			var htmlOne = '';
			for(var i=0; i<res.data.length; i++) {
				htmlOne += '<li>'+
								'<img class="icon" src='+res.data[i].icon+' />'+
								'<div class="numbel">'+res.data[i].number+'</div>'+
								'<div class="count">'+res.data[i].total+'次</div>'+
								'<div class="money"><p>'+res.data[i].money+'元</p><p>(友宝余额)</p></div>'+								
							'</li>';
			}
			$(".rankList .box .wrapperTwo .content").html(htmlOne);
		} else {
			config.layerMsg(res.msg, 2);
		}
	});
	$.getJSON('json/getListThree.json', function(res) {
		if(res.code) {
			var htmlOne = '';
			for(var i=0; i<res.data.length; i++) {
				htmlOne += '<li>'+
								'<img class="icon" src='+res.data[i].icon+' />'+
								'<div class="numbel">'+res.data[i].number+'</div>'+
								'<div class="money"><p>'+res.data[i].money+'元</p><p>(友宝余额)</p></div>'+
								'<img class="gift_icon" src='+res.data[i].gift_icon+' />'+								
							'</li>';
			}
			$(".rankList .box .wrapperThree .content").html(htmlOne);
		} else {
			config.layerMsg(res.msg, 2);
		}
	});
}
/* 
	物品列表的接口
*/
function getProductData() {
	$.getJSON('json/allList.json', function(res) {
		if(res.code) {
			var htmlProduct = '';
			for(var i=0; i<res.data.length; i++) {
				htmlProduct += '<li>'+
								'<div class="icon" style="background-image: url('+res.data[i].icon+')"></div>'+
								'<div class="instr">'+res.data[i].name+'</div>'+
								'<div class="price"><p>'+res.data[i].price+'元</p><p>(友宝余额)</p></div>'+
							'</li>';
			}
			$('.productList .box .content').html(htmlProduct);
		} else {
			config.layerMsg(res.msg, 2);
		}
	});
}
/* 
	中奖记录数据
*/
function winningRecordData() {
	$.getJSON('json/rewardRecord.json', function(res) {
		console.log(res);
		if(res.code) {
			// 中奖数据封装
			var htmlRecord = '';
			for(var i=0; i<res.data.length; i++) {
				// 重复3次进行展示
				htmlRecord += '<li>'+
									'<div class="icon" style="background-image: url('+res.data[i].gift_icon+')"></div>'+
									'<div class="instr">'+
										'<p>'+res.data[i].name+'</p>'+
										'<p>'+res.data[i].time+'</p>'+
									'</div>'+
									'<div class="price"><p>'+res.data[i].price+'元</p><p>(友宝余额)</p></div>'+
								'</li>';
			}
			$('.winningRecord .box .content').html(htmlRecord);
		} else {
			config.layerMsg(res.msg, 2);
		}
	});
}
/* 
	请求弹幕的数据
*/
function getBarrageData() {
	$.getJSON('json/getBullet.json', function(res) {
		if(res.code) {
			marquee(res.data);
		} else {
			config.layerMsg(res.msg, 2);
		}
	});
}
/* 
	刷新重置的操作
	有显示为可以开始的按钮
	将所有的new对象进行初始化
*/
function refreshAgainData() {
	$('.main .btns .star .darwBtn').hide();
	$('.main .btns .star .stopBtn').hide();
	$('.main .btns .star .starBtn').show();
	leftRightObj.reset();
	rotateObj.reset();
	topBottomObj.reset();
}
/* 
	判断位置的方法
	在不同的区域中进行不同的设置全局位置不一样的
*/
function judgePosition(leftNum) {
	if(leftNum<=1.63) {
		globalPosition = 1;
	} else if(1.63<leftNum && leftNum<=3.26) {
		globalPosition = 2;
	} else if(3.26<leftNum && leftNum<=4.89) {
		globalPosition = 3;
	} else if(leftNum>4.89) {
		globalPosition = 4;
	}
}

