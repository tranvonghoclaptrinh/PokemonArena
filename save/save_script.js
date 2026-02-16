const BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const TYPE_COLORS = { "ELECTRIC": "#F7D02C", "FIRE": "#F08030", "WATER": "#6890F0", "GRASS": "#78C850", "GHOST": "#705898", "DRAGON": "#7038F8", "NORMAL": "#A8A878", "PSYCHIC": "#F85888", "FIGHTING": "#C03028", "BUG": "#A8B820", "ICE": "#98D8D8", "GROUND": "#E2BF65", "ROCK": "#B6A136", "FAIRY": "#D685AD", "STEEL": "#B7B7CE", "POISON": "#A33EA1", "DARK": "#705848", "FLYING": "#A890F0" };

const ACTION_DELAY = 1500; // Đặt về 1.5s cho nhịp độ tốt hơn
// Danh sách 4 map của bạn (.png)
const AVAILABLE_MAPS = [
{ file: 'fire-map.png', type: 'FIRE' },
{ file: 'water-map.png', type: 'WATER' },
{ file: 'grass-map.png', type: 'GRASS' },
{ file: 'electric-map.png', type: 'ELECTRIC' },
{ file: 'rock-map.png', type: 'ROCK' }, // Thêm mới
{ file: 'ice-map.png', type: 'ICE' },    // Thêm mới
{ file: 'psychic-map.png', type: 'PSYCHIC' } // Thêm mới

];
(function preloadAllAssets() {
AVAILABLE_MAPS.forEach(map => {
    const img = new Image();
    img.src = `images/${map.file}`;
    // Log để kiểm tra trong Console (F12) xem ảnh đã tải chưa
    img.onload = () => console.log(`Preloaded: ${map.file}`);
});
})();

let currentMap = AVAILABLE_MAPS[0]; 

let weatherInterval = null; // Cần khai báo biến này ở ngoài hàm

function applyRandomMap() {
    currentMap = AVAILABLE_MAPS[Math.floor(Math.random() * AVAILABLE_MAPS.length)];
    const scene = document.querySelector('.battle-scene');
    const weatherContainer = document.getElementById('weather-container');
    
    // 1. Reset: Xóa hiệu ứng cũ
    if (weatherInterval) clearInterval(weatherInterval);
    weatherContainer.innerHTML = '';
    
    // 2. Đổi nền
    scene.style.backgroundImage = `url('images/${currentMap.file}')`;
    
    // 3. Tạo hiệu ứng dựa trên Type của Map
    switch(currentMap.type) {
        case 'WATER':
            // Tạo 50 giọt mưa rơi liên tục
            for (let i = 0; i < 50; i++) {
                const p = document.createElement('div');
                p.className = 'rain';
                p.style.left = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 1 + 's';
                weatherContainer.appendChild(p);
            }
            break;

        case 'GRASS':
            // Tạo 20 lá bay lơ lửng
            for (let i = 0; i < 20; i++) {
                const p = document.createElement('div');
                p.className = 'leaf';
                p.style.left = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 4 + 's';
                // Màu lá ngẫu nhiên một chút cho đẹp
                p.style.backgroundColor = Math.random() > 0.5 ? '#78C850' : '#4E8234';
                weatherContainer.appendChild(p);
            }
            break;

        case 'ICE':
            // Tạo 60 hạt tuyết rơi
            for (let i = 0; i < 60; i++) {
                const p = document.createElement('div');
                p.className = 'snow';
                p.style.left = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 5 + 's';
                p.style.opacity = Math.random();
                weatherContainer.appendChild(p);
            }
            break;
        case 'FIRE':
            // Tạo 60 ngọn lửa bốc lên từ dưới
            for (let i = 0; i < 60; i++) {
                const p = document.createElement('div');
                p.className = 'ember';
                p.style.left = Math.random() * 100 + '%';
                p.style.bottom = "-20px";
                const size = Math.random() * 15 + 10 + 'px';
                p.style.width = size; p.style.height = size;
                p.style.animationDuration = (Math.random() * 1 + 0.8) + 's';
                p.style.animationDelay = Math.random() * 3 + 's';
                weatherContainer.appendChild(p);
            }
            break;

        case 'ROCK':
            // Tạo 80 vệt cát bay chéo
            for (let i = 0; i < 80; i++) {
                const p = document.createElement('div');
                p.className = 'sand';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.width = (Math.random() * 100 + 100) + 'px';
                p.style.animationDuration = (Math.random() * 0.4 + 0.4) + 's';
                p.style.animationDelay = Math.random() * 2 + 's';
                weatherContainer.appendChild(p);
            }
            break;
        case 'PSYCHIC': 
            // 1. Tạo lớp phủ nền tím
            const pOverlay = document.createElement('div');
            pOverlay.className = 'psychic-overlay';
            weatherContainer.appendChild(pOverlay);

            // 2. Tạo 4 góc phát sáng
            const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            corners.forEach(pos => {
                const corner = document.createElement('div');
                corner.className = `psychic-corner ${pos}`;
                weatherContainer.appendChild(corner);
            });

            // 3. Hiệu ứng lóe sáng nhanh (Flash) liên tục
            weatherInterval = setInterval(() => {
                const flash = document.createElement('div');
                flash.style.position = 'absolute';
                flash.style.inset = '0';
                flash.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                flash.style.zIndex = '16';
                weatherContainer.appendChild(flash);
                
                setTimeout(() => flash.remove(), 100);
            }, 2000); // Cứ 2 giây lóe nhẹ một cái toàn màn hình
            break;
            
        case 'ELECTRIC':
            // Tạo tia sét xanh/vàng chớp nhẹ ở phía trên
            weatherInterval = setInterval(() => {
                const bolt = document.createElement('div');
                const isYellow = Math.random() > 0.5;
                bolt.className = `bolt ${isYellow ? 'bolt-yellow' : 'bolt-blue'}`;
                
                // Vị trí: Ngẫu nhiên chiều ngang, nhưng cố định ở phía trên (top 0-5%)
                bolt.style.left = Math.random() * 90 + 5 + '%';
                bolt.style.top = '0px'; 
                bolt.style.height = (Math.random() * 150 + 100) + 'px'; // Độ dài tia sét
                
                weatherContainer.appendChild(bolt);
                setTimeout(() => bolt.remove(), 200);
            }, 1200); // Tốc độ xuất hiện tia sét
            break;
            }
    addLog(`ARENA: ${currentMap.type} field detected!`);
    const nextMap = AVAILABLE_MAPS[Math.floor(Math.random() * AVAILABLE_MAPS.length)];
    new Image().src = `images/${nextMap.file}`;
}

