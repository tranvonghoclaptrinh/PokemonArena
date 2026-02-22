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
        el.currentTime = 0; // Reset về đầu để có thể phát liên tục
        el.play().catch(err => console.log("Audio error:", id, err));
    } else {
        console.warn("Missing audio element: audio-" + id);
    }
}

const POKEMON_DB = {};
const REAL_TYPE_MAP = {
1:["GRASS","POISON"],2:["GRASS","POISON"],3:["GRASS","POISON"],
4:["FIRE"],5:["FIRE"],6:["FIRE","FLYING"],
7:["WATER"],8:["WATER"],9:["WATER"],
10:["BUG"],11:["BUG"],12:["BUG","FLYING"],
13:["BUG","POISON"],14:["BUG","POISON"],15:["BUG","POISON"],
16:["NORMAL","FLYING"],17:["NORMAL","FLYING"],18:["NORMAL","FLYING"],
19:["NORMAL"],20:["NORMAL"],
21:["NORMAL","FLYING"],22:["NORMAL","FLYING"],
23:["POISON"],24:["POISON"],
25:["ELECTRIC"],26:["ELECTRIC"],
27:["GROUND"],28:["GROUND"],
29:["POISON"],30:["POISON"],31:["POISON","GROUND"],
32:["POISON"],33:["POISON"],34:["POISON","GROUND"],
35:["FAIRY"],36:["FAIRY"],
37:["FIRE"],38:["FIRE"],
39:["NORMAL","FAIRY"],40:["NORMAL","FAIRY"],
41:["POISON","FLYING"],42:["POISON","FLYING"],
43:["GRASS","POISON"],44:["GRASS","POISON"],45:["GRASS","POISON"],
46:["BUG","GRASS"],47:["BUG","GRASS"],
48:["BUG","POISON"],49:["BUG","POISON"],
50:["GROUND"],51:["GROUND"],
52:["NORMAL"],53:["NORMAL"],
54:["WATER"],55:["WATER"],
56:["FIGHTING"],57:["FIGHTING"],
58:["FIRE"],59:["FIRE"],
60:["WATER"],61:["WATER"],62:["WATER","FIGHTING"],
63:["PSYCHIC"],64:["PSYCHIC"],65:["PSYCHIC"],
66:["FIGHTING"],67:["FIGHTING"],68:["FIGHTING"],
69:["GRASS","POISON"],70:["GRASS","POISON"],71:["GRASS","POISON"],
72:["WATER","POISON"],73:["WATER","POISON"],
74:["ROCK","GROUND"],75:["ROCK","GROUND"],76:["ROCK","GROUND"],
77:["FIRE"],78:["FIRE"],
79:["WATER","PSYCHIC"],80:["WATER","PSYCHIC"],
81:["ELECTRIC","STEEL"],82:["ELECTRIC","STEEL"],
83:["NORMAL","FLYING"],84:["NORMAL","FLYING"],85:["NORMAL","FLYING"],
86:["WATER"],87:["WATER","ICE"],
88:["POISON"],89:["POISON"],
90:["WATER"],91:["WATER","ICE"],
92:["GHOST","POISON"],93:["GHOST","POISON"],94:["GHOST","POISON"],
95:["ROCK","GROUND"],
96:["PSYCHIC"],97:["PSYCHIC"],
98:["WATER"],99:["WATER"],
100:["ELECTRIC"],101:["ELECTRIC"],
102:["GRASS","PSYCHIC"],103:["GRASS","PSYCHIC"],
104:["GROUND"],105:["GROUND"],
106:["FIGHTING"],107:["FIGHTING"],
108:["NORMAL"],
109:["POISON"],110:["POISON"],
111:["GROUND","ROCK"],112:["GROUND","ROCK"],
113:["NORMAL"],
114:["GRASS"],
115:["NORMAL"],
116:["WATER"],117:["WATER"],
118:["WATER"],119:["WATER"],
120:["WATER"],121:["WATER","PSYCHIC"],
122:["PSYCHIC","FAIRY"],
123:["BUG","FLYING"],
124:["ICE","PSYCHIC"],
125:["ELECTRIC"],
126:["FIRE"],
127:["BUG"],
128:["NORMAL"],
129:["WATER"],130:["WATER","FLYING"],
131:["WATER","ICE"],
132:["NORMAL"],
133:["NORMAL"],
134:["WATER"],135:["ELECTRIC"],136:["FIRE"],
137:["NORMAL"],
138:["ROCK","WATER"],139:["ROCK","WATER"],140:["ROCK","WATER"],141:["ROCK","WATER"],
142:["ROCK","FLYING"],
143:["NORMAL"],
144:["ICE","FLYING"],145:["ELECTRIC","FLYING"],146:["FIRE","FLYING"],
147:["DRAGON"],148:["DRAGON"],149:["DRAGON","FLYING"],
150:["PSYCHIC"],151:["PSYCHIC"],
152:["GRASS"],153:["GRASS"],154:["GRASS"],
155:["FIRE"],156:["FIRE"],157:["FIRE"],
158:["WATER"],159:["WATER"],160:["WATER"],
161:["NORMAL"],162:["NORMAL"],
163:["NORMAL","FLYING"],164:["NORMAL","FLYING"],
165:["BUG","FLYING"],166:["BUG","FLYING"],
167:["BUG","POISON"],168:["BUG","POISON"],
169:["POISON","FLYING"],
170:["WATER","ELECTRIC"],171:["WATER","ELECTRIC"],
172:["ELECTRIC"],
173:["FAIRY"],
174:["NORMAL","FAIRY"],
175:["FAIRY"],176:["FAIRY","FLYING"],
177:["PSYCHIC","FLYING"],178:["PSYCHIC","FLYING"],
179:["ELECTRIC"],180:["ELECTRIC"],181:["ELECTRIC"],
182:["GRASS"],
183:["WATER","FAIRY"],184:["WATER","FAIRY"],
185:["ROCK"],
186:["WATER"],
187:["GRASS","FLYING"],188:["GRASS","FLYING"],189:["GRASS","FLYING"],
190:["NORMAL"],
191:["GRASS"],192:["GRASS"],
193:["BUG","FLYING"],
194:["WATER","GROUND"],195:["WATER","GROUND"],
196:["PSYCHIC"],
197:["DARK"],
198:["DARK","FLYING"],
199:["WATER","PSYCHIC"],
200:["GHOST"],
201:["PSYCHIC"],
202:["PSYCHIC"],
203:["NORMAL","PSYCHIC"],
204:["BUG"],
205:["BUG","STEEL"],
206:["NORMAL"],
207:["GROUND","FLYING"],
208:["STEEL","GROUND"],
209:["FAIRY"],210:["FAIRY"],
211:["WATER","POISON"],
212:["BUG","STEEL"],
213:["BUG","ROCK"],
214:["BUG","FIGHTING"],
215:["DARK","ICE"],
216:["NORMAL"],217:["NORMAL"],
218:["FIRE"],219:["FIRE","ROCK"],
220:["ICE","GROUND"],221:["ICE","GROUND"],
222:["WATER","ROCK"],
223:["WATER"],224:["WATER"],
225:["ICE","FLYING"],
226:["WATER","FLYING"],
227:["DARK","STEEL"],
228:["DARK","FIRE"],229:["DARK","FIRE"],
230:["WATER","DRAGON"],
231:["GROUND"],232:["GROUND"],
233:["NORMAL"],
234:["NORMAL"],
235:["NORMAL"],
236:["FIGHTING"],237:["FIGHTING"],
238:["ICE","PSYCHIC"],
239:["ELECTRIC"],
240:["FIRE"],
241:["NORMAL"],
242:["NORMAL"],
243:["ELECTRIC"],
244:["FIRE"],
245:["WATER"],
246:["ROCK","GROUND"],247:["ROCK","GROUND"],
248:["ROCK","DARK"],
249:["PSYCHIC","FLYING"],
250:["FIRE","FLYING"],
251:["PSYCHIC","GRASS"],
252:["GRASS"],253:["GRASS"],254:["GRASS"],
255:["FIRE"],256:["FIRE","FIGHTING"],257:["FIRE","FIGHTING"],
258:["WATER"],259:["WATER","GROUND"],260:["WATER","GROUND"],
261:["DARK"],262:["DARK"],
263:["NORMAL"],264:["NORMAL"],
265:["BUG"],266:["BUG"],267:["BUG","FLYING"],
268:["BUG"],269:["BUG","POISON"],
270:["WATER","GRASS"],271:["WATER","GRASS"],272:["WATER","GRASS"],
273:["GRASS","DARK"],274:["GRASS","DARK"],275:["GRASS","DARK"],
276:["NORMAL","FLYING"],277:["NORMAL","FLYING"],
278:["WATER","FLYING"],279:["WATER","FLYING"],
280:["PSYCHIC","FAIRY"],281:["PSYCHIC","FAIRY"],282:["PSYCHIC","FAIRY"],
283:["BUG","WATER"],284:["BUG","FLYING"],
285:["GRASS"],286:["GRASS","FIGHTING"],
287:["NORMAL"],288:["NORMAL"],289:["NORMAL"],
290:["BUG","GROUND"],291:["BUG","FLYING"],292:["BUG","GHOST"],
293:["NORMAL"],294:["NORMAL"],295:["NORMAL"],
296:["FIGHTING"],297:["FIGHTING"],
298:["NORMAL","FAIRY"],
299:["ROCK"],
300:["NORMAL"],301:["NORMAL"],
302:["DARK","GHOST"],
303:["STEEL","FAIRY"],
304:["STEEL","ROCK"],305:["STEEL","ROCK"],306:["STEEL","ROCK"],
307:["FIGHTING","PSYCHIC"],308:["FIGHTING","PSYCHIC"],
309:["ELECTRIC"],310:["ELECTRIC"],
311:["ELECTRIC"],312:["ELECTRIC"],
313:["BUG"],314:["BUG"],
315:["GRASS","POISON"],
316:["POISON"],317:["POISON"],
318:["WATER","DARK"],319:["WATER","DARK"],
320:["WATER"],321:["WATER"],
322:["FIRE","GROUND"],323:["FIRE","GROUND"],
324:["FIRE"],
325:["PSYCHIC"],326:["PSYCHIC"],
327:["NORMAL"],
328:["GROUND"],
329:["GROUND","DRAGON"],330:["GROUND","DRAGON"],
331:["GRASS"],332:["GRASS","DARK"],
333:["NORMAL","FLYING"],334:["DRAGON","FLYING"],
335:["NORMAL"],
336:["POISON"],
337:["ROCK","PSYCHIC"],338:["ROCK","PSYCHIC"],
339:["WATER","GROUND"],340:["WATER","GROUND"],
341:["WATER"],342:["WATER","DARK"],
343:["GROUND","PSYCHIC"],344:["GROUND","PSYCHIC"],
345:["ROCK","GRASS"],346:["ROCK","GRASS"],
347:["ROCK","BUG"],348:["ROCK","BUG"],
349:["WATER"],350:["WATER"],
351:["NORMAL"],
352:["NORMAL"],
353:["GHOST"],354:["GHOST"],
355:["GHOST"],356:["GHOST"],
357:["GRASS","FLYING"],
358:["PSYCHIC"],
359:["DARK"],
360:["PSYCHIC"],
361:["ICE"],362:["ICE"],
363:["ICE","WATER"],364:["ICE","WATER"],365:["ICE","WATER"],
366:["WATER"],367:["WATER"],368:["WATER"],
369:["WATER","ROCK"],
370:["WATER"],
371:["DRAGON"],372:["DRAGON"],373:["DRAGON","FLYING"],
374:["STEEL","PSYCHIC"],375:["STEEL","PSYCHIC"],376:["STEEL","PSYCHIC"],
377:["ROCK"],
378:["ICE"],
379:["STEEL"],
380:["DRAGON","PSYCHIC"],381:["DRAGON","PSYCHIC"],
382:["WATER"],
383:["GROUND"],
384:["DRAGON","FLYING"],
385:["STEEL","PSYCHIC"],
386:["PSYCHIC"],
387:["GRASS"],388:["GRASS"],389:["GRASS","GROUND"],
390:["FIRE"],391:["FIRE","FIGHTING"],392:["FIRE","FIGHTING"],
393:["WATER"],394:["WATER"],395:["WATER","STEEL"],
396:["NORMAL","FLYING"],397:["NORMAL","FLYING"],398:["NORMAL","FLYING"],
399:["NORMAL"],400:["NORMAL","WATER"],
401:["BUG"],402:["BUG"],
403:["ELECTRIC"],404:["ELECTRIC"],405:["ELECTRIC"],
406:["GRASS","POISON"],407:["GRASS","POISON"],
408:["ROCK"],409:["ROCK"],
410:["ROCK","STEEL"],411:["ROCK","STEEL"],
412:["BUG"],413:["BUG","GRASS"],414:["BUG","FLYING"],
415:["BUG","FLYING"],416:["BUG","FLYING"],
417:["ELECTRIC"],
418:["WATER"],419:["WATER"],
420:["GRASS"],421:["GRASS"],
422:["WATER"],423:["WATER","GROUND"],
424:["NORMAL"],
425:["GHOST","FLYING"],426:["GHOST","FLYING"],
427:["NORMAL"],428:["NORMAL"],
429:["GHOST"],
430:["DARK","FLYING"],
431:["NORMAL"],432:["NORMAL"],
433:["PSYCHIC"],
434:["POISON","DARK"],435:["POISON","DARK"],
436:["STEEL","PSYCHIC"],437:["STEEL","PSYCHIC"],
438:["ROCK"],
439:["PSYCHIC","FAIRY"],
440:["NORMAL"],
441:["NORMAL","FLYING"],
442:["DARK","GHOST"],
443:["DRAGON","GROUND"],444:["DRAGON","GROUND"],445:["DRAGON","GROUND"],
446:["NORMAL"],
447:["FIGHTING"],448:["FIGHTING","STEEL"],
449:["GROUND"],450:["GROUND"],
451:["POISON","BUG"],
452:["POISON","DARK"],
453:["POISON","FIGHTING"],454:["POISON","FIGHTING"],
455:["GRASS"],
456:["WATER"],457:["WATER"],
458:["WATER","FLYING"],
459:["GRASS","ICE"],460:["GRASS","ICE"],
461:["DARK","ICE"],
462:["ELECTRIC","STEEL"],
463:["NORMAL"],
464:["GROUND","ROCK"],
465:["GRASS"],
466:["ELECTRIC"],
467:["FIRE"],
468:["FAIRY","FLYING"],
469:["BUG","FLYING"],
470:["GRASS"],
471:["ICE"],
472:["GROUND","FLYING"],
473:["ICE","GROUND"],
474:["NORMAL"],
475:["PSYCHIC","FIGHTING"],
476:["ROCK","STEEL"],
477:["GHOST"],
478:["ICE","GHOST"],
479:["ELECTRIC","GHOST"],
480:["PSYCHIC"],481:["PSYCHIC"],482:["PSYCHIC"],
483:["STEEL","DRAGON"],
484:["WATER","DRAGON"],
485:["FIRE","STEEL"],
486:["NORMAL"],
487:["GHOST","DRAGON"],
488:["PSYCHIC"],
489:["WATER"],490:["WATER"],
491:["DARK"],
492:["GRASS"],
493:["NORMAL"]
};

