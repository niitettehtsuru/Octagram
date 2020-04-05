'use strict'; 
/*
 * Animates    8 pointed stars with a smooth canvas background color transition. 
 * @author:    Caleb Nii Tetteh Tsuru Addy(Virus) 
 * @date:      4th April, 2020 
 * @email:     100percentvirusdownloading@gmail.com 
 * @twitter:   @niitettehtsuru
 * @github :   https://github.com/niitettehtsuru/Octagram
 * @codepen:   https://codepen.io/niitettehtsuru/pen/XWbLaOw
 * @license:   GNU General Public License v3.0
 */  
/**
 * Gets the size of the browser window. 
 * @return {object} The length and breadth of the browser window.
 */
function getBrowserWindowSize() 
{
    var win = window,
    doc     = document,
    docElem = doc.documentElement,
    body    = doc.getElementsByTagName('body')[0],
    browserWindowWidth  = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight; 
    return {x:browserWindowWidth-20,y:browserWindowHeight-20}; 
}
/*
var listOfColors  = //html color names
[   
    "green", "black", "khaki","brown","darkgreen","bisque","darkred","whitesmoke","lightgoldenrodyellow","navajowhite",'lemonchiffon',
    'mediumvioletred',"lightslategray","lightgray","wheat","cornsilk","darkolivegreen","blanchedalmond","beige","mintcream","floralwhite",
    "dimgray","darkkhaki","oldlace","midnightblue","teal","darkblue","seashell","maroon","antiquewhite","darkslategray","darkmagenta",
    'lavenderblush','papayawhip',"ghostwhite", "lightseagreen","mistyrose","sienna","seagreen","rosybrown","lightgreen","indigo",
    "palegoldenrod","ivory","darkcyan","peachpuff","honeydew","goldenrod","azure","navy","indianred","linen", "firebrick","crimson","snow","lightyellow"
];
*/
var browserWindowSize   = getBrowserWindowSize();
var c                   = document.getElementById("octagramCanvas");
var ctx                 = c.getContext("2d"); 
//set size of canvas
c.width                 = browserWindowSize.x; 
c.height                = browserWindowSize.y; 
var SCREEN_WIDTH        = browserWindowSize.x;
var SCREEN_HEIGHT       = browserWindowSize.y;   
var painter             = new Painter(SCREEN_WIDTH,SCREEN_HEIGHT),  
    lastTime            = 100, 
    numOfLoops          = 0,
    windowSize;   
function updateWindowSize() 
{
    windowSize     = getBrowserWindowSize();
    c.width        = windowSize.x; 
    c.height       = windowSize.y; 
    SCREEN_WIDTH   = windowSize.x;
    SCREEN_HEIGHT  = windowSize.y;  
} 
function getColor(numOfLoops) 
{
    var hue = numOfLoops,/*a hue from 0 to 360 gives a smooth color transition*/
        saturation = 80,
        lightness  = 50;  
    if(hue > 360)
    {
        hue = 360; 
    } 
    else if( hue <= 0 ) 
    {
        hue = 0; 
    }  
    var hsvText = "hsl("+hue+","+saturation+"%,"+lightness+"%)";  
    return hsvText; 
}
var selectedColor = getColor(numOfLoops);
function nodeLoop(timestamp)
{       
    numOfLoops+=5; 
    updateWindowSize(); //make canvas responsive to window resizing 
    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);  
    if(numOfLoops > 360)//maximum hue is 360, and numOfLoops is used to set the hue
    {  
        numOfLoops  = 0;//hence, reset. 
    } 
    //change the background color of the canvas 
    selectedColor   = getColor(numOfLoops) ;
    ctx.fillStyle   = selectedColor;
    ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
    painter.refreshScreenSize(SCREEN_HEIGHT,SCREEN_WIDTH);//let canvas respond to window resizing  
    let deltaTime  = timestamp - lastTime; 
        lastTime   = timestamp;
    painter.update(deltaTime);   
    painter.draw(ctx);  
    requestAnimationFrame(nodeLoop); 
} 
requestAnimationFrame(nodeLoop); 

 
 