// Hàm bổ trợ để tạo hạt (Tuyết, Mưa, Cát...)
function createParticles(className, count) {
    const container = document.getElementById('weather-container');
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = className;
        p.style.left = Math.random() * 100 + '%';
        p.style.top = (Math.random() * 100) - 20 + '%';
        p.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(p);
    }
}

const audioBgm = document.getElementById('audio-bgm');
if(audioBgm) audioBgm.volume = 0.3; 

function playSfx(id) {
    const el = document.getElementById('audio-' + id);
    if(el) {
        el.currentTime = 0;
        el.play().catch(() => {});
    }
}

const POKEMON_DB = {};

// 1. Khởi tạo Database cho 493 Pokémon với logic Song Hệ ngẫu nhiên (~50%)
for (let id = 1; id <= 493; id++) {
    const types = [Object.keys(TYPE_COLORS)[id % 18]];
    
    // Logic: Khoảng 50% Pokemon thường sẽ có hệ thứ 2 (id chẵn hoặc lẻ tùy chọn)
    if (id % 2 === 0) {
        const secondType = Object.keys(TYPE_COLORS)[(id + 5) % 18];
        if (secondType !== types[0]) types.push(secondType);
    }

    POKEMON_DB[id] = { 
        name: `PM-${id}`, 
        types: types, 
        isLeg: false 
    };
}

// 2. Gán tên thật (Giữ nguyên mảng COMMON_NAMES của bạn)
const COMMON_NAMES = ["BULBASAUR", "IVYSAUR", "VENUSAUR", "CHARMANDER", "CHARMELEON", "CHARIZARD", "SQUIRTLE", "WARTORTLE", "BLASTOISE", "CATERPIE", "METAPOD", "BUTTERFREE", "WEEDLE", "KAKUNA", "BEEDRILL", "PIDGEY", "PIDGEOTTO", "PIDGEOT", "RATTATA", "RATICATE", "SPEAROW", "FEAROW", "EKANS", "ARBOK", "PIKACHU", "RAICHU", "SANDSHREW", "SANDSLASH", "NIDORAN♀", "NIDORINA", "NIDOQUEEN", "NIDORAN♂", "NIDORINO", "NIDOKING", "CLEFAIRY", "CLEFABLE", "VULPIX", "NINETALES", "JIGGLYPUFF", "WIGGLYTUFF", "ZUBAT", "GOLBAT", "ODDISH", "GLOOM", "VILEPLUME", "PARAS", "PARASECT", "VENONAT", "VENOMOTH", "DIGLETT", "DUGTRIO", "MEOWTH", "PERSIAN", "PSYDUCK", "GOLDUCK", "MANKEY", "PRIMEAPE", "GROWLITHE", "ARCANINE", "POLIWAG", "POLIWHIRL", "POLIWRATH", "ABRA", "KADABRA", "ALAKAZAM", "MACHOP", "MACHOKE", "MACHAMP", "BELLSPROUT", "WEEPINBELL", "VICTREEBEL", "TENTACOOL", "TENTACRUEL", "GEODUDE", "GRAVELER", "GOLEM", "PONYTA", "RAPIDASH", "SLOWPOKE", "SLOWBRO", "MAGNEMITE", "MAGNETON", "FARFETCH'D", "DODUO", "DODRIO", "SEEL", "DEWGONG", "GRIMER", "MUK", "SHELLDER", "CLOYSTER", "GASTLY", "HAUNTER", "GENGAR", "ONIX", "DROWZEE", "HYPNO", "KRABBY", "KINGLER", "VOLTORB"];
COMMON_NAMES.forEach((name, i) => {
    const id = i + 1;
    if (POKEMON_DB[id]) POKEMON_DB[id].name = name;
});

