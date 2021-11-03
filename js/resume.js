Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});
Handlebars.registerHelper('ifnoteq', function (a, b, options) {
	console.log('ifnoteq: ' + a + ' ' +  b);
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});

$.getJSON( "assets/resume.json", function( resume ) {
	let tpl = document.getElementById('handlebars');
	// console.log(resume);
	let template = Handlebars.compile(tpl.innerHTML);
	let elt = document.getElementById('handlebars');
	tpl.insertAdjacentHTML('beforebegin', template({ resume: resume }));
});
