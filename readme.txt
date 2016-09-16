# patchnotes
jk13k 2016 Entry

Play the contest entry at http://js13kgames.com/entries/bombs-away and retweet/like/g+!

<h3>ADDITIONAL INSTRUCTION CLARIFICATION:</h3>

<h4>The Goal</h4>

The immediate goal is to clear the four boss rooms, located at (-1, 1), (1, 1), (1, -1), (-1, -1) from the player origin. Preferably in that order, but they're clearable in any.

The secondary goal is to clear the board. The outer ring of the map is filled with a proc-gen'd coctail of insanity. 

<h4>Notable Mechanics</h4>

<h5>Obstacles</h5>

Obstacles are separated into three categories: 

High(Brightest): Instakills plane, stops bot
Medium(Medium Bright): Plane can fly over, stops bot
Hole(Black, red data): Plane can fly over, instakills bot

There are two modes for the player character, the ship and the bot:

<h5>Bullets</h5>

Like walls, all enemy bullets have a Z-Value or Elevation. All bullets will hit the bot, but low bullets will go under the ship. Low bullets are a bit darker than high bullets, and considerably darker when in ship mode.

<b>Ship Mode</b>

Controls:

Move: W/A/S/D

Primary: I
Secondary: K
Drift: Shift

Description: 

A fast, hard hitting aerial attacker, the ship specializes in hit and run tactics. Its primary attack is a twin machine gun, and its secondary is a shrapnel bomb. By holding shift, it can drift, allowing it to attack off axis.

Strengths: outrunning enemies, ranged attacks, dealing with chasers.

Weaknesses: High walls(instakill), enemies that lay out a wall of bullets. 

<b>Bot Mode</b>

Controls:

Move: W/A/S/D
Turn: J/K

Primary: I
Secondary: K
Lay Cover: Shift

Description: 

A mobile ground based bot that specializes in using cover to get close to enemies, at which point it can carve them up quickly. It's primary attack is a shotgun, and its secondary is a very close range laser whip that will destroy just about anything it touches.

Strengths: Quick kills, ability to use cover, both low and high walls, without instantly dying. Also able to stop, strafe and reverse, allowing for tighter control.

Weaknesses: Holes(instakill), bombs that penetrate walls, and enemies that chase, as they can sit on top of it. Aiming can be difficult at times. 

<h4>Map</h4>

The Map(m) shows which nodes are undiscovered(blue/grey), which nodes are dangerous(red), and safe(blue/blue). In the <a href = makeshiftmitten.github.io/patchnotes>github.io</a> version, a safe node can be teleported to by selecting it with the arrow keys and pressing enter. Somehow this functionality got lost in minification for the contest entry.

<h4>Camera</h4>

The camera can be switched between fixed on the player and stationary with C. This functionality is not useful that I've found, it's just vestigial tech from development.


<h3>CONTEST POST-MORTEM</h3>

Another year, another entry. This year marks the first year that I pushed out a 'complete' game, with actual content and a concrete win condition. No endless runner cop outs, no infinitely harder content. 

This one was also a completely solo dev effort, although I did benefit from more playtesters this time around.  

<h4>Inspirations and Original Goal:</h4>

If I'm honest and fair, I kind of knew what I wanted to build this year before we even got the theme, even if I wrote 0 code to prepare, and it's kind of an extension of games I've made in the past and a bit of an offshoot of games that have sucked me in in the past. 

I played a ton of Realm of the Mad God way back when, and a bullet hell that emphasizes cover and enemy pattern prediction and player control is a huge inspiration here and largely the motivation behind the Bot form. I'd be lying if I said the Macross GERWALK mode wasn't a direct inspiration for the bot mode and movement pattern as well.

Recently, I've been playing a lot of <a href = "http://www.steambirds.com">Steambirds Alliance</a> lately, and really enjoying the concept of a 2D plane game that forces forward movement but doesn't restrict you to purely vertical or horizontal - think Starfox All Range Mode from a top down perspective. 

