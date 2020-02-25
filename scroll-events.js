/**
 * A class made for handling element scroll-in and scroll-out events in JavaScript. Import the ES6 module, instantiate a global instance of the class for the whole page, then add individual elements and their associated callbacks to the class using the `ScrollEvents.addElement(el, entranceCallbacks?, exitCallbacks?)` method.
 * 
 * @example
 * // Import the module
 * import ScrollEvents from './scroll-events.js'
 * 
 * // Instantiate an instance of the class
 * const scrollEvents = new ScrollEvents()
 *
 * const el = document.getElementById('element')
 * 
 * // Add an element and its callbacks
 * scrollEvents.addElement(el, {
 *     windowBottomElementTop: () => el.classList.remove('hideBottom'),
 *     windowTopElementBottom: () => el.classList.remove('hideTop')
 *     // Options are windowBottomElementTop, 
 *          // windowBottomElementBottom, 
 *          // windowTopElementBottom and 
 *          // windowTopElementTop
 * }, {
 *     windowBottomElementTop: () => el.classList.add('hideBottom'),
 *     windowTopElementBottom: () => el.classList.add('hideTop')
 * })
*/
class ScrollEvents {
    constructor() {
        this._listeners = []
        
        this._setupListeners()
        this._callback()
    }

    /**
     * Add an element and all its associated callbacks to the listener set up by the class.
     * 
     * @param {HTMLElement | string} el The element to attach the listeners to. Can either already be an `HTMLElement` or a `string` to work with the `document.querySelector()` function. 
     * @param {Object<string, Function>} entranceCallbacks The callbacks to fire when the element enters the screen. Defined as an object where the key defines the position of the window and element when the callback (provided as the value of the key-value pair) is fired. The options are `windowBottomElementBottom`, `windowBottomElementTop`, `windowTopElementBottom`, `windowTopElementTop`.
     * @param {Object<string, Function>} exitCallbacks The callbacks to fire when the element exits the screen. Defined as an object where the key defines the position of the window and element when the callback (provided as the value of the key-value pair) is fired. The options are `windowBottomElementBottom`, `windowBottomElementTop`, `windowTopElementBottom`, `windowTopElementTop`.
     * 
     * @example
     * // Import the module
     * import ScrollEvents from './scroll-events.js'
     * 
     * // Instantiate an instance of the class
     * const scrollEvents = new ScrollEvents()
     *
     * const el = document.getElementById('element')
     * 
     * // Add an element and its callbacks
     * scrollEvents.addElement(el, {
     *     windowBottomElementTop: () => el.classList.remove('hideBottom'),
     *     windowTopElementBottom: () => el.classList.remove('hideTop')
     *     // Options are windowBottomElementTop, 
     *          // windowBottomElementBottom, 
     *          // windowTopElementBottom and 
     *          // windowTopElementTop
     * }, {
     *     windowBottomElementTop: () => el.classList.add('hideBottom'),
     *     windowTopElementBottom: () => el.classList.add('hideTop')
     * })
     */
    addElement(el, entranceCallbacks = {}, exitCallbacks = {}) {
        const listener = {}

        if (typeof el === 'string') el = document.querySelector(el)
        listener.el = el

        listener.bottomBottomEntranceCallback = entranceCallbacks.windowBottomElementBottom
        listener.bottomTopEntranceCallback = entranceCallbacks.windowBottomElementTop
        listener.topBottomEntranceCallback = entranceCallbacks.windowTopElementBottom
        listener.topTopEntranceCallback = entranceCallbacks.windowTopElementTop

        listener.bottomBottomExitCallback = exitCallbacks.windowBottomElementBottom
        listener.bottomTopExitCallback = exitCallbacks.windowBottomElementTop
        listener.topBottomExitCallback = exitCallbacks.windowTopElementBottom
        listener.topTopExitCallback = exitCallbacks.windowTopElementTop

        listener.bottomBottom = false
        listener.bottomTop = false
        listener.topBottom = false
        listener.topTop = false

        this._listenerCallback(listener)

        this._listeners.push(listener)
    }

    _setupListeners() {
        document.addEventListener('scroll', () => {
            this._callback()
        })
    }

    _callback() {
        this._listeners.forEach(listener => this._listenerCallback(listener))
    }

    _listenerCallback(listener) {
        const rect = listener.el.getBoundingClientRect()
        const top = rect.top
        const bottom = rect.bottom

/* ------------------------------------------------ topTop ------------------------------------------------ */
        if (top >= 0) {
            if (listener.topTopEntranceCallback && !listener.topTop) listener.topTopEntranceCallback()

            listener.topTop = true
        } else {
            if (listener.topTopExitCallback && listener.topTop) listener.topTopExitCallback()

            listener.topTop = false
        }

/* ----------------------------------------------- topBottom ---------------------------------------------- */
        if (bottom >= 0) {
            if (listener.topBottomEntranceCallback && !listener.topBottom) listener.topBottomEntranceCallback()

            listener.topBottom = true
        } else {
            if (listener.topBottomExitCallback && listener.topBottom) listener.topBottomExitCallback()

            listener.topBottom = false
        }

/* ----------------------------------------------- bottomTop ---------------------------------------------- */
        if (top <= window.innerHeight) {
            if (listener.bottomTopEntranceCallback && !listener.bottomTop) listener.bottomTopEntranceCallback()
            
            listener.bottomTop = true
        } else {
            if (listener.bottomTopExitCallback && listener.bottomTop) listener.bottomTopExitCallback()

            listener.bottomTop = false
        }

/* --------------------------------------------- bottomBottom --------------------------------------------- */
        if (bottom <= window.innerHeight) {
            if (listener.bottomBottomEntranceCallback && !listener.bottomBottom) listener.bottomBottomEntranceCallback()
            
            listener.bottomBottom = true
        } else {
            if (listener.bottomBottomExitCallback && listener.bottomBottom) listener.bottomBottomExitCallback()

            listener.bottomBottom = false
        }
    }
}

export default ScrollEvents