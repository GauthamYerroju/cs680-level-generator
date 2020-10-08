# Skyroads Level Generator

This is a quick-and-dirty level generator for the Skyroads-esque game, made for the [final project in Computer Graphics class](https://github.com/GauthamYerroju/Example-OpenGL-Programs/blob/master/PA11) (CS680, UNR). It encodes the positions and dimensions of the floor and obstacles into text data, which [the game uses to dynamically build 3D models to populate the level](https://github.com/GauthamYerroju/Example-OpenGL-Programs/blob/master/PA11/src/gameTrack.cpp).

After 2 all-nighters to get the project ready with my teammates Kevin (Green) and Hussain (Tazarvi), I created and tested this tool 2 hours before the final project deadline. Among other things, I was responsible for the dynamic level generator, and we got mad props from our competitors and the professor. Fun times!

## Instructions

- "Clear" button clears the level
- "Add 10" button adds 10 more lines in the grid (increasing the road length)
- Select either "Base" or "Obstacle" in the radio button to create the floor or wall respectively.
- Click and drag the mouse on the grid to draw a red rectangle.
  - Click Create to save that segment (it will turn blue)
  - Click Discard otherwise
- Once done, copy the text generated in the textarea and save it. That text file will be loaded by the game.
