function dataAttr( elem, key, data ) {
	var name;

	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {

			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}