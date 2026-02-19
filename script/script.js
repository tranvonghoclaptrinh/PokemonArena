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
const GEN_1_NAMES = ["BULBASAUR", "IVYSAUR", "VENUSAUR", "CHARMANDER", "CHARMELEON", "CHARIZARD", "SQUIRTLE", "WARTORTLE", "BLASTOISE", "CATERPIE", "METAPOD", "BUTTERFREE", "WEEDLE", "KAKUNA", "BEEDRILL", "PIDGEY", "PIDGEOTTO", "PIDGEOT", "RATTATA", "RATICATE", "SPEAROW", "FEAROW", "EKANS", "ARBOK", "PIKACHU", "RAICHU", "SANDSHREW", "SANDSLASH", "NIDORAN♀", "NIDORINA", "NIDOQUEEN", "NIDORAN♂", "NIDORINO", "NIDOKING", "CLEFAIRY", "CLEFABLE", "VULPIX", "NINETALES", "JIGGLYPUFF", "WIGGLYTUFF", "ZUBAT", "GOLBAT", "ODDISH", "GLOOM", "VILEPLUME", "PARAS", "PARASECT", "VENONAT", "VENOMOTH", "DIGLETT", "DUGTRIO", "MEOWTH", "PERSIAN", "PSYDUCK", "GOLDUCK", "MANKEY", "PRIMEAPE", "GROWLITHE", "ARCANINE", "POLIWAG", "POLIWHIRL", "POLIWRATH", "ABRA", "KADABRA", "ALAKAZAM", "MACHOP", "MACHOKE", "MACHAMP", "BELLSPROUT", "WEEPINBELL", "VICTREEBEL", "TENTACOOL", "TENTACRUEL", "GEODUDE", "GRAVELER", "GOLEM", "PONYTA", "RAPIDASH", "SLOWPOKE", "SLOWBRO", "MAGNEMITE", "MAGNETON", "FARFETCH'D", "DODUO", "DODRIO", "SEEL", "DEWGONG", "GRIMER", "MUK", "SHELLDER", "CLOYSTER", "GASTLY", "HAUNTER", "GENGAR", "ONIX", "DROWZEE", "HYPNO", "KRABBY", "KINGLER", "VOLTORB","ELECTRODE", "EXEGGCUTE", "EXEGGUTOR", "CUBONE", "MAROWAK", "HITMONLEE", "HITMONCHAN", "LICKITUNG", "KOFFING", "WEEZING", "RHYHORN", "RHYDON", "CHANSEY", "TANGELA", "KANGASKHAN", "HORSEA", "SEADRA", "GOLDEEN", "SEAKING", "STARYU", "STARMIE", "MR. MIME", "SCYTHER", "JYNX", "ELECTABUZZ", "MAGMAR", "PINSIR", "TAUROS", "MAGIKARP", "GYARADOS", "LAPRAS", "DITTO", "EEVEE", "VAPOREON", "JOLTEON", "FLAREON", "PORYGON", "OMANYTE", "OMASTAR", "KABUTO", "KABUTOPS", "AERODACTYL", "SNORLAX", "DRATINI", "DRAGONAIR", "DRAGONITE"];
const GEN_2_NAMES = ["CHIKORITA","BAYLEEF","MEGANIUM","CYNDAQUIL","QUILAVA","TYPHLOSION","TOTODILE","CROCONAW","FERALIGATR","SENTRET","FURRET","HOOTHOOT","NOCTOWL","LEDYBA","LEDIAN","SPINARAK","ARIADOS","CROBAT","CHINCHOU","LANTURN","PICHU","CLEFFA","IGGLYBUFF","TOGEPI","TOGETIC","NATU","XATU","MAREEP","FLAAFFY","AMPHAROS","BELLOSSOM","MARILL","AZUMARILL","SUDOWOODO","POLITOED","HOPPIP","SKIPLOOM","JUMPLUFF","AIPOM","SUNKERN","SUNFLORA","YANMA","WOOPER","QUAGSIRE","ESPEON","UMBREON","MURKROW","SLOWKING","MISDREAVUS","UNOWN","WOBBUFFET","GIRAFARIG","PINECO","FORRETRESS","DUNSPARCE","GLIGAR","STEELIX","SNUBBULL","GRANBULL","QWILFISH","SCIZOR","SHUCKLE","HERACROSS","SNEASEL","TEDDIURSA","URSARING","SLUGMA","MAGCARGO","SWINUB","PILOSWINE","CORSOLA","REMORAID","OCTILLERY","DELIBIRD","MANTINE","SKARMORY","HOUNDOUR","HOUNDOOM","KINGDRA","PHANPY","DONPHAN","PORYGON2","STANTLER","SMEARGLE","TYROGUE","HITMONTOP","SMOOCHUM","ELEKID","MAGBY","MILTANK","BLISSEY","RAIKOU","ENTEI","SUICUNE","LARVITAR","PUPITAR","TYRANITAR","LUGIA","HO-OH","CELEBI"];
const GEN_3_NAMES = ["TREECKO","GROVYLE","SCEPTILE","TORCHIC","COMBUSKEN","BLAZIKEN","MUDKIP","MARSHTOMP","SWAMPERT","POOCHYENA","MIGHTYENA","ZIGZAGOON","LINOONE","WURMPLE","SILCOON","BEAUTIFLY","CASCOON","DUSTOX","LOTAD","LOMBRE","LUDICOLO","SEEDOT","NUZLEAF","SHIFTRY","TAILLOW","SWELLOW","WINGULL","PELIPPER","RALTS","KIRLIA","GARDEVOIR","SURSKIT","MASQUERAIN","SHROOMISH","BRELOOM","SLAKOTH","VIGOROTH","SLAKING","NINCADA","NINJASK","SHEDINJA","WHISMUR","LOUDRED","EXPLOUD","MAKUHITA","HARIYAMA","AZURILL","NOSEPASS","SKITTY","DELCATTY","SABLEYE","MAWILE","ARON","LAIRON","AGGRON","MEDITITE","MEDICHAM","ELECTRIKE","MANECTRIC","PLUSLE","MINUN","VOLBEAT","ILLUMISE","ROSELIA","GULPIN","SWALOT","CARVANHA","SHARPEDO","WAILMER","WAILORD","NUMEL","CAMERUPT","TORKOAL","SPOINK","GRUMPIG","SPINDA","TRAPINCH","VIBRAVA","FLYGON","CACNEA","CACTURNE","SWABLU","ALTARIA","ZANGOOSE","SEVIPER","LUNATONE","SOLROCK","BARBOACH","WHISCASH","CORPHISH","CRAWDAUNT","BALTOY","CLAYDOL","LILEEP","CRADILY","ANORITH","ARMALDO","FEEBAS","MILOTIC","CASTFORM","KECLEON","SHUPPET","BANETTE","DUSKULL","DUSCLOPS","TROPIUS","CHIMECHO","ABSOL","WYNAUT","SNORUNT","GLALIE","SPHEAL","SEALEO","WALREIN","CLAMPERL","HUNTAIL","GOREBYSS","RELICANTH","LUVDISC","BAGON","SHELGON","SALAMENCE","BELDUM","METANG","METAGROSS","REGIROCK","REGICE","REGISTEEL","LATIAS","LATIOS","KYOGRE","GROUDON","RAYQUAZA","JIRACHI","DEOXYS"];
const GEN_4_NAMES = ["TURTWIG","GROTLE","TORTERRA","CHIMCHAR","MONFERNO","INFERNAPE","PIPLUP","PRINPLUP","EMPOLEON","STARLY","STARAVIA","STARAPTOR","BIDOOF","BIBAREL","KRICKETOT","KRICKETUNE","SHINX","LUXIO","LUXRAY","BUDEW","ROSERADE","CRANIDOS","RAMPARDOS","SHIELDON","BASTIODON","BURMY","WORMADAM","MOTHIM","COMBEE","VESPIQUEN","PACHIRISU","BUIZEL","FLOATZEL","CHERUBI","CHERRIM","SHELLOS","GASTRODON","AMBIPOM","DRIFLOON","DRIFBLIM","BUNEARY","LOPUNNY","MISMAGIUS","HONCHKROW","GLAMEOW","PURUGLY","CHINGLING","STUNKY","SKUNTANK","BRONZOR","BRONZONG","BONSLY","MIME JR.","HAPPINY","CHATOT","SPIRITOMB","GIBLE","GABITE","GARCHOMP","MUNCHLAX","RIOLU","LUCARIO","HIPPOPOTAS","HIPPOWDON","SKORUPI","DRAPION","CROAGUNK","TOXICROAK","CARNIVINE","FINNEON","LUMINEON","MANTYKE","SNOVER","ABOMASNOW","WEAVILE","MAGNEZONE","LICKILICKY","RHYPERIOR","TANGROWTH","ELECTIVIRE","MAGMORTAR","TOGEKISS","YANMEGA","LEAFEON","GLACEON","GLISCOR","MAMOSWINE","PORYGON-Z","GALLADE","PROBOPASS","DUSKNOIR","FROSLASS","ROTOM","UXIE","MESPRIT","AZELF","DIALGA","PALKIA","HEATRAN","REGIGIGAS","GIRATINA","CRESSELIA","PHIONE","MANAPHY","DARKRAI","SHAYMIN","ARCEUS"];
const COMMON_NAMES = [...GEN_1_NAMES, ...GEN_2_NAMES, ...GEN_3_NAMES, ...GEN_4_NAMES];
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

