/* 
    定义跑马灯对象
    -->>调用时只要传入data字段就行在调用的页面进行marquee(data);
*/
var marquee = function(data) {
	var $$ = function(id) {
		return document.getElementById(id);
	};
	var	item = 1,	//内容块顺序
		list = 0,	//数据顺序
		height = $$('container').offsetHeight,	//容器高度
		len = data.length,
		timer = null;
		console.log(height);
	var	init = function() {
		$$('item_0').style.webkitTransitionDuration = '0ms';
		$$('item_0').style.transitionDuration = '0ms';
		$$('item_0').style.top = -height+'px';
		$$('item_1').style.webkitTransitionDuration = '0ms';
		$$('item_1').style.transitionDuration = '0ms';	
		$$('item_1').style.top = '0';
		$$('item_2').style.webkitTransitionDuration = '0ms';
		$$('item_2').style.transitionDuration = '0ms';
		$$('item_2').style.top = height+'px';
		changeItem();
	};
	//切换内容
	var	changeItem = function() {		
        // 定义轮播的展示的样式书写
		$$('item_' + item).innerHTML = '<font>恭喜</font><font>'+data[list].nickname+'</font><font>捕获</font><font>'+data[list].name+'</font><font>添加</font><font>'+data[list].price+'元</font><font>友余额</font>';
		if (len > 1) {
			//过渡时间为0.5s
			$$('item_' + item).style.webkitTransitionDuration = '500ms';
			$$('item_' + item).style.transitionDuration = '500ms';
			$$('item_' + item).style.top = '0';
			$$('item_' + (item + 1)%3).style.webkitTransitionDuration = '500ms';
			$$('item_' + (item + 1)%3).style.transitionDuration = '500ms';
			$$('item_' + (item + 1)%3).style.top = -height + 'px';
			$$('item_' + (item + 2)%3).style.webkitTransitionDuration = '0ms';
			$$('item_' + (item + 2)%3).style.transitionDuration = '0ms';
			$$('item_' + (item + 2)%3).style.top = height + 'px';
			timer = setTimeout(function() {
				item--;
				if (item < 0) item = 2;
				list++;
				if (list > len - 1) list = 0;

				changeItem();
			}, 2000);
		}
    };
    // 页面调用的成功后，进行初始化的调用
    init();
}; 