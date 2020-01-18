/**
 * WordPress dependencies
 */
import { registerFormatType } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import edit from './edit';

registerFormatType( 'emoji-conbini/emoji', {
	title: 'Emoji Conbini',
	object: true,
	tagName: 'img',
	className: 'emoji',
	active: false,
	attributes: {
		url: 'src',
		alt: 'alt',
	},
	edit,
} );