const DATA = Object.keys(POKEMON_DB).map(id => {
    const p = POKEMON_DB[id];
    const idInt = parseInt(id);
    
    // Tạo object để hàm generateSkills xử lý
    const tempPkmn = {
        types: p.types, // Đây phải là mảng ["FIRE", "FLYING"]...
        isLegendary: p.isLeg,
        ult: p.ult
    };

    return { 
        id: idInt, 
        name: p.name, 
        types: p.types, 
        isLegendary: p.isLeg,
        hp: p.isLeg ? 600 : 250 + (idInt % 100),
        skills: generateSkills(tempPkmn) 
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
    
    const moveDB = {
        'FIRE': { n: 'Flamethrower', u: 'Blast Burn', d: 60 },
        'WATER': { n: 'Hydro Pump', u: 'Hydro Cannon', d: 60 },
        'GRASS': { n: 'Solar Beam', u: 'Frenzy Plant', d: 60 },
        'ELECTRIC': { n: 'Thunderbolt', u: 'Volt Tackle', d: 60 },
        'ICE': { n: 'Ice Beam', u: 'Blizzard', d: 60 },
        'FIGHTING': { n: 'Aura Sphere', u: 'Close Combat', d: 65 },
        'POISON': { n: 'Sludge Bomb', u: 'Gunk Shot', d: 60 },
        'GROUND': { n: 'Earthquake', u: 'Fissure', d: 65 },
        'FLYING': { n: 'Air Slash', u: 'Sky Attack', d: 60 },
        'PSYCHIC': { n: 'Psychic', u: 'Psycho Boost', d: 60 },
        'BUG': { n: 'Bug Buzz', u: 'Megahorn', d: 60 },
        'ROCK': { n: 'Rock Slide', u: 'Head Smash', d: 60 },
        'GHOST': { n: 'Shadow Ball', u: 'Shadow Force', d: 60 },
        'DRAGON': { n: 'Dragon Pulse', u: 'Roar of Time', d: 65 },
        'DARK': { n: 'Dark Pulse', u: 'Night Daze', d: 60 },
        'STEEL': { n: 'Flash Cannon', u: 'Meteor Mash', d: 60 },
        'FAIRY': { n: 'Moonblast', u: 'Light of Ruin', d: 65 },
        'NORMAL': { n: 'Swift', u: 'Giga Impact', d: 50 }
    };

    // --- Chiêu 1: Nếu có hệ 2 thì lấy hệ 2, nếu không thì lấy chiêu yếu của hệ 1 (thay vì Tackle) ---
    let m1;
    if (t2 && moveDB[t2]) {
        m1 = { n: moveDB[t2].n, d: moveDB[t2].d, isU: false, type: t2 };
    } else {
        // Nếu chỉ có 1 hệ, chiêu 1 là "Quick Attack" của hệ đó (giảm dam nhẹ để phân biệt chiêu 2)
        const mInfo = moveDB[t1] || moveDB['NORMAL'];
        m1 = { n: "Quick Attack", d: 45, isU: false, type: t1 };
    }

    // --- Chiêu 2: Kỹ năng đặc trưng của hệ chính ---
    const mInfo1 = moveDB[t1] || moveDB['NORMAL'];
    const m2 = { n: mInfo1.n, d: mInfo1.d, isU: false, type: t1 };

    // --- Chiêu 3: Ultimate ---
    let ultType = t1;
    if (t2 && t1 === 'NORMAL') ultType = t2; // Ưu tiên hệ phụ nếu hệ chính là Normal

    const mInfoUlt = moveDB[ultType] || moveDB['NORMAL'];
    
    const m3 = { 
        n: pkmn.isLegendary ? (pkmn.ult || mInfoUlt.u) : mInfoUlt.u, 
        d: pkmn.isLegendary ? 140 : 110, 
        isU: true,
        type: ultType 
    };

    return [m1, m2, m3];
}
// Hàm tính multiplier cho Song hệ
function getDamageMultiplier(atkType, targetTypes) {
    let mul = 1.0;
    if (!TYPE_CHART[atkType]) return mul;
    targetTypes.forEach(defType => {
        if (TYPE_CHART[atkType].superEff.includes(defType)) mul *= 2.0;
        else if (TYPE_CHART[atkType].notEff.includes(defType)) mul *= 0.5;
        else if (TYPE_CHART[atkType].noEff && TYPE_CHART[atkType].noEff.includes(defType)) mul *= 0;
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
    
    // 1. TẮT NHẠC NỀN MENU TRIỆT ĐỂ TRƯỚC KHI LÀM BẤT CỨ GÌ
    const audioBgm = document.getElementById('audio-bgm');
    if (audioBgm) {
        audioBgm.pause();
        audioBgm.currentTime = 0;
        // Gán thêm thuộc tính để tránh các hàm khác tự ý play lại
        audioBgm.dataset.state = "stopped"; 
    }
    
    // Đợi một nhịp cực ngắn để trình duyệt xử lý xong lệnh dừng
    await new Promise(r => setTimeout(r, 300));

    // 2. PHÁT TIẾNG SPAWN
    playSfx('spawn');
    
    // ... (Giữ nguyên các logic khởi tạo pTeam, eTeam bên dưới)
    switchCountLeft = difficulty === 'EASY' ? 2 : (difficulty === 'MEDIUM' ? 3 : 4);
    
    pTeam = selected.map(id => { 
        const p = DATA.find(x => x.id === id); 
        return {
            ...p, 
            maxHp: p.hp,
            currentHp: p.hp, 
            fury: 0, 
            s: BASE_URL+"back/"+id+".png", 
            f: BASE_URL+id+".png",
            lowHpWarned: false // Thêm dòng này để theo dõi từng con
        }; 
    });

    eTeam = generateEnemyTeam().map(x => ({
        ...x, 
        maxHp: x.hp,
        currentHp: x.hp, 
        fury: 0, 
        s: BASE_URL+"back/"+x.id+".png", 
        f: BASE_URL+x.id+".png"
    }));

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
    void ball.offsetWidth; // Force reflow

    // 4. Bắt đầu ném
    playSfx('nem');
    ball.style.transition = 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
    ball.style.left = `${targetX}px`;
    ball.style.top = `${targetY}px`;
    ball.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(720deg)';

    // Nạp sẵn ảnh mới cho Pokemon
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
    
    // 7. Đợi hiệu ứng xuất hiện hoàn tất
    await new Promise(r => setTimeout(r, 300));

    // === PHẦN CHỈNH SỬA QUAN TRỌNG NHẤT ===
    // Giải phóng trạng thái bận để người chơi có thể click nút Ultimate
    busy = false; 
    pTurn = true; // Trả lại lượt cho người chơi
    updateUI();   // Cập nhật lại thuộc tính disabled của các nút
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

async function attackAnim(attackerId, multiplier = 1, isUltimate = false, damageAmount = 0, isDynamax = false) {
    return new Promise(async (resolve) => { // Thêm Promise để không bị khựng lượt
        const atk = document.getElementById(attackerId);
        const isPlayer = attackerId === 'p-sprite';
        const def = document.getElementById(isPlayer ? 'e-sprite' : 'p-sprite');
        
        const moveX = isPlayer ? 100 : -100;
        const moveY = isPlayer ? -40 : 40;
        const isCrit = multiplier >= 2;
        const isMissing = multiplier === 0;

        const targetScale = isDynamax ? 2.2 : 1; 
        const translateY = isDynamax ? -15 : 0;

        // --- BƯỚC 1: CHUẨN BỊ ---
        if (isDynamax) {
            playSfx('dynamax'); 
            atk.classList.add('dynamax-active'); 
            atk.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            atk.style.transform = `scale(${targetScale}) translateY(${translateY}px)`;
            shakeScreen('heavy');
            await new Promise(r => setTimeout(r, 1000));
        } else if (isUltimate) {
            await new Promise(r => setTimeout(r, 400));
        }

        // --- BƯỚC 2: LAO VÀO ---
        atk.style.transition = 'transform 0.15s ease-in';
        atk.style.transform = `translate(${moveX}px, ${moveY}px) scale(${targetScale})`;
        
        // --- BƯỚC 3: VA CHẠM ---
        setTimeout(() => {
            const targetData = isPlayer ? eTeam[eIdx] : pTeam[pIdx];
            if (isMissing) {
                playSfx('missing');
                showFloatingDamage(def, "MISSING!", false, true); 
            } else {
                if (damageAmount > 0) {
                    showFloatingDamage(def, damageAmount, isCrit || isUltimate || isDynamax);
                    showElementalAura(def, targetData, 'hit'); 
                }
                
                // ĐỔI LOGIC PHÁT SOUND TẠI ĐÂY:
                if ( isUltimate) {
                    // Giữ nguyên sound hoành tráng cho Ultimate
                    playSfx('ultimate'); 
                    shakeScreen('heavy');
                } 
                if (isDynamax) {
                    // Giữ nguyên sound hoành tráng cho Dynamax
                    playSfx('hit-damage'); 
                    shakeScreen('heavy');
                }
                
                else {
                    if (!isCrit) { 
                            // Đòn đánh thường, không chí mạng -> dùng sound 'hit'
                            playSfx('hit'); 
                            shakeScreen('normal');
                        } else {
                            // Đòn chí mạng (Crit) -> dùng sound 'hit-damage' cho mạnh mẽ
                            playSfx('hit-damage'); 
                            shakeScreen('heavy');
                        }
                }
                
                def.classList.add('hit-effect');
            }
            setTimeout(() => def.classList.remove('hit-effect'), 250);
        }, 100);

        // --- BƯỚC 4: THU HỒI ---
        await new Promise(r => setTimeout(r, 350));
        atk.style.transition = 'transform 0.3s ease-out';
        atk.style.transform = `translate(0,0) scale(${targetScale}) translateY(${translateY}px)`;
        
        await new Promise(r => setTimeout(r, 500));

        // --- BƯỚC 5: KẾT THÚC DYNAMAX ---
        if (isDynamax) {
            atk.style.transition = 'transform 0.5s ease-out';
            atk.style.transform = 'scale(1) translate(0,0)';
            atk.classList.remove('dynamax-active');
            await new Promise(r => setTimeout(r, 500));
        }

        resolve(); // QUAN TRỌNG: Giải phóng lượt đánh, không còn bị khựng
    });
}
// Hàm bổ trợ hiển thị sát thương
function showFloatingDamage(targetEl, amount, isCrit) {
    const rect = targetEl.getBoundingClientRect();
    const text = document.createElement('div');
    
    text.innerText = isCrit ? `CRITICAL! -${amount}` : `-${amount}`;
    // Gán class để dùng animation damage-float
    text.className = `fixed z-[100] pixel-font pointer-events-none damage-text ${isCrit ? 'text-red-500 text-xl' : 'text-white text-lg'}`;
    
    // Căn giữa số sát thương trên đầu Pokemon
    text.style.left = `${rect.left + (rect.width / 2)}px`;
    text.style.top = `${rect.top}px`;
    text.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(text);
    setTimeout(() => text.remove(), 800);
}

// Hàm phụ tạo số sát thương bay lên
function showFloatingDamage(targetEl, amount, isCritical) {
    const rect = targetEl.getBoundingClientRect();
    const damageText = document.createElement('div');
    
    damageText.innerText = isCritical ? `CRITICAL! -${amount}` : `-${amount}`;
    
    // Style cho chữ
    damageText.style.position = 'fixed';
    damageText.style.left = `${rect.left + rect.width / 2}px`;
    damageText.style.top = `${rect.top}px`;
    damageText.style.transform = 'translateX(-50%)';
    damageText.style.zIndex = '100';
    damageText.style.pointerEvents = 'none';
    damageText.style.fontWeight = 'bold';
    damageText.style.fontFamily = "'Press Start 2P', cursive, sans-serif"; // Hoặc pixel-font của bạn
    damageText.style.fontSize = isCritical ? '20px' : '14px';
    damageText.style.color = isCritical ? '#ff0000' : '#ffffff'; // ĐỎ nếu chí mạng, TRẮNG nếu thường
    damageText.style.textShadow = '2px 2px #000';
    damageText.style.whiteSpace = 'nowrap';
    
    // Thêm hiệu ứng bay lên bằng CSS Animation
    damageText.style.animation = 'damageFloat 1s ease-out forwards';
    
    document.body.appendChild(damageText);
    
    // Xóa bỏ sau khi diễn xong
    setTimeout(() => damageText.remove(), 1000);
}
async function attack(skillIndex) {
    if (busy || !pTurn) return;
    
    const p = pTeam[pIdx];
    const e = eTeam[eIdx];
    const skill = p.skills[skillIndex];

    // --- CẬP NHẬT QUAN TRỌNG TẠI ĐÂY ---
    // Nếu là chiêu Ultimate (isU), trừ hết nộ NGAY LẬP TỨC 
    if (skill.isU) {
        p.fury = 0; 
        updateUI(); // Cập nhật giao diện thanh nộ biến mất ngay
    }
    // ----------------------------------

    busy = true;
    const atkType = skill.type || p.types[0];
    const multiplier = getDamageMultiplier(atkType, e.types);

    // Chạy Animation (Vẫn truyền multiplier để hiện hiệu ứng x0 nếu hụt)
    await attackAnim('p-sprite', multiplier, skill.isU);

    // Tính toán sát thương
    let damage = Math.floor(skill.d * multiplier * (0.85 + Math.random() * 0.15));
    
    // Nếu multiplier = 0 (Missing), damage sẽ bằng 0
    e.currentHp = Math.max(0, e.currentHp - damage);

    // Log thông báo
    addLog(`${p.name} used ${skill.n}!`);
    if (multiplier === 0) {
        addLog("It had no effect... (Missing) ❌");
    } else if (multiplier >= 2) {
        addLog("It's super effective! 🔥");
    }

    updateUI();

    // Kiểm tra kết thúc hoặc đổi lượt
    if (e.currentHp <= 0) {
        setTimeout(checkBattleEnd, 500);
    } else {
        pTurn = false;
        setTimeout(enemyTurn, ACTION_DELAY);
    }
    busy = false;
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

        await attackAnim('p-sprite', 1, false, dynaDmg, true); 
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
        await attackAnim('p-sprite', isMissing ? 0 : multiplier, s.isU, finalDamage, false);

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
    const mainType = pokemon.types[0];
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

    addLog(`${p.name} activates DYNAMAX!!`);
    updateUI();

    // Sát thương Dynamax
    let dynaDmg = 160;
    if (p.isLegendary) dynaDmg = Math.floor(dynaDmg * 1.15);

    await attackAnim('p-sprite', 1, false, dynaDmg, true); 

    e.currentHp = Math.max(0, e.currentHp - dynaDmg);
    p.fury = Math.min(100, p.fury + 50);
    updateUI(); 

    if (e.currentHp <= 0) {
        // Đợi checkDeath xử lý ném bóng và bên trong checkDeath đã có busy = false
        await checkDeath(); 
        // Đảm bảo tuyệt đối sau khi ném bóng xong, người chơi có thể bấm nút
        busy = false; 
        pTurn = true;
        updateUI();
    } else {
        // Nếu địch chưa chết mới chuyển lượt cho máy
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
async function enemyTurn() {
    // 1. Khóa ngay lập tức
    busy = true; 
    pTurn = false;

    // Kiểm tra điều kiện dừng (đảm bảo địch còn sống để đánh)
    if (eIdx >= eTeam.length || pIdx >= pTeam.length || eTeam[eIdx].currentHp <= 0) {
        busy = false; 
        return;
    }
    
    const p = pTeam[pIdx];
    const e = eTeam[eIdx];
    const enemyEl = document.getElementById('e-sprite');
    const isLastPkmn = (eIdx === eTeam.length - 1);
    const eType = e.types ? e.types[0] : e.type; 

    // 2. Quyết định Dynamax
    let shouldDynamax = !e.hasUsedDynamax && (isLastPkmn || checkTypeAdvantage(eType, p.types[0]));

    if (shouldDynamax) {
        e.hasUsedDynamax = true; 
        addLog(`Enemy ${e.name} activates DYNAMAX!!`);
        updateUI();
        await attackAnim('e-sprite', 1, false, 160, true); 
        p.currentHp = Math.max(0, p.currentHp - 160);
        e.fury = Math.min(100, e.fury + 50);
    } 
    else {
        // 3. Chọn kỹ năng
        const sIdx = (e.fury >= 100) ? 2 : (Math.random() > 0.4 ? 1 : 0);
        const s = e.skills[sIdx];
        
        if (s.isU) {
            e.fury = 0;
            updateUI(); 
            showElementalAura(enemyEl, e, 'ultimate'); 
            if (e.isLegendary) await announceSkill(s.n, TYPE_COLORS[eType] || '#fff', e.id);
        }
        
        addLog(`Enemy ${e.name} uses ${s.n}!`);
        let finalDamage = Math.floor(s.d * (eType === currentMap.type ? 1.3 : 1.0));
        const isMissing = Math.random() < 0.1;
        const mult = isMissing ? 0 : 1;

        await attackAnim('e-sprite', mult, s.isU, finalDamage, false);
        
        if (!isMissing) {
            p.currentHp = Math.max(0, p.currentHp - finalDamage);
            if (!s.isU) e.fury = Math.min(100, e.fury + 30);
        }
    }

    updateUI(); 

    // 4. KIỂM TRA SAU ĐÒN ĐÁNH
    // Quan trọng: Phải đợi checkDeath xong để biết người chơi có bị hạ gục không
    const deathResult = await checkDeath(); 

    // 5. GIẢI PHÓNG QUYỀN ĐIỀU KHIỂN
    // CHỈ trả lượt cho người chơi nếu KHÔNG có ai bị hạ gục ở bước trên
    if (deathResult === "none") {
        setTimeout(() => { 
            busy = false;   
            pTurn = true;   
            updateUI();     
        }, 500);
    } 
    // Nếu deathResult là "player_changed", hàm checkDeath của bạn 
    // ĐÃ tự động gọi lại enemyTurn hoặc xử lý lượt tiếp theo rồi, 
    // nên chúng ta không được set pTurn = true ở đây nữa.
}

async function checkDeath() {
    const e = eTeam[eIdx], p = pTeam[pIdx];
    
    // TRƯỜNG HỢP: Địch bị hạ gục
    if (e && e.currentHp <= 0) {
        busy = true; // Khóa tương tác
        addLog(`${e.name} fainted!`);
        eIdx++; 
        
        if (eIdx >= eTeam.length) return endGame(true);
        
        document.getElementById('e-sprite').src = ""; // Xóa ảnh cũ ngay
        await spawnSequence('enemy'); // Đợi ném bóng xong
        
        // Sau khi địch ra con mới: Trả lượt cho người chơi
        pTurn = true;
        busy = false; 
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
        await spawnSequence('player'); // Đợi hồi quân
        
        // Sau khi ta ra con mới: Lượt thuộc về MÁY
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
    if(!p || !e) return;
    
    // 1. CẬP NHẬT TÊN VÀ SONG HỆ (Duyệt mảng types)
    document.getElementById('p-name').innerText = p.name;
    document.getElementById('p-type-slot').innerHTML = p.types.map(t => 
        `<span class="type-badge-inline ml-1" style="background:${TYPE_COLORS[t]}">${t}</span>`
    ).join('');

    document.getElementById('e-name').innerText = e.name;
    document.getElementById('e-type-slot').innerHTML = e.types.map(t => 
        `<span class="type-badge-inline ml-1" style="background:${TYPE_COLORS[t]}">${t}</span>`
    ).join('');
    
// 2. CẬP NHẬT MÁU
    const pHPPercent = (p.currentHp / p.hp * 100);
    const eHPPercent = (e.currentHp / e.hp * 100);
    
    const pHPFill = document.getElementById('p-hp-fill');
    const eHPFill = document.getElementById('e-hp-fill');

    // Mẹo: Nếu Pokemon vừa thay đổi (opacity sprite = 0), reset thanh máu ngay lập tức
    if (document.getElementById('p-sprite').style.opacity === "0") {
        pHPFill.style.transition = 'none';
    } else {
        pHPFill.style.transition = 'width 0.3s ease-in-out';
    }

    pHPFill.style.width = pHPPercent + '%';
    eHPFill.style.width = eHPPercent + '%';

    // Đổi màu thanh máu
    pHPFill.style.backgroundColor = pHPPercent > 50 ? "#4ade80" : (pHPPercent > 20 ? "#facc15" : "#ef4444");
    eHPFill.style.backgroundColor = eHPPercent > 50 ? "#4ade80" : (eHPPercent > 20 ? "#facc15" : "#ef4444");

    document.getElementById('p-hp-text').innerText = `${Math.ceil(p.currentHp)}/${p.hp}`;
    
    // 3. CẬP NHẬT NỘ
    document.getElementById('p-fury-fill').style.width = Math.min(100, p.fury)+'%';
    document.getElementById('e-fury-fill').style.width = Math.min(100, e.fury)+'%';
    
    // 4. CẬP NHẬT ẢNH
    const pSprite = document.getElementById('p-sprite');
    const eSprite = document.getElementById('e-sprite');
    if (pSprite.style.opacity !== "0") pSprite.src = p.s;
    if (eSprite.style.opacity !== "0") eSprite.src = e.f;
    
    // 5. CẬP NHẬT TRẠNG THÁI BÓNG POKE
    document.getElementById('p-balls').innerHTML = pTeam.map(pk => `<div class="w-2 h-2 rounded-full ${pk.currentHp <= 0 ? 'bg-gray-400' : 'bg-red-500'}"></div>`).join('');
    document.getElementById('e-balls').innerHTML = eTeam.map(pk => `<div class="w-2 h-2 rounded-full ${pk.currentHp <= 0 ? 'bg-gray-400' : 'bg-red-500'}"></div>`).join('');
    
    // Cảnh báo máu thấp
    if (p.currentHp > 0 && p.currentHp < (p.hp * 0.2)) {
        if (!p.lowHpWarned) { 
            playSfx('low-hp');
            p.lowHpWarned = true; // Đánh dấu con này đã kêu rồi, không kêu nữa
            addLog(`WARNING: ${p.name} is low on HP!`); 
        }
        } else if (p.currentHp >= (p.hp * 0.2)) {
        // Nếu Pokemon được hồi máu lên trên 20%, reset để có thể kêu lại nếu máu tụt xuống sau đó
        p.lowHpWarned = false; 
    }

    // 6. VẼ LẠI SKILLS-BOX
    document.getElementById('skills-box').innerHTML = p.skills.map((s, i) => {
        const ready = !s.isU || p.fury >= 100;
        // Lấy màu hệ của chiêu thức (nếu chiêu thức có type riêng, nếu không lấy hệ đầu của Pokemon)
        const sColor = TYPE_COLORS[s.type] || TYPE_COLORS[p.types[0]];
        return `<button onclick="doAction(${i})" ${busy || !ready ? 'disabled' : ''} 
                class="btn-pk pixel-font ${s.isU ? (ready ? 'btn-ult-ready' : 'btn-ult-disabled') : ''}"
                style="border-bottom-color: ${sColor}">
                ${s.n}
                </button>`;
    }).join('') + `<button onclick="useDynamax()" ${busy || pDynamaxUsedInGame ? 'disabled' : ''} class="btn-pk btn-dynamax pixel-font">DYNAMAX</button>`;
    
    // 7. VẼ LẠI SWITCH-BOX
    document.getElementById('switch-box').innerHTML = pTeam.map((pk, i) => {
        if(i === pIdx) return '';
        const hpPct = (pk.currentHp/pk.hp*100);
        return `<button onclick="switchP(${i})" ${busy || switchCountLeft <= 0 || pk.currentHp <= 0 ? 'disabled' : ''} class="switch-btn-card">
            <img src="${pk.f}" class="w-10 h-10 pixel-img">
            <div class="flex flex-col flex-1 items-start">
                <span class="pixel-font text-[6px] text-left">${pk.name}</span>
                <div class="w-full bg-gray-200 h-1 mt-1">
                    <div class="h-full" style="width: ${hpPct}%; background-color: ${hpPct > 50 ? "#4ade80" : (hpPct > 20 ? "#facc15" : "#ef4444")}"></div>
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