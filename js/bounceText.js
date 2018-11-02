/*
 * @auther	 rstyro
 * @blog	 http://www.lrshuai.top/blog
 * @Date	 2017-11-14
 */
// ��������
jQuery.extend( jQuery.easing,
{
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
});
(function($) {
    $.fn.beatText = function(options) {
        var defaults = {
            beatHeight: '2em',
            upTime: 700,
            downTime: 700,
			isAuth:true,
			isRotate:true
        };
        var options = $.extend(defaults, options);
		console.log(options);
        return this.each(function() {
            var obj = $(this);
            if (obj.text() !== obj.html()) {
                return
            };
            var text = obj.text();
            var newMarkup = '';
            for (var i = 0; i <= text.length; i++) {
                var character = text.slice(i, i + 1);
                newMarkup += ($.trim(character)) ? '<span class="beat-char">' + character + '</span>' : character
            }
            obj.html(newMarkup);
			if(!options.isAuth){
				obj.find('span.beat-char').each(function(index,el) {
					$(this).mouseover(function() {
						beatAnimate($(this),options);
					})
				})
			}else{
				//�Զ������Ķ���
				obj.find('span.beat-char:first').animate({
					bottom: options.beatHeight
				}, {
					queue: false,
					duration: options.upTime,
					easing: 'easeOutCubic',
					complete: function() {
						$(this).animate({
							bottom: 0
						}, {
							queue: false,
							duration: options.downTime,
							easing: 'easeOutBounce',
							complete:function(){
								beatAnimate($(this).next(),options);
							}
						})
					}
				});
			}
        })
    }
	function beatAnimate(el,options){
		if(options.isRotate){
			el.addClass("rotate");
		}
		el.animate({
			bottom: options.beatHeight
		}, {
			queue: false,
			duration: options.upTime,
			easing: 'easeOutCubic',
			complete: function() {
				el.removeClass("rotate");
				$(this).animate({
					bottom: 0
				}, {
					queue: false,
					duration: options.downTime,
					easing: 'easeOutBounce',
					complete:function(){
						if(options.isAuth){
							var len = el.parent().children().length;
							var indexNum = el.index();
							if(indexNum == (len-1)){
								beatAnimate(el.parent().find('span.beat-char:first'),options);
							}else{
								beatAnimate(el.next(),options);
							}
						}
					}
				})
			}
		})
	}
})(jQuery);
$(document).ready(function() {
  /*  �������:
   *  upTime      ���Ƶ�ʱ��
   *  downTime    �����ʱ��
   *  beatHeight    ���Ƹ߶�
   *  isAuth      �Ƿ��Զ�
   *  isRotate    �Ƿ���ת*/
  $('.tit').beatText({isAuth:true,beatHeight:".15rem",isRotate:false,upTime:150,downTime:150});
  $('h2 b').beatText({isAuth:true,beatHeight:".15rem",isRotate:false,upTime:150,downTime:150});
  $('.txt').beatText({isAuth:true,beatHeight:".1rem",isRotate:false,upTime:150,downTime:150});
});

