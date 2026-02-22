# 🎮 Pokemon Arena

> A modern turn-based Pokémon battle game built with HTML, CSS, and Vanilla JavaScript.

Pokemon Arena is a browser-based turn-based battle game inspired by classic Pokémon mechanics.  
The game features advanced combat systems including Legendary scaling, Dynamax mode, Ultimate skills (Fury system), Arena type boosts, and intelligent AI behavior.

---

# 📸 Gameplay Overview

---

# 1
![1](./assets/1.png)

Login Screen  
A clean pixel-style login interface for accessing the game.

---

# 2
![2](./assets/2.png)

Register Screen  
Create a new account with input validation before entering the game.

---

# 3
![3](./assets/3.png)

Pokédex – Team Selection  

- Choose difficulty (Easy / Medium / Hard)  
- Filter Pokémon by type  
- Search functionality  
- Maximum of 3 Pokémon per team  
- Organized by region  

---

# 4
![4](./assets/4.png)

Battle Scene  

- Turn-based combat system  
- Type effectiveness (x2 / x0.5 / x0)  
- STAB (Same Type Attack Bonus)  
- Critical hit system (x2 damage)  
- Legendary damage scaling  
- Boss multipliers  
- Arena-based type bonus  

---

# 5
<video src="./assets/5.mp4" width="700" controls></video>

Dynamax System  

- Can be activated once per battle  
- Temporarily increases Pokémon size  
- Significant damage multiplier boost  
- Heavy screen shake and impact effects  

---

# 6
<video src="./assets/6.mp4" width="700" controls></video>

Ultimate Skill (Fury System)  

- Fury builds up through normal attacks  
- Ultimate becomes available at 100 Fury  
- Fury resets immediately after use  
- Full-screen flash animation  
- High bonus damage  

---

# 7
<video src="./assets/7.mp4" width="700" controls></video>

Switch Pokémon  

- Switch Pokémon during battle  
- Proper turn reset logic  
- Adds strategic depth to gameplay  

---

# 🔥 Damage Formula

Damage is calculated using:

Base Power  
× Legendary Multiplier  
× Type Multiplier  
× Arena Bonus  
× STAB  
× Random Factor (0.9 – 1.0)  
× Critical Multiplier  
+ Ultimate Bonus  
× Dynamax Multiplier  

The result is then processed through a final damage adjustment system.

---

# 🤖 Smart AI System

The enemy AI is capable of:

- Evaluating expected damage for each skill  
- Selecting the most optimal move based on type advantage  
- Activating Dynamax strategically  
- Using Ultimate when Fury is full  
- Prioritizing Legendary Pokémon when necessary  

---

# 🛠 Tech Stack

- HTML5  
- CSS3  
- Vanilla JavaScript  
- Custom-built battle engine  
- DOM-based animation system  

---

# 📂 Project Structure
pokemon-arena/
│
├── index.html # Login / Entry page
├── game.html # Main battle interface
├── icon-game.png
├── README.md
│
├── assets/ # README screenshots & demo videos
│ ├── 1.png
│ ├── 2.png
│ ├── 3.png
│ ├── 4.png
│ ├── 5.mp4
│ ├── 6.mp4
│ └── 7.mp4
│
├── css/ # Styling
│ ├── index.css
│ └── style.css
│
├── script/ # Game logic
│ ├── index.js
│ └── script.js
│
├── images/ # Arena maps & battle backgrounds
│ ├── electric-map.png
│ ├── fire-map.png
│ ├── grass-map.png
│ ├── ice-map.png
│ ├── psychic-map.png
│ ├── rock-map.png
│ └── water-map.png
│
└── audio/ # Sound effects & background music
├── battle sounds
├── dynamax effects
├── ultimate effects
└── UI interactions
---

# 🚀 How To Run

1. Clone the repository  
2. Open the project folder  
3. Run using Live Server (VS Code recommended)  

---

# ⚠ Disclaimer

Pokemon Arena is a fan-made project created for educational purposes only.  
This project is not affiliated with Nintendo or Game Freak.