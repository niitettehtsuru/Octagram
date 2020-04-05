'use strict';
/*
 * Animates    8 pointed star animation with a smooth canvas background color transition. 
 * @author:    Caleb Nii Tetteh Tsuru Addy(Virus) 
 * @date:      4th April, 2020 
 * @email:     100percentvirusdownloading@gmail.com 
 * @twitter:   @niitettehtsuru
 * @github :   https://github.com/niitettehtsuru/Octagram
 * @codepen:   https://codepen.io/niitettehtsuru/pen/XWbLaOw
 * @license:   GNU General Public License v3.0
 */ 
class Circle
{ 
    constructor(screenWidth,screenHeight,xCoordinateOfCircleCenter,yCoordinateOfCircleCenter,radius,listOfColors)
    {     
        this.screenWidth    = screenWidth; 
        this.screenHeight   = screenHeight;
        this.maxRadius      = 7;
        this.radius         = radius;    
        this.listOfColors   = listOfColors;  
        this.xCoordinateOfCircleCenter  = xCoordinateOfCircleCenter; 
        this.yCoordinateOfCircleCenter  = yCoordinateOfCircleCenter;  
        this.numOfCirclesToDraw         = 3;//the circle will contain 2 sub circles, all sharing the same center
        this.colors         = this.getRandomColors(this.numOfCirclesToDraw);//select colors for the circle and its subcircles
    }
    getRandomColors(numOfColorsToSelectAtRandom)
    {  
        var selectedColors = [];
        for( var i = 0; i < numOfColorsToSelectAtRandom; i++)
        {   //select a color randomly from the list of colors
            selectedColors.push(this.listOfColors[parseInt(this.getRandomNumber(0, this.listOfColors.length))]); 
        }
        return selectedColors;  
    } 
    getColors() 
    {  
        return this.colors; 
    }  
    /**
    * Let node correspond to window resizing.
    * @param  {number} screenHeight The height of the screen. 
    * @param  {number} screenWidth  The width of the screen.  
    * @param  {number} dy           The percentage change in browser window height 
    * @param  {number} dx           The percentage change in browser window width  .  
    */
    refreshScreenSize(screenHeight,screenWidth,dx,dy)
    {   
        this.screenHeight       = screenHeight;  
        this.screenWidth        = screenWidth; 
        this.xCoordinateOfCircleCenter     *= dx; 
        this.yCoordinateOfCircleCenter     *= dy;  
        this.radius             *= dx; 
        this.radius             *= dy; 
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
    draw(ctx)//draw the circle and its subcircles
    {    
        var colors = this.getColors(); 
        var coordinate = {x: this.xCoordinateOfCircleCenter,y:this.yCoordinateOfCircleCenter}; 
        for(var i = 0; i < this.numOfCirclesToDraw; i++)
        {
            var radius = this.radius * (i+1);/*draw in order of increasing radius,doubling the radius*/  
            this.draw8PointedStar(coordinate,radius,ctx,colors[i]); 
        } 
    }    
    draw8PointedStar(coordinate,radius,ctx,color)
    {
        var upperLeftPoint = {x: coordinate.x - radius, y: coordinate.y - radius}; 
        //draw a regular square about the coordinate
        ctx.beginPath();
        ctx.rect(upperLeftPoint.x,upperLeftPoint.y,2*radius,2*radius);
        ctx.stroke();
        //draw a 45 degree tilted square about the coordinate 
        var dx = upperLeftPoint.x - coordinate.x; 
        var dy = upperLeftPoint.y - coordinate.y; 
        var distanceFromCenterToUpperLeftPoint = Math.sqrt(dx*dx + dy*dy); 
        var p1 = {x: coordinate.x, y: coordinate.y - distanceFromCenterToUpperLeftPoint};
        var p2 = {x: coordinate.x + distanceFromCenterToUpperLeftPoint, y: coordinate.y};
        var p3 = {x: coordinate.x, y: coordinate.y + distanceFromCenterToUpperLeftPoint};
        var p4 = {x: coordinate.x - distanceFromCenterToUpperLeftPoint, y: coordinate.y};
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.lineTo(p3.x,p3.y);
        ctx.lineTo(p4.x,p4.y);
        ctx.lineTo(p1.x,p1.y);
        ctx.strokeStyle = color;
        ctx.stroke(); 
    } 
    update(deltaTime)
    {      
        this.colors = this.getRandomColors(this.numOfCirclesToDraw);//select colors for the circle and its subcircles
        this.radius += 0.1;//increase the size of the circle with each stroke 
        if(this.radius > this.maxRadius)//if the radius is big enough
            this.radius = 4;//shrink the circle to nought so it starts increasing in size again 
        
    }      
}