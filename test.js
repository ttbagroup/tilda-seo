require('enable-mobile')
const Seoify = require('./')

document.body.style.cssText = `
font-family: sans-serif;
text-align: center;
`


let seoify = Seoify({

})

let textarea = document.body.appendChild(document.createElement('textarea'))
textarea.setAttribute('placeholder', 'Paste tilda html code here')
textarea.rows = 20
textarea.style.cssText = `
min-width: 80%;
display: block;
margin: auto;
min-height: 70vh;
font-size:1rem;
`
textarea.focus()

let btn = document.body.appendChild(document.createElement('button'))
btn.innerHTML = 'Seoify'
btn.style.cssText = `
line-height: 30px;
padding: 10px 30px;
margin-top: 10px;
font-size:1rem;
`

let desc = `
# is h1<br/> ## is h2<br/> ### is h3<br/> See <a href="https://en.wikipedia.org/wiki/Markdown">markdown</a>
`
let descEl = document.body.appendChild(document.createElement('p'))
descEl.innerHTML = desc

btn.addEventListener('click', () => {
	textarea.value = seoify(textarea.value)

	textarea.select()
	btn.innerHTML = 'Seoify'

	descEl.innerHTML = seoify.count + ' entries processed, just copy and paste to prose.io'
	// setTimeout(() => {
	// 	descEl = desc
	// }, 3000)
})
