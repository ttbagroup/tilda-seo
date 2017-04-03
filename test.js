require('enable-mobile')
const Seoify = require('./')

document.body.style.cssText = `
`


let seoify = Seoify({

})

let textarea = document.body.appendChild(document.createElement('textarea'))
textarea.setAttribute('placeholder', 'Insert tilda html here')
textarea.rows = 20
textarea.style.cssText = `
min-width: 80%;
display: block;
min-height: 80vh;
`

let btn = document.body.appendChild(document.createElement('button'))
btn.innerHTML = 'Seoify'
btn.style.cssText = `
line-height: 30px;
padding: 0px 20px;
margin-top: 10px;
`


btn.addEventListener('click', () => {
	textarea.value = seoify(textarea.value)

	textarea.select()

	btn.innerHTML = seoify.count + ' entries processed'
	setTimeout(() => {
		btn.innerHTML = 'Seoify'
	},2000)
})
