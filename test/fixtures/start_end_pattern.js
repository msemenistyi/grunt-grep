function dataAttr( elem, key, data ) {
	var name;

	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			//@grep handle_exception_start
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}
			//@grep handle_exception_end

			//@grep handle_exception:s
			data_user.set( elem, key, data );
			//@grep handle_exception:e
		} else {
			data = undefined;
		}
	}
	return data;
}