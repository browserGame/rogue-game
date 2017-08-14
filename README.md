# Rogue

(work in progress)
Rogue [Quest for Dungeons](https://www.questofdungeons.com/) remake using only HTML5/CSS3/JS (no canvas) 
The original game written in Using C++ OpenGL, by [Upfall Studios](http://www.upfallstudios.com/)

_Created with permission of Upfall Studios_

Screenshot, click on the image to view the prototype dunegon (in progress)

  [![screenshot dungeon](https://raw.githubusercontent.com/jacobbogers/rogue-game/master/screenshot.png)](http://www.jacob-bogers.com)

## How to install



clone the project

```bash
  git clone https://github.com/jacobbogers/rogue-game.git
  cd rogue-game
```


build both client and server parts and run

```bash
  npm run build:server:dev
  #
  npm run create:scss  # optional step: create scss files from .sheet and .anim files
  #
  npm run build:client:dev
  npm start
```

go to _localhost:8080_ and view the demo

PS:Mock dungeon used

```code
                                       ┏━━━━━━┓            ┏━━━━━━━━━┓      
                                       ┃......┃            ┃.........┃      
                        ┏━━━━━━┓       ┃......┃            ┃.........┃      
                        ┃......┃       ┃.F..L.┃            ┃.........┃      
         ┏━━━━━━━━━━━━┓ ┃......┃       ┗━━┓...┃            ┃..@......┃      
         ┃............┃ ┃.L..F.┃          ┗┓.┏┛            ┃.L.......┃      
         ┃...1.F......┃ ┗━━┓...┃           ┃^┗━━━━━┓       ┃.........┃      
         ┃..........3.┃    ┗┓.┏┛           ┃.......┃       ┗━━━┓.┏━━━┛      
         ┃.......2...4┃  ┏━━┛^┗━┓          ┃.......┃┏━━━━━━━━━━┛^┗━┓        
┏━━━━━━━┓┃............┗━━┛......┗━━┓       ┃.......┃┃..............┃        
┃.......┃┃......J......<.........M.┃       ┃.X....L┃┃..........1...┃        
┃.......┃┃............┏┓....┏━┓....┃       ┃.......┃┃....2...P...3.┃        
┃.......┗┛............┃┃....┃.┃....┃       ┃.......┃┃..............┃        
┃........<...5..6.....┃┃...1┗━┛....┃       ┃.......┃┃..............┃        
┃.F..E..┏┓............┃┗━┓........┏┛       ┃.......┗┛.456.....z....┃        
┃.x.....┃┗━━━━━━━━━━━━┛  ┃N.......┃        ┃.......>.......7...8...┃        
┃.......┃   ┏━━━━━━━━┓   ┗━━━━┓.┏━┛        ┃.......┏┓..............┃        
┗━━━━━━━┛   ┃........┃      ┏━┛^┗━━━━┓     ┃.{.....┃┃9........a....┃        
            ┃......3.┃     ┏┛........┃     ┃.......┃┃.......b......┃        
            ┃........┃     ┃.........┃     ┃.......┃┃.......c......┃        
            ┃.....12.┃     ┃.........┃     ┃.......┃┃..............┃        
            ┃........┃     ┃.........┃     ┗━━┓.┏━━┛┗━━━━━┓v┏━━━━━━┛        
            ┃....F.N.┃     ┃.........┃  ┏━━━━━┛^┗━┓   ┏━━━┛.┗━━━┓           
            ┃........┃     ┃....%....┃  ┃.........┃   ┃.....1F..┃           
┏━━━━━━━━━┓ ┃........┃     ┃.........┃  ┃.........┃   ┃...2..z..┃           
┃.1.......┃ ┃........┃     ┃.........┃  ┃.........┃   ┃.........┃           
┃.........┃ ┃........┃     ┃.........┃  ┃.........┃   ┃..3...4..┃           
┃.........┃ ┗━━━━┓.┏━┛     ┗┓.......┏┛  ┃.........┃   ┃.........┃┏━━━━━━━━┓ 
┃.........┃    ┏━┛^┗━━━━━┓  ┗━━┓.┏━━┛   ┃.........┃   ┃..GJ.....┃┃........┃ 
┃.J.......┃    ┃.........┃┏━━━━┛^┗━━━┓  ┃.....J...┃   ┃.........┃┃........┃ 
┃.........┃    ┃.....1Z..┃┃..........┃  ┃.........┃   ┃.........┃┃........┃ 
┃....F.{..┃    ┃.........┗┛..........┃  ┃.G.......┃   ┗━━━━━━━━━┛┃.M......┃ 
┃.........┃    ┃.......T..<..........┃  ┃.........┃              ┃........┃ 
┗━━━┓.┏━━━┛    ┃.........┏┓..........┃  ┃.......V.┃              ┃........┃ 
 ┏━━┛^┗━━━━┓   ┃..J.....G┃┃.......Q.L┃  ┃..z......┃              ┃..J.....┃ 
 ┃.........┃   ┃.........┃┃F..J......┃  ┃.........┃  ┏━━━━━━━━━┓ ┃........┃ 
 ┃.1.Q.....┃   ┗┓v┏━━━━━━┛┃..........┃  ┃.....F...┃  ┃.........┃ ┃........┃ 
 ┃.........┃ ┏━━┛.┗━━┓    ┃..........┃  ┗━━━┓.┏━━━┛  ┃..1......┃ ┃........┃ 
 ┃...µ.....┃┏┛.......┗┓   ┃..........┃    ┏━┛^┗━━━━━┓┃..G......┃ ┃........┃ 
 ┃.......3.┃┃...&.....┃   ┃....G.....┃    ┃......M..┃┃.........┃ ┃...G....┃ 
 ┃.J.......┃┃.........┃   ┃.2...1....┃    ┃.........┗┛.........┃ ┃........┃ 
 ┃.........┗┛.........┃   ┃..........┃    ┃.........>..........┃ ┗━━━┓.┏━━┛ 
 ┃.T........<.........┃   ┃..........┃    ┃.........┏┓........2┃    ┏┛^┗━━━┓
 ┃.......EG┏┓...J.....┃   ┃..........┃    ┃...{.....┃┃.J...B...┃    ┃......┃
 ┃.........┃┃....F...M┃   ┗━━━━┓.┏━━━┛    ┃F........┃┃.........┃    ┃...@..┃
 ┃.........┃┗┓.......┏┛        ┃^┗━━━━━━━━┛.........┃┃.........┃    ┃......┃
 ┃........2┃ ┗━━━━━━━┛         ┃.........>.......*..┃┗━━━━━━━━━┛    ┃...┏━━┛
 ┃.........┃                   ┃.........┏┓.........┃               ┗┓.┏┛   
 ┃.........┃                   ┃.......V.┃┃.........┃           ┏━━━━┛^┗━━━┓
 ┗━━━━━━━━━┛                   ┃.J.......┃┃.......J.┃           ┃..........┃
     ┏━━━━━━┓          ┏━━━━━━┓┃.........┃┃.........┃           ┃..........┃
     ┃......┃          ┃......┃┗━━━┓v┏━━━┛┃.........┃           ┃..........┃
     ┃......┃          ┃..B...┃ ┏━━┛.┗━┓  ┃.........┃           ┃......J...┃
     ┃....V.┃          ┃......┃ ┃......┃  ┗━━━━━┓v┏━┛           ┃..........┃
     ┗━━┓...┃          ┃...┏━━┛ ┃......┃  ┏━━━━━┛.┗━━━━━┓       ┃..........┃
        ┗┓.┏┛          ┗┓.┏┛    ┃......┃  ┃.............┃       ┃...*......┃
     ┏━━━┛^┗━━━━┓┏━━━━━━┛^┗━━━┓ ┗━━┓...┃  ┃......G......┃       ┃L.........┃
     ┃..........┃┃............┃    ┃v┏━┛  ┃.............┃       ┃..M.......┃
     ┃..2....GV.┃┃....µ.....1.┃┏━━━┛.┗━━━┓┃.............┃       ┃..........┃
     ┃..........┃┃.........M..┃┃.........┃┃..........H..┃       ┃.......H..┃
     ┃..........┃┃....J.......┗┛.........┃┃.............┃       ┃....z.....┃
     ┃..........┃┃.............<.........┃┃.............┃       ┃....21....┃
     ┃....@.....┗┛..L.........┏┓.........┃┃...V.........┃       ┃..........┃
     ┃.......X.1.<....V...2...┃┃.........┃┃.............┃       ┗━━━━┓.┏━━━┛
     ┃..........┏┓............┃┃.........┃┃.............┃   ┏━━━━━━━━┛^┗━━━┓
     ┃..........┃┃............┃┃.........┃┃.............┃   ┃..............┃
     ┃.....Y....┃┗━━━━━━━━┓v┏━┛┃.........┃┗━━━━━━━━━━━┓v┃   ┃..........M...┃
     ┃..........┃       ┏━┛.┗━┓┗━━━━━━━┓v┃          ┏━┛.┗━━┓┃....F.........┃
     ┃..........┃       ┃.....┃      ┏━┛.┗━━┓       ┃......┗┛..............┃
     ┃..........┃       ┃.....┃      ┃......┃       ┃.M.1..>..J....1....X..┃
     ┗━━━━━━━━━━┛       ┃L....┃      ┃......┃       ┃..2...┏┓2.............┃
                        ┃.....┃      ┃......┃       ┃...┏━━┛┃..............┃
                        ┃.....┃      ┃...┏━━┛       ┗━━━┛   ┃.*............┃
                        ┗━━━━━┛      ┗━━━┛                  ┃..............┃
                                                            ┗━━━━━━━━━━━━━━┛
```
