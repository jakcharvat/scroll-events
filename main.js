import ScrollEvents from './scroll-events.js'


const scrollEvents = new ScrollEvents()

Array.from(document.getElementsByClassName('scroll-element')).forEach(el => {
    scrollEvents.addElement(el, {
        windowBottomElementTop: () => el.classList.remove('hidden')
    }, {
        windowBottomElementTop: () => el.classList.add('hidden')
    })
})