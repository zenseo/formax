/**
 * jQuery Formax
 * 
 * jQuery plugin for serializing & auto-ajaxing form data
 * 
 * @category Forms
 * @author Vaibhav Pandey a.k.a VPZ <vaibhavpandey at live.in>
 * @license http://www.github.com/vaibhavpandeyvpz/formax/MIT-LICENSE.txt MIT License
 * @link https://os.vaibhavpandey.com/formax Formax website
 */
(function($) {
	$.fn.formax = function(Options) {
		var Defaults = $.extend({
            method : null,
            parameters : {},
            response: function(Context, Response) {},
            url : null
        }, Options);
		return this.each(function() {
			var $Form = jQuery(this);
			$Form.bind("submit", function(Event) {
				Event.preventDefault();
				var $Data = {};
			    var $Temporary = $Form.serializeArray();
			    $.each($Temporary, function() {
			        if ($Data[this.name] !== undefined) {
			            if (!$Data[this.name].push)
			            	$Data[this.name] = [$Data[this.name]];
			            $Data[this.name].push(this.value || '');
			        } else
			        	$Data[this.name] = this.value || '';
			    });
			    $.each(Defaults.parameters, function(Key, Value) {
			    	if ($Data[Key] !== undefined) {
			            if (!$Data[Key].push)
			            	$Data[Key] = [$Data[this.name]];
			            $Data[Key].push(Value || '');
			        } else
			        	$Data[Key] = Value || '';
			    })
				var $Method = Defaults.method != null ? Defaults.method : $Form.attr("method");
				var $Target = Defaults.url != null ? Defaults.url : $Form.attr("action");
			    jQuery.ajax({
			    	context: $Form,
					data: $Data,
					error: function() {
						Defaults.response(this, null);
					},
					success: function(Response) {
						Defaults.response(this, Response);
					},
					type: $Method,
					url: $Target
				});
				return false;
			});
	    });
	}
}(jQuery));