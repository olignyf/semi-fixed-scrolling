

      // semi-fixed pinned header
      var semiScroll = function()
      {
        var  $window = $(window);
         var windowPos = $window.scrollTop();
         var windowHeight = $(window).height();
         var elements = $(".rpinnable");
         elements.each(function(index)
         {
         	var el = $(this);
         //	var pos = el.position();
         	var pos = el.offset();
            if (!el.data("originalPosY"))
            {
                var originalPosY = Math.ceil(pos.top);
            	var cssMarginTop = el.css("margin-top");
            	if (cssMarginTop != null)
            	{  var marginTop = Math.ceil(parseInt(cssMarginTop.replace("px",""),10));
            	  originalPosY += marginTop;
            	}
            	el.data("originalPosY", originalPosY);
            	console.log("originalPosY:"+el.data("originalPosY"));
            }
            
            if (!el.hasClass("pinned"))
            {
            	//console.log("menu top:"+pos.top);
            	//console.log("menu height:"+el.height());
            	//console.log("windowPos:"+windowPos);
            	//console.log("windowHeight:"+windowHeight);
            	//console.log("menu innerHeight:"+el.innerHeight());
            	var originalPosY = el.data("originalPosY");
            	var bottomPos = el.outerHeight(true);
            	
            	var cmp1 = bottomPos + originalPosY;
            	var cmp2 = windowHeight + windowPos;
            	console.log("A.comparing "+cmp1 + " to " + cmp2 + ", windowPos:"+windowPos + " bottomPos:"+bottomPos);
            	if (windowHeight + windowPos >= bottomPos + originalPosY)
            	{
            		el.addClass("pinned");
            	 	console.log("originalPosY:"+originalPosY);
//            	console.log("menu outerHeight:"+el.outerHeight());
            		var newTop = windowHeight - el.outerHeight(true);// Math.ceil(pos.top) - 30 - windowPos;
            		
            		if (originalPosY + el.outerHeight(true) < windowHeight) 
            		{
  			        	el.css("top", originalPosY+ "px");
  			        	console.log("switching back to original pos:"+originalPosY);
            		}
            		else
            		{	el.css("top", newTop+ "px");
  			        	console.log("switching back to newTop:"+newTop);
            		}
            		console.log("menu fixed top:"+ newTop);
            		el.css("margin-top", "0");
            		el.data("originalY", bottomPos);
            	}
            }
            else
            {
            	var originalPosY = el.data("originalPosY");
            	var bottomPos = el.outerHeight(true);
            	var cmp1 = bottomPos + originalPosY;
            	var cmp2 = windowHeight + windowPos;
            	console.log("B.comparing "+cmp1 + " to " + cmp2 + ", windowPos:"+windowPos + " bottomPos:"+bottomPos);
            	if (originalPosY != null && windowHeight + windowPos < bottomPos + originalPosY)
            	{
            		el.removeClass("pinned");
            		console.log("removing class pinned on el:"+el.attr("id"));
            	}
            }
      	});
         windowPos = $window.scrollTop();// + 87;
         elements = $(".pinnable");
         elements.each(function(index)
         {
         	var el = $(this);
            if (!el.hasClass("pinned"))
            {
            	var offset = el.offset();
            	var yPos = offset.top;
            	// always do it to avoid flickering if (windowPos > 0)
            	{
            		var nextSibling = el.next();
            		var currentHeight = el.outerHeight(true);
            		el.addClass("pinned");
            		el.data("originalY", yPos);
            		if (nextSibling == null || !nextSibling.hasClass("jsSemiFixedPadder"))
            		{            			
            			el.after($("<div class=\"jsSemiFixedPadder\" style=\"height:"+currentHeight+"px; border:0px solid yellow;\"></div>"));
            			console.log("adding semi margin");
            		}
//            		nextSibling.css("margin-top", currentHeight + "px");
            	}
            }
            else
            {
            	var originalY = el.data("originalY");
            	if (originalY != null && windowPos < originalY)
            	{
            	//	el.removeClass("pinned");
            	}
            }
         });
      };
      
      $(window).scroll(function()
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
        
