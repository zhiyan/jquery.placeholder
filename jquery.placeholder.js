var placeholder = {
	init:function(){
		var that = this;
		if(!that._support){
			$("input").each(function(){
				var $this = $(this),
					v= $this.attr("placeholder"),
					curV = $this.val();
				if(!!v && !curV){
					if(curV !== v)
						$this.addClass("pholder");
					that.create($this,v);
				}
			});
		}
	},
	_support:(function(){return "placeholder" in document.createElement("input");})(),
	create:function($input,v){
		var that = this,
			isPass = $input.is(":password");
		if(isPass)
			that.fixPassword($input);
		else
			$input.val(v);
		$input.bind({"focus":function(){
			$(this).removeClass("pholder");
			if(isPass)
				$(this).siblings().filter(".passholder").hide();
			else if($input.val() === $input.attr("placeholder")){
				$input.val("");
			}
		},"blur":function(){
			if(!$input.val()){
				$(this).addClass("pholder");
				if(isPass)
					$(this).siblings().filter(".passholder").show();
				else{
					$input.val($input.attr("placeholder"));
				}	
			}
		}});
	},
	fixPassword:function($input){
		var $holder = $input.siblings().filter(".passholder");
		$holder.text($input.attr("placeholder")).show();
		$holder.click(function(){
			$input.focus();
		})
	}
}