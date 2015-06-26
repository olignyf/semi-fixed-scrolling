

		semiScroll: function()
		{
			var DEBUG_SEMI_SCROLL = true;
			var $window = $(window);
			var windowPos = $window.scrollTop();
			var windowHeight = $(window).height();
			var elements = $(".rpinnable");
			elements.each(function(index)
			{
				var el = $(this);
				var pos = el.offset();
				
				if (!el.data("originalPosY"))
				{
					var originalPosY = Math.ceil(pos.top);
					var cssMarginTop = el.css("margin-top");
					if (cssMarginTop != null)
					{	var marginTop = Math.ceil(parseInt(cssMarginTop.replace("px",""),10));
						originalPosY += marginTop;
					}
					el.data("originalPosY", originalPosY);
				}
				
				var originalPosY = el.data("originalPosY");
				var elOuterHeight = el.outerHeight(true);
				var bottomVisibleCoordinate = windowHeight + windowPos;
				var bottomElementCoordinate = elOuterHeight + originalPosY;
				//var cmp1 = elOuterHeight + originalPosY;
				//var cmp2 = windowHeight + windowPos;
				//console.log("A.comparing "+cmp1 + " to " + cmp2 + ", windowPos:"+windowPos + " elOuterHeight:"+elOuterHeight);
				
				if (!el.hasClass("pinned"))
				{
					if (bottomVisibleCoordinate >= bottomElementCoordinate)
					{
						var newTop = windowHeight - el.outerHeight(true);// Math.ceil(pos.top) - 30 - windowPos;
						
						if (originalPosY + el.outerHeight(true) < windowHeight) 
						{
							el.css("top", originalPosY+ "px");
						}
						else
						{	el.css("top", newTop+ "px");
						}
						
						var nextSibling = el.next();
						var currentHeight = el.outerHeight(true) ;
						
						if (nextSibling == null || !nextSibling.hasClass("jsSemiFixedPadder"))
						{
							el.after($("<div class=\"jsSemiFixedPadder\" style=\"height:"+currentHeight+"px; border:0px solid yellow;\"></div>"));
						}
						else if (nextSibling.hasClass("jsSemiFixedPadder"))
						{
							nextSibling.css("height", currentHeight+"px");
						}
						
						console.log("adding class pinned");
						el.addClass("pinned");
						el.css("margin-top", "0");
						el.data("originalY", elOuterHeight);
					}
				}
				else
				{
					if (bottomVisibleCoordinate < bottomElementCoordinate)
					{
						el.removeClass("pinned");
						console.log("removing class pinned 3");
						var nextSibling = el.next();
						if (nextSibling != null && nextSibling.hasClass("jsSemiFixedPadder"))
						{
							nextSibling.remove();
						}
					}
					else if (bottomVisibleCoordinate > bottomElementCoordinate)
					{
						// handle when we increase window size, the element should grow with it.
						var theoricalTop = windowHeight - el.outerHeight(true);
						var actualTop = parseInt(el.css("top"), 10);
						if (DEBUG_SEMI_SCROLL && console) console.log("theoricalTop: "+theoricalTop+ ", actualTop:" + actualTop);
							
						if (theoricalTop > actualTop)
						{
							if (originalPosY + el.outerHeight(true) >= windowHeight) // but not too much
							{
								if (DEBUG_SEMI_SCROLL && console) console.log("adjusting pinned element because more space is made available");
								el.css("top", theoricalTop+ "px");
							}
							else
							{
							}
						}
						else if (theoricalTop < actualTop) // resizing down window
						{
							if (DEBUG_SEMI_SCROLL && console) console.log("other case for adjust");
							el.css("top", theoricalTop+ "px");
						}
					}
				}
			});
		};
		
      
      $(window).scroll(function()
      {      
         semiScroll();
      });
      $(window).resize(function()
      {      
         semiScroll();
      });
      semiScroll();



    cleanup: function() {
      app.off(null, null, this);
      $(window).unbind('scroll');
      var elements = $(".rpinnable");
      elements.each(function(index)
      {
       	var el = $(this);
        el.removeClass("pinned");
        console.log("removing pinned class from el:"+el.attr("id"));
    		var nextSibling = el.next();
    		if (nextSibling != null || nextSibling.hasClass("jsSemiFixedPadder"))
    		{
    			nextSibling.remove();
    		}
        
      });
        