// 1. Khởi tạo Database cho 493 Pokémon
for (let id = 1; id <= 493; id++) {
    let types = [];
    
    // KIỂM TRA: Nếu ID có trong REAL_TYPE_MAP thì lấy hệ chuẩn
    if (REAL_TYPE_MAP[id]) {
        types = [...REAL_TYPE_MAP[id]];
    } else {
        // Nếu chưa định nghĩa trong REAL_TYPE_MAP, dùng logic ngẫu nhiên như cũ
        const firstType = Object.keys(TYPE_COLORS)[id % 18];
        types.push(firstType);
        if (id % 2 === 0) {
            const secondType = Object.keys(TYPE_COLORS)[(id + 5) % 18];
            if (secondType !== firstType) types.push(secondType);
        }
    }

    POKEMON_DB[id] = { 
        name: `PM-${id}`, 
        types: types, 
        isLeg: false 
    };
}

// 2. Gán tên thật (Giữ nguyên mảng COMMON_NAMES của bạn)
const GEN_1_NAMES = ["BULBASAUR", "IVYSAUR", "VENUSAUR", "CHARMANDER", "CHARMELEON", "CHARIZARD", "SQUIRTLE", "WARTORTLE", "BLASTOISE", "CATERPIE", "METAPOD", "BUTTERFREE", "WEEDLE", "KAKUNA", "BEEDRILL", "PIDGEY", "PIDGEOTTO", "PIDGEOT", "RATTATA", "RATICATE", "SPEAROW", "FEAROW", "EKANS", "ARBOK", "PIKACHU", "RAICHU", "SANDSHREW", "SANDSLASH", "NIDORAN♀", "NIDORINA", "NIDOQUEEN", "NIDORAN♂", "NIDORINO", "NIDOKING", "CLEFAIRY", "CLEFABLE", "VULPIX", "NINETALES", "JIGGLYPUFF", "WIGGLYTUFF", "ZUBAT", "GOLBAT", "ODDISH", "GLOOM", "VILEPLUME", "PARAS", "PARASECT", "VENONAT", "VENOMOTH", "DIGLETT", "DUGTRIO", "MEOWTH", "PERSIAN", "PSYDUCK", "GOLDUCK", "MANKEY", "PRIMEAPE", "GROWLITHE", "ARCANINE", "POLIWAG", "POLIWHIRL", "POLIWRATH", "ABRA", "KADABRA", "ALAKAZAM", "MACHOP", "MACHOKE", "MACHAMP", "BELLSPROUT", "WEEPINBELL", "VICTREEBEL", "TENTACOOL", "TENTACRUEL", "GEODUDE", "GRAVELER", "GOLEM", "PONYTA", "RAPIDASH", "SLOWPOKE", "SLOWBRO", "MAGNEMITE", "MAGNETON", "FARFETCH'D", "DODUO", "DODRIO", "SEEL", "DEWGONG", "GRIMER", "MUK", "SHELLDER", "CLOYSTER", "GASTLY", "HAUNTER", "GENGAR", "ONIX", "DROWZEE", "HYPNO", "KRABBY", "KINGLER", "VOLTORB","ELECTRODE", "EXEGGCUTE", "EXEGGUTOR", "CUBONE", "MAROWAK", "HITMONLEE", "HITMONCHAN", "LICKITUNG", "KOFFING", "WEEZING", "RHYHORN", "RHYDON", "CHANSEY", "TANGELA", "KANGASKHAN", "HORSEA", "SEADRA", "GOLDEEN", "SEAKING", "STARYU", "STARMIE", "MR. MIME", "SCYTHER", "JYNX", "ELECTABUZZ", "MAGMAR", "PINSIR", "TAUROS", "MAGIKARP", "GYARADOS", "LAPRAS", "DITTO", "EEVEE", "VAPOREON", "JOLTEON", "FLAREON", "PORYGON", "OMANYTE", "OMASTAR", "KABUTO", "KABUTOPS", "AERODACTYL", "SNORLAX", "DRATINI", "DRAGONAIR", "DRAGONITE","MEWTWO", "MEW"];
const GEN_2_NAMES = ["CHIKORITA","BAYLEEF","MEGANIUM","CYNDAQUIL","QUILAVA","TYPHLOSION","TOTODILE","CROCONAW","FERALIGATR","SENTRET","FURRET","HOOTHOOT","NOCTOWL","LEDYBA","LEDIAN","SPINARAK","ARIADOS","CROBAT","CHINCHOU","LANTURN","PICHU","CLEFFA","IGGLYBUFF","TOGEPI","TOGETIC","NATU","XATU","MAREEP","FLAAFFY","AMPHAROS","BELLOSSOM","MARILL","AZUMARILL","SUDOWOODO","POLITOED","HOPPIP","SKIPLOOM","JUMPLUFF","AIPOM","SUNKERN","SUNFLORA","YANMA","WOOPER","QUAGSIRE","ESPEON","UMBREON","MURKROW","SLOWKING","MISDREAVUS","UNOWN","WOBBUFFET","GIRAFARIG","PINECO","FORRETRESS","DUNSPARCE","GLIGAR","STEELIX","SNUBBULL","GRANBULL","QWILFISH","SCIZOR","SHUCKLE","HERACROSS","SNEASEL","TEDDIURSA","URSARING","SLUGMA","MAGCARGO","SWINUB","PILOSWINE","CORSOLA","REMORAID","OCTILLERY","DELIBIRD","MANTINE","SKARMORY","HOUNDOUR","HOUNDOOM","KINGDRA","PHANPY","DONPHAN","PORYGON2","STANTLER","SMEARGLE","TYROGUE","HITMONTOP","SMOOCHUM","ELEKID","MAGBY","MILTANK","BLISSEY","RAIKOU","ENTEI","SUICUNE","LARVITAR","PUPITAR","TYRANITAR","LUGIA","HO-OH","CELEBI"];
const GEN_3_NAMES = ["TREECKO","GROVYLE","SCEPTILE","TORCHIC","COMBUSKEN","BLAZIKEN","MUDKIP","MARSHTOMP","SWAMPERT","POOCHYENA","MIGHTYENA","ZIGZAGOON","LINOONE","WURMPLE","SILCOON","BEAUTIFLY","CASCOON","DUSTOX","LOTAD","LOMBRE","LUDICOLO","SEEDOT","NUZLEAF","SHIFTRY","TAILLOW","SWELLOW","WINGULL","PELIPPER","RALTS","KIRLIA","GARDEVOIR","SURSKIT","MASQUERAIN","SHROOMISH","BRELOOM","SLAKOTH","VIGOROTH","SLAKING","NINCADA","NINJASK","SHEDINJA","WHISMUR","LOUDRED","EXPLOUD","MAKUHITA","HARIYAMA","AZURILL","NOSEPASS","SKITTY","DELCATTY","SABLEYE","MAWILE","ARON","LAIRON","AGGRON","MEDITITE","MEDICHAM","ELECTRIKE","MANECTRIC","PLUSLE","MINUN","VOLBEAT","ILLUMISE","ROSELIA","GULPIN","SWALOT","CARVANHA","SHARPEDO","WAILMER","WAILORD","NUMEL","CAMERUPT","TORKOAL","SPOINK","GRUMPIG","SPINDA","TRAPINCH","VIBRAVA","FLYGON","CACNEA","CACTURNE","SWABLU","ALTARIA","ZANGOOSE","SEVIPER","LUNATONE","SOLROCK","BARBOACH","WHISCASH","CORPHISH","CRAWDAUNT","BALTOY","CLAYDOL","LILEEP","CRADILY","ANORITH","ARMALDO","FEEBAS","MILOTIC","CASTFORM","KECLEON","SHUPPET","BANETTE","DUSKULL","DUSCLOPS","TROPIUS","CHIMECHO","ABSOL","WYNAUT","SNORUNT","GLALIE","SPHEAL","SEALEO","WALREIN","CLAMPERL","HUNTAIL","GOREBYSS","RELICANTH","LUVDISC","BAGON","SHELGON","SALAMENCE","BELDUM","METANG","METAGROSS","REGIROCK","REGICE","REGISTEEL","LATIAS","LATIOS","KYOGRE","GROUDON","RAYQUAZA","JIRACHI","DEOXYS"];
const GEN_4_NAMES = ["TURTWIG","GROTLE","TORTERRA","CHIMCHAR","MONFERNO","INFERNAPE","PIPLUP","PRINPLUP","EMPOLEON","STARLY","STARAVIA","STARAPTOR","BIDOOF","BIBAREL","KRICKETOT","KRICKETUNE","SHINX","LUXIO","LUXRAY","BUDEW","ROSERADE","CRANIDOS","RAMPARDOS","SHIELDON","BASTIODON","BURMY","WORMADAM","MOTHIM","COMBEE","VESPIQUEN","PACHIRISU","BUIZEL","FLOATZEL","CHERUBI","CHERRIM","SHELLOS","GASTRODON","AMBIPOM","DRIFLOON","DRIFBLIM","BUNEARY","LOPUNNY","MISMAGIUS","HONCHKROW","GLAMEOW","PURUGLY","CHINGLING","STUNKY","SKUNTANK","BRONZOR","BRONZONG","BONSLY","MIME JR.","HAPPINY","CHATOT","SPIRITOMB","GIBLE","GABITE","GARCHOMP","MUNCHLAX","RIOLU","LUCARIO","HIPPOPOTAS","HIPPOWDON","SKORUPI","DRAPION","CROAGUNK","TOXICROAK","CARNIVINE","FINNEON","LUMINEON","MANTYKE","SNOVER","ABOMASNOW","WEAVILE","MAGNEZONE","LICKILICKY","RHYPERIOR","TANGROWTH","ELECTIVIRE","MAGMORTAR","TOGEKISS","YANMEGA","LEAFEON","GLACEON","GLISCOR","MAMOSWINE","PORYGON-Z","GALLADE","PROBOPASS","DUSKNOIR","FROSLASS","ROTOM","UXIE","MESPRIT","AZELF","DIALGA","PALKIA","HEATRAN","REGIGIGAS","GIRATINA","CRESSELIA","MANAPHY","PHIONE","DARKRAI","SHAYMIN","ARCEUS"];
const COMMON_NAMES = [...GEN_1_NAMES, ...GEN_2_NAMES, ...GEN_3_NAMES, ...GEN_4_NAMES];
GEN_1_NAMES.forEach((name, i) => {
    if (POKEMON_DB[i]) {
        POKEMON_DB[i].name = name;
    }
});

