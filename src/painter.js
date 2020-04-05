'use strict';
/* Animates    8 pointed stars with a smooth canvas background color transition. 
 * @author:    Caleb Nii Tetteh Tsuru Addy(Virus) 
 * @date:      4th April, 2020 
 * @email:     100percentvirusdownloading@gmail.com 
 * @twitter:   @niitettehtsuru
 * @github :   https://github.com/niitettehtsuru/Octagram
 * @codepen:   https://codepen.io/niitettehtsuru/pen/XWbLaOw
 * @license:   GNU General Public License v3.0
 */
class Painter
{
    constructor(screenWidth,screenHeight)
    {      
        this.screenWidth   = screenWidth;
        this.screenHeight  = screenHeight; 
        this.listOfColors  = //html color names
        [   "red","darkred","bisque","navajowhite","green","darkgreen","lemonchiffon","lightgoldenrodyellow","aquamarine","mediumturquoise","pink",
            "mediumvioletred","gold","khaki","violet","darkviolet","darkolivegreen","olivedrab","cornsilk","blanchedalmond","wheat","lightgray","silver",
            "seashell","beige","coral", "orange","darkblue","midnightblue","saddlebrown","fuchsia","blueviolet","oldlace","floralwhite","darkgray","dimgray",
            "lightsalmon","darksalmon","orchid","mediumpurple","burlywood","tan","yellow","darkseagreen","teal","darkkhaki","whitesmoke","mintcream","lime",
            "forestgreen","lightskyblue","lightsteelblue","slategray","darkslategray","peru","chocolate","plum","darkorchid","darkmagenta","purple",
            "darkorange","tomato","ivory","antiquewhite","maroon","sienna","lightpink","hotpink","palegreen","seagreen","lgihtcyan","cyan","darkturquoise",
            "lightseagreen","cadetblue","darkcyan","lightgreen","olive","green","lavender","thistle","aliceblue","ghostwhite","gray","gainsboro","rosybrown",
            "mediumseagreen","limegreen","sandybrown","peachpuff","palegoldenrod","indigo","mediumslateblue","aqua","cornflowerblue","mediumblue","slateblue",
            "orangered","lavenderblush","mistyrose","springgreen","mediumspringgreen","goldenrod","brown","papayawhip","honeydew","azure","navy",
            "lightseablue","greenyellow","yellowgreen","magenta","mediumorchid","lightcoral","indianred","lightslategray","black","steelblue","royalblue",
            "lightyellow","moccasin","firebrick","deeppink","palevioletred","skyblue","deepskyblue","white","snow","linen","lawngreen","chartreuse",
            "mediumaquamarine","paleturquoise","powderblue","lightblue","crimson","salmon","blue","dodgerblue"
        ]; 
        this.circles      = this.getCircles();
    } 
    getCircles() 
    {
        var circles = []; 
        var intervalBetweenOppositePointsOnGrid = 30;
        var listOfPoints= [], 
            px          = 0,//radius, 
            py          = 0;//radius; 
        for( ;py < this.screenHeight; )//get all points in the grid(each point will be the center of a circle), starting from the top to the bottom
        {   
            for( ;px<this.screenWidth; )//all the while, getting all the horizontal points at each level 
            {
                circles.push(new Circle(this.screenWidth,this.screenHeight,px,py,12,this.listOfColors));
                px += 2 * intervalBetweenOppositePointsOnGrid; 
                //listOfPoints.push({x:px,y:py}); 
            } 
            py+=    2 * intervalBetweenOppositePointsOnGrid;  
            px =    0;//radius; 
        }
        return circles;  
    }   
    /**
    * Let canvas respond to window resizing.
    * @param  {number} screenHeight The height of the screen. 
    * @param  {number} screenWidth  The width of the screen.  
    */
    refreshScreenSize(screenHeight,screenWidth)
    { 
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        { 
            var dy              = screenHeight/this.screenHeight;//percentage change in browser window height 
            var dx              = screenWidth/this.screenWidth;  //percentage change in browser window width  
            this.screenHeight   = screenHeight;  
            this.screenWidth    = screenWidth;   
            this.circles.forEach(function(circle)
            { 
                circle.refreshScreenSize(screenHeight,screenWidth,dx,dy);//adjust the screen size of each node  
            });
        } 
    } 
    /**
    * Returns a random number between min (inclusive) and max (exclusive)
    * @param  {number} min The lesser of the two numbers. 
    * @param  {number} max The greater of the two numbers.  
    * @return {number} A random number between min (inclusive) and max (exclusive)
    */
    getRandomNumber(min, max) 
    {
        return Math.random() * (max - min) + min;
    } 
    update(deltaTime)
    {       
        this.circles.forEach(function (circle) 
        {          
            circle.update(deltaTime); 
        });     
    }  
    draw(ctx)
    {     
        this.circles.forEach(function(circle)
        { 
            
            circle.draw(ctx); 
        });  
    }   
}
