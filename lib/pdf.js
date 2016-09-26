var hummus = require('hummus');
var pdfFiller = require('pdffiller');
var fs = require('fs');

/**
 * Retrieves an object with all variables in the PDF
 * @param  {String} file file path to the PDF
 * @return {Promise}      resolves with an object with all the variables
 */
function getPDFVariables(file) {
	return new Promise(function(resolve, reject) {
		pdfFiller.generateFDFTemplate(file, null, function(err, fdfData) {
			if (err) {
				reject(err);
			} else {
				resolve(fdfData);
			}
		});
	});
}

/**
 * Fills in the variables in the PDF
 * @param  {object} data an object with all the variables
 * @param  {String} file file path to the input PDF
 * @param  {String} file file path to the output PDF
 * @return {Promise}      resolves when PDF is filled out
 */
function fillText(data, input, output) {
	if (data === undefined) {
		throw new Error("first parameter is not defined");
	}

	if (typeof input !== 'string') {
		throw new Error("input parameter is not type string");
	}

	if (typeof output !== 'string') {
		throw new Error("output parameter is not type string");
	}

	return new Promise(function(resolve, reject) {
		pdfFiller.fillFormWithFlatten(input, output, data, false, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Inserts images in the PDF
 * @param  {[object]} images an array of images data to fill the pdf
 * @param  {file} file file path to the PDF
 */
function insertImages(images, file) {
	if (images === undefined || !(images instanceof Array) || images.length === 0) {
		return;
	}

	if (typeof file !== 'string') {
		throw new Error("file parameter is not type string");
	}

	var pdfWriter = hummus.createWriterToModify(file);
	images.map(function(image) {
		var pageModifier = new hummus.PDFPageModifier(pdfWriter,image.page);
		pageModifier.startContext().getContext()
		.drawImage(image.left,image.bottom,image.src, {transformation:{width:image.width,height:image.height}});
		pageModifier.endContext().writePage();
	});
	pdfWriter.end();
}

/**
 * Fills out a PDF using the form object data
 * @param  {String} src    location of source pdf
 * @param  {String} dest   location of destination pdf
 * @param  {object} data   object with all the form data stored
 * @param  {Array} images 	Array of objects with all the image data stored
 * @return {Promise}        resolves when the completed PDF is filled out
 */
function fillForm(src, dest, data, images) {
	if (typeof src !== 'string') {
		throw new Error("first parameter is not type string");
	}

	if (typeof dest !== 'string') {
		throw new Error("second parameter is not type string");
	}

	if (data === undefined) {
		throw new Error("third parameter is not defined");
	}

	return fillText(data, src, dest).then(function() {
		insertImages(images, dest);
	});
}

module.exports = {
	getPDFVariables: getPDFVariables,
	fillForm: fillForm
};
