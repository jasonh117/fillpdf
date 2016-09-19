var assert = require('chai').assert;
var pdf = require('./pdf');

var myForm = {
	name: '710',
	user: "mongo id",
	src: "./pdf/form710.pdf",
	data: {
		"Loan Number": "hello world",
		"BORROWERS NAME": "stuff",
		"MAILING ADDRESS": "LALALALA",
		"Check Box2": "Yes",
		"Check Box22": "Off"
	},
	texts: [
		{
			name: "textbox 1",
			content: "hello world",
			page: 0,
			left: 0,
			bottom: 0,
			fontSize: 12
		}
	],
	images: [
		{
			name: "signature 1",
			src: "./images/yoko.jpg",
			page: 0,
			left: 10,
			bottom: 10,
			width: 100,
			height: 50
		},
		{
			name: "signature 2",
			src: "./images/yoko.jpg",
			page: 1,
			left: 100,
			bottom: 100,
			width: 100,
			height: 50
		}
	]
};

describe("pdf library test", function() {
  it("should retrieve variables object from PDF", function() {
    return pdf.getPDFVariables(myForm.src).then(function(result) {
      assert.isObject(result);
    });
  });
  it("should fill out PDF using form object data", function() {
    return pdf.fillForm(myForm, "./result.pdf").catch(function(err) {
      assert.isUndefined(err);
    });
  });
});