I spend a lot of time on the discord and IRC, and I love to spitball ideas, one of which was Z axis stuff in a top-down game. Dodging things by going over/under them adds another layer of complexity to gameplay and has huge potential to increase the depth of play. 

I also wanted to set up a bit of a sandbox where I could spin up and demonstrate ideas on the fly for a plane or for enemies. In the next few weeks, I'll probably rip the 'game' code out and create a sandbox branch to allow anyone to play with it who wants to.

Another idea I had was to create a top down fighting game that forced dodging in the z direction. I still might do this at some point, but I didn't have the energy to get multiplayer code going.

<h4>What Went Well? A Lot, Actually</h4>

<h5>Goals From Last Year</h5>

Here's the stuff I wanted to do with Bombs Away that just didn't quite get there. I'm going to go ahead and reorganize my goals from last year so I don't start with a gaping loss. Instead, I'll go from 'most accomplished' to least. Or...not at all.

Better Collision Detection: This one was huge. Not only did I get collisions right, I also handled them properly as well, making cover force the player to slide properly and also not bug out on corners the way I had it before. It's still not perfect, but it's way way way better than it was before. Right now it only handles things oriented horizontally or vertically, but I think with a bit more trig I can get it working for any angle and perhaps complex shapes.

Multiplayer: Multiplayer didn't wind up making it in when my time constraints blew up, but at its core the game (should be) set up to handle it pretty well with a few minor refactors, namely handling all of the ships on the screen. It should not be too hard to plunk another ship in there and have the server check on it. "Should" is the key word here. I didn't even attempt it, so I'm not going to pretend to have a legit opinion on the matter.

Start Earlier: I actually started the weekend of this time, and had a moving(if a bit...square) plane up and running by the end of that weekend. I think I had a bit of a grid. This is fortunate, because I wound up having a ton of unavoidable social commitments come up, leaving me with a whopping *one* out of a total of eight weekend days to work on this game, and that day was mostly spent in recovery. I'm not going to use that as an excuse, because I didn't spend the rest of my GIVEN dev time perfectly judiciously either.

Start Earlier(b) - "Hard 12 Hour No-Code Period Before Submission": Utter fail. I pulled an all nighter the night before, submitted 8 minutes before the deadline, and it trashed me for the next two days(hence the late PM). Fortunately, because my code was in decent shape beforehand, I didn't have any show stopping issues, but if I had I definitely would not have had the critical thinking skills to fix them. As it is, I TRASHED my codebase to get a lot of features in, and I haven't had the heart to look at it since. I give myself a bit of slack on this though due to the weekends I lost.

User Experience: I don't think the UX was *awful* per se, but I don't think it was great. There are a lot of controls for this game, and I've never played another game with the controls WASD/IJKL/Shift/Space/C. I tried to make it obvious that the spawn area was a sandbox learning environment with the hints sprinkled around, and I tried to encourage the player to die quickly and get used to the spawn mechanic.

Art: I think I did a bit better here. I think the grid gives a better sense of movement, and having the camera centered on the player was huge. I added some neat effects(the red data in the hole to designate it as 'bad') and I think I had some success conveying player height and object height with color. Still boxes, triangles, and circles, but...a little bit better boxes, triangles, and circles.

Sound: I didn't wind up with sound because of time, but I wound up with the seeds of sound this time. Thanks go to <a href = "https://twitter.com/rafael_sps">@rafael_sps</a>, <href = "https://twitter.com/ryanmalm">@ryanmalm</a>, and <a href = "https://twitter.com/Siorki">@Siorki</a> for pointing me in the right direction. Maybe next year.

Like I said, based on what I submitted and the feedback I've gotten from players, I already consider this game a 'success' considering what I set out to do. 

<h4>My Goals from Last Year and How They Fared</h4>
Sound: I think simple sound for the bombs/enemy death could really make them pop. The entries that did sound certainly have a leg up.

















