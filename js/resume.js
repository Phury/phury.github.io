$.getJSON( "assets/resume.json", function( resume ) {
	let tpl = document.getElementById('handlebars');
	// console.log(resume);
	let template = Handlebars.compile(tpl.innerHTML);
	let elt = document.getElementById('handlebars');
	tpl.insertAdjacentHTML('beforebegin', template({ resume: resume }));
});
