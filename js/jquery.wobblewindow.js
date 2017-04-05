/*
Wobble Window

Written by Niklas Knaack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

( function() {

    function WobbleWindow( element, params ) {

        var canvas, ctx;
        var mousePos = { x: 0, y: 0 };

        //---

        var windowObject = {};
            windowObject.name = 'window';
            windowObject.depth = 1;
            windowObject.offsetX = 0;
            windowObject.offsetY = 0;
            windowObject.moveTypeIn = 'move';
            windowObject.moveTypeOut = 'wobble';
            windowObject.wobbleFactor = 0.9;
            windowObject.wobbleSpeed = 0.1;
            windowObject.moveSpeed = 6;
            windowObject.lineWidth = 1;
            windowObject.lineColor = '';
            windowObject.bodyColor = '#FFF';
            windowObject.numberOfXPoints = 7;
            windowObject.numberOfYPoints = 5;
            windowObject.movementLeft = true;
            windowObject.movementRight = true;
            windowObject.movementTop = true;
            windowObject.movementBottom = true;
            windowObject.debug = false;
            windowObject.pointHolder = [];

        //---

        if ( params !== undefined ) {

            for ( var prop in params ) {

                if ( params.hasOwnProperty( prop ) && windowObject.hasOwnProperty( prop ) ) {

                    windowObject[ prop ] = params[ prop ];

                }

            }

        }

        //---

        if ( !element ) {

            throw Error( '\n' + 'No div element found' );

        }

        if ( ( windowObject.numberOfXPoints % 2 ) === 0 ) {

            throw Error( '\n' + 'Param numberOfXPoints must be an odd integer' );

        }

        if ( ( windowObject.numberOfYPoints % 2 ) === 0 ) {

            throw Error( '\n' + 'Param numberOfXPoints must be an odd integer' );

        }

        //---

        function addWindow() {

            var elementWidth = element.offsetWidth;
            var elementHeight = element.offsetHeight;
            var elementRect = element.getBoundingClientRect();
            var elementParentRect = element.parentElement.getBoundingClientRect();

            var width = elementWidth + windowObject.offsetX * 2;
            var height = elementHeight + windowObject.offsetY * 2;

            var pointDistanceX = width / ( windowObject.numberOfXPoints - 1 );
            var pointDistanceY = height / ( windowObject.numberOfYPoints + 1 );
            var radiusMax = Math.ceil( Math.max( pointDistanceX, pointDistanceY ) );
            //var radiusMax = Math.ceil( Math.max( pointDistanceX, pointDistanceY ) ) * 2;
            //var radiusMin = Math.floor( Math.min( pointDistanceX, pointDistanceY ) );

            canvas = document.createElement( 'canvas' );
            canvas.width = elementWidth + radiusMax * 2;
            canvas.height = elementHeight + radiusMax * 2;
            canvas.addEventListener( 'mousemove', mouseMoveHandler );
            canvas.addEventListener( 'mouseleave', mouseLeaveHandler ); 
            canvas.style.position = 'absolute';
            canvas.style.left = ( ( elementRect.left - elementParentRect.left ) - radiusMax ) + 'px';
            canvas.style.top = ( ( elementRect.top - elementParentRect.top ) - radiusMax ) + 'px';
            canvas.style.zIndex = windowObject.depth.toString();

            element.parentElement.appendChild( canvas );
            element.style.zIndex = ( windowObject.depth + 1 ).toString();

            ctx = canvas.getContext( '2d' );

            windowObject.canvasWidth = canvas.width;
            windowObject.canvasHeight = canvas.height;

            var x = ( windowObject.canvasWidth - width ) / 2;
            var y = ( windowObject.canvasHeight - height ) / 2;

            //---

            var point;
            var flag;
            var i, l;

            //---
            //top

            flag = true;

            for ( i = 0, l = windowObject.numberOfXPoints; i < l; i++ ) {

                if ( windowObject.movementTop ) {

                    if ( flag ) {

                        point = addPoint( x + i * pointDistanceX, y, 0, 0, 0, true, pointDistanceX, 'P', windowObject.debug );

                        flag = false;

                    } else {

                        point = addPoint( x + i * pointDistanceX, y, 0, 0, 0, true, pointDistanceX, 'C', windowObject.debug );

                        flag = true;

                    }

                    if ( i === 0 || i === l - 1 ) {

                        point.color = '#00FF00';
                        point.movement = false;

                    }

                    windowObject.pointHolder.push( point );

                } else {

                    if ( i === 0 || i === l - 1 ) {

                        point = addPoint( x + i * pointDistanceX, y, 0, 0, 0, false, 0, 'P', windowObject.debug );

                    }

                    windowObject.pointHolder.push( point );

                }

            }
            
            //---
            //right

            flag = false;

            for ( i = 1, l = windowObject.numberOfYPoints + 1; i < l; i++ ) {

                if ( windowObject.movementRight ) {

                    if ( flag ) {

                        point = addPoint( x + width, y + i * pointDistanceY, 0, 0, 0, true, pointDistanceY, 'P', windowObject.debug );

                        flag = false;

                    } else {

                        point = addPoint( x + width, y + i * pointDistanceY, 0, 0, 0, true, pointDistanceY, 'C', windowObject.debug );

                        flag = true;

                    }

                    windowObject.pointHolder.push( point );

                } else {

                    if ( i === 1 ) {

                        point = addPoint( x + width, y + ( i - 1 ) * pointDistanceY, 0, 0, 0, false, 0, 'P', windowObject.debug );

                    } else if ( i === windowObject.numberOfYPoints ) {

                        point = addPoint( x + width, y + ( i + 1 ) * pointDistanceY, 0, 0, 0, false, 0, 'P', windowObject.debug );

                    }

                    windowObject.pointHolder.push( point );

                }

            }
            
            //---
            //bottom

            flag = true;

            for ( i = windowObject.numberOfXPoints - 1, l = -1; i > l; i-- ) {

                if ( windowObject.movementBottom ) {

                    if ( flag ) {

                        point = addPoint( x + i * pointDistanceX, y + height, 0, 0, 0, true, pointDistanceX, 'P', windowObject.debug );

                        flag = false;

                    } else {

                        point = addPoint( x + i * pointDistanceX, y + height, 0, 0, 0, true, pointDistanceX, 'C', windowObject.debug );

                        flag = true;

                    }

                    if ( i === 0 || i === windowObject.numberOfXPoints - 1 ) {

                        point.color = '#00FF00';
                        point.movement = false;

                    }

                    windowObject.pointHolder.push( point );

                } else {

                    console.log( i, l, windowObject.numberOfXPoints );

                    if ( i === 0 || i === windowObject.numberOfXPoints - 1 ) {

                        point = addPoint( x + i * pointDistanceX, y + height, 0, 0, 0, false, 0, 'P', windowObject.debug );

                    }

                    windowObject.pointHolder.push( point );

                }

            }
            
            //---
            //left

            flag = false;

            for ( i = windowObject.numberOfYPoints, l = -1; i > l; i-- ) {

                if ( windowObject.movementLeft ) {

                    if ( flag ) {

                        point = addPoint( x, y + i * pointDistanceY, 0, 0, 0, true, pointDistanceY, 'P', windowObject.debug );

                        flag = false;

                    } else {

                        point = addPoint( x, y + i * pointDistanceY, 0, 0, 0, true, pointDistanceY, 'C', windowObject.debug );

                        flag = true;

                    }

                    windowObject.pointHolder.push( point );

                } else {

                    if ( i === 0 ) {

                        point = addPoint( x, y + i * pointDistanceY, 0, 0, 0, false, 0, 'P', windowObject.debug );

                    } else if ( i === windowObject.numberOfYPoints ) {

                        point = addPoint( x, y + ( i + 1 ) * pointDistanceY, 0, 0, 0, false, 0, 'P', windowObject.debug );

                    }

                    windowObject.pointHolder.push( point );

                }

            }

        }

        //---

        function addPoint( x, y, xp, yp, distance, movement, radius, type, visible ) {

            var point = {};
                point.x = x;
                point.y = y;
                point.xp = x;
                point.yp = y;
                point.sx = 0;
                point.sy = 0;
                point.distance = distance;
                point.movement = movement;
                point.radius = radius;
                point.type = type;
                point.visible = visible;

            return point;

        };

        //---

        window.requestAnimFrame = ( function() {

            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function( callback ) {
                        window.setTimeout( callback, 1000 / 60 );
                    };

        } )();

        function animloop() {

            requestAnimFrame( animloop );

            render();

        };

        //---

        function render() {

            ctx.clearRect( 0, 0, windowObject.canvasWidth, windowObject.canvasHeight );

            //---

            var windowPoints = windowObject.pointHolder;
            var i, l;

            //---

            ctx.beginPath();
            ctx.moveTo( windowPoints[ 0 ].x, windowPoints[ 0 ].y );

            for ( i = 1, l = windowPoints.length; i < l; i += 2 ) {

                var point = windowPoints[ i ];

                //---

                var dx = mousePos.x - point.xp;
                var dy = mousePos.y - point.yp;

                point.distance = Math.sqrt( dx * dx + dy * dy );

                if ( point.distance < point.radius ) {

                    if ( windowObject.moveTypeIn === 'wobble' ) {

                        point.sx = point.sx * windowObject.wobbleFactor + ( mousePos.x - point.x ) * windowObject.wobbleSpeed;
                        point.sy = point.sy * windowObject.wobbleFactor + ( mousePos.y - point.y ) * windowObject.wobbleSpeed;
                        point.x = point.x + point.sx;
                        point.y = point.y + point.sy;

                    } else if ( windowObject.moveTypeIn === 'move' ) {

                        point.x -= ( point.x - mousePos.x ) / windowObject.moveSpeed;
                        point.y -= ( point.y - mousePos.y ) / windowObject.moveSpeed;

                    }

                } else {

                    if ( windowObject.moveTypeOut === 'wobble' ) {

                        point.sx = point.sx * windowObject.wobbleFactor + ( point.xp - point.x ) * windowObject.wobbleSpeed;
                        point.sy = point.sy * windowObject.wobbleFactor + ( point.yp - point.y ) * windowObject.wobbleSpeed;
                        point.x = point.x + point.sx;
                        point.y = point.y + point.sy;

                    } else if ( windowObject.moveTypeOut === 'move' ) {

                        point.x -= ( point.x - point.xp ) / windowObject.moveSpeed;
                        point.y -= ( point.y - point.yp ) / windowObject.moveSpeed;

                    }

                }

                //---

                var pointBefor = windowPoints[ i - 1 ];
                var pointAfter = windowPoints[ i + 1 ];

                if ( i > 2 && i < windowPoints.length - 2 ) {

                    if ( pointBefor.movement ) {

                        pointBefor.x = ( windowPoints[ i - 2 ].x + point.x ) / 2;
                        pointBefor.y = ( windowPoints[ i - 2 ].y + point.y ) / 2;

                    }

                    if ( pointAfter.movement ) {

                        pointAfter.x = ( windowPoints[ i + 2 ].x + point.x ) / 2;
                        pointAfter.y = ( windowPoints[ i + 2 ].y + point.y ) / 2;

                    }

                }

                ctx.quadraticCurveTo( point.x, point.y, pointAfter.x, pointAfter.y );

            }

            //---

            if ( windowObject.lineColor.length > 0 ) {

                ctx.lineWidth = windowObject.lineWidth;
                ctx.strokeStyle = windowObject.lineColor;
                ctx.stroke();

            }

            if ( windowObject.bodyColor.length > 0 ) {

                ctx.fillStyle = windowObject.bodyColor;
                ctx.fill();

            }
            
            //---
            
            if ( windowObject.debug ) {

                for ( i = 0, l = windowPoints.length; i < l; i++ ) {

                    var point = windowPoints[ i ];

                    if ( point.visible ) {

                        if ( point.type === 'P' ) {

                            drawCircle( point.x, point.y, 3, '#FF0000' );

                        } else {

                            drawCircle( point.x, point.y, 6, '#FF00FF' );

                        }

                        if ( point.color ) {

                            drawCircle( point.x, point.y, 12, point.color );

                        }

                    }

                }

                ctx.strokeStyle = '#000000';
                ctx.strokeRect( 0, 0, windowObject.canvasWidth, windowObject.canvasHeight ); 
                
            }

        };

        //---

        function drawCircle( x, y, radius, color ) {

            ctx.beginPath();
            ctx.arc( x, y, radius, 0, 2 * Math.PI );
            ctx.strokeStyle = color;
            ctx.stroke();

        };

        //---

        function mouseMoveHandler( event ) {

            mousePos = getMousePos( canvas, event );

        };

        function mouseLeaveHandler( event ) {

            mousePos.x = 10000;//canvas.width / 2;
            mousePos.y = 10000;//canvas.height / 2;

        };

        //---

        function getMousePos( canvas, event ) {

            var rect = canvas.getBoundingClientRect();
            
            return { x: event.clientX - rect.left, y: event.clientY - rect.top };

        };

        //---

        addWindow();
        animloop();

    };

    window.WobbleWindow = WobbleWindow;

} () );

if ( typeof jQuery !== 'undefined' ) {

    ( function( $ ) {

        $.fn.wobbleWindow = function( params ) {

            var args = arguments;

            return this.each( function() {

                if ( !$.data( this, 'plugin_WobbleWindow' ) ) {

                    $.data( this, 'plugin_WobbleWindow', new WobbleWindow( this, params ) );

                } else {

                    var plugin = $.data( this, 'plugin_WobbleWindow' );

                    if ( plugin[ params ] ) {

                        plugin[ params ].apply( this, Array.prototype.slice.call( args, 1 ) );

                    } else {

                        $.error( 'Method ' +  params + ' does not exist on jQuery.wobbleWindow' );

                    }

                }

            } );

        };
        
    } ( jQuery ) );

}