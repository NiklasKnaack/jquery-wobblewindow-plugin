# Wobble window jQuery plugin
(jquery-wobblewindow-plugin)

## Description

Wobble Window is a fancy jQuery plugin that helps you create a cool, interactive, configurable, HTML5 canvas based gooey effect when the mouse moves in/out a specified element.

## Demo & Examples

<http://blog.niklasknaack.de/2017/04/wobble-window-jquery-plugin.html>

### More Examples

* <http://nkunited.de/jquery/plugins/wobblewindow/example1.html>
* <http://nkunited.de/jquery/plugins/wobblewindow/example2.html>
* <http://nkunited.de/jquery/plugins/wobblewindow/example3.html>
* <http://nkunited.de/jquery/plugins/wobblewindow/example4.html>
* <http://nkunited.de/jquery/plugins/wobblewindow/example5.html>
* <http://nkunited.de/jquery/plugins/wobblewindow/example6.html>

## Installation

install it through [npm](https://www.npmjs.com/):

```
npm i jquery-wobblewindow-plugin
```

## Example Usage

### HTML

```html
<div id='holder' style='width:480px; height:480px; position:absolute; background-color: #562A72'>

    <div id='window'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac elementum tortor, eget efficitur quam. Quisque eu erat dui. Etiam ut mauris at dui feugiat eleifend id vel arcu. Praesent commodo orci quis scelerisque congue. Cras ac mauris quam. Nunc ipsum tortor, lobortis et arcu et, imperdiet maximus massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut aliquam pretium augue.
    </div>

</div>
```
### CSS

```css
#window {
    width:350px; 
    height:350px; 
    left:65px; 
    top:65px; 
    position:absolute;
    padding: 50px 50px 50px 50px;
    pointer-events: none;
}
```

### jQuery

```js
$( '#window' ).wobbleWindow();
```

With parameters:

```js
var settings = {

    name: 'window_1',//name
    depth: 1,//depth for zIndex
    offsetX: 0,//+ or - value the size of the div
    offsetY: 0,//+ or - value the size of the div
    moveTypeIn: 'move',//method points follow the mouse
    moveTypeOut: 'wobble',//method points go back to init position
    wobbleFactor: 0.9,//control the wobble effect
    wobbleSpeed: 0.1,//control the wobble speed
    moveSpeed: 3,//control the move speed
    lineWidth: 1,//lineWidth
    lineColor: '',//no value = no line or hex values
    bodyColor: '#FFF',//no value = no body color or hex values
    numberOfXPoints: 7,//quantity of points horizontal. must be an odd int
    numberOfYPoints: 5,//quantity of points vertical. must be an odd int
    movementLeft: true,//if true the points at the left can be moved
    movementRight: true,//if true the points at the right can be moved
    movementTop: true,//if true the points at the top can be moved
    movementBottom: true,//if true the points at the bottom can be moved
    debug: false//if true debug mode is on

};
```

```js
$( '#window' ).wobbleWindow( settings );
```

### JS

```js
var wobbleWindow = new WobbleWindow( document.getElementById( 'window' ) );
```

With parameters:

```js
var wobbleWindow = new WobbleWindow( document.getElementById( 'window' ), settings );
```

## Notes

* Make sure you never use duplicated IDs in your DOM

## License

This plugin is available under [the MIT license](http://mths.be/mit).

## Author

_– [Niklas](http://niklasknaack.de/)_