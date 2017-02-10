
/*eslint-env node, mocha */
/*eslint max-nested-callbacks: [2, 4]*/
/*eslint require: true*/

// import chai: the assertion framework (http://chaijs.com)
import chai from "../node_modules/chai/chai";

// import chai-plugin: assertions for the dom (https://github.com/nathanboktae/chai-dom)
import chaiDom from "../node_modules/chai-dom/chai-dom";

// import jsdom: JavaScript implementation of the WHATWG DOM and HTML for basic DOM-testing (https://github.com/tmpvar/jsdom)
import jsdom from  "../node_modules/jsdom/lib/jsdom";



// chai: setup assertion style and plugins
chai.should();
chai.use(chaiDom);


// jsdom: setup fake dom (to avoid the karam route)
global.document = jsdom.jsdom("<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>");
global.window = document.defaultView;
global.navigator = global.window.navigator;
document.body.innerHTML = "<div id='foo' class='bar' foo='bar'><span>chai</span></div>";


/**! Root test suite */
describe(`Simple testsuite for Chai-DOM + JSDOM`, () => {

	describe("Chai-DOM should work with a NodeList (document.querySelectorAll('#foo'):", () => {
		it("should have an assertion \"class\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.have.class('bar');
		});

		it("should have an assertion \"attr\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.have.attr('foo');
			match.should.have.attr('foo','bar');
			match.should.have.attr('foo').match(/bar/);
		});

		it("should have an assertion \"assertion\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.have.attribute('foo');
			match.should.have.attribute('foo','bar');
			match.should.have.attribute('foo').match(/bar/);
		});

		it("should have an assertion \"id\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.have.id('foo');
		});

		it("should have an assertion \"html\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.have.html("<span>chai</span>");
		});

		it("should have an assertion \"length\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.have.length(1);
		});

		it("should have an assertion \"contain\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.contain('span');
		});

		it("should have an assertion \"exist\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.exist;
		});

		it("should have an assertion \"text\"", () => {
			let match = document.querySelectorAll('#foo');
			match.should.have.text('chai');
		});
	});


	describe("Chai-DOM should work with an HTMLElement (document.getElementById('foo'):", () => {
		it("should have an assertion \"class\"", () => {
			let match = document.getElementById('foo');
			match.should.have.class('bar');
		});

		it("should have an assertion \"attr\"", () => {
			let match = document.getElementById('foo');
			match.should.have.attr('foo');
			match.should.have.attr('foo','bar');
			match.should.have.attr('foo').match(/bar/);
		});

		it("should have an assertion \"assertion\"", () => {
			let match = document.getElementById('foo');
			match.should.have.attribute('foo');
			match.should.have.attribute('foo','bar');
			match.should.have.attribute('foo').match(/bar/);

		});

		it("should have an assertion \"id\"", () => {
			let match = document.getElementById('foo');
			match.should.have.id('foo');
		});

		it("should have an assertion \"html\"", () => {
			let match = document.getElementById('foo');
			match.should.have.html("<span>chai</span>");
		});

		it("should have an assertion \"length\"", () => {
			let match = document.getElementById('foo');
			match.should.have.length(1);
		});

		it("should have an assertion \"contain\"", () => {
			let match = document.getElementById('foo');
			match.should.contain('span');
		});

		it("should have an assertion \"exist\"", () => {
			let match = document.getElementById('foo');
			match.should.exist;
		});

		it("should have an assertion \"text\"", () => {
			let match = document.getElementById('foo');
			match.should.have.text('chai');
		});

	});


});

