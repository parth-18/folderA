
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')','position': 'absolute'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})
var refreshDuration = 10000;
        var refreshTimeout;
        var numPointsX;
        var numPointsY;
        var unitWidth;
        var unitHeight;
        var points;
        
        function onLoad()
        {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width',window.outerWidth);
            svg.setAttribute('height',window.outerHeight);
            document.querySelector('#bg').appendChild(svg);
        
            var unitSize = (window.innerWidth+window.innerHeight)/15;
            numPointsX = Math.ceil(window.innerWidth/unitSize)+1;
            numPointsY = Math.ceil(window.innerHeight/unitSize)+1;
            unitWidth = Math.ceil(window.innerWidth/(numPointsX-1));
            unitHeight = Math.ceil(window.innerHeight/(numPointsY-1));
        
            points = [];
        
            for(var y = 0; y < numPointsY; y++) {
                for(var x = 0; x < numPointsX; x++) {
                    points.push({x:unitWidth*x, y:unitHeight*y, originX:unitWidth*x, originY:unitHeight*y});
                }
            }
        
            randomize();
        
            for(var i = 0; i < points.length; i++) {
                if(points[i].originX != unitWidth*(numPointsX-1) && points[i].originY != unitHeight*(numPointsY-1)) {
                    var topLeftX = points[i].x;
                    var topLeftY = points[i].y;
                    var topRightX = points[i+1].x;
                    var topRightY = points[i+1].y;
                    var bottomLeftX = points[i+numPointsX].x;
                    var bottomLeftY = points[i+numPointsX].y;
                    var bottomRightX = points[i+numPointsX+1].x;
                    var bottomRightY = points[i+numPointsX+1].y;
        
                    var rando = Math.floor(Math.random()*2);
        
                    for(var n = 0; n < 2; n++) {
                        var polygon = document.createElementNS(svg.namespaceURI, 'polygon');
        
                        if(rando==0) {
                            if(n==0) {
                                polygon.point1 = i;
                                polygon.point2 = i+numPointsX;
                                polygon.point3 = i+numPointsX+1;
                                polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+bottomRightX+','+bottomRightY);
                            } else if(n==1) {
                                polygon.point1 = i;
                                polygon.point2 = i+1;
                                polygon.point3 = i+numPointsX+1;
                                polygon.setAttribute('points',topLeftX+','+topLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                            }
                        } else if(rando==1) {
                            if(n==0) {
                                polygon.point1 = i;
                                polygon.point2 = i+numPointsX;
                                polygon.point3 = i+1;
                                polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY);
                            } else if(n==1) {
                                polygon.point1 = i+numPointsX;
                                polygon.point2 = i+1;
                                polygon.point3 = i+numPointsX+1;
                                polygon.setAttribute('points',bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                            }
                        }
                        polygon.setAttribute('fill','rgba(0,0,0,'+(Math.random()/3)+')');
                        var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
                        animate.setAttribute('fill','freeze');
                        animate.setAttribute('attributeName','points');
                        animate.setAttribute('dur',refreshDuration+'ms');
                        animate.setAttribute('calcMode','linear');
                        polygon.appendChild(animate);
                        svg.appendChild(polygon);
                    }
                }
            }
        
            refresh();
        
        }
        
        function randomize() {
            for(var i = 0; i < points.length; i++) {
                if(points[i].originX != 0 && points[i].originX != unitWidth*(numPointsX-1)) {
                    points[i].x = points[i].originX + Math.random()*unitWidth-unitWidth/2;
                }
                if(points[i].originY != 0 && points[i].originY != unitHeight*(numPointsY-1)) {
                    points[i].y = points[i].originY + Math.random()*unitHeight-unitHeight/2;
                }
            }
        }
        
        function refresh() {
            randomize();
            for(var i = 0; i < document.querySelector('#bg svg').childNodes.length; i++) {
                var polygon = document.querySelector('#bg svg').childNodes[i];
                var animate = polygon.childNodes[0];
                if(animate.getAttribute('to')) {
                    animate.setAttribute('from',animate.getAttribute('to'));
                }
                animate.setAttribute('to',points[polygon.point1].x+','+points[polygon.point1].y+' '+points[polygon.point2].x+','+points[polygon.point2].y+' '+points[polygon.point3].x+','+points[polygon.point3].y);
                animate.beginElement();
            }
            refreshTimeout = setTimeout(function() {refresh();}, refreshDuration);
        }
        
        function onResize() {
            document.querySelector('#bg svg').remove();
            clearTimeout(refreshTimeout);
            onLoad();
        }
        
        window.onload = onLoad;
        window.onresize = onResize;