// 3. Chuẩn hóa SONG HỆ cho toàn bộ Huyền thoại
const LEGENDARY_DATA = {
    144: { name: "ARTICUNO", types: ["ICE", "FLYING"], ult: "BLIZZARD", power: 150 },
    145: { name: "ZAPDOS", types: ["ELECTRIC", "FLYING"], ult: "THUNDER", power: 150 },
    146: { name: "MOLTRES", types: ["FIRE", "FLYING"], ult: "SKY ATTACK", power: 160 },
    150: { name: "MEWTWO", types: ["PSYCHIC"], ult: "PSYSTRIKE", power: 180 },
    151: { name: "MEW", types: ["PSYCHIC"], ult: "GENESIS SUPERNOVA", power: 190 },
    243: { name: "RAIKOU", types: ["ELECTRIC"], ult: "THUNDER FANG", power: 140 },
    244: { name: "ENTEI", types: ["FIRE"], ult: "SACRED FIRE", power: 160 },
    245: { name: "SUICUNE", types: ["WATER"], ult: "HYDRO PUMP", power: 150 },
    249: { name: "LUGIA", types: ["PSYCHIC", "FLYING"], ult: "AEROBLAST", power: 170 },
    250: { name: "HO-OH", types: ["FIRE", "FLYING"], ult: "SACRED FIRE", power: 170 },
    251: { name: "CELEBI", types: ["GRASS", "PSYCHIC"], ult: "LEAF STORM", power: 150 },
    382: { name: "KYOGRE", types: ["WATER"], ult: "ORIGIN PULSE", power: 190 },
    383: { name: "GROUDON", types: ["GROUND"], ult: "PRECIPICE BLADES", power: 190 },
    384: { name: "RAYQUAZA", types: ["DRAGON", "FLYING"], ult: "DRAGON ASCENT", power: 200 },
    385: { name: "JIRACHI", types: ["STEEL", "PSYCHIC"], ult: "DOOM DESIRE", power: 170 },
    386: { name: "DEOXYS", types: ["PSYCHIC"], ult: "PSYCHO BOOST", power: 180 },
    483: { name: "DIALGA", types: ["STEEL", "DRAGON"], ult: "ROAR OF TIME", power: 200 },
    484: { name: "PALKIA", types: ["WATER", "DRAGON"], ult: "SPACIAL REND", power: 180 },
    487: { name: "GIRATINA", types: ["GHOST", "DRAGON"], ult: "SHADOW FORCE", power: 190 },
    493: { name: "ARCEUS", types: ["NORMAL"], ult: "JUDGMENT", power: 220 }
};

Object.entries(LEGENDARY_DATA).forEach(([id, info]) => {
    POKEMON_DB[id] = { ...info, isLeg: true };
});

const REGIONS = [
    { name: "KANTO", start: 1, end: 151 },
    { name: "JOHTO", start: 152, end: 251 },
    { name: "HOENN", start: 252, end: 386 },
    { name: "SINNOH", start: 387, end: 493 }
];

// 4. Tạo mảng DATA cuối cùng
const DATA = Object.keys(POKEMON_DB).map(id => {
    const p = POKEMON_DB[id];
    const idInt = parseInt(id);
    return { 
        id: idInt, 
        name: p.name, 
        types: p.types, // Lưu mảng các hệ
        isLegendary: p.isLeg,
        hp: p.isLeg ? 500 : 200 + (idInt % 50), 
        skills: [
            {n: "Tackle", d: 40}, 
            {n: p.isLeg ? "Hyper Beam" : "Bite", d: p.isLeg ? 90 : 55}, 
            {n: p.isLeg ? p.ult : "GIGA IMPACT", d: p.isLeg ? p.power : 140, isU: true}
        ] 
    };
});

let selected = [], pTeam = [], eTeam = [], pIdx = 0, eIdx = 0, busy = false, currentFilter = "ALL";
let switchCountLeft = 2, difficulty = 'EASY', maxTeamSize = 3;
let pDynamaxUsedInGame = false;

window.addEventListener('click', () => {
    if(audioBgm && audioBgm.paused && document.getElementById('selection-screen').classList.contains('fixed')) {
        audioBgm.play().catch(() => {});
    }
}, { once: true });

function setDifficulty(mode) {
    playSfx('click');
    difficulty = mode; selected = [];
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    if(mode === 'EASY') { maxTeamSize = 3; document.getElementById('mode-easy').classList.add('active'); } 
    else if(mode === 'MEDIUM') { maxTeamSize = 4; document.getElementById('mode-med').classList.add('active'); } 
    else { maxTeamSize = 5; document.getElementById('mode-hard').classList.add('active'); }
    document.getElementById('max-count').innerText = maxTeamSize;
    document.getElementById('count').innerText = 0;
    updateStartButton();
    renderPokedex();
}

function updateStartButton() {
    const btn = document.getElementById('start-btn');
    if (selected.length === maxTeamSize) {
        btn.disabled = false;
        btn.classList.add('ready');
    } else {
        btn.disabled = true;
        btn.classList.remove('ready');
    }
}

