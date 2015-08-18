/*
 * Created by Nick on 30/7/2015.
 */


var SelectMapScreen = (function (parent) {
    var SelectMapScreen = {},
          renderE = Object.create(RenderEngine).init();
  
  SelectMapScreen.init = function () {
      parent.init.call(this);
      return this;
  };
  
 SelectMapScreen.update = function () {
 };
   SelectMapScreen.loadGraphics = function () {
  
       var stage = new Kinetic.Stage({
           container: 'screen-container',
           width: 700,
           height: 480
       });
       var layer = new Kinetic.Layer(),
           secondMapLayer = new Kinetic.Layer(),
           firstMapLayer = new Kinetic.Layer(),

           map1 = new Image();
       map2 = new Image();
       var rect = new Kinetic.Rect({
           x: 0,
           y: 400,
           width: 700,
           height: 130,
           fill: '#FF9955',
           
       });
       var rectTop = new Kinetic.Rect({
           x: 0,
           y: 0,
           width: 700,
           height: 50,
           fill: '#FF9955',
       });
       var textNinjaRun = new Kinetic.Text({
           x: 100,
           y: 105,
           text: 'Please Select a Map',
           stroke: 'white',
           strokeWidth: 1,
           fontSize: 60,
           fontFamily: 'Kristen ITC',
           fill: 'green',
           shadowColor: 'black',
           shadowBlur: 10,
           shadowOffset: { x: 10, y: 10 },
           shadowOpacity: 1,
           cornerRadius: 10,
           draggable: true
       });
       layer.add(textNinjaRun);
       layer.add(rectTop);
       layer.add(rect);
       stage.add(layer);
      
      
       map1.onload = function () {
           var yoda = new Kinetic.Image({
               x: 200,
               y: 280,
               image: map1,
               width: 150,
               height: 200,
               shadowColor: 'black',
               shadowBlur: 10,
               shadowOffset: { x: -30, y: -10 },
               shadowOpacity: 1,
               cornerRadius: 10

           });
           // add the shape to the layer
           firstMapLayer.add(yoda);
           // add the layer to the stage
           stage.add(firstMapLayer);
       };
       map1.src = 'SpriteSheets/map1.png';
       map2.onload = function () {
           var yoda = new Kinetic.Image({
               x: 400,
               y: 280,
               image: map2,
               width: 150,
               height: 200,
               shadowColor: 'black',
               shadowBlur: 10,
               shadowOffset: { x: -30, y: -10 },
               shadowOpacity: 1,
               cornerRadius: 10

           });
           // add the shape to the layer
           secondMapLayer.add(yoda);
           // add the layer to the stage
           stage.add(secondMapLayer);
       };      
       map2.src = 'SpriteSheets/map2.png';   
       firstMapLayer.on('click', function () {
           mainMenuMusic.pause();
           clicksound.playclip();
           GameConsts.chosenMap = "map1";
           backgroundMusic.playclip();
           ScreenManager.changeToScreen(GameScreen);
   
       });
       secondMapLayer.on('click', function () {
           mainMenuMusic.pause();
           clicksound.playclip();
           GameConsts.chosenMap = "map2";
           mapTwoMusic.playclip();
           ScreenManager.changeToScreen(GameScreen);
       });    
       renderE.render(this);
   };
  
     return SelectMapScreen;
})(Screen);