GEN_2_NAMES.forEach((name, i) => {
    if (POKEMON_DB[i + 151]) {
        POKEMON_DB[i + 151].name = name;
    }
});

GEN_3_NAMES.forEach((name, i) => {
    if (POKEMON_DB[i + 251]) {
        POKEMON_DB[i + 251].name = name;
    }
});

GEN_4_NAMES.forEach((name, i) => {
    if (POKEMON_DB[i + 386]) {
        POKEMON_DB[i + 386].name = name;
    }
});

// 3. Chuẩn hóa SONG HỆ cho toàn bộ Huyền thoại
const LEGENDARY_DATA = {
    // --- GENERATION 1 ---
    144: { name: "ARTICUNO", types: ["ICE", "FLYING"], ult: "BLIZZARD", power: 150 },
    145: { name: "ZAPDOS", types: ["ELECTRIC", "FLYING"], ult: "THUNDER", power: 150 },
    146: { name: "MOLTRES", types: ["FIRE", "FLYING"], ult: "SKY ATTACK", power: 160 },
    150: { name: "MEWTWO", types: ["PSYCHIC"], ult: "PSYSTRIKE", power: 180 },
    151: { name: "MEW", types: ["PSYCHIC"], ult: "GENESIS SUPERNOVA", power: 190 },

    // --- GENERATION 2 ---
    243: { name: "RAIKOU", types: ["ELECTRIC"], ult: "THUNDER FANG", power: 140 },
    244: { name: "ENTEI", types: ["FIRE"], ult: "SACRED FIRE", power: 160 },
    245: { name: "SUICUNE", types: ["WATER"], ult: "HYDRO PUMP", power: 150 },
    249: { name: "LUGIA", types: ["PSYCHIC", "FLYING"], ult: "AEROBLAST", power: 170 },
    250: { name: "HO-OH", types: ["FIRE", "FLYING"], ult: "SACRED FIRE", power: 170 },
    251: { name: "CELEBI", types: ["GRASS", "PSYCHIC"], ult: "TIME TRAVEL", power: 150 },

    // --- GENERATION 3 ---
    377: { name: "REGIROCK", types: ["ROCK"], ult: "STONE EDGE", power: 140 },
    378: { name: "REGICE", types: ["ICE"], ult: "ICE BEAM", power: 140 },
    379: { name: "REGISTEEL", types: ["STEEL"], ult: "FLASH CANNON", power: 140 },
    380: { name: "LATIAS", types: ["DRAGON", "PSYCHIC"], ult: "MIST BALL", power: 160 },
    381: { name: "LATIOS", types: ["DRAGON", "PSYCHIC"], ult: "LUSTER PURGE", power: 160 },
    382: { name: "KYOGRE", types: ["WATER"], ult: "ORIGIN PULSE", power: 190 },
    383: { name: "GROUDON", types: ["GROUND"], ult: "PRECIPICE BLADES", power: 190 },
    384: { name: "RAYQUAZA", types: ["DRAGON", "FLYING"], ult: "DRAGON ASCENT", power: 200 },
    385: { name: "JIRACHI", types: ["STEEL", "PSYCHIC"], ult: "DOOM DESIRE", power: 170 },
    386: { name: "DEOXYS", types: ["PSYCHIC"], ult: "PSYCHO BOOST", power: 180 },

    // --- GENERATION 4 ---
    480: { name: "UXIE", types: ["PSYCHIC"], ult: "FUTURE SIGHT", power: 140 },
    481: { name: "MESPRIT", types: ["PSYCHIC"], ult: "EXTRASENSORY", power: 140 },
    482: { name: "AZELF", types: ["PSYCHIC"], ult: "LAST RESORT", power: 140 },
    483: { name: "DIALGA", types: ["STEEL", "DRAGON"], ult: "ROAR OF TIME", power: 200 },
    484: { name: "PALKIA", types: ["WATER", "DRAGON"], ult: "SPACIAL REND", power: 180 },
    485: { name: "HEATRAN", types: ["FIRE", "STEEL"], ult: "MAGMA STORM", power: 170 },
    486: { name: "REGIGIGAS", types: ["NORMAL"], ult: "CRUSH GRIP", power: 190 },
    487: { name: "GIRATINA", types: ["GHOST", "DRAGON"], ult: "SHADOW FORCE", power: 190 },
    488: { name: "CRESSELIA", types: ["PSYCHIC"], ult: "MOONBLAST", power: 150 },
    489: { name: "PHIONE", types: ["WATER"], ult: "SCALD", power: 130 },
    490: { name: "MANAPHY", types: ["WATER"], ult: "HEART SWAP", power: 140 },
    491: { name: "DARKRAI", types: ["DARK"], ult: "DARK VOID", power: 170 },
    492: { name: "SHAYMIN", types: ["GRASS"], ult: "SEED FLARE", power: 160 },
    493: { name: "ARCEUS", types: ["NORMAL"], ult: "JUDGMENT", power: 300 },
    494: { name: "VICTINI", types: ["FIRE", "PSYCHIC"], ult: "V-CREATE", power: 220 }
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
function createBoss(id, difficulty = "BOSS_MEDIUM") {

    const isHard = difficulty === "BOSS_HARD";

    const bosses = {

        // ===============================
        // SHADOW MEWTWO
        // ===============================
        150: {
            id: 150,
            name: "SHADOW MEWTWO",
            types: ["PSYCHIC", "GHOST"],
            hp: isHard ? 2600 : 2200,
            scale: 1.6,
            isBoss: true,
            difficulty,
            isDark: true,
            skills: isHard ? [
                { n: "PSYCHO BREAK", type: "PSYCHIC", d: 250 },
                { n: "SHADOW SPHERE", type: "GHOST", d: 270 },
                { n: "GENETIC NOVA", type: "PSYCHIC", d: 650, isU: true }
            ] : [
                { n: "PSYCHO BREAK", type: "PSYCHIC", d: 220 },
                { n: "SHADOW SPHERE", type: "GHOST", d: 240 },
                { n: "GENETIC NOVA", type: "PSYCHIC", d: 580, isU: true }
            ]
        },

        // ===============================
        // PRIMAL GROUDON
        // ===============================
        383: {
            id: 383,
            name: "PRIMAL GROUDON",
            types: ["GROUND", "FIRE"],
            hp: isHard ? 3200 : 2600,
            scale: 1.7,
            isBoss: true,
            difficulty,
            isDark: true,
            skills: isHard ? [
                { n: "PRECIPICE BLADES", type: "GROUND", d: 290 },
                { n: "FIRE BLAST", type: "FIRE", d: 260 },
                { n: "CONTINENTAL CRUSH", type: "GROUND", d: 700, isU: true }
            ] : [
                { n: "PRECIPICE BLADES", type: "GROUND", d: 250 },
                { n: "FIRE BLAST", type: "FIRE", d: 230 },
                { n: "CONTINENTAL CRUSH", type: "GROUND", d: 620, isU: true }
            ]
        },

        // ===============================
        // ZENITH RAYQUAZA
        // ===============================
        384: {
            id: 384,
            name: "ZENITH RAYQUAZA",
            types: ["DRAGON", "FLYING"],
            hp: isHard ? 3000 : 2400,
            scale: 1.6,
            isBoss: true,
            difficulty,
            isDark: true,
            skills: isHard ? [
                { n: "DRAGON ASCENT", type: "DRAGON", d: 300 },
                { n: "OZONE FLASH", type: "FLYING", d: 270 },
                { n: "GALACTIC RADIANCE", type: "DRAGON", d: 720, isU: true }
            ] : [
                { n: "DRAGON ASCENT", type: "DRAGON", d: 260 },
                { n: "OZONE FLASH", type: "FLYING", d: 240 },
                { n: "GALACTIC RADIANCE", type: "DRAGON", d: 650, isU: true }
            ]
        },

        // ===============================
        // ORIGIN ARCEUS (FINAL GOD)
        // ===============================
        493: {
            id: 493,
            name: "ORIGIN ARCEUS",
            types: ["NORMAL"],
            hp: isHard ? 3500 : 3000,
            scale: 1.8,
            isBoss: true,
            difficulty,
            isDark: true,
            skills: isHard ? [
                { n: "PALM OF GENESIS", type: "NORMAL", d: 280 },
                { n: "DIVINE JUDGMENT", type: "NORMAL", d: 320 },
                { n: "EXISTENCE ERASURE", type: "NORMAL", d: 850, isU: true }
            ] : [
                { n: "PALM OF GENESIS", type: "NORMAL", d: 240 },
                { n: "DIVINE JUDGMENT", type: "NORMAL", d: 270 },
                { n: "EXISTENCE ERASURE", type: "NORMAL", d: 750, isU: true }
            ]
        }
    };

    return bosses[id] || null;
}

const DATA = Object.keys(POKEMON_DB).map(id => {
    const p = POKEMON_DB[id];
    const idInt = parseInt(id);
    
    // Tạo object để hàm generateSkills xử lý
    const tempPkmn = {
        types: p.types, 
        isLegendary: p.isLeg,
        ult: p.ult
    };

    // 1. Tạo bộ kỹ năng cơ bản
    const baseSkills = generateSkills(tempPkmn);
    
    // 2. CẬP NHẬT: Tăng 40% sát thương (x1.4) cho tất cả chiêu thức
    const boostedSkills = baseSkills.map(s => ({
        ...s,
        d: Math.floor(s.d * 1.4) // Nhân 1.4 và làm tròn xuống
    }));

    return { 
        id: idInt, 
        name: p.name, 
        types: p.types, 
        isLegendary: p.isLeg,
        // Giữ nguyên logic HP, chỉ tăng sát thương để trận đấu nhanh và kịch tính hơn
        hp: p.isLeg ? 600 : 250 + (idInt % 100),
        skills: boostedSkills 
    };
});
// Bảng tương khắc hệ chuẩn
const TYPE_CHART = {
    "FIRE": { superEff: ["GRASS", "ICE", "BUG", "STEEL"], notEff: ["FIRE", "WATER", "ROCK", "DRAGON"], noEff: [] },
    "WATER": { superEff: ["FIRE", "GROUND", "ROCK"], notEff: ["WATER", "GRASS", "DRAGON"], noEff: [] },
    "GRASS": { superEff: ["WATER", "GROUND", "ROCK"], notEff: ["FIRE", "GRASS", "POISON", "FLYING", "BUG", "DRAGON", "STEEL"], noEff: [] },
    "ELECTRIC": { superEff: ["WATER", "FLYING"], notEff: ["ELECTRIC", "GRASS", "DRAGON"], noEff: ["GROUND"] },
    "ICE": { superEff: ["GRASS", "GROUND", "FLYING", "DRAGON"], notEff: ["FIRE", "WATER", "ICE", "STEEL"], noEff: [] },
    "FIGHTING": { superEff: ["NORMAL", "ICE", "ROCK", "DARK", "STEEL"], notEff: ["POISON", "FLYING", "PSYCHIC", "BUG", "FAIRY"], noEff: ["GHOST"] },
    "POISON": { superEff: ["GRASS", "FAIRY"], notEff: ["POISON", "GROUND", "ROCK", "GHOST"], noEff: ["STEEL"] },
    "GROUND": { superEff: ["FIRE", "ELECTRIC", "POISON", "ROCK", "STEEL"], notEff: ["GRASS", "BUG"], noEff: ["FLYING"] },
    "FLYING": { superEff: ["GRASS", "FIGHTING", "BUG"], notEff: ["ELECTRIC", "ROCK", "STEEL"], noEff: [] },
    "PSYCHIC": { superEff: ["FIGHTING", "POISON"], notEff: ["PSYCHIC", "STEEL"], noEff: ["DARK"] },
    "BUG": { superEff: ["GRASS", "PSYCHIC", "DARK"], notEff: ["FIRE", "FIGHTING", "POISON", "FLYING", "GHOST", "STEEL", "FAIRY"], noEff: [] },
    "ROCK": { superEff: ["FIRE", "ICE", "FLYING", "BUG"], notEff: ["FIGHTING", "GROUND", "STEEL"], noEff: [] },
    "GHOST": { superEff: ["PSYCHIC", "GHOST"], notEff: ["DARK"], noEff: ["NORMAL"] },
    "DRAGON": { superEff: ["DRAGON"], notEff: ["STEEL"], noEff: ["FAIRY"] },
    "DARK": { superEff: ["PSYCHIC", "GHOST"], notEff: ["FIGHTING", "DARK", "FAIRY"], noEff: [] },
    "STEEL": { superEff: ["ICE", "ROCK", "FAIRY"], notEff: ["FIRE", "WATER", "ELECTRIC", "STEEL"], noEff: [] },
    "FAIRY": { superEff: ["FIGHTING", "DRAGON", "DARK"], notEff: ["FIRE", "POISON", "STEEL"], noEff: [] },
    "NORMAL": { superEff: [], notEff: ["ROCK", "STEEL"], noEff: ["GHOST"] }
};

// 1. Định nghĩa hàm generateSkills trước
function getEffectiveness(moveType, targetTypes) {
    if (!moveType || moveType === "NORMAL_BASIC") return 1;
    let multiplier = 1;
    const chart = TYPE_CHART[moveType.toUpperCase()];
    if (!chart) return 1;

    targetTypes.forEach(t => {
        const typeUpper = t.toUpperCase();
        if (chart.superEff.includes(typeUpper)) multiplier *= 2;
        if (chart.notEff.includes(typeUpper)) multiplier *= 0.5;
        if (chart.noEff && chart.noEff.includes(typeUpper)) multiplier *= 0;
    });
    return multiplier;
}

function generateSkills(pkmn) {
    const t1 = pkmn.types[0].toUpperCase();
    const t2 = pkmn.types[1] ? pkmn.types[1].toUpperCase() : null;
    
    // --- 1. ĐỒNG NHẤT HỆ SỐ DAME (Áp dụng cho cả Ta và Địch thường) ---
    // Tăng dame gốc lên 1.4 lần để cân bằng game
    const DAME_BOOST = 1.4; 

const moveDB = {
    'FIRE': { n: 'Flamethrower', u: 'Blast Burn', d: 95 },
    'WATER': { n: 'Hydro Pump', u: 'Hydro Cannon', d: 100 },
    'GRASS': { n: 'Solar Beam', u: 'Frenzy Plant', d: 100 },
    'ELECTRIC': { n: 'Thunderbolt', u: 'Volt Tackle', d: 90 },
    'ICE': { n: 'Ice Beam', u: 'Blizzard', d: 95 },
    'FIGHTING': { n: 'Aura Sphere', u: 'Close Combat', d: 110 },
    'POISON': { n: 'Sludge Bomb', u: 'Gunk Shot', d: 95 },
    'GROUND': { n: 'Earthquake', u: 'Fissure', d: 110 },
    'FLYING': { n: 'Air Slash', u: 'Sky Attack', d: 90 },
    'PSYCHIC': { n: 'Psychic', u: 'Psycho Boost', d: 95 },
    'BUG': { n: 'Bug Buzz', u: 'Megahorn', d: 95 },
    'ROCK': { n: 'Rock Slide', u: 'Head Smash', d: 100 },
    'GHOST': { n: 'Shadow Ball', u: 'Shadow Force', d: 95 },
    'DRAGON': { n: 'Dragon Pulse', u: 'Roar of Time', d: 110 },
    'DARK': { n: 'Dark Pulse', u: 'Night Daze', d: 95 },
    'STEEL': { n: 'Flash Cannon', u: 'Meteor Mash', d: 100 },
    'FAIRY': { n: 'Moonblast', u: 'Light of Ruin', d: 95 },
    'NORMAL': { n: 'Swift', u: 'Giga Impact', d: 85 }
};

    // --- Chiêu 1 & 2 ---
    let m1;
    if (t2 && moveDB[t2]) {
        m1 = { n: moveDB[t2].n, d: Math.floor(moveDB[t2].d * DAME_BOOST), isU: false, type: t2 };
    } else {
        m1 = { n: "Quick Attack", d: Math.floor(45 * DAME_BOOST), isU: false, type: t1 };
    }

    const mInfo1 = moveDB[t1] || moveDB['NORMAL'];
    const m2 = { n: mInfo1.n, d: Math.floor(mInfo1.d * DAME_BOOST), isU: false, type: t1 };

    // --- 2. SỬA LỖI ULTIMATE (Dame & Cơ chế SP) ---
    let ultType = t1;
    if (t2 && t1 === 'NORMAL') ultType = t2;

    const mInfoUlt = moveDB[ultType] || moveDB['NORMAL'];
    
    // Nếu là Legend (hoặc Boss dùng hàm này) thì dame cao hơn, nhưng vẫn nhân hệ số boost
    const baseUltDame = pkmn.isLegendary ? 140 : 110;

    const m3 = { 
        n: pkmn.isLegendary ? (pkmn.ult || mInfoUlt.u) : mInfoUlt.u, 
        d: Math.floor(baseUltDame * DAME_BOOST), 
        isU: true, // Đánh dấu là Ultimate
        type: ultType,
        cost: 100 // Đảm bảo thuộc tính cost (năng lượng) luôn tồn tại
    };

    return [m1, m2, m3];
}
function calculateDamage(attacker, defender, skill, isDynamax = false) {

    const isLegend = (
        attacker.isLegendary ||
        attacker.isBoss ||
        (typeof LEGENDARY_DATA !== 'undefined' && LEGENDARY_DATA[attacker.id])
    );

    const extraPower = getLegendaryBonus(attacker);
    const baseDamage = skill.d + extraPower;

    const legBoost = isLegend ? 1.4 : 1.0;
    const typeMult = getDamageMultiplier(skill.type, defender.types);

    const atkType = attacker.types ? attacker.types[0] : (attacker.type || 'NORMAL');
    const mapBoost = (atkType === currentMap.type ? 1.3 : 1.0);

    const stab = attacker.types?.includes(skill.type) ? 1.5 : 1.0;
    const randomFactor = 0.9 + Math.random() * 0.1;

    let damage = Math.floor(
        baseDamage *
        legBoost *
        typeMult *
        mapBoost *
        stab *
        randomFactor
    );

    if (skill.isU) {
        damage += isLegend ? 250 : 150;
    }

    if (isDynamax) {
        damage = Math.floor(damage * 1.8);
    }

    if (damage < 1) damage = 1;

    return damage;
}
function applyDamageFloor(finalDamage, isLegend, isUltimate, isDynamax, typeMult) {

    let minDamage = isLegend ? 220 : 180;

    if (typeMult > 1) {
        minDamage += 40;
    }

    if (isUltimate) {
        minDamage = isLegend ? 400 : 320;
    }

    if (isDynamax) {
        minDamage = isLegend ? 550 : 450;
    }

    if (finalDamage < minDamage) {
        finalDamage = minDamage + Math.floor(Math.random() * 30);
    }

    return finalDamage;
}
// Hàm tính multiplier cho Song hệ
function getDamageMultiplier(atkType, targetTypes) {
    let mul = 1.0;
    if (!TYPE_CHART[atkType]) return 1.0;
    targetTypes.forEach(defType => {
        if (TYPE_CHART[atkType].superEff.includes(defType)) mul *= 2.0;
        else if (TYPE_CHART[atkType].notEff.includes(defType)) mul *= 0.5;
        else if (TYPE_CHART[atkType].noEff && TYPE_CHART[atkType].noEff.includes(defType)) mul *= 0.1;
    });
    return mul;
}
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
    const bossPoolIds = [150, 382, 383, 384, 493];
    const legendPoolIds = [144, 145, 146, 151, 243, 244, 245, 249, 250, 251]; // Ví dụ danh sách Legend
    
    // Lọc lấy danh sách Pokemon thường (không phải boss, không phải legend)
    const normalPool = DATA.filter(p => !bossPoolIds.includes(p.id) && !legendPoolIds.includes(p.id));
    // Lọc lấy danh sách Legend (loại trừ ID của boss)
    const legendPool = DATA.filter(p => legendPoolIds.includes(p.id) && !bossPoolIds.includes(p.id));

    let teamIds = [];

    if (difficulty === 'EASY') {
        // 2 thường + 1 Legend
        teamIds.push(normalPool[Math.floor(Math.random() * normalPool.length)].id);
        teamIds.push(normalPool[Math.floor(Math.random() * normalPool.length)].id);
        teamIds.push(legendPool[Math.floor(Math.random() * legendPool.length)].id);
    } 
    else if (difficulty === 'MEDIUM') {
        // 2 thường + 1 Legend + 1 Boss
        teamIds.push(normalPool[Math.floor(Math.random() * normalPool.length)].id);
        teamIds.push(normalPool[Math.floor(Math.random() * normalPool.length)].id);
        teamIds.push(legendPool[Math.floor(Math.random() * legendPool.length)].id);
        teamIds.push(bossPoolIds[Math.floor(Math.random() * bossPoolIds.length)]);
    } 
    else if (difficulty === 'HARD') {
        // 2 thường + 2 Legend + 1 Boss
        teamIds.push(normalPool[Math.floor(Math.random() * normalPool.length)].id);
        teamIds.push(normalPool[Math.floor(Math.random() * normalPool.length)].id);
        teamIds.push(legendPool[Math.floor(Math.random() * legendPool.length)].id);
        teamIds.push(legendPool[Math.floor(Math.random() * legendPool.length)].id);
        teamIds.push(bossPoolIds[Math.floor(Math.random() * bossPoolIds.length)]);
    }

    return teamIds;
}

