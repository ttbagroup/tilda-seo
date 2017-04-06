'use strict'

const extend = require('object-assign')

module.exports = function Seoify (opts = {}) {
	opts = extend({
		holder: '.t-title, .t-descr, .t-name',
		inlineHolder: 'strong, em'
	}, opts)

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

	function processNode(textNode, regex, tag) {
		if (regex.test(textNode.nodeValue)) {
			let inline = false
			let titleEl = textNode.parentNode.matches(opts.inlineHolder) ? textNode.parentNode : null

			if (!titleEl) {
				titleEl = textNode.parentNode.matches(opts.holder) ? textNode.parentNode : textNode.parentNode.closest(opts.holder)
			}
			else {
				inline = true
			}

			if (titleEl) {
				//remove # from inner content
				textNode.nodeValue = textNode.nodeValue.replace(regex, '')

				//force inline display if inline holder
				if (inline) {
					let style = getComputedStyle(titleEl)
					if (!/inline/.test(style.display)) {
						titleEl.style.display = 'inline';
					}
					titleEl.style.fontSize = style.fontSize;
					titleEl.style.fontStyle = style.fontStyle;
					titleEl.style.fontWeight = style.fontWeight;
					titleEl.style.textTransform = style.textTransform;
				}

				//rename closest holder tag to proper header
				let el = document.createElement(tag)
				el.innerHTML = titleEl.innerHTML;
				copyAttributes(titleEl, el)

				console.log(inline ? 'inline' : 'block', tag, textNode)

				titleEl.replaceWith(el)


				return true
			}
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
