# Tile Explorer Product Requirements Document (PRD)

## Overview
Tile Explorer is a simple educational web app that allows students to explore how patterns can be used to tile a surface. The app is designed for ease of use and visual experimentation.

## App Type
- Single-page web application
- Built with HTML and JavaScript

## Features

### 1. Pattern Drawing
- The user is presented with a grid of squares.
- Users can click squares to toggle them on or off, creating a custom pattern.
- Squares can be toggled only if they are adjacent (by side or corner) to an already active square, ensuring the pattern remains contiguous.

### 2. Tiling Action
- After creating a pattern, the user clicks the "Tile" button.
- The app attempts to use the drawn pattern to tile a larger 2D surface (a bigger rectangle displayed on the same page).
- Tiling rules:
  - No overlap between shapes/patterns.
  - The app tries to minimize the space between shapes, packing them as tightly as possible.
  - Each instance of the pattern is assigned a color. Colors may repeat after 10 different colors.
  - Patterns can be shifted (up, down, left, right) to fit the tiling, but must remain contiguous and not overlap.

## User Interface
- One page with two main sections:
  1. Pattern drawing grid
  2. Tiling result area
- "Tile" button to trigger the tiling process
- Visual feedback for selected squares and tiled patterns

## Category
- Educational
- Math

## Success Criteria
- Users can easily create and modify patterns
- Tiling is visually clear, with no overlaps and minimal gaps
- The app is intuitive and responsive

## Future Enhancements (Optional)
- Save/load patterns
- Export tiling as image
- Adjustable grid sizes