async function startGame() {
    if (selected.length !== maxTeamSize) return;
    pDynamaxUsedInGame = false;
    currentDifficulty = difficulty;

    const audioBgm = document.getElementById('audio-bgm');
    if (audioBgm) { audioBgm.pause(); audioBgm.currentTime = 0; }
    await new Promise(r => setTimeout(r, 300));
    playSfx('spawn');
    
    switchCountLeft = difficulty === 'EASY' ? 2 : (difficulty === 'MEDIUM' ? 3 : 4);
    
    const bossPoolIds = [150, 382, 383, 384, 493]; 
    const legendIds = [144, 145, 146, 151, 243, 244, 245, 249, 250, 251]; 
    const getRandomBonus = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- 1. PLAYER TEAM: Cần gán ĐỒNG NHẤT p.hp, maxHp và currentHp ---
    pTeam = selected.map(id => { 
        const originalData = DATA.find(x => x.id === id);
        // Copy dữ liệu để tránh ghi đè vào DATA gốc
        const p = JSON.parse(JSON.stringify(originalData));
        
        let bonus = legendIds.includes(p.id) ? getRandomBonus(500, 600) : getRandomBonus(350, 450);
        let finalHP = p.hp + bonus;

        return { 
            ...p, 
            hp: finalHP,        // Cập nhật lại hp gốc của object
            maxHp: finalHP,     // Thanh máu dùng cái này làm mốc 100%
            currentHp: finalHP, // Máu hiện tại lúc bắt đầu
            fury: 0, 
            s: BASE_URL + "back/" + id + ".png", 
            f: BASE_URL + id + ".png" 
        }; 
    });

    // --- 2. ENEMY TEAM: Xử lý tương tự ---
    let rawEnemyTeam = [];
    
    const getNormalPkmn = () => {
        let pool = DATA.filter(p => !bossPoolIds.includes(p.id) && !legendIds.includes(p.id));
        let p = JSON.parse(JSON.stringify(pool[Math.floor(Math.random() * pool.length)]));
        p.hp = p.hp + getRandomBonus(350, 450); 
        return p;
    };

    const getLegendPkmn = () => {
        let pool = DATA.filter(p => legendIds.includes(p.id) && !bossPoolIds.includes(p.id));
        let p = JSON.parse(JSON.stringify(pool[Math.floor(Math.random() * pool.length)]));
        p.hp = p.hp + getRandomBonus(500, 600);
        return p;
    };

    if (difficulty === 'EASY') {
        rawEnemyTeam.push(getNormalPkmn());
        rawEnemyTeam.push(getNormalPkmn());
        rawEnemyTeam.push(getLegendPkmn());
    } else if (difficulty === 'MEDIUM') {
        rawEnemyTeam.push(getNormalPkmn(), getNormalPkmn(), getLegendPkmn());
        rawEnemyTeam.push(createBoss(bossPoolIds[Math.floor(Math.random() * bossPoolIds.length)]));
    } else { // HARD
        rawEnemyTeam.push(getNormalPkmn(), getNormalPkmn(), getLegendPkmn(), getLegendPkmn());
        rawEnemyTeam.push(createBoss(bossPoolIds[Math.floor(Math.random() * bossPoolIds.length)]));
    }

    // --- 3. ĐỒNG BỘ CUỐI CÙNG (Quan trọng nhất) ---
    eTeam = rawEnemyTeam.map(data => {
        const finalHP = data.hp; // Lấy hp đã được cộng bonus ở trên
        return {
            ...data, 
            isBoss: !!data.isBoss,
            maxHp: finalHP,      // Đảm bảo maxHp khớp với hp
            currentHp: finalHP,  // Đảm bảo currentHp khớp với hp
            fury: 0, 
            skills: data.skills, 
            s: BASE_URL + "back/" + data.id + ".png", 
            f: BASE_URL + data.id + ".png",
            scale: data.scale || 1 
        };
    });

    // --- PHẦN HIỂN THỊ ---
    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('battle-screen').classList.remove('hidden');
    pIdx = eIdx = 0;
    
    applyRandomMap();
    await spawnSequence('player'); 
    await spawnSequence('enemy');
    
    updateUI(); 
    addLog(`Battle started! Bonuses applied to all units.`);
    pTurn = true;
    busy = false;
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
    
    const currentPkm = isPlayer ? pTeam[pIdx] : eTeam[eIdx];
    
    // Tự động nhận diện bóng: Kiểm tra isLegendary hoặc ID trong LEGENDARY_DATA
    const isLeg = currentPkm.isLegendary || (typeof LEGENDARY_DATA !== 'undefined' && LEGENDARY_DATA[currentPkm.id]);
    const ballName = isLeg ? "ultra-ball.png" : "poke-ball.png";

    sprite.src = ""; 
    sprite.style.transition = 'none';
    sprite.style.opacity = '0';
    sprite.style.transform = 'scale(0)';

    ball.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + ballName;
    
    const rect = sprite.parentElement.getBoundingClientRect(); 
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    ball.style.transition = 'none';
    if (isPlayer) {
        ball.style.left = '-50px'; ball.style.top = '100%';
    } else {
        ball.style.left = '100%'; ball.style.top = '-50px';
    }
    ball.classList.remove('hidden');
    void ball.offsetWidth;

    playSfx('nem');
    ball.style.transition = 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
    ball.style.left = `${targetX}px`;
    ball.style.top = `${targetY}px`;
    ball.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(720deg)';

    sprite.src = isPlayer ? currentPkm.s : currentPkm.f;

    await new Promise(r => setTimeout(r, 700));

    ball.classList.add('hidden'); 
    const flash = document.createElement('div');
    flash.className = 'spawn-flash animate-flash';
    flash.style.left = `${targetX}px`;
    flash.style.top = `${targetY}px`;
    document.body.appendChild(flash);

    await new Promise(r => setTimeout(r, 100));

    sprite.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    sprite.style.opacity = '1';
    sprite.style.transform = 'scale(1)';

    setTimeout(() => flash.remove(), 600);
    if (typeof shakeScreen === 'function') shakeScreen('normal');
    
    await new Promise(r => setTimeout(r, 300));
    
    // KHÔNG set busy/pTurn ở đây nữa để tránh xung đột
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
async function attackAnim(
    attackerId,
    {
        isCrit = false,
        isUltimate = false,
        damageAmount = 0,
        isDynamax = false,
        isMiss = false,
        typeMult = 1
    } = {}
) {
    const atk = document.getElementById(attackerId);
    const isPlayer = attackerId === 'p-sprite';
    const def = document.getElementById(isPlayer ? 'e-sprite' : 'p-sprite');

    const moveX = isPlayer ? 100 : -100;
    const moveY = isPlayer ? -40 : 40;

    const scale = isDynamax ? 2.2 : 1;
    const baseY = isDynamax ? -15 : 0;

    const isSuper = typeMult > 1;
    const isResist = typeMult > 0 && typeMult < 1;

    // ================= CHARGE =================

    if (isDynamax) {
        playSfx('dynamax');
        atk.classList.add('dynamax-active');
        atk.style.transition = 'transform 0.8s cubic-bezier(0.175,0.885,0.32,1.275)';
        atk.style.transform = `translateY(${baseY}px) scale(${scale})`;
        shakeScreen('heavy');
        await new Promise(r => setTimeout(r, 900));
    }
    else if (isUltimate) {
        atk.style.filter = "brightness(2.5) contrast(1.5) saturate(2)";
        atk.classList.add('ultimate-charging');
        await new Promise(r => setTimeout(r, 400));
    }

    // ================= DASH =================

    atk.style.transition = 'transform 0.15s ease-in';
    atk.style.transform = `
        translate(${moveX}px, ${moveY + baseY}px)
        scale(${scale})
    `;

    await new Promise(r => setTimeout(r, 120));

    // ================= IMPACT =================

    const targetData = isPlayer ? eTeam[eIdx] : pTeam[pIdx];

    if (isMiss) {
        playSfx('missing');
        showFloatingDamage(def, 0, { isMiss: true });
        addLog(`The attack missed!`);
    } else {

        // 🔥 DAMAGE FLOAT (super / resist integrated)
        showFloatingDamage(def, damageAmount, {
            isCrit,
            isMiss,
            typeMult
        });

        showElementalAura(
            def,
            targetData,
            isUltimate ? 'ultimate' : 'hit'
        );

        // 🔥 TYPE LOG
        if (isSuper) addLog(`Super effective!`);
        else if (isResist) addLog(`Not very effective...`);
        else if (typeMult === 0) addLog(`It had no effect.`);

        if (isCrit) addLog(`Critical hit!`);

        // ================= SOUND + SHAKE =================

        if (isUltimate) {
            playSfx('ultimate');
            shakeScreen('heavy');

            document.querySelectorAll('.ultimate-flash').forEach(f => f.remove());

            const flash = document.createElement('div');
            flash.className = 'ultimate-flash';
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.background = 'white';
            flash.style.opacity = '0.6';
            flash.style.zIndex = '999';
            flash.style.pointerEvents = 'none';

            document.body.appendChild(flash);

            setTimeout(() => {
                if (flash.parentNode) flash.remove();
            }, 120);

            def.classList.add('ultimate-hit');
        }
        else if (isSuper) {
            playSfx('hit-damage');
            shakeScreen('heavy');
        }
        else if (isCrit || isDynamax) {
            playSfx('hit-damage');
            shakeScreen('heavy');
        }
        else {
            playSfx('hit');
            shakeScreen('normal');
        }

        def.classList.add('hit-effect');
        setTimeout(() => {
            def.classList.remove('hit-effect');
            def.classList.remove('ultimate-hit');
        }, 250);
    }

    // ================= RETURN =================

    await new Promise(r => setTimeout(r, 250));

    atk.style.transition = 'transform 0.3s ease-out';
    atk.style.transform = `translateY(${baseY}px) scale(${scale})`;

    atk.style.filter = 'none';
    atk.classList.remove('ultimate-charging');

    await new Promise(r => setTimeout(r, 400));

    // ================= END DYNAMAX =================

    if (isDynamax) {
        atk.style.transition = 'transform 0.4s ease-out';
        atk.style.transform = 'translateY(0px) scale(1)';
        atk.classList.remove('dynamax-active');
        await new Promise(r => setTimeout(r, 400));
    }
}
async function attack(skillIndex) {
    if (busy || !pTurn) return;

    const p = pTeam[pIdx];
    const e = eTeam[eIdx];
    const skill = p.skills[skillIndex];
    const isUltimate = skill.isU === true;

    if (isUltimate && p.fury < 100) {
        addLog("Not enough Fury!");
        return;
    }

    busy = true;
    addLog(`${p.name} used ${skill.n}!`);

    // Reset Fury immediately if Ultimate
    if (isUltimate) {
        p.fury = 0;
        updateUI();
    }

    const isMissing = Math.random() < 0.05;
    let finalDamage = 0;
    let typeMult = 1;
    let isCrit = false;

    if (!isMissing) {
        typeMult = getDamageMultiplier(skill.type, e.types);
        isCrit = Math.random() < 0.1;
        
        const extraPower = getLegendaryBonus(p);
        const baseDmg = skill.d + extraPower;
        const legBoost = p.isLegendary ? 1.4 : 1.0;
        const pType = p.types ? p.types[0] : (p.type || 'NORMAL');
        const mapBoost = (pType === currentMap.type ? 1.3 : 1.0);
        const stab = p.types?.includes(skill.type) ? 1.5 : 1.0;
        const randomFactor = 0.9 + Math.random() * 0.1;

        finalDamage = Math.floor(
            baseDmg *
            legBoost *
            typeMult *
            mapBoost *
            stab *
            randomFactor *
            (isCrit ? 2 : 1)
        );

        if (isUltimate) finalDamage += (p.isLegendary ? 250 : 150);
        if (p.isDynamax) finalDamage = Math.floor(finalDamage * 1.8);

        // 🔥 TĂNG DAMAGE PLAYER
        finalDamage = Math.floor(finalDamage * (p.isLegendary ? 1.5 : 1.2));

        finalDamage = applyDamageFloor(
            finalDamage,
            p.isLegendary,
            isUltimate,
            p.isDynamax,
            typeMult
        );
    }

    // ================= ANIMATION =================
    await attackAnim('p-sprite', {
        isCrit,
        isUltimate,
        damageAmount: finalDamage,
        isDynamax: p.isDynamax,
        isMiss: isMissing,
        typeMult
    });

    // ================= APPLY DAMAGE =================
    if (!isMissing) {
        e.currentHp = Math.max(0, e.currentHp - finalDamage);

        if (!isUltimate) {
            p.fury = Math.min(100, p.fury + 45);
        }
    }

    updateUI();

    if (e.currentHp <= 0) {
        addLog(`${e.name} fainted!`);
        setTimeout(checkBattleEnd, 500);
    } else {
        pTurn = false;
        setTimeout(enemyTurn, 600);
    }

    busy = false;
}

function showFloatingDamage(targetEl, amount, {
    isCrit = false,
    isMiss = false,
    typeMult = 1
} = {}) {

    const rect = targetEl.getBoundingClientRect();
    const damageText = document.createElement('div');

    if (Object.is(amount, -0)) amount = 0;

    const isSuper = typeMult > 1;
    const isResist = typeMult > 0 && typeMult < 1;

    // TEXT
    if (isMiss) {
        damageText.innerText = "MISS!";
    } else {
        damageText.innerText = isCrit
            ? `CRITICAL! -${amount}`
            : `-${amount}`;
    }

    // POSITION
    damageText.style.position = 'fixed';
    damageText.style.left = `${rect.left + rect.width / 2}px`;
    damageText.style.top = `${rect.top}px`;
    damageText.style.transform = 'translateX(-50%)';
    damageText.style.zIndex = '100';
    damageText.style.pointerEvents = 'none';

    // STYLE
    damageText.style.fontWeight = 'bold';
    damageText.style.fontFamily = "'Press Start 2P', cursive, sans-serif";

    // 🔥 FONT SIZE LOGIC
    if (isSuper) {
        damageText.style.fontSize = '22px';
    } else if (isCrit) {
        damageText.style.fontSize = '20px';
    } else {
        damageText.style.fontSize = '14px';
    }

    // 🔥 COLOR LOGIC
    if (isMiss) {
        damageText.style.color = '#9ca3af';
    }
    else if (isSuper) {
        damageText.style.color = '#ff2d2d';
    }
    else if (isCrit) {
        damageText.style.color = '#ff0000';
    }
    else if (isResist) {
        damageText.style.color = '#60a5fa';
    }
    else {
        damageText.style.color = '#ffffff';
    }

    damageText.style.textShadow = '2px 2px #000';
    damageText.style.whiteSpace = 'nowrap';
    damageText.style.animation = 'damageFloat 1s ease-out forwards';

    document.body.appendChild(damageText);
    setTimeout(() => damageText.remove(), 1000);
}
function getLegendaryBonus(p) {
    // Kiểm tra xem có phải huyền thoại không qua flag hoặc bảng dữ liệu
    const isLegend = p.isLegendary || p.isBoss || (typeof LEGENDARY_DATA !== 'undefined' && LEGENDARY_DATA[p.id]);
    if (isLegend) {
        // Trả về ngẫu nhiên từ 40 đến 80
        return Math.floor(Math.random() * 41) + 40; 
    }
    return 0;
}


async function doAction(idx) {
    // 1. Kiểm tra điều kiện đầu vào: không bận và phải đúng lượt người chơi
    if (busy || !pTurn || pIdx >= pTeam.length) return;
    busy = true; 

    const p = pTeam[pIdx];
    const e = eTeam[eIdx];
    
    // Logic Dynamax (idx 3)
    if (idx === 3) {
        if (p.hasUsedDynamax) {
            addLog(`${p.name} already used Dynamax!`);
            busy = false;
            return;
        }
        p.hasUsedDynamax = true; 
        addLog(`${p.name} activates DYNAMAX!!`);
        updateUI();

        let dynaDmg = 160;
        if (p.isLegendary) dynaDmg = Math.floor(dynaDmg * 1.15);

        await attackAnim('p-sprite', {
            isCrit: false,
            isUltimate: false,
            damageAmount: dynaDmg,
            isDynamax: true,
            isMiss: false,
            typeMult: 1});
                e.currentHp = Math.max(0, e.currentHp - dynaDmg);
                p.fury = Math.min(100, p.fury + 50);
            } 
    else {
        // Logic Skill thường/Ultimate
        const s = p.skills[idx];
        if (s.isU) {
            if (p.fury < 100) { // Check thêm điều kiện nộ nếu cần
                addLog("Not enough Fury!");
                busy = false;
                return;
            }
            p.fury = 0; 
            updateUI(); 
            showElementalAura(document.getElementById('p-sprite'), p, 'ultimate');
            if (p.isLegendary) await announceSkill(s.n, TYPE_COLORS[s.type], p.id);
        }

        let multiplier = getEffectiveness(s.type, e.types); 
        let finalDamage = Math.floor(s.d * multiplier * (p.isLegendary ? 1.15 : 1));
        const isMissing = (Math.random() < 0.05) || (multiplier === 0);

        addLog(`${p.name} used ${s.n}!`);
        await attackAnim('p-sprite', {
            isCrit: false,
            isUltimate: s.isU,
            damageAmount: isMissing ? 0 : finalDamage,
            isDynamax: false,
            isMiss: isMissing,
            typeMult: multiplier});

                if (!isMissing) {
                    e.currentHp = Math.max(0, e.currentHp - finalDamage);
                    if (!s.isU) p.fury = Math.min(100, p.fury + 30);
                }
            }

    updateUI();
    
    // 2. Kiểm tra kết quả sau đòn đánh
    const deathResult = await checkDeath();

    // 3. QUYẾT ĐỊNH LƯỢT TIẾP THEO
    if (deathResult === "enemy_changed") {
        // Địch vừa bị hạ và đổi con mới -> Trả lượt cho người chơi đánh tiếp
        busy = false; 
        pTurn = true;
        updateUI();
    } 
    else if (deathResult === "none") {
        // Không ai chết hoặc địch vẫn còn sống -> Chuyển sang lượt máy
        pTurn = false;
        setTimeout(enemyTurn, ACTION_DELAY); 
    }
    // Nếu deathResult là "game_over" hoặc "player_changed", 
    // logic trong hàm checkDeath của bạn nên tự xử lý các bước đó.
}
function showElementalAura(targetEl, pokemon, type = 'hit') {
    const aura = document.createElement('div');
    aura.className = `elemental-aura ${type === 'ultimate' ? 'aura-ultimate' : 'aura-hit'}`;
    
    // Lấy màu hệ đầu tiên của Pokemon để làm màu vòng sáng
    const mainType = pokemon.types[0]|| 'normal';
    const color = TYPE_COLORS[mainType] || '#ffffff';
    
    // Gán màu vào biến CSS
    aura.style.setProperty('--aura-color', color);
    
    // Thêm vào cùng cha với Pokemon (platform)
    targetEl.parentElement.appendChild(aura);
    
    // Tự xóa sau khi diễn xong
    setTimeout(() => aura.remove(), 1000);
}
async function useDynamax() {
    if (busy || pDynamaxUsedInGame) return; 
    
    busy = true; 
    pDynamaxUsedInGame = true; 

    const p = pTeam[pIdx];
    const e = eTeam[eIdx];

    // LOG: Thông báo kích hoạt chuẩn English
    addLog(`${p.name} has activated Dynamax!`);
    updateUI();

    // --- CẬP NHẬT DAME DYNAMAX (350 - 450) ---
    let dynaDmg = 350 + Math.floor(Math.random() * 101);
    
    // Nếu là Pokémon Huyền thoại thì thưởng thêm sát thương
    if (p.isLegendary || [144, 150, 382, 383, 384, 493].includes(p.id)) {
        dynaDmg = Math.floor(dynaDmg * 1.2); 
    }

    // Thực hiện hiệu ứng rung màn hình (true ở tham số cuối)
    await attackAnim('p-sprite', {
    isCrit: false,
    isUltimate: false,
    damageAmount: dynaDmg,
    isDynamax: true,
    isMiss: false,
    typeMult: 1}); 

    e.currentHp = Math.max(0, e.currentHp - dynaDmg);
    
    // Xóa dòng addLog báo dame cũ để tránh thừa thải như bạn yêu cầu
    
    p.fury = Math.min(100, p.fury + 50);
    updateUI(); 

    if (e.currentHp <= 0) {
        // LOG: Khi địch gục
        addLog(`The enemy ${e.name} fainted!`);
        await checkDeath(); 
        busy = false; 
        pTurn = true;
        updateUI();
    } else {
        pTurn = false;
        setTimeout(enemyTurn, 1000);
    }
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
function initEnemyTeam(difficulty) {

    let team = [];
    let size = (difficulty === 'HARD') ? 6 :
               (difficulty === 'MEDIUM' ? 3 : 1);

    const legendaryIds = Object.keys(LEGENDARY_DATA).map(id => parseInt(id));

    // ===============================
    // 1️⃣ Thêm các Pokémon đầu đội
    // ===============================
    for (let i = 0; i < size - 1; i++) {

        let selectedPkmn;

        let legendaryChance = 0.05 + (playerLevel * 0.005);
        if (legendaryChance > 0.45) legendaryChance = 0.45;

        if (Math.random() < legendaryChance) {

            const randomLegId =
                legendaryIds[Math.floor(Math.random() * legendaryIds.length)];

            const legData = DATA.find(p => p.id === randomLegId);

            if (legData) {
                selectedPkmn = { ...legData };
                selectedPkmn.isLegendary = true;
            } else {
                selectedPkmn = { ...DATA[Math.floor(Math.random() * DATA.length)] };
            }

        } else {
            selectedPkmn = { ...DATA[Math.floor(Math.random() * DATA.length)] };
        }

        selectedPkmn.currentHp = selectedPkmn.hp;
        team.push(selectedPkmn);
    }

    // ===============================
    // 2️⃣ Thêm Boss cuối team
    // ===============================
    if (difficulty === 'MEDIUM' || difficulty === 'HARD') {

        const bossIds = [150, 383, 384, 382, 493];
        const randomBossId =
            bossIds[Math.floor(Math.random() * bossIds.length)];

        const bossDifficulty =
            (difficulty === 'HARD') ? "BOSS_HARD" : "BOSS_MEDIUM";

        const boss = createBoss(randomBossId, bossDifficulty);

        if (boss) {
            boss.isBoss = true;
            boss.isLegendary = true;
            boss.currentHp = boss.hp;
            team.push(boss);
        }

    } else {

        const lastPkmn = { ...DATA[Math.floor(Math.random() * DATA.length)] };
        lastPkmn.currentHp = lastPkmn.hp;
        team.push(lastPkmn);
    }

    return team;
}
let eDynamaxUsedInGame = false; // Biến này quan trọng nhất
async function enemyTurn() {
    busy = true;
    pTurn = false;

    if (
        eIdx >= eTeam.length ||
        pIdx >= pTeam.length ||
        eTeam[eIdx].currentHp <= 0
    ) {
        busy = false;
        return;
    }

    const p = pTeam[pIdx];
    const e = eTeam[eIdx];
    const eType = e.types ? e.types[0] : (e.type || 'NORMAL');
    const isLastPkmn = (eIdx === eTeam.length - 1);

    const isLegendary =
        e.isLegendary ||
        (typeof LEGENDARY_DATA !== 'undefined' && LEGENDARY_DATA[e.id]);

    const isBoss = e.isBoss === true;

    // ================================
    // 1️⃣ CHỌN SKILL TỐI ƯU
    // ================================
    let bestSkillIdx = 0;
    let maxExpectedDmg = -1;

    e.skills.forEach((s, idx) => {

        if (s.isU === true && e.fury < 100) return;

        const mult = getDamageMultiplier(s.type, p.types) * 0.7;

        const testBase = s.d + getLegendaryBonus(e);
        const testLegBoost = isLegendary ? 1.4 : 1.0;

        const dmg = testBase * testLegBoost * mult;

        if (dmg > maxExpectedDmg) {
            maxExpectedDmg = dmg;
            bestSkillIdx = idx;
        }
    });

    const s = e.skills[bestSkillIdx];
    const isUltimate = s.isU === true;

    if (isUltimate) e.fury = 0;

    addLog(`The enemy ${e.name} used ${s.n}!`);

    // ================================
    // 🔥 ANNOUNCE (CHỈ LEGENDARY + ULTIMATE)
    // ================================
    if (isUltimate && isLegendary) {

        const mainType = e.types ? e.types[0] : (e.type || 'NORMAL');
        const skillColor = TYPE_COLORS[mainType] || "#FFFFFF";

        await announceSkill(
            s.n,
            skillColor,
            e.id
        );
    }

    // ================================
    // 2️⃣ QUYẾT ĐỊNH DYNAMAX
    // ================================
    let shouldDynamax = false;

    if (!eDynamaxUsedInGame) {
        const typeCheck = getDamageMultiplier(s.type, p.types) * 0.7;

        if (typeCheck > 1 || isLegendary || isLastPkmn) {
            shouldDynamax = true;
            eDynamaxUsedInGame = true;
            addLog(`The enemy ${e.name} activated Dynamax!`);
        }
    }

    // ================================
    // 3️⃣ DAMAGE CALCULATION
    // ================================
    const baseDmg = s.d + getLegendaryBonus(e);
    const legBoost = isLegendary ? 1.4 : 1.0;
    const typeMult = getDamageMultiplier(s.type, p.types) * 0.7;
    const mapBoost = (eType === currentMap.type ? 1.3 : 1.0);
    const stab = e.types?.includes(s.type) ? 1.5 : 1.0;
    const randomFactor = 0.9 + Math.random() * 0.1;
    const bossMultiplier = isBoss ? 1.5 : 1.0;

    const isCrit = Math.random() < 0.1;
    const critMultiplier = isCrit ? 2 : 1;

    let finalDamage = Math.floor(
        baseDmg *
        legBoost *
        typeMult *
        mapBoost *
        stab *
        randomFactor *
        bossMultiplier *
        critMultiplier
    );

    if (isUltimate) {
        finalDamage += isLegendary ? 250 : 150;
    }

    if (shouldDynamax) {
        finalDamage = Math.floor(finalDamage * 1.8);
    }

    // 🔥 Giảm tổng damage 30%
    finalDamage = Math.floor(finalDamage * 0.3);

    finalDamage = applyDamageFloor(
        finalDamage,
        isLegendary,
        isUltimate,
        shouldDynamax,
        typeMult
    );

    const isMissing = Math.random() < 0.05;

    // ================================
    // ANIMATION
    // ================================
    await attackAnim('e-sprite', {
        isCrit,
        isUltimate,
        damageAmount: isMissing ? 0 : finalDamage,
        isDynamax: shouldDynamax,
        isMiss: isMissing,
        typeMult
    });

    // ================================
    // APPLY DAMAGE
    // ================================
    if (!isMissing) {
        p.currentHp = Math.max(0, p.currentHp - finalDamage);

        if (!isUltimate) {
            e.fury = Math.min(100, e.fury + 30);
        }
    }

    // ================================
    // 4️⃣ KẾT THÚC TURN
    // ================================
    updateUI();

    const deathResult = await checkDeath();

    if (deathResult === "none") {
        setTimeout(() => {
            busy = false;
            pTurn = true;
            updateUI();
        }, 500);
    } else {
        busy = false;
    }
}

async function checkDeath() {
    const e = eTeam[eIdx], p = pTeam[pIdx];
    
    // TRƯỜNG HỢP: Địch bị hạ gục
    if (e && e.currentHp <= 0) {
        busy = true; 
        addLog(`${e.name} fainted!`);
        eIdx++; 
        
        if (eIdx >= eTeam.length) return endGame(true);
        
        document.getElementById('e-sprite').src = ""; 
        await spawnSequence('enemy'); // Đợi ném bóng xuất hiện con mới xong
        
        // GIẢI PHÓNG TẠI ĐÂY
        busy = false; 
        pTurn = true;
        updateUI();
        return "enemy_changed";
    }

    // TRƯỜNG HỢP: Người chơi bị hạ gục
    if (p && p.currentHp <= 0) {
        busy = true;
        addLog(`${p.name} fainted!`);
        const nxt = pTeam.findIndex(x => x.currentHp > 0);
        
        if (nxt === -1) return endGame(false);
        
        document.getElementById('p-sprite').src = "";
        pIdx = nxt; 
        
        await spawnSequence('player'); // Đợi ta ra con mới xong
        
        // Địch sẽ đánh tiếp sau khi ta ra quân
        busy = false;
        pTurn = false;
        updateUI();
        setTimeout(enemyTurn, ACTION_DELAY); 
        return "player_changed";
    }
    
    return "none";
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
    if (!p || !e) return;

    // 1️⃣ UPDATE NAME + TYPES
    document.getElementById('p-name').innerText = p.name;
    document.getElementById('p-type-slot').innerHTML = p.types.map(t =>
        `<span class="type-badge-inline ml-1" style="background:${TYPE_COLORS[t]}">${t}</span>`
    ).join('');

    document.getElementById('e-name').innerText = e.name;
    document.getElementById('e-type-slot').innerHTML = e.types.map(t =>
        `<span class="type-badge-inline ml-1" style="background:${TYPE_COLORS[t]}">${t}</span>`
    ).join('');

    // 2️⃣ UPDATE HP
    const pHPPercent = (p.currentHp / p.hp * 100);
    const eHPPercent = (e.currentHp / e.hp * 100);

    const pHPFill = document.getElementById('p-hp-fill');
    const eHPFill = document.getElementById('e-hp-fill');

    if (document.getElementById('p-sprite').style.opacity === "0") {
        pHPFill.style.transition = 'none';
    } else {
        pHPFill.style.transition = 'width 0.3s ease-in-out';
    }

    pHPFill.style.width = pHPPercent + '%';
    eHPFill.style.width = eHPPercent + '%';

    pHPFill.style.backgroundColor =
        pHPPercent > 50 ? "#4ade80" :
        (pHPPercent > 20 ? "#facc15" : "#ef4444");

    eHPFill.style.backgroundColor =
        eHPPercent > 50 ? "#4ade80" :
        (eHPPercent > 20 ? "#facc15" : "#ef4444");

    document.getElementById('p-hp-text').innerText =
        `${Math.ceil(p.currentHp)}/${p.hp}`;

    // 3️⃣ UPDATE FURY
    document.getElementById('p-fury-fill').style.width =
        Math.min(100, p.fury) + '%';

    document.getElementById('e-fury-fill').style.width =
        Math.min(100, e.fury) + '%';

    // 4️⃣ UPDATE SPRITES + DARK BOSS EFFECT
    const pSprite = document.getElementById('p-sprite');
    const eSprite = document.getElementById('e-sprite');

    if (pSprite.style.opacity !== "0") {
        pSprite.src = p.s;
    }

    if (eSprite.style.opacity !== "0") {

        eSprite.src = e.f;

        if (e.isBoss) {

            // 🔥 Phóng to nhẹ và giữ nguyên
            eSprite.style.transform = `scale(${e.scale || 1.35})`;

            // 🔥 Aura viền đen (không làm tối sprite)
            eSprite.style.filter = `
                drop-shadow(0 0 15px #000)
                drop-shadow(0 0 30px #111)
                drop-shadow(0 0 45px #000)
            `;

            eSprite.style.transition =
                "transform 0.5s ease-out, filter 0.5s ease-out";

        } else {

            eSprite.style.transform = "scale(1)";
            eSprite.style.filter = "none";
        }
    }

    // 5️⃣ UPDATE POKEBALL STATUS
    document.getElementById('p-balls').innerHTML = pTeam.map(pk =>
        `<div class="w-2 h-2 rounded-full ${
            pk.currentHp <= 0 ? 'bg-gray-400' : 'bg-red-500'
        }"></div>`
    ).join('');

    document.getElementById('e-balls').innerHTML = eTeam.map(pk =>
        `<div class="w-2 h-2 rounded-full ${
            pk.currentHp <= 0 ? 'bg-gray-400' : 'bg-red-500'
        }"></div>`
    ).join('');

    // 6️⃣ LOW HP WARNING
    if (p.currentHp > 0 && p.currentHp < (p.hp * 0.2)) {

        if (!p.lowHpWarned) {
            playSfx('low-hp');
            p.lowHpWarned = true;
            addLog(`WARNING: ${p.name} is low on HP!`);
        }

    } else if (p.currentHp >= (p.hp * 0.2)) {

        p.lowHpWarned = false;
    }

    // 7️⃣ RENDER SKILLS
    document.getElementById('skills-box').innerHTML =
        p.skills.map((s, i) => {

            const ready = !s.isU || p.fury >= 100;
            const sColor =
                TYPE_COLORS[s.type] || TYPE_COLORS[p.types[0]];

            return `
                <button onclick="doAction(${i})"
                    ${busy || !ready ? 'disabled' : ''}
                    class="btn-pk pixel-font ${
                        s.isU
                            ? (ready ? 'btn-ult-ready'
                                     : 'btn-ult-disabled')
                            : ''
                    }"
                    style="border-bottom-color:${sColor}">
                    ${s.n}
                </button>
            `;
        }).join('') +

        `<button onclick="useDynamax()"
            ${busy || pDynamaxUsedInGame ? 'disabled' : ''}
            class="btn-pk btn-dynamax pixel-font">
            DYNAMAX
        </button>`;

    // 8️⃣ RENDER SWITCH BOX
    document.getElementById('switch-box').innerHTML =
        pTeam.map((pk, i) => {

            if (i === pIdx) return '';

            const hpPct = (pk.currentHp / pk.hp * 100);

            return `
                <button onclick="switchP(${i})"
                    ${busy || switchCountLeft <= 0 || pk.currentHp <= 0 ? 'disabled' : ''}
                    class="switch-btn-card">

                    <img src="${pk.f}" class="w-10 h-10 pixel-img">

                    <div class="flex flex-col flex-1 items-start">
                        <span class="pixel-font text-[6px] text-left">
                            ${pk.name}
                        </span>

                        <div class="w-full bg-gray-200 h-1 mt-1">
                            <div class="h-full"
                                style="width:${hpPct}%;
                                background-color:${
                                    hpPct > 50 ? "#4ade80" :
                                    (hpPct > 20 ? "#facc15" : "#ef4444")
                                }">
                            </div>
                        </div>
                    </div>
                </button>
            `;
        }).join('');

    document.getElementById('switch-limit-text').innerText =
        `Switches: ${switchCountLeft} left`;
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