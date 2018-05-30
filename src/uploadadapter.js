/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals XMLHttpRequest, FormData */

/**
 * @module adapter-ckfinder/uploadadapter
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

/**
 * A plugin that enables CKFinder uploads in CKEditor 5.
 *
 * Configure the upload URL in
 * {@link module:adapter-ckfinder/uploadadapter~CKFinderAdapterConfig#uploadUrl `ckfinder.uploadUrl`}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CKFinderUploadAdapter extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ FileRepository ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'CKFinderUploadAdapter';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		// Register CKFinderAdapter
		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => new UploadAdapter( loader );
	}
}

/**
 * Upload adapter for CKFinder.
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
class UploadAdapter {
	/**
	 * Creates a new adapter instance.
	 *
	 * @param {module:upload/filerepository~FileLoader} loader
	 */
	constructor(loader) {
		/**
		 * FileLoader instance to use during the upload.
		 *
		 * @member {module:upload/filerepository~FileLoader} #loader
		 */
		this.loader = loader;
	}

	/**
	 * Starts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#upload
	 * @returns {Promise}
	 */
	upload() {
		return new Promise(( resolve, reject ) => {
			var reader = new FileReader();

      reader.onloadend = function () {
				resolve({
					default: reader.result
				});
      }

			reader.readAsDataURL(this.loader.file);
		});
	}

	/**
	 * Aborts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#abort
	 * @returns {Promise}
	 */
	abort() {
		if ( this.xhr ) {
			this.xhr.abort();
		}
	}
}

/**
 * The configuration of the {@link module:adapter-ckfinder/uploadadapter~CKFinderUploadAdapter CKFinder upload adapter}.
 *
 * Read more in {@link module:adapter-ckfinder/uploadadapter~CKFinderAdapterConfig}.
 *
 * @member {module:adapter-ckfinder/uploadadapter~CKFinderAdapterConfig} module:core/editor/editorconfig~EditorConfig#ckfinder
 */

/**
 * The configuration of the {@link module:adapter-ckfinder/uploadadapter~CKFinderUploadAdapter CKFinder upload adapter}.
 *
 *		ClassicEditor
 *			.create( editorElement, {
 * 				ckfinder: {
 *					uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
 * 				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 *
 * @interface CKFinderAdapterConfig
 */

/**
 * The URL to which files should be uploaded.
 *
 * @member {String} module:adapter-ckfinder/uploadadapter~CKFinderAdapterConfig#uploadUrl
 */
