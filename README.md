Team “Sea Breeze”
=====================================
###Ninja run

 The “Ninja run” game is jump’n run style game. The game begins with main menu. 
There are two options – “Play game” and “Options”. When you click the “Play game” 
caption a new screen appear with possible maps. When the player chose one of the
maps the game begins.  The player is visualized with the Telerik Ninja sprite. 
The visualization of the game is a 2D world. The player can move left, right and 
jump. Gravitation is implemented, so when the player jumps he falls down until 
the sprite collides with the main path. The purpose of the game is to race 
and finish the level before the computer NPCs. 
  
The game is made with JavaScript, html and Kinetic.js library. The game begins 
from the Main.js file where the “init” and “update” functions of the “ScreenManager” 
are called. In the “ScreenManager” “currentScreen” is created which could be “MainMenuScreen”, 
“GameScreen”, “WinScreen” or LoseScreen”. They have common parent - the abstract object “Screen”. 
When the game reaches initializing of the “GameScreen” - “Player”, “IvoNPC”, “DonchoNPC” and “Renderer” 
are created. “Player”, “IvoNPC”a and “DonchoNPC” have common parent - abstract object “Character”. 
“Character” has parent – abstract object “GameObject”. ”Renderer” is a “RenderEngine” object. 

There are created layers and added to the Stage using the Kineric.js library. 
In the “GameScreen” “gameMap”, “camera” and “colissionE” objects are created. The “camera” follows 
the player moves over the map. The player is controlled with the keyboard arrows.
In the “collisionE” the interactions of the player and the NPCs with the map world are calculated. 
The game ends when player or some of the NPCs reach the end of the map. If the player reaches 
first “WinScreen” is initialized. If some of the NPCs reach finish first “LoseScreen” is initialized. 

#Developers
_Nikolay Budinov_ - nikibudinov</br>
_Stefan Yovchev_ - stefan.yovchev.39</br>
_Teodor Hanev_ - DareDev1l</br>
_Atanas Dachenski_ - adachenski</br>
_Borislava Iordanova_ - BorislavaJ</br>
_Kaloyan Koravski_ - kaioian</br>
_Emil Tishinov_ - emil_t</br>

Live Demo at: https://rawgit.com/adachenski/NinjaRun/master/gameSample/index.html <br>
The github original repo is https://github.com/Team-Sea-Breeze