I set out with the intent of making a platformer where your only method of locomotion was bomb-jumping. Originally I wanted stationary turrets to bomb you, knocking you off course, and maybe have a limited number of bombs. 

What threw me off this course was getting all of the walls to work properly. Corner cases, collision cases from different directions and how to handle them....it all starts to suck when accounting for all that, especially without hacking it together. I'm sure there's a simple way to do it, but I got frustrated and moved away from it. 

I settled on an arena, and originally the goal was survival. After I got bouncing around done, and a sandbox with variable gravity, I started adding bots. Fleshing out the game stopped when, well...the time ran out. 

<h4>What Went Well: </h4>

Mechanics: For the most part, the mechanics work about as well as I could have hoped for given the total amount of time spent on them. The bombs, once you get the hang of them, are fun and useful, even if some cases are not quite right. The wells, though harder to incorporate, get much more useful as gravity increases as they directly counter it. The enemy spawners work pretty well. 

One thing I wish I could have spent more time on was basic enemy AI. The bombers should have been able to calculate some trajectories to keep themselves off the walls, and ideally a set of bots should have worked to protect their spawner. An intelligent bot-spawner swarm could make for a really hellish, fun level.

Framework: I loosely based my framework on my first JS13K entry, a physics based ship game, which was all built in one mangled JS file. Yeah, it was my first effort. Yuck. This time, up until the final crunch, I kept my code relatively clean and maintainable. Once the contest is done, I'll probably go back and clean it up a bit. I think I've finally settled on a general 2d method for putting together HTML5 games. It lacks the ability to do sound and multiplayer for now, but I can iron that out over the winter and come back with a much stronger concept for next year. 

One thing that was especially helpful was working only in Game Units for distances. After I got the game window scaling properly for desktop and mobile, I abstracted all of my primitive draw methods out to take Game Units and do the conversions internally, so once I set up a particular primitive I didn't need to ever worry about scaling again. Except with my text, which looks terrible on a small screen because, well, I was tired and forgot to test it. Working in game units also made it very easy to set up the physics equations, because I could treat every game unit as a meter. 

I also abstracted out a lot of features for building the game, even if they aren't showcased that way in the final product -  I have three color pallettes I can swap with a key press in game(removed for release), and my camera is the same way, although the player-centric camera is hopelessly broken/ignored in the spirit of finishing. The game is also fairly capable of handling two players, but again - ran out of time. 


<h4>What Could Be Improved:</h4>

Scope: I tried to do A LOT with this game, and probably bit off more than I could chew. I waited until the very last minute to put together the level system, and as a result, well, it looks like I tried to pull an all nighter and THEN try to build a level system! Timer doesn't work, enemies spawn in a clunky manner, often killing themselves before you can get to them, and levels switch too quickly, eating up your hard earned(ha) powerups before you can get to them. 

Learning ingame: This fell flat on its face. What was supposed to be a series of introductory levels turned into a 30 second lag at the start of every match, which, combined with the not-so-intuitive and poorly explained controls resulted in the only streamer I saw try it quitting almost immediately. Not their fault: the game was almost painful to watch, especially knowing how much content was behind the UX wall.

UX: This was my biggest failure. The UX was awful. Terrible. All the mechanics in the world could not have saved it. It looked clunky, it felt clunky, and it didn't bite into the player and make them want more. I would have been better off starting iwth a level loop and building every more complicated enemies than the other way around. 


<h4>What I Want For Next Year:</h4>



Better Collision Detection: I'm bad at it. I'm bad at timesteps and I'm bad at correcting for fine-grained collisions. I need to be better at it. Or at least spend more time on it.

Art: It's gotta be better. Circles and Squares don't cut it.

User Experience: I really want the player to open my game and get hyped up. That's why we're doing this, right?

Multiplayer: I ran out of time so I couldn't add MP functionality, but that's something I want next year as well. 

Start Earlier: I was very light on work until the last week. I want to set a hard goal of 'no commits in the final 12 hours' next year and really push myself to use all the time available. 



