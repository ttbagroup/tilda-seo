'use strict'

const extend = require('object-assign')

module.exports = function Seoify (opts) {

	return function seoify (str) {
		let container = document.createElement('div')

		container.innerHTML = str

		let textNodes = textNodesUnder(container)

		let count = 0

		textNodes.forEach((textNode) => {
			if (processNode(textNode, /^\s*#\s+/, 'h1')) count++
			if (processNode(textNode, /^\s*##\s+/, 'h2')) count++
			if (processNode(textNode, /^\s*###\s+/, 'h3')) count++
			if (processNode(textNode, /^\s*####\s+/, 'h4')) count++
			if (processNode(textNode, /^\s*#####\s+/, 'h5')) count++
			if (processNode(textNode, /^\s*######\s+/, 'h6')) count++
		})

		seoify.count = count || 0

		return container.innerHTML
	}
}


function processNode(textNode, regex, tag) {
	if (regex.test(textNode.nodeValue)) {
		let titleEl = textNode.parentNode.closest('.t-title')
		if (titleEl) {
			//remove # from inner content
			textNode.nodeValue = textNode.nodeValue.replace(regex, '')

			//rename closest .t-title tag to h1
			let el = document.createElement(tag)
			el.innerHTML = titleEl.innerHTML;
			copyAttributes(titleEl, el)
			titleEl.parentNode.replaceChild(el, titleEl)

			return true
		}
	}
}

function copyAttributes (from, to) {
	// Grab all of the original's attributes, and pass them to the replacement
	for (let i = 0, l = from.attributes.length; i < l; ++i){
	    let nodeName  = from.attributes.item(i).nodeName;
	    let nodeValue = from.attributes.item(i).nodeValue;

	    to.setAttribute(nodeName, nodeValue);
	}
}

function textNodesUnder(el){
	let n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
	while(n=walk.nextNode()) a.push(n);
	return a;
}
