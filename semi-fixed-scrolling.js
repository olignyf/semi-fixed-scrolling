
  this.$(".jsPinThis").pinThis();
			
  $.fn.pinThis = function() 
  {  
	var $pinnables = $(this).filter(":not(.pinned)");
	$pinnables.each(function(index)
	{
		var $pinnable = $(this);
		var currentHeight = $pinnable.outerHeight(true);
		var currentWidth = $pinnable.width();
		var pos = $pinnable.offset();
		var marginBottom = parseInt($pinnable.css("margin-bottom"), 10);
		
		var nextSibling = $pinnable.next();
		if (nextSibling == null || !nextSibling.hasClass("jsSemiFixedPadder"))
		{
			var $fixedPadder = $("<div class=\"jsSemiFixedPadder\" style=\"height:"+currentHeight+"px; border:0px solid yellow;\"></div>");
			$pinnable.after($fixedPadder);
		}
		else if (nextSibling.hasClass("jsSemiFixedPadder"))
		{
			nextSibling.css("height", currentHeight+"px");
		}
		
		if (marginBottom > 0)
		{
		//	var $blackBg = $("<div class=\"jsBlackBg pinnable pinned\" style=\"height:"+marginBottom+"px; background-color:#000000;\"></div>");
		//	$pinnable.after($blackBg);
		}
		
		$pinnable.addClass("pinned");
		$pinnable.css("margin-top", "0");
		$pinnable.css("top", pos.top + "px");
		
		if (marginBottom > 0)
		{
			//$pinnable.css("border-top", marginBottom + "px solid #1a1a1a");
		}		
	});
  };
