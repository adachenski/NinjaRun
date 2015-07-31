var MainMenuScreen = (function (parent) {
    var MainMenuScreen = {},
        renderE = Object.create(RenderEngine).init(),
        clickCounter = 0;


    MainMenuScreen.init = function () {
        parent.init.call(this);

        return this;
    };

    MainMenuScreen.update = function () {
        // var startBut = this.layers["startButtonLayer"].find('Image')[0];
        // startBut.on('mouseup', function() {
        //     if(clickCounter++ == 1) ScreenManager.changeToScreen(GameScreen);
        // });
        // renderE.render(this);
    };

    MainMenuScreen.loadGraphics = function () {

        var stage = new Kinetic.Stage({
            container: 'screen-container',
            width: 680,
            height: 490
        });
        var layer = new Kinetic.Layer(),
            addOptionLear = new Kinetic.Layer(),
            addPlayLear = new Kinetic.Layer(),

            imageObj = new Image(),
            textPlay = new Kinetic.Text({
                x: 50,
                y: 230,
                text: 'Play Game',
                stroke: 'green',
                strokeWidth: 1.3,
                fontSize: 30,
                fontFamily: 'Kristen ITC',
                fill: 'White',
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffset: {x: -30, y: -10},
                shadowOpacity: 1,
                cornerRadius: 10
            }),
            textOptions = new Kinetic.Text({
                x: 50,
                y: 280,
                text: 'Options',
                fontSize: 30,
                stroke: 'green',
                strokeWidth: 1.3,
                fontStyle: "100",
                fontFamily: 'Kristen ITC',
                fill: 'White',
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffset: {x: -30, y: -10},
                shadowOpacity: 1,
                cornerRadius: 10
            });
        imageObj.onload = function () {
            var yoda = new Kinetic.Image({
                x: 300,
                y: 290,
                image: imageObj,
                width: 150,
                height: 200,
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffset: {x: -30, y: -10},
                shadowOpacity: 1,
                cornerRadius: 10

            });
            // add the shape to the layer
            layer.add(yoda);
            // add the layer to the stage
            stage.add(layer);
        };

        setMouseEventOut(textPlay, 'mouseout', addPlayLear);
        setMouseEventIn(textPlay, 'mouseover', addPlayLear);
        setMouseEventOut(textOptions, 'mouseout', addOptionLear);
        setMouseEventIn(textOptions, 'mouseover', addOptionLear);

        var textTelerikAcademy = new Kinetic.Text({
            x: 275,
            y: 435,
            text: 'Telerik      Academy \n 2015',
            stroke: 'black',
            strokeWidth: 1.3,
            fontSize: 27,
            fontFamily: 'Arial Bold',
            fill: 'White',
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: {x: 10, y: 10},
            shadowOpacity: 10,
            cornerRadius: 10,
            draggable: true
        });

        imageObj.src = 'SpriteSheets/BagroundNinja.png';
        var rect = new Kinetic.Rect({
            x: 263,
            y: 350,
            width: 240,
            height: 150,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: {x: -30, y: -10},
            shadowOpacity: 1,
            cornerRadius: 10,
            draggable: true
        });


        var textNinjaRun = new Kinetic.Text({
            x: stage.width() / 2,
            y: 105,
            text: 'Ninja Run',
            stroke: 'white',
            strokeWidth: 1,
            fontSize: 60,
            fontFamily: 'Kristen ITC',
            fill: 'green',
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: {x: 10, y: 10},
            shadowOpacity: 1,
            cornerRadius: 10,
            draggable: true
        });
        textNinjaRun.offsetX(textNinjaRun.width() / 2);

        layer.add(rect);
        layer.add(textTelerikAcademy);
        addPlayLear.add(textPlay);
        addOptionLear.add(textOptions);
        layer.add(textNinjaRun);
        stage.add(layer);
        stage.add(addOptionLear);
        stage.add(addPlayLear);

        function setMouseEventOut(textPlay, mouseEvent, addPlayLear) {
            textPlay.on(mouseEvent, function () {
                this.fontSize(30);
                this.fill('white');
                this.stroke('green'),
                    this.strokeWidth(1.3),
                    addPlayLear.draw();
            });
        }

        function setMouseEventIn(textPlay, mouseEvent, addPlayLear) {
            textPlay.on(mouseEvent, function () {
                clicksound.playclip();
                this.fontSize(45);
                this.fill('orange');
                this.stroke('red'),
                    this.strokeWidth(1.3),
                    addPlayLear.draw();
            });
        }


        addOptionLear.on('click', function () {
            alert('No Implemented Yet!!!');
        });

        addPlayLear.on('click', function () {
            ScreenManager.changeToScreen(SelectMapScreen);
        });
        renderE.render(this);
        // renderE.addLayer("startButtonLayer", this.stage, [startButtSprite], this.layers);
        // renderE.addLayer(addPlayLear, this.stage, [startButtSprite], this.layers);
    };
    return MainMenuScreen;
})(Screen);