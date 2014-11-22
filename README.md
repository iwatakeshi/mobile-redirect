mobile-redirect
===============

A simple Express middleware to redirect the mobile user.

mobile-redirect will detect if the request is a mobile device. If so, it will redirect the user to your desired path.

##Install

```bash
npm install --save mobile-redirect
```

##Usage

```js
var mdirect = require('mobile-redirect');

app.use(mdirect());
```

###API

`mdirect(opt)`

* *Returns the middleware function that redirects the user to a path.*
* *Accepts an option object to change the default path.*

###Options

```js
//default
{
    redirectPath: '/mobile'
}
```

###Test

```bash
npm test
```

*Note: Most tests are covered by [is-mobile](https://github.com/juliangruber/is-mobile). Also, mobile-redirect will cover most mobile devices where is-mobile fails.*