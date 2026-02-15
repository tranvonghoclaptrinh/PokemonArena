# 🎮 Pokémon Arena: Hit & Shake Edition

A high-energy, web-based Pokémon turn-based strategy game featuring retro pixel-art aesthetics and modern combat mechanics.

![Pokémon Battle](https://img.shields.io/badge/Game-Pokémon-red?style=for-the-badge&logo=nintendo)
![Framework](https://img.shields.io/badge/Built%20with-JavaScript-yellow?style=for-the-badge)

## ✨ Key Features

- **Live PokéAPI Integration:** Access a vast library of Pokémon with real stats, types, and sprites.
- **Dynamic Battle Environments:** - 7 unique map themes: *Water, Grass, Ice, Fire, Rock, Electric, and Psychic*.
  - Immersive particle effects: Rain, snow, sandstorms, and glowing auras.
- **Advanced Combat Mechanics:**
  - **Fury System:** Build up energy to unleash devastating special moves.
  - **Dynamax:** Gigantify your Pokémon for a massive power boost.
  - **Impact Effects:** Features "Screen Shake" and "Flash" animations for a satisfying combat feel.
- **Strategic Gameplay:** Choose from 3 difficulty levels (Easy, Medium, Hard) and manage type advantages to win.

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3 (Tailwind CSS).
- **Logic:** Vanilla JavaScript (ES6+).
- **Typography:** [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) for that authentic retro feel.
- **Data Source:** [PokéAPI](https://pokeapi.co/).

## 🚀 Quick Start

Since this is a client-side web application, no installation is required:

1. Download the `game.html` file.
2. Open the file in any modern web browser (Chrome, Firefox, Edge).
3. *Note: An active internet connection is required to fetch Pokémon data and external assets.*

## 🎮 How to Play

1. **Selection Phase:** - Pick a difficulty level.
   - Filter Pokémon by type and assemble your ultimate team.
2. **Battle Phase:**
   - Choose from 4 unique skills to attack.
   - Monitor your **HP** and **Fury** bars.
   - Use the **Switch** button to swap Pokémon if you are at a type disadvantage.
   - Trigger **Dynamax** to overwhelm your opponent.
3. **Objective:** Defeat all enemy Pokémon to claim **VICTORY**.

## 📁 Source Structure

- `class Pokemon`: Handles stats, logic, and state management for each unit.
- `class Battle`: Manages the turn-based flow, AI decisions, and damage calculations.
- `MAP_THEMES`: Defines the visual aesthetics and weather effects for the arena.

## 📜 Credits & License

- This project is developed for educational and entertainment purposes.
- All Pokémon assets, names, and data are trademarks and copyrights of **Nintendo**, **Creatures Inc.**, and **GAME FREAK**.

---
*Good luck, Trainer! May your strikes be critical!* ⚡🔥🌊