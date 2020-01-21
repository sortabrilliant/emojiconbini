/**
 * This code is based on Twitter Emoji library
 *
 * @see https://github.com/twitter/twemoji
 */
const UFE0Fg = /\uFE0F/g;

// avoid using a string literal like '\u200D' here because minifiers expand it inline
const U200D = String.fromCharCode( 0x200D );

function toCodePoint( unicodeSurrogates, sep ) {
	const r = [];
	let c = 0,
		p = 0,
		i = 0;

	while ( i < unicodeSurrogates.length ) {
		c = unicodeSurrogates.charCodeAt( i++ );
		if ( p ) {
			// eslint-disable-next-line no-bitwise
			r.push( ( 0x10000 + ( ( p - 0xD800 ) << 10 ) + ( c - 0xDC00 ) ).toString( 16 ) );
			p = 0;
		} else if ( 0xD800 <= c && c <= 0xDBFF ) {
			p = c;
		} else {
			r.push( c.toString( 16 ) );
		}
	}
	return r.join( sep || '-' );
}

export function grabTheRightIcon( rawText ) {
	// if variant is present as \uFE0F
	return toCodePoint( rawText.indexOf( U200D ) < 0 ?
		rawText.replace( UFE0Fg, '' ) :
		rawText
	);
}
