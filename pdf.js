var hummus = require('hummus');
var pdfFiller = require('pdffiller');
var fs = require('fs');

/**
 * Copies file from input to output
 * @param  {String} input  file path to input file
 * @param  {String} output file path to output file
 * @return {Promise}        resolves when copying is successful
 */
function copyFile(input, output) {
	return new Promise(function(resolve, reject) {
		var readerStream = fs.createReadStream(input);
		var writerStream = fs.createWriteStream(output);
		readerStream.on('error', reject);
		writerStream.on('error', reject);
		readerStream.pipe(writerStream);
		writerStream.on('finish', function() {
			resolve();
		});
	});
}

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
 * @param  {file} file file path to the PDF
 * @return {Promise}      resolves when PDF is filled out
 */
function fillText(data, file) {
	var tempfile = "./temp.pdf";
	return new Promise(function(resolve, reject) {
		pdfFiller.fillFormWithFlatten(file, tempfile, data, false, function(err) {
			if (err) {
				fs.unlink(tempfile);
				reject(err);
			} else {
				copyFile(tempfile, file);
				fs.unlink(tempfile);
				resolve();
			}
		});
	});
}

/**
 * Inserts texts in the PDF
 * @param  {[object]} texts an array of text data to fill the pdf
 * @param  {file} file file path to the PDF
 */
function insertText(texts, file) {
	if (texts === undefined || !(texts instanceof Array) || texts.length === 0) {
		return;
	}
	var pdfWriter = hummus.createWriterToModify(file);
	var font = {
		font: pdfWriter.getFontForFile('./fonts/arial.ttf'),
		size: 12
	};
	texts.map(function(text) {
		if (text.fontSize !== undefined) {
			font.size = text.fontSize;
		}
		var pageModifier = new hummus.PDFPageModifier(pdfWriter,text.page);
		pageModifier.startContext().getContext()
		.writeText(text.content, text.left, text.bottom, font);
		pageModifier.endContext().writePage();
	});
	pdfWriter.end();
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
 * @param  {object} form object with all the form data stored
 * @param  {String} file file path to the output PDF
 * @return {Promise}      resolves when the completed PDF is filled out
 */
function fillForm(form, file) {
	return copyFile(form.src, file)
	.then(function() {
		insertImages(form.images, file);
		insertText(form.texts, file);
		return fillText(form.data, file);
	});
}

module.exports = {
	copyFile: copyFile,
	getPDFVariables: getPDFVariables,
	fillText: fillText,
	insertImages: insertImages,
	fillForm: fillForm
};
