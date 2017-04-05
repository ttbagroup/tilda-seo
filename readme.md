# tilda-seo

Formats tilda output so to make title tags semantic.

```js
let seoify = require('tilda-seo')({
	//parent holders which will be transformed into h1...h6
	holder: '.t-title, .t-desc, .t-name',

	//inline holders to be transformed into h1..h6 with style="display: inline" attr
	inlineHolder: 'strong, em'
})

tildaSrc = seoify(tildaSrc)
```