function renderPokedex() {
    const dex = document.getElementById('pokedex'); 
    if (!dex) return;
    dex.innerHTML = '';
    
    const searchInput = document.getElementById('manual-search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

    // 1. Lọc theo Hệ (Dùng .includes để lọc được cả hệ chính và phụ)
    let baseFiltered = currentFilter === "ALL" 
        ? DATA 
        : DATA.filter(p => p.types.includes(currentFilter));

    // 2. Xử lý Tìm kiếm & Sắp xếp ưu tiên
    if (searchTerm !== "") {
        let results = baseFiltered.filter(p => p.name.toLowerCase().includes(searchTerm));
        
        // Cơ chế lùi dần chữ cái nếu không tìm thấy
        if (results.length === 0 && searchTerm.length > 0) {
            searchInput.value = searchTerm.slice(0, -1);
            renderPokedex(); 
            return;
        }

        // Sort: Ưu tiên những con có chữ cái tìm kiếm nằm ở đầu tên
        results.sort((a, b) => a.name.toLowerCase().indexOf(searchTerm) - b.name.toLowerCase().indexOf(searchTerm));
        baseFiltered = results;
    }

    // 3. Phân vùng và Render
    REGIONS.forEach(region => {
        const pkmInRegion = baseFiltered.filter(p => p.id >= region.start && p.id <= region.end);
        
        if (pkmInRegion.length > 0) {
            // Header vùng
            const header = document.createElement('div');
            header.className = "col-span-full py-2 mb-2 border-b-2 border-slate-300 flex items-center gap-4 mt-4";
            header.innerHTML = `
                <span class="pixel-font text-[10px] text-slate-500 bg-slate-200 px-3 py-1 rounded-full">${region.name} REGION</span>
                <div class="flex-1 h-[1px] bg-slate-200"></div>
            `;
            dex.appendChild(header);

            // Vẽ từng Pokemon
            pkmInRegion.forEach(p => {
                const isSel = selected.includes(p.id);
                const div = document.createElement('div');
                div.className = `p-2 bg-white border-2 rounded-xl cursor-pointer flex flex-col items-center pk-card ${isSel ? 'selected' : 'border-slate-100'} ${p.isLegendary ? 'legendary-card' : ''}`;
                
                // Render danh sách các hệ (Hỗ trợ 1 hoặc 2 hệ)
                const typesHTML = p.types.map(t => `
                    <div class="px-2 py-0.5 rounded text-[5px] text-white font-bold" style="background:${TYPE_COLORS[t]}">
                        ${t}
                    </div>
                `).join('');

                div.innerHTML = `
                    ${p.isLegendary ? '<span class="legendary-badge pixel-font">LEG</span>' : ''}
                    <img src="${BASE_URL}${p.id}.png" class="w-14 h-14 pixel-img">
                    <span class="text-[6px] pixel-font mt-1 text-center truncate w-full">${p.name}</span>
                    <div class="mt-1 flex gap-1 justify-center w-full">${typesHTML}</div>
                `;

                div.onclick = (e) => {
                    e.stopPropagation(); // Ngăn reset search khi click chọn
                    playSfx('click');
                    if(selected.includes(p.id)) {
                        selected = selected.filter(id => id !== p.id);
                    } else if(selected.length < maxTeamSize) {
                        selected.push(p.id);
                    }
                    document.getElementById('count').innerText = selected.length;
                    updateStartButton();
                    renderPokedex(); // Re-render để cập nhật trạng thái chọn
                };
                dex.appendChild(div);
            });
        }
    });
}

function generateEnemyTeam() {
    let legCountNeeded = difficulty === 'EASY' ? 1 : (difficulty === 'MEDIUM' ? 2 : 4);
    const allLegs = DATA.filter(p => p.isLegendary).sort(() => 0.5 - Math.random());
    const allCommons = DATA.filter(p => !p.isLegendary).sort(() => 0.5 - Math.random());
    let team = allLegs.slice(0, legCountNeeded);
    const remainingPool = [...allLegs.slice(legCountNeeded), ...allCommons].sort(() => 0.5 - Math.random());
    team = [...team, ...remainingPool.slice(0, maxTeamSize - legCountNeeded)];
    return team.sort(() => 0.5 - Math.random());
}

async function startGame() {
    if (selected.length !== maxTeamSize) return;
    pDynamaxUsedInGame = false;
    
    
    if(audioBgm) audioBgm.pause();
    
    playSfx('spawn');
    switchCountLeft = difficulty === 'EASY' ? 2 : (difficulty === 'MEDIUM' ? 3 : 4);
    pTeam = selected.map(id => { 
        const p = DATA.find(x => x.id === id); 
        return {...p, fury: 0, currentHp: p.hp, s: BASE_URL+"back/"+id+".png", f: BASE_URL+id+".png"}; 
    });
    eTeam = generateEnemyTeam().map(x => ({...x, fury: 0, currentHp: x.hp, s: BASE_URL+"back/"+x.id+".png", f: BASE_URL+x.id+".png"}));

    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('battle-screen').classList.remove('hidden');
    pIdx = eIdx = 0;
    applyRandomMap();
    await spawnSequence('player'); 
    await spawnSequence('enemy');
    updateUI();
    addLog(`Arena Ready... Battle Start!`);
}

function backToMenu() {
    if(audioBgm) audioBgm.play().catch(() => {});
    document.getElementById('battle-screen').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('selection-screen').classList.remove('hidden');
    location.reload();
}
function logout() {
    playSfx('click');
    window.location.href = 'index.html';

}
async function spawnSequence(side) {
    const ball = document.getElementById('ball-projectile');
    const isPlayer = (side === 'player');
    const sprite = document.getElementById(isPlayer ? 'p-sprite' : 'e-sprite');
    
    // 1. Xác định dữ liệu
    const currentPkm = isPlayer ? pTeam[pIdx] : eTeam[eIdx];
    const ballName = currentPkm.isLegendary ? "ultra-ball.png" : "poke-ball.png";

    // 2. QUAN TRỌNG: Xóa sạch ảnh cũ và ẩn Pokémon đi ngay lập tức
    sprite.src = ""; 
    sprite.style.transition = 'none';
    sprite.style.opacity = '0';
    sprite.style.transform = 'scale(0)';

    // 3. Gán ảnh mới cho quả bóng và chuẩn bị vị trí ném
    ball.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + ballName;
    
    const rect = sprite.parentElement.getBoundingClientRect(); // Lấy tọa độ từ khung chứa
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    ball.style.transition = 'none';
    if (isPlayer) {
        ball.style.left = '-50px'; ball.style.top = '100%';
    } else {
        ball.style.left = '100%'; ball.style.top = '-50px';
    }
    ball.classList.remove('hidden');
    void ball.offsetWidth; // Force reflow

    // 4. Bắt đầu ném
    playSfx('nem');
    ball.style.transition = 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
    ball.style.left = `${targetX}px`;
    ball.style.top = `${targetY}px`;
    ball.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(720deg)';

    // Trong lúc bóng đang bay, nạp sẵn ảnh mới cho Pokemon (nhưng vẫn đang opacity 0)
    sprite.src = isPlayer ? currentPkm.s : currentPkm.f;

    await new Promise(r => setTimeout(r, 700));

    // 5. HIỆU ỨNG LÓA SÁNG KHI CHẠM ĐÍCH
    ball.classList.add('hidden'); 

    const flash = document.createElement('div');
    flash.className = 'spawn-flash animate-flash';
    flash.style.left = `${targetX}px`;
    flash.style.top = `${targetY}px`;
    document.body.appendChild(flash);

    await new Promise(r => setTimeout(r, 100));

    // 6. Cho Pokémon mới xuất hiện mượt mà
    sprite.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    sprite.style.opacity = '1';
    sprite.style.transform = 'scale(1)';

    setTimeout(() => flash.remove(), 600);

    if (typeof shakeScreen === 'function') shakeScreen('normal');
    await new Promise(r => setTimeout(r, 300));
}

// HÀM RUNG MÀN HÌNH CHÍNH
function shakeScreen(intensity = 'normal') {
    const scene = document.getElementById('battle-screen');
    scene.classList.remove('shake-active');
    void scene.offsetWidth; // Force reflow
    scene.classList.add('shake-active');
    if (intensity === 'heavy') scene.style.animationDuration = '0.5s';
    else scene.style.animationDuration = '0.3s';
}

async function announceSkill(name, color, pkmId) {
    playSfx('ultimate');
    const announcer = document.getElementById('skill-announcement');
    const dimmer = document.getElementById('battle-dimmer');
    const scene = document.getElementById('main-battle-scene');
    const imgEl = document.getElementById('announcement-pkm-img');
    imgEl.src = `${BASE_URL}${pkmId}.png`;
    document.getElementById('announcement-skill-name').innerText = name;
    document.getElementById('announcement-skill-name').style.color = color;
    dimmer.classList.add('active');
    scene.style.filter = 'blur(4px)';
    announcer.classList.add('active');
    await new Promise(r => setTimeout(r, 2000)); 
    announcer.classList.remove('active');
    dimmer.classList.remove('active');
    scene.style.filter = 'none';
}

async function attackAnim(attackerId, defenderId, isDynamax = false) {
    const atk = document.getElementById(attackerId);
    const defId = attackerId === 'p-sprite' ? 'e-sprite' : 'p-sprite';
    const def = document.getElementById(defId);
    const moveX = attackerId === 'p-sprite' ? 120 : -120;
    const moveY = attackerId === 'p-sprite' ? -60 : 60;

    if (isDynamax) {
            playSfx('dynamax');
            atk.classList.add('dynamax-active');
            atk.style.transition = 'transform 0.6s';
            // Thêm một chút translateY âm để Pokémon nhấc chân lên một chút khi to ra
            atk.style.transform = 'scale(2.2) translateY(-10px)';
            await new Promise(r => setTimeout(r, 1000));
        }

    atk.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    atk.style.transform = `translate(${moveX}px, ${moveY}px) ${isDynamax ? 'scale(2.2)' : ''}`;
    
    // THỜI ĐIỂM VA CHẠM
    setTimeout(() => {
        playSfx('hit'); // PHÁT SOUND HIT
        shakeScreen(isDynamax ? 'heavy' : 'normal'); // RUNG MÀN HÌNH
        def.classList.add('hit-effect'); // RUNG POKEMON BỊ ĐÁNH
        setTimeout(() => def.classList.remove('hit-effect'), 200);
    }, 100);

    await new Promise(r => setTimeout(r, 350));
    atk.style.transform = 'translate(0, 0) ';
    atk.classList.remove('dynamax-active');
    await new Promise(r => setTimeout(r, 400));
}

function showMiss(isEnemy) {
    playSfx('missing');
    const container = document.getElementById(isEnemy ? 'e-ui-container' : 'p-ui-container');
    const miss = document.createElement('div');
    miss.className = 'missing-text';
    miss.innerText = 'Missing!';
    miss.style.left = '50%';
    miss.style.top = '-20px';
    container.appendChild(miss);
    setTimeout(() => miss.remove(), 1000);
}

async function doAction(idx) {
    if (busy || pIdx >= pTeam.length) return;
    busy = true; // Khóa hành động để tránh spam click

    const p = pTeam[pIdx];
    const e = eTeam[eIdx];
    const s = p.skills[idx];

    // --- FIELD ADVANTAGE LOGIC ---
    let damage = s.d;
    if (p.type === currentMap.type) {
        damage = Math.floor(damage * 1.15);
        addLog(`[FIELD] ${p.name} is powered up by the ${currentMap.type} terrain!`);
    }
    if (checkTypeAdvantage(currentMap.type, p.type)) {
        damage = Math.floor(damage * 0.8);
        addLog(`[FIELD] ${p.name} is weakened by the environment!`);
    }
    let multiplier = 1.0;

    // Buff for matching type with environment (30% increase)
    if (p.type === currentMap.type) {
        multiplier = 1.3;
        addLog(`[ENV] ${p.name} is empowered by the environment!`);
    } 

    // Debuff for types countered by environment (30% decrease)
    const envDebuffs = { 
        'FIRE': 'WATER', 
        'WATER': 'ELECTRIC', 
        'GRASS': 'FIRE', 
        'ICE': 'FIRE' 
    };

    if (envDebuffs[p.type] === currentMap.type) {
        multiplier = 0.7;
        addLog(`[ENV] ${p.name}'s power is dampened by the environment!`);
    }

    damage = Math.floor(damage * multiplier);
    // Accuracy Logic
    let missChance = 0.1; 
    if (e.type === currentMap.type) missChance += 0.1; 
    if (checkTypeAdvantage(currentMap.type, e.type)) missChance -= 0.1; 

    if (s.isU && p.isLegendary) await announceSkill(s.n, TYPE_COLORS[p.type], p.id);
    
    addLog(`${p.name} used ${s.n}!`);
    await attackAnim('p-sprite', 'e-sprite');

    if (Math.random() < missChance) {
        addLog(`The attack missed!`);
        showMiss(true);
    } else {
        e.currentHp = Math.max(0, e.currentHp - damage);
        p.fury = s.isU ? 0 : Math.min(100, p.fury + 30);
    }

    updateUI();
    await checkDeath();
    
    // NẾU ĐỐI THỦ CÒN SỐNG -> GỌI LƯỢT ĐỐI THỦ
    if (eIdx < eTeam.length && eTeam[eIdx].currentHp > 0) {
        setTimeout(enemyTurn, 1000); 
    } else {
        busy = false; // Reset busy nếu đối thủ đã gục
        updateUI();
    }
}

async function useDynamax() {
    if(busy || pDynamaxUsedInGame) return;
    busy = true; 
    pDynamaxUsedInGame = true;
    const p = pTeam[pIdx], e = eTeam[eIdx];
    addLog(`${p.name} DYNAMAX!!`);
    await attackAnim('p-sprite', 'e-sprite', true);
    e.currentHp = Math.max(0, e.currentHp - 160);
    p.fury = Math.min(100, p.fury + 50);
    await checkDeath();
    updateUI(); 
    setTimeout(enemyTurn, 800);
}
// Hàm kiểm tra eType có khắc chế pType không
function checkTypeAdvantage(attackerType, defenderType) {
    const chart = {
        'FIRE': ['GRASS', 'BUG', 'ICE', 'STEEL'],
        'WATER': ['FIRE', 'GROUND', 'ROCK'],
        'GRASS': ['WATER', 'GROUND', 'ROCK'],
        'ELECTRIC': ['WATER', 'FLYING'],
        'ROCK': ['FIRE', 'ICE', 'FLYING', 'BUG'],
        'ICE': ['GRASS', 'GROUND', 'FLYING', 'DRAGON'],
        'PSYCHIC': ['FIGHTING', 'POISON']
        
    };
    return chart[attackerType] ? chart[attackerType].includes(defenderType) : false;
}
async function enemyTurn() {
    if (eIdx >= eTeam.length || eTeam[eIdx].currentHp <= 0) {
        busy = false; 
        return;
    }
    
    const p = pTeam[pIdx];
    const e = eTeam[eIdx];
    const isLastPkmn = (eIdx === eTeam.length - 1);
    
    // --- SMART AI DYNAMAX ---
    let shouldDynamax = false;
    if (isLastPkmn || checkTypeAdvantage(e.type, p.type) || p.currentHp <= 160) {
        shouldDynamax = true;
    }

    if (shouldDynamax && !e.hasUsedDynamax) {
        e.hasUsedDynamax = true; 
        addLog(`Enemy ${e.name} activates DYNAMAX!!`);
        await attackAnim('e-sprite', 'p-sprite', true);
        p.currentHp = Math.max(0, p.currentHp - 160);
        e.fury = Math.min(100, e.fury + 50);
    } 
    else {
        const sIdx = (e.fury >= 100) ? 2 : (Math.random() > 0.4 ? 1 : 0);
        const s = e.skills[sIdx];
        
        if (s.isU && e.isLegendary) await announceSkill(s.n, TYPE_COLORS[e.type], e.id);
        
        addLog(`Enemy ${e.name} used ${s.n}!`);
        await attackAnim('e-sprite', 'p-sprite');
        
        // --- FIELD CALCULATIONS ---
        let finalD = s.d;
        if (e.type === currentMap.type) {
            finalD = Math.floor(finalD * 1.15);
            addLog(`[FIELD] Enemy powered up by ${currentMap.type} terrain!`);
        }
        if (checkTypeAdvantage(currentMap.type, e.type)) {
            finalD = Math.floor(finalD * 0.8);
            addLog(`[FIELD] Enemy weakened by environment!`);
        }

        let missChance = 0.1;
        if (p.type === currentMap.type) missChance += 0.1;
        
        if (Math.random() < missChance) { 
            addLog(`Enemy attack missed!`); 
            showMiss(false);
        } else {
            p.currentHp = Math.max(0, p.currentHp - finalD);
            e.fury = s.isU ? 0 : Math.min(100, e.fury + 30);
        }
    }

    await checkDeath();
    updateUI();
    
    // QUAN TRỌNG: Mở khóa để người chơi có thể đánh lượt tiếp theo
    setTimeout(() => {
        busy = false;
        updateUI();
    }, 500);
}

async function checkDeath() {
    const e = eTeam[eIdx], p = pTeam[pIdx];
    if(e && e.currentHp <= 0) {
        addLog(`${e.name} fainted!`);
        eIdx++; 
        if(eIdx >= eTeam.length) return endGame(true);
        
        // Xóa ảnh địch cũ
        document.getElementById('e-sprite').src = ""; 
        
        await new Promise(r => setTimeout(r, 1000));
        await spawnSequence('enemy');
    }
    if(p && p.currentHp <= 0) {
        addLog(`${p.name} fainted!`);
        const nxt = pTeam.findIndex(x => x.currentHp > 0);
        if(nxt === -1) return endGame(false);
        
        // Xóa ảnh người chơi cũ
        document.getElementById('p-sprite').src = ""; 
        
        pIdx = nxt; 
        await new Promise(r => setTimeout(r, 1000));
        await spawnSequence('player');
    }
}

async function switchP(i) {
    if(busy || switchCountLeft <= 0) return;
    playSfx('switch');
    busy = true; 
    switchCountLeft--;
    
    addLog(`Come back ${pTeam[pIdx].name}! Go ${pTeam[i].name}!`);

    // --- THÊM DÒNG NÀY ĐỂ XÓA ẢNH CŨ LẬP TỨC ---
    document.getElementById('p-sprite').src = ""; 
    // ------------------------------------------

    pIdx = i; 
    await spawnSequence('player');
    updateUI(); 
    setTimeout(enemyTurn, 800);
}

function updateUI() {
    const p = pTeam[pIdx], e = eTeam[eIdx];
    if(!p || !e) return;
    
    // Cập nhật tên và hệ
    document.getElementById('p-name').innerText = p.name;
    document.getElementById('p-type-slot').innerHTML = `<span class="type-badge-inline" style="background:${TYPE_COLORS[p.type]}">${p.type}</span>`;
    document.getElementById('e-name').innerText = e.name;
    document.getElementById('e-type-slot').innerHTML = `<span class="type-badge-inline" style="background:${TYPE_COLORS[e.type]}">${e.type}</span>`;
    
    // Cập nhật máu
    document.getElementById('p-hp-fill').style.width = (p.currentHp/p.hp*100) + '%';
    document.getElementById('p-hp-text').innerText = `${p.currentHp}/${p.hp}`;
    document.getElementById('e-hp-fill').style.width = (e.currentHp/e.hp*100) + '%';
    
    // Cập nhật nộ
    document.getElementById('p-fury-fill').style.width = Math.min(100, p.fury)+'%';
    document.getElementById('e-fury-fill').style.width = Math.min(100, e.fury)+'%';
    
    // Cập nhật ảnh (Fix lỗi hiện Pokemon cũ)
    const pSprite = document.getElementById('p-sprite');
    const eSprite = document.getElementById('e-sprite');
    if (pSprite.style.opacity !== "0") pSprite.src = p.s;
    if (eSprite.style.opacity !== "0") eSprite.src = e.f;
    
    // Cập nhật trạng thái bóng Poke
    document.getElementById('p-balls').innerHTML = pTeam.map(pk => `<div class="w-2 h-2 rounded-full ${pk.currentHp <= 0 ? 'bg-gray-400' : 'bg-red-500'}"></div>`).join('');
    document.getElementById('e-balls').innerHTML = eTeam.map(pk => `<div class="w-2 h-2 rounded-full ${pk.currentHp <= 0 ? 'bg-gray-400' : 'bg-red-500'}"></div>`).join('');
    
    if(p.currentHp > 0 && p.currentHp < (p.hp * 0.2)) playSfx('low-hp');

    // VẼ LẠI SKILLS-BOX (Nút chiêu thức)
    document.getElementById('skills-box').innerHTML = p.skills.map((s, i) => {
        const ready = !s.isU || p.fury >= 100;
        return `<button onclick="doAction(${i})" ${busy || !ready ? 'disabled' : ''} class="btn-pk pixel-font ${s.isU ? (ready ? 'btn-ult-ready' : 'btn-ult-disabled') : ''}">${s.n}</button>`;
    }).join('') + `<button onclick="useDynamax()" ${busy || pDynamaxUsedInGame ? 'disabled' : ''} class="btn-pk btn-dynamax pixel-font">DYNAMAX</button>`;
    
    // VẼ LẠI SWITCH-BOX (Nút đổi Pokemon)
    document.getElementById('switch-box').innerHTML = pTeam.map((pk, i) => {
        if(i === pIdx) return '';
        return `<button onclick="switchP(${i})" ${busy || switchCountLeft <= 0 || pk.currentHp <= 0 ? 'disabled' : ''} class="switch-btn-card">
            <img src="${pk.f}" class="w-10 h-10 pixel-img">
            <div class="flex flex-col flex-1 items-start">
                <span class="pixel-font text-[6px] text-left">${pk.name}</span>
                <div class="w-full bg-gray-200 h-1 mt-1">
                    <div class="h-full bg-green-400" style="width: ${pk.currentHp/pk.hp*100}%"></div>
                </div>
            </div>
        </button>`;
    }).join('');
    
    document.getElementById('switch-limit-text').innerText = `Switches: ${switchCountLeft} left`;
}

function addLog(m) {
    const lb = document.getElementById('log-box');
    
    // Nếu là tin nhắn khởi tạo mặc định, xóa nó đi để bắt đầu lưu log thật
    if (lb.innerText === "Arena Ready... Battle Start!") {
        lb.innerHTML = "";
    }

    // Tạo phần tử div mới cho mỗi hành động
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span style="color: #666; margin-right: 5px;">></span> ${m}`;
    
    // Đôn tin nhắn cũ xuống bằng cách chèn tin nhắn mới vào đầu (Stack)
    lb.prepend(entry); 
    
    // Tự động cuộn lên đầu để người chơi luôn thấy tin nhắn mới nhất ngay lập tức
    lb.scrollTop = 0;
}
function toggleSearch() {
    // Phát tiếng kêu khi bấm (tận dụng hàm có sẵn của game)
    if(typeof playSfx === 'function') playSfx('click');

    // Tìm ô nhập liệu để tìm kiếm Pokemon
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
        // Cuộn mượt tới ô tìm kiếm
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Nháy ô tìm kiếm để người dùng thấy
        searchInput.focus();
        searchInput.style.outline = "3px solid #fbbf24";
        setTimeout(() => { searchInput.style.outline = "none"; }, 1500);
    }
}
function executeManualSearch() {
    if(typeof playSfx === 'function') playSfx('click');
    renderPokedex();
}

// Xử lý Click ra ngoài để Reset Search
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('manual-search-input');
    const searchBtn = event.target.closest('button[onclick="executeManualSearch()"]');
    const pokedexArea = document.getElementById('pokedex');

    if (!searchInput) return;

    // Các trường hợp KHÔNG reset:
    // 1. Click trực tiếp vào ô input
    // 2. Click vào nút Search
    // 3. Click vào vùng hiển thị Pokemon (để chọn pokemon)
    const isClickInsideSearch = (event.target === searchInput) || searchBtn;
    const isClickInsidePokedex = pokedexArea && pokedexArea.contains(event.target);

    if (!isClickInsideSearch && !isClickInsidePokedex) {
        if (searchInput.value !== "") {
            searchInput.value = ""; // Xóa chữ
            renderPokedex();        // Hiện lại toàn bộ
        }
    }
});

// Chặn reset khi click vào ô input
document.getElementById('manual-search-input')?.addEventListener('click', (e) => {
    e.stopPropagation();
});

function endGame(w) { 
    playSfx(w ? 'win' : 'game-over');
    document.getElementById('overlay').classList.replace('hidden', 'flex'); 
    document.getElementById('over-title').innerText = w ? "VICTORY" : "DEFEAT"; 
}

function quitGame() { 
    playSfx('click');
    document.getElementById('shutdown-screen').style.display = 'flex'; 
}

const fCon = document.getElementById('filter-container');
["ALL", ...Object.keys(TYPE_COLORS)].forEach(t => {
    const b = document.createElement('div'); b.className = `filter-pill pixel-font ${t==='ALL'?'active':''}`;
    b.innerText = t; b.style.backgroundColor = t === 'ALL' ? '#444' : TYPE_COLORS[t];
    b.onclick = () => { 
        playSfx('click');
        document.querySelectorAll('.filter-pill').forEach(el => el.classList.remove('active')); 
        b.classList.add('active'); currentFilter = t; renderPokedex(); 
    };
    fCon.appendChild(b);
});
setDifficulty('EASY');