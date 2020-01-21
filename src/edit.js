/**
 * External dependencies
 */
import NimblePicker from 'emoji-mart/dist-modern/components/picker/nimble-picker';
import data from 'emoji-mart/data/twitter.json';

/**
 * Internal dependencies
 */
import { grabTheRightIcon } from './util';

/**
 * WordPress dependencies
 */
import { toggleFormat, insertObject } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { Popover, Toolbar, IconButton } from '@wordpress/components';
import { getRectangleFromRange } from '@wordpress/dom';

const type = 'emoji-conbini/emoji';
let anchorRange;

const EmojiEdit = ( { isActive, value, onChange } ) => {
	const onToggle = () => {
		// Set up the anchorRange when the Popover is opened.
		const selection = window.getSelection();
		anchorRange = selection.rangeCount > 0 ? selection.getRangeAt( 0 ) : null;
		onChange( toggleFormat( value, { type } ) );
	};

	// Pin the Popover to the caret position.
	const anchorRect = () => {
		return getRectangleFromRange( anchorRange );
	};

	const emojiPopover = isActive && (
		<Popover
			className="emoji-conbini-popover"
			position="bottom center"
			key="emoji-popover"
			focusOnMount="container"
			getAnchorRect={ anchorRect }
			onClose={ () => {
				onChange( toggleFormat( value, { type } ) );
			} }
		>
			<NimblePicker
				set="twitter"
				data={ data }
				showPreview={ false }
				showSkinTones={ false }
				onSelect={ ( { native } ) => {
					const unified = grabTheRightIcon( native );

					onChange( insertObject( value, {
						type,
						attributes: {
							url: `https://s.w.org/images/core/emoji/12.0.0-1/svg/${ unified }.svg`,
							alt: native,
						},
					} ) );
				} }
			/>
		</Popover>
	);

	return (
		<>
			<BlockControls>
				<Toolbar>
					<IconButton
						icon="smiley"
						label="Emoji Conbini"
						className="components-toolbar__control"
						onClick={ onToggle }
					/>
				</Toolbar>
			</BlockControls>
			{ emojiPopover }
		</>
	);
};

export default EmojiEdit;
