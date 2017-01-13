(function( root, factory ) {
		if( typeof exports === "object" && typeof exports.nodeName !== "string" ) {
			// CommonJS
			module.exports = factory();
		} else {
			// Browser
			root.GlyphHangerSpider = factory();
		}
}( this, function() {

	var GHS = function() {
		this.urls = [];
	};

	GHS.prototype.normalizeURL = function( url ) {
		var a = document.createElement( "a" );
		a.href = url;
		return a.href;
	};

	GHS.prototype.parse = function( parentNode ) {
		Array.prototype.slice.call( parentNode.querySelectorAll( "a[href]" ) ).forEach(function( node ) {
			var url = this.normalizeURL( node.getAttribute( "href" ) );

			// Local URLs only
			if( url.indexOf( "mailto:" ) !== 0 && url.indexOf( location.host ) > -1 ) {
				this.urls.push( url );
			}
		}.bind( this ));

		return this.urls;
	};

	GHS.prototype.getUrls = function() {
		return this.urls;
	};

	return GHS;
}));