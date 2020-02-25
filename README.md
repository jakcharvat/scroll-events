# ScrollEvents

A JavaScript class made to handle element scroll-in and scroll-out events. 



### Getting Started

Download the `scroll-events.js` file from the releases tab in the repo and include it in your project's file structure. 



### Usage

When you want to use the class, first ensure you JS file is linked as a module in your html:

```html
<script src="main.js" type="module"></script>
```

<sup><sup>Note: ES6 modules are not supported in all legacy or mobile browsers. To ensure backwards compatibility with all browsers please use an ES6 compiler like `babel` to compile to pre-ES6 syntax.</sup></sup>

Then, in your JS file, use the ES6 import syntax to obtain access to the package:

```javascript
import ScrollEvents from 'relative-path-to-file/scroll-events.js'
```

Next, you can finally create an instance of the class:

```javascript
const scrollEvents = new ScrollEvents()
```



### Adding Element Listeners

To add an element listener, first grab a reference to the element:

```javascript
const el = document.getElementById('element')
```

Then attach the listener to the `ScrollEvents` class. You can define callbacks for the element's entry onto and exit off the screen, defining the position of the trigger within the element and on the screen:

```javascript
scrollEvents.addElement(el, {
  // Element entrance callbacks
  windowBottomElementTop: () => el.classList.remove('hideBottom'),
  windowTopElementBottom: () => el.classList.remove('hideTop')
  /*
  * Options are: 
  * 		- windowBottomElementTop, 
  * 		- windowBottomElementBottom, 
  * 		- windowTopElementBottom and 
  * 		- windowTopElementTop
  */
}, {
  // Element exit callbacks
  windowBottomElementTop: () => el.classList.add('hideBottom'),
  windowTopElementBottom: () => el.classList.add('hideTop')
  // Same options as for the entrance callbacks
})
```

### Contributing

If you encounter a bug or have a suggestion, please open an issue for it on GitHub. Feel free to fork the repo and submit PRs on the original one. All suggestions and contributions are welcome.
