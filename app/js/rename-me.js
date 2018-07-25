(function (global) {
	var root = this;
	
	$(document).ready(function(){


		// --- RESPONSIVE JS ---------------------------
		// media query event handler
		if (matchMedia) {
			var mq = window.matchMedia("(min-width: 767px)");
			mq.addListener(WidthChange);
			WidthChange(mq);
		}

		// media query change
		function WidthChange(mq) {

			if (mq.matches) {
				// window width is at least 767px
			}
			else {
				// window width is less than 767px
			}

		}

	});
})(window);