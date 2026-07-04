
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const progress = $('#progress');
const openDrawer = $('#openDrawer');
const closeDrawer = $('#closeDrawer');
const drawer = $('#drawer');
const drawerShade = $('#drawerShade');

function setProgress() {
  const h = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = ((scrollY / (h || 1)) * 100) + '%';
}

function updateTime() {
  const text = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short'
  }).format(new Date()).replace(' at', ',');
  if ($('#dateStamp')) $('#dateStamp').textContent = text + ' (Pacific Time)';
  if ($('#dateStampLarge')) $('#dateStampLarge').textContent = text + ' (Pacific Time)';
}

function toggleDrawer(show) {
  if (!drawer || !drawerShade) return;
  drawer.classList.toggle('open', show);
  drawerShade.classList.toggle('show', show);
  drawer.setAttribute('aria-hidden', show ? 'false' : 'true');
}
if (openDrawer) openDrawer.onclick = () => toggleDrawer(true);
if (closeDrawer) closeDrawer.onclick = () => toggleDrawer(false);
if (drawerShade) drawerShade.onclick = () => toggleDrawer(false);
$$('.drawer a').forEach(a => a.onclick = () => toggleDrawer(false));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .15 });
$$('.reveal').forEach(el => revealObs.observe(el));

function parallax() {
  $$('.parallax').forEach(el => {
    const r = el.parentElement.getBoundingClientRect();
    const speed = parseFloat(el.dataset.speed || 0.12);
    el.style.transform = `translate3d(0, ${r.top * speed}px, 0) scale(1.06)`;
  });
}

const regions = {
  global: {
    center: [24, 18], zoom: 2,
    stats: { fires: 481266, acres: 335103389, deaths: 1784 },
    dots: [
      [37.44,-121.91,40,'VIIRS NOAA-20','California, USA'],
      [56.1,-106.3,80,'MODIS Terra','Saskatchewan, Canada'],
      [61.2,-135.1,120,'VIIRS S-NPP','Yukon, Canada'],
      [39.48,-0.4,160,'NOAA-21 VIIRS','Valencia region, Spain'],
      [37.98,23.72,200,'MODIS Aqua','Greece'],
      [55.75,82.93,90,'NOAA-20 VIIRS','Siberia, Russia'],
      [-8.4,-62.2,130,'VIIRS NOAA-20','Amazon Basin, Brazil'],
      [-24.5,133.8,149,'MODIS Terra','Northern Territory, Australia'],
      [1.35,103.82,189,'VIIRS S-NPP','Sumatra / SE Asia'],
      [41.01,28.97,79,'NOAA-21 VIIRS','Turkey'],
      [31.23,121.47,119,'MODIS Aqua','Eastern China'],
      [-1.29,36.82,159,'NOAA-20 VIIRS','Kenya'],
      [45.42,-75.69,199,'VIIRS NOAA-20','Ontario, Canada'],
      [34.05,-118.24,89,'MODIS Terra','Southern California, USA'],
      [48.85,2.35,108,'VIIRS S-NPP','France'],
      [35.68,139.69,148,'NOAA-21 VIIRS','Japan'],
      [-33.92,18.42,188,'MODIS Aqua','South Africa'],
      [-22.91,-43.17,78,'NOAA-20 VIIRS','Brazil'],
      [20.59,78.96,118,'VIIRS NOAA-20','India'],
      [13.75,100.5,158,'MODIS Terra','Thailand'],
      [44.06,-121.31,198,'VIIRS S-NPP','Oregon, USA'],
      [47.04,-122.9,67,'NOAA-21 VIIRS','Washington, USA'],
      [43.62,-116.2,107,'MODIS Aqua','Idaho, USA'],
      [39.74,-104.99,147,'NOAA-20 VIIRS','Colorado, USA'],
      [35.08,-106.65,187,'VIIRS NOAA-20','New Mexico, USA'],
      [33.45,-112.07,77,'MODIS Terra','Arizona, USA'],
      [32.78,-96.8,117,'VIIRS S-NPP','Texas, USA'],
      [25.76,-80.19,157,'NOAA-21 VIIRS','Florida, USA'],
      [19.43,-99.13,176,'MODIS Aqua','Mexico'],
      [53.55,-113.49,66,'NOAA-20 VIIRS','Alberta, Canada'],
      [49.28,-123.12,106,'VIIRS NOAA-20','British Columbia, Canada'],
      [62.45,-114.38,146,'MODIS Terra','Northwest Territories, Canada'],
      [-15.79,-47.88,186,'VIIRS S-NPP','Brazilian Cerrado'],
      [-3.1,-60.02,76,'NOAA-21 VIIRS','Manaus region, Brazil'],
      [-12.05,-77.04,116,'MODIS Aqua','Peru'],
      [-16.5,-68.15,135,'NOAA-20 VIIRS','Bolivia'],
      [-33.45,-70.66,175,'VIIRS NOAA-20','Chile'],
      [-34.6,-58.38,65,'MODIS Terra','Argentina'],
      [4.71,-74.07,105,'VIIRS S-NPP','Colombia'],
      [41.9,12.5,145,'NOAA-21 VIIRS','Italy'],
      [43.3,5.37,185,'MODIS Aqua','Southern France'],
      [38.72,-9.14,75,'NOAA-20 VIIRS','Portugal'],
      [44.82,20.46,94,'VIIRS NOAA-20','Serbia'],
      [45.81,15.98,134,'MODIS Terra','Croatia'],
      [52.23,21.01,174,'VIIRS S-NPP','Poland'],
      [50.45,30.52,64,'NOAA-21 VIIRS','Ukraine'],
      [9.08,7.49,104,'MODIS Aqua','Nigeria'],
      [5.56,-0.2,144,'NOAA-20 VIIRS','Ghana'],
      [-6.79,39.21,184,'VIIRS NOAA-20','Tanzania'],
      [-17.82,31.05,53,'MODIS Terra','Zimbabwe'],
      [-15.42,28.28,93,'VIIRS S-NPP','Zambia'],
      [-22.56,17.08,133,'NOAA-21 VIIRS','Namibia'],
      [-25.97,32.58,173,'MODIS Aqua','Mozambique'],
      [31.63,-7.99,63,'NOAA-20 VIIRS','Morocco'],
      [15.5,32.56,103,'VIIRS NOAA-20','Sudan'],
      [23.13,113.26,143,'MODIS Terra','South China'],
      [39.9,116.4,162,'VIIRS S-NPP','Northern China'],
      [43.24,76.89,52,'NOAA-21 VIIRS','Kazakhstan'],
      [41.31,69.24,92,'MODIS Aqua','Uzbekistan'],
      [35.69,51.39,132,'NOAA-20 VIIRS','Iran'],
      [24.71,46.67,172,'VIIRS NOAA-20','Saudi Arabia'],
      [28.61,77.2,62,'MODIS Terra','Northern India'],
      [17.39,78.49,102,'VIIRS S-NPP','Hyderabad, India'],
      [23.81,90.41,121,'NOAA-21 VIIRS','Bangladesh'],
      [27.71,85.32,161,'MODIS Aqua','Nepal'],
      [14.6,121.0,51,'NOAA-20 VIIRS','Philippines'],
      [21.03,105.85,91,'VIIRS NOAA-20','Vietnam'],
      [16.84,96.17,131,'MODIS Terra','Myanmar'],
      [-33.87,151.21,171,'VIIRS S-NPP','New South Wales, Australia'],
      [-37.81,144.96,61,'NOAA-21 VIIRS','Victoria, Australia'],
      [-31.95,115.86,80,'MODIS Aqua','Western Australia'],
      [-27.47,153.03,120,'NOAA-20 VIIRS','Queensland, Australia'],
      [37.825,-120.9,160,'VIIRS NOAA-20','Sierra Nevada, USA'],
      [38.275,-120.1,50,'MODIS Terra','Sierra Nevada, USA'],
      [38.725,-120.9,90,'VIIRS S-NPP','Sierra Nevada, USA'],
      [39.175,-120.1,130,'NOAA-21 VIIRS','Sierra Nevada, USA'],
      [44.825,-121.9,170,'MODIS Aqua','Cascades, USA'],
      [45.275,-121.1,189,'NOAA-20 VIIRS','Cascades, USA'],
      [45.725,-121.9,79,'VIIRS NOAA-20','Cascades, USA'],
      [46.175,-121.1,119,'MODIS Terra','Cascades, USA'],
      [53.525,-115.4,159,'VIIRS S-NPP','Alberta boreal, Canada'],
      [53.975,-114.6,199,'NOAA-21 VIIRS','Alberta boreal, Canada'],
      [54.425,-115.4,89,'MODIS Aqua','Alberta boreal, Canada'],
      [54.875,-114.6,129,'NOAA-20 VIIRS','Alberta boreal, Canada'],
      [50.225,-124.2,148,'VIIRS NOAA-20','B.C. interior, Canada'],
      [50.675,-123.4,188,'MODIS Terra','B.C. interior, Canada'],
      [51.125,-124.2,78,'VIIRS S-NPP','B.C. interior, Canada'],
      [51.575,-123.4,118,'NOAA-21 VIIRS','B.C. interior, Canada'],
      [-11.175,-58.4,158,'MODIS Aqua','Amazon southern arc, Brazil'],
      [-10.725,-57.6,198,'NOAA-20 VIIRS','Amazon southern arc, Brazil'],
      [-10.275,-58.4,88,'VIIRS NOAA-20','Amazon southern arc, Brazil'],
      [-9.825,-57.6,107,'MODIS Terra','Amazon southern arc, Brazil'],
      [-16.675,-56.4,147,'VIIRS S-NPP','Mato Grosso, Brazil'],
      [-16.225,-55.6,187,'NOAA-21 VIIRS','Mato Grosso, Brazil'],
      [-15.775,-56.4,77,'MODIS Aqua','Mato Grosso, Brazil'],
      [-15.325,-55.6,117,'NOAA-20 VIIRS','Mato Grosso, Brazil'],
      [38.325,-3.9,157,'VIIRS NOAA-20','Central Spain'],
      [38.775,-3.1,197,'MODIS Terra','Central Spain'],
      [39.225,-3.9,66,'VIIRS S-NPP','Central Spain'],
      [39.675,-3.1,106,'NOAA-21 VIIRS','Central Spain'],
      [36.925,22.4,146,'MODIS Aqua','Peloponnese, Greece'],
      [37.375,23.2,186,'NOAA-20 VIIRS','Peloponnese, Greece'],
      [37.825,22.4,76,'VIIRS NOAA-20','Peloponnese, Greece'],
      [38.275,23.2,116,'MODIS Terra','Peloponnese, Greece'],
      [40.525,29.7,156,'VIIRS S-NPP','Northern Turkey'],
      [40.975,30.5,175,'NOAA-21 VIIRS','Northern Turkey'],
      [41.425,29.7,65,'MODIS Aqua','Northern Turkey'],
      [41.875,30.5,105,'NOAA-20 VIIRS','Northern Turkey'],
      [-2.675,37.1,145,'VIIRS NOAA-20','Kenya / Tanzania'],
      [-2.225,37.9,185,'MODIS Terra','Kenya / Tanzania'],
      [-1.775,37.1,75,'VIIRS S-NPP','Kenya / Tanzania'],
      [-1.325,37.9,115,'NOAA-21 VIIRS','Kenya / Tanzania'],
      [-17.175,30.1,134,'MODIS Aqua','Zambezi region'],
      [-16.725,30.9,174,'NOAA-20 VIIRS','Zambezi region'],
      [-16.275,30.1,64,'VIIRS NOAA-20','Zambezi region'],
      [-15.825,30.9,104,'MODIS Terra','Zambezi region'],
      [51.325,94.6,144,'VIIRS S-NPP','Siberian forest, Russia'],
      [51.775,95.4,184,'NOAA-21 VIIRS','Siberian forest, Russia'],
      [52.225,94.6,74,'MODIS Aqua','Siberian forest, Russia'],
      [52.675,95.4,93,'NOAA-20 VIIRS','Siberian forest, Russia'],
      [21.325,78.6,133,'VIIRS NOAA-20','Central India'],
      [21.775,79.4,173,'MODIS Terra','Central India'],
      [22.225,78.6,63,'VIIRS S-NPP','Central India'],
      [22.675,79.4,103,'NOAA-21 VIIRS','Central India'],
      [14.325,100.6,143,'MODIS Aqua','Thailand highlands'],
      [14.775,101.4,183,'NOAA-20 VIIRS','Thailand highlands'],
      [15.225,100.6,52,'VIIRS NOAA-20','Thailand highlands'],
      [15.675,101.4,92,'MODIS Terra','Thailand highlands'],
      [-33.675,145.6,132,'VIIRS S-NPP','Inland NSW, Australia'],
      [-33.225,146.4,172,'NOAA-21 VIIRS','Inland NSW, Australia'],
      [-32.775,145.6,62,'MODIS Aqua','Inland NSW, Australia'],
      [-32.325,146.4,102,'NOAA-20 VIIRS','Inland NSW, Australia']
    ]
  },
  canada: {
    center: [58.5, -102], zoom: 3,
    stats: { fires: 734, acres: 542557, deaths: 506 },
    dots: [
      [49.28,-123.12,36,'VIIRS NOAA-20','British Columbia'],
      [53.55,-113.49,76,'MODIS Terra','Alberta'],
      [52.13,-106.67,116,'VIIRS S-NPP','Saskatchewan'],
      [49.9,-97.14,156,'NOAA-21 VIIRS','Manitoba'],
      [46.81,-71.21,196,'MODIS Aqua','Quebec'],
      [45.42,-75.69,86,'NOAA-20 VIIRS','Ontario'],
      [60.72,-135.06,126,'VIIRS NOAA-20','Yukon'],
      [62.45,-114.38,145,'MODIS Terra','Northwest Territories'],
      [53.92,-122.75,185,'VIIRS S-NPP','Interior B.C.'],
      [51.05,-114.07,75,'NOAA-21 VIIRS','Foothills, Alberta'],
      [50.45,-104.61,115,'MODIS Aqua','Southern Saskatchewan'],
      [48.43,-89.25,155,'NOAA-20 VIIRS','Thunder Bay region'],
      [55.17,-118.8,195,'VIIRS NOAA-20','Grande Prairie region'],
      [56.73,-111.38,85,'MODIS Terra','Fort McMurray region'],
      [57.15,-105.0,104,'VIIRS S-NPP','Northern Saskatchewan'],
      [54.88,-97.14,144,'NOAA-21 VIIRS','Northern Manitoba'],
      [49.89,-119.5,184,'MODIS Aqua','Okanagan, B.C.'],
      [52.83,-119.26,74,'NOAA-20 VIIRS','Rocky Mountain trench'],
      [53.55,-124.4,114,'VIIRS NOAA-20','B.C. interior'],
      [54.0,-123.6,154,'MODIS Terra','B.C. interior'],
      [54.45,-124.4,194,'VIIRS S-NPP','B.C. interior'],
      [53.8,-123.6,63,'NOAA-21 VIIRS','B.C. interior'],
      [54.25,-124.4,103,'MODIS Aqua','B.C. interior'],
      [54.7,-123.6,143,'NOAA-20 VIIRS','B.C. interior'],
      [55.75,-116.4,183,'VIIRS NOAA-20','Northern Alberta'],
      [56.2,-115.6,73,'MODIS Terra','Northern Alberta'],
      [56.65,-116.4,113,'VIIRS S-NPP','Northern Alberta'],
      [56.0,-115.6,153,'NOAA-21 VIIRS','Northern Alberta'],
      [56.45,-116.4,172,'MODIS Aqua','Northern Alberta'],
      [56.9,-115.6,62,'NOAA-20 VIIRS','Northern Alberta'],
      [55.05,-106.9,102,'VIIRS NOAA-20','Boreal Saskatchewan'],
      [55.5,-106.1,142,'MODIS Terra','Boreal Saskatchewan'],
      [55.95,-106.9,182,'VIIRS S-NPP','Boreal Saskatchewan'],
      [55.3,-106.1,72,'NOAA-21 VIIRS','Boreal Saskatchewan'],
      [55.75,-106.9,112,'MODIS Aqua','Boreal Saskatchewan'],
      [56.2,-106.1,131,'NOAA-20 VIIRS','Boreal Saskatchewan'],
      [53.55,-98.9,171,'VIIRS NOAA-20','Manitoba forest'],
      [54.0,-98.1,61,'MODIS Terra','Manitoba forest'],
      [54.45,-98.9,101,'VIIRS S-NPP','Manitoba forest'],
      [53.8,-98.1,141,'NOAA-21 VIIRS','Manitoba forest'],
      [54.25,-98.9,181,'MODIS Aqua','Manitoba forest'],
      [54.7,-98.1,71,'NOAA-20 VIIRS','Manitoba forest'],
      [48.05,-80.4,90,'VIIRS NOAA-20','Northern Ontario'],
      [48.5,-79.6,130,'MODIS Terra','Northern Ontario'],
      [48.95,-80.4,170,'VIIRS S-NPP','Northern Ontario'],
      [48.3,-79.6,60,'NOAA-21 VIIRS','Northern Ontario'],
      [48.75,-80.4,100,'MODIS Aqua','Northern Ontario'],
      [49.2,-79.6,140,'NOAA-20 VIIRS','Northern Ontario'],
      [48.55,-72.4,180,'VIIRS NOAA-20','Quebec forest'],
      [49.0,-71.6,49,'MODIS Terra','Quebec forest'],
      [49.45,-72.4,89,'VIIRS S-NPP','Quebec forest'],
      [48.8,-71.6,129,'NOAA-21 VIIRS','Quebec forest'],
      [49.25,-72.4,169,'MODIS Aqua','Quebec forest'],
      [49.7,-71.6,59,'NOAA-20 VIIRS','Quebec forest'],
      [60.55,-132.9,99,'VIIRS NOAA-20','Yukon forest'],
      [61.0,-132.1,139,'MODIS Terra','Yukon forest'],
      [61.45,-132.9,158,'VIIRS S-NPP','Yukon forest'],
      [60.8,-132.1,48,'NOAA-21 VIIRS','Yukon forest'],
      [61.25,-132.9,88,'MODIS Aqua','Yukon forest'],
      [61.7,-132.1,128,'NOAA-20 VIIRS','Yukon forest'],
      [61.55,-115.4,168,'VIIRS NOAA-20','Northwest Territories'],
      [62.0,-114.6,58,'MODIS Terra','Northwest Territories'],
      [62.45,-115.4,98,'VIIRS S-NPP','Northwest Territories'],
      [61.8,-114.6,117,'NOAA-21 VIIRS','Northwest Territories'],
      [62.25,-115.4,157,'MODIS Aqua','Northwest Territories'],
      [62.7,-114.6,47,'NOAA-20 VIIRS','Northwest Territories']
    ]
  },
  us: {
    center: [39, -98], zoom: 4,
    stats: { fires: 36463, acres: 3197098, deaths: 503 },
    dots: [
      [37.44,-121.91,38,'VIIRS NOAA-20','California'],
      [44.06,-121.31,78,'MODIS Terra','Oregon'],
      [47.04,-122.9,118,'VIIRS S-NPP','Washington'],
      [43.62,-116.2,158,'NOAA-21 VIIRS','Idaho'],
      [34.05,-118.24,198,'MODIS Aqua','Southern California'],
      [33.45,-112.07,88,'NOAA-20 VIIRS','Arizona'],
      [35.08,-106.65,128,'VIIRS NOAA-20','New Mexico'],
      [39.74,-104.99,147,'MODIS Terra','Colorado'],
      [32.78,-96.8,187,'VIIRS S-NPP','Texas'],
      [35.47,-97.52,77,'NOAA-21 VIIRS','Oklahoma'],
      [39.1,-94.58,117,'MODIS Aqua','Kansas City region'],
      [36.16,-86.78,157,'NOAA-20 VIIRS','Tennessee'],
      [33.75,-84.39,197,'VIIRS NOAA-20','Georgia'],
      [40.76,-111.89,87,'MODIS Terra','Utah'],
      [46.59,-112.04,106,'VIIRS S-NPP','Montana'],
      [39.1,-120.95,146,'NOAA-21 VIIRS','Northern Sierra'],
      [36.17,-115.14,186,'MODIS Aqua','Nevada'],
      [43.48,-110.76,76,'NOAA-20 VIIRS','Wyoming'],
      [44.08,-103.23,116,'VIIRS NOAA-20','South Dakota'],
      [30.27,-97.74,156,'MODIS Terra','Central Texas'],
      [29.95,-90.07,196,'VIIRS S-NPP','Louisiana'],
      [34.75,-92.29,65,'NOAA-21 VIIRS','Arkansas'],
      [32.37,-86.3,105,'MODIS Aqua','Alabama'],
      [35.15,-90.05,145,'NOAA-20 VIIRS','Mississippi / Tennessee'],
      [28.54,-81.38,185,'VIIRS NOAA-20','Central Florida'],
      [37.94,-120.42,75,'MODIS Terra','Sierra Nevada'],
      [38.22,-120.0,115,'VIIRS S-NPP','Sierra Nevada'],
      [38.5,-119.58,155,'NOAA-21 VIIRS','Sierra Nevada'],
      [38.78,-120.42,174,'MODIS Aqua','Sierra Nevada'],
      [39.06,-120.0,64,'NOAA-20 VIIRS','Sierra Nevada'],
      [39.64,-123.82,104,'VIIRS NOAA-20','Northern California'],
      [39.92,-123.4,144,'MODIS Terra','Northern California'],
      [40.2,-122.98,184,'VIIRS S-NPP','Northern California'],
      [40.48,-123.82,74,'NOAA-21 VIIRS','Northern California'],
      [40.76,-123.4,114,'MODIS Aqua','Northern California'],
      [44.64,-121.62,133,'NOAA-20 VIIRS','Oregon Cascades'],
      [44.92,-121.2,173,'VIIRS NOAA-20','Oregon Cascades'],
      [45.2,-120.78,63,'MODIS Terra','Oregon Cascades'],
      [45.48,-121.62,103,'VIIRS S-NPP','Oregon Cascades'],
      [45.76,-121.2,143,'NOAA-21 VIIRS','Oregon Cascades'],
      [47.04,-121.22,183,'MODIS Aqua','Washington Cascades'],
      [47.32,-120.8,73,'NOAA-20 VIIRS','Washington Cascades'],
      [47.6,-120.38,92,'VIIRS NOAA-20','Washington Cascades'],
      [47.88,-121.22,132,'MODIS Terra','Washington Cascades'],
      [48.16,-120.8,172,'VIIRS S-NPP','Washington Cascades'],
      [43.74,-115.92,62,'NOAA-21 VIIRS','Idaho mountains'],
      [44.02,-115.5,102,'MODIS Aqua','Idaho mountains'],
      [44.3,-115.08,142,'NOAA-20 VIIRS','Idaho mountains'],
      [44.58,-115.92,182,'VIIRS NOAA-20','Idaho mountains'],
      [44.86,-115.5,51,'MODIS Terra','Idaho mountains'],
      [46.14,-114.12,91,'VIIRS S-NPP','Montana Rockies'],
      [46.42,-113.7,131,'NOAA-21 VIIRS','Montana Rockies'],
      [46.7,-113.28,171,'MODIS Aqua','Montana Rockies'],
      [46.98,-114.12,61,'NOAA-20 VIIRS','Montana Rockies'],
      [47.26,-113.7,101,'VIIRS NOAA-20','Montana Rockies'],
      [39.04,-106.42,141,'MODIS Terra','Colorado Rockies'],
      [39.32,-106.0,160,'VIIRS S-NPP','Colorado Rockies'],
      [39.6,-105.58,50,'NOAA-21 VIIRS','Colorado Rockies'],
      [39.88,-106.42,90,'MODIS Aqua','Colorado Rockies'],
      [40.16,-106.0,130,'NOAA-20 VIIRS','Colorado Rockies'],
      [36.44,-108.42,170,'VIIRS NOAA-20','Four Corners'],
      [36.72,-108.0,60,'MODIS Terra','Four Corners'],
      [37.0,-107.58,100,'VIIRS S-NPP','Four Corners'],
      [37.28,-108.42,119,'NOAA-21 VIIRS','Four Corners'],
      [37.56,-108.0,159,'MODIS Aqua','Four Corners'],
      [33.94,-112.22,49,'NOAA-20 VIIRS','Arizona highlands'],
      [34.22,-111.8,89,'VIIRS NOAA-20','Arizona highlands'],
      [34.5,-111.38,129,'MODIS Terra','Arizona highlands'],
      [34.78,-112.22,169,'VIIRS S-NPP','Arizona highlands'],
      [35.06,-111.8,59,'NOAA-21 VIIRS','Arizona highlands'],
      [35.04,-106.42,78,'MODIS Aqua','New Mexico mountains'],
      [35.32,-106.0,118,'NOAA-20 VIIRS','New Mexico mountains'],
      [35.6,-105.58,158,'VIIRS NOAA-20','New Mexico mountains'],
      [35.88,-106.42,48,'MODIS Terra','New Mexico mountains'],
      [36.16,-106.0,88,'VIIRS S-NPP','New Mexico mountains'],
      [30.94,-99.62,128,'NOAA-21 VIIRS','Texas grasslands'],
      [31.22,-99.2,168,'MODIS Aqua','Texas grasslands'],
      [31.5,-98.78,187,'NOAA-20 VIIRS','Texas grasslands'],
      [31.78,-99.62,77,'VIIRS NOAA-20','Texas grasslands'],
      [32.06,-99.2,117,'MODIS Terra','Texas grasslands'],
      [34.24,-97.92,157,'VIIRS S-NPP','Oklahoma grasslands'],
      [34.52,-97.5,197,'NOAA-21 VIIRS','Oklahoma grasslands'],
      [34.8,-97.08,87,'MODIS Aqua','Oklahoma grasslands'],
      [35.08,-97.92,127,'NOAA-20 VIIRS','Oklahoma grasslands'],
      [35.36,-97.5,146,'VIIRS NOAA-20','Oklahoma grasslands'],
      [32.44,-84.92,186,'MODIS Terra','Georgia / Alabama'],
      [32.72,-84.5,76,'VIIRS S-NPP','Georgia / Alabama'],
      [33.0,-84.08,116,'NOAA-21 VIIRS','Georgia / Alabama'],
      [33.28,-84.92,156,'MODIS Aqua','Georgia / Alabama'],
      [33.56,-84.5,196,'NOAA-20 VIIRS','Georgia / Alabama'],
      [28.04,-82.42,86,'VIIRS NOAA-20','Florida interior'],
      [28.32,-82.0,105,'MODIS Terra','Florida interior'],
      [28.6,-81.58,145,'VIIRS S-NPP','Florida interior'],
      [28.88,-82.42,185,'NOAA-21 VIIRS','Florida interior'],
      [29.16,-82.0,75,'MODIS Aqua','Florida interior'],
      [42.84,-73.12,115,'NOAA-20 VIIRS','New England forest'],
      [43.12,-72.7,155,'VIIRS NOAA-20','New England forest'],
      [43.4,-72.28,195,'MODIS Terra','New England forest'],
      [43.68,-73.12,64,'VIIRS S-NPP','New England forest'],
      [43.96,-72.7,104,'NOAA-21 VIIRS','New England forest']
    ]
  },
  california: {
    center: [37.25, -119.7], zoom: 6,
    stats: { fires: 2813, acres: 82633, deaths: 500 },
    dots: [
      [37.44,-121.91,35,'VIIRS NOAA-20','Bay Area foothills'],
      [38.58,-121.49,75,'MODIS Terra','Sacramento Valley'],
      [39.48,-121.56,115,'VIIRS S-NPP','Northern Sierra'],
      [34.05,-118.24,155,'NOAA-21 VIIRS','Los Angeles County'],
      [36.74,-119.78,195,'MODIS Aqua','Central Valley'],
      [35.37,-119.02,85,'NOAA-20 VIIRS','Southern Valley'],
      [32.72,-117.16,125,'VIIRS NOAA-20','San Diego County'],
      [38.44,-122.71,144,'MODIS Terra','North Bay'],
      [36.6,-121.89,184,'VIIRS S-NPP','Monterey area'],
      [34.42,-119.7,74,'NOAA-21 VIIRS','Santa Barbara area'],
      [37.24,-119.51,114,'MODIS Aqua','Sierra foothills'],
      [40.59,-122.39,154,'NOAA-20 VIIRS','Redding area'],
      [39.73,-121.84,194,'VIIRS NOAA-20','Chico foothills'],
      [38.8,-120.89,84,'MODIS Terra','El Dorado foothills'],
      [34.28,-118.74,103,'VIIRS S-NPP','Ventura County'],
      [33.83,-116.55,143,'NOAA-21 VIIRS','Palm Springs area'],
      [37.77,-122.42,183,'MODIS Aqua','San Francisco Bay Area'],
      [36.33,-119.29,73,'NOAA-20 VIIRS','Tulare County'],
      [35.68,-121.17,113,'VIIRS NOAA-20','Central Coast'],
      [41.76,-124.2,153,'MODIS Terra','Del Norte coast'],
      [40.8,-124.16,193,'VIIRS S-NPP','Humboldt County'],
      [39.15,-123.21,62,'NOAA-21 VIIRS','Mendocino / Ukiah'],
      [38.25,-122.04,102,'MODIS Aqua','Solano County'],
      [37.68,-121.77,142,'NOAA-20 VIIRS','Livermore hills'],
      [37.1,-121.65,182,'VIIRS NOAA-20','Morgan Hill / Gilroy'],
      [36.97,-122.03,72,'MODIS Terra','Santa Cruz Mountains'],
      [34.69,-120.44,112,'VIIRS S-NPP','Lompoc area'],
      [33.12,-117.08,152,'NOAA-21 VIIRS','Escondido area'],
      [32.64,-116.96,171,'MODIS Aqua','Otay / South County'],
      [34.14,-117.29,61,'NOAA-20 VIIRS','San Bernardino'],
      [37.12,-121.96,101,'VIIRS NOAA-20','Bay Area foothills'],
      [37.25,-121.74,141,'MODIS Terra','Bay Area foothills'],
      [37.38,-121.96,181,'VIIRS S-NPP','Bay Area foothills'],
      [37.21,-121.74,71,'NOAA-21 VIIRS','Bay Area foothills'],
      [37.34,-121.96,111,'MODIS Aqua','Bay Area foothills'],
      [37.47,-121.74,130,'NOAA-20 VIIRS','Bay Area foothills'],
      [38.42,-122.36,170,'VIIRS NOAA-20','Napa / Lake counties'],
      [38.55,-122.14,60,'MODIS Terra','Napa / Lake counties'],
      [38.68,-122.36,100,'VIIRS S-NPP','Napa / Lake counties'],
      [38.51,-122.14,140,'NOAA-21 VIIRS','Napa / Lake counties'],
      [38.64,-122.36,180,'MODIS Aqua','Napa / Lake counties'],
      [38.77,-122.14,70,'NOAA-20 VIIRS','Napa / Lake counties'],
      [39.17,-121.21,89,'VIIRS NOAA-20','Northern Sierra'],
      [39.3,-120.99,129,'MODIS Terra','Northern Sierra'],
      [39.43,-121.21,169,'VIIRS S-NPP','Northern Sierra'],
      [39.26,-120.99,59,'NOAA-21 VIIRS','Northern Sierra'],
      [39.39,-121.21,99,'MODIS Aqua','Northern Sierra'],
      [39.52,-120.99,139,'NOAA-20 VIIRS','Northern Sierra'],
      [40.27,-122.91,179,'VIIRS NOAA-20','Shasta / Trinity'],
      [40.4,-122.69,48,'MODIS Terra','Shasta / Trinity'],
      [40.53,-122.91,88,'VIIRS S-NPP','Shasta / Trinity'],
      [40.36,-122.69,128,'NOAA-21 VIIRS','Shasta / Trinity'],
      [40.49,-122.91,168,'MODIS Aqua','Shasta / Trinity'],
      [40.62,-122.69,58,'NOAA-20 VIIRS','Shasta / Trinity'],
      [36.67,-119.31,98,'VIIRS NOAA-20','Central Sierra'],
      [36.8,-119.09,138,'MODIS Terra','Central Sierra'],
      [36.93,-119.31,157,'VIIRS S-NPP','Central Sierra'],
      [36.76,-119.09,47,'NOAA-21 VIIRS','Central Sierra'],
      [36.89,-119.31,87,'MODIS Aqua','Central Sierra'],
      [37.02,-119.09,127,'NOAA-20 VIIRS','Central Sierra'],
      [35.77,-118.91,167,'VIIRS NOAA-20','Kern foothills'],
      [35.9,-118.69,57,'MODIS Terra','Kern foothills'],
      [36.03,-118.91,97,'VIIRS S-NPP','Kern foothills'],
      [35.86,-118.69,116,'NOAA-21 VIIRS','Kern foothills'],
      [35.99,-118.91,156,'MODIS Aqua','Kern foothills'],
      [36.12,-118.69,46,'NOAA-20 VIIRS','Kern foothills'],
      [34.17,-118.71,86,'VIIRS NOAA-20','Los Angeles foothills'],
      [34.3,-118.49,126,'MODIS Terra','Los Angeles foothills'],
      [34.43,-118.71,166,'VIIRS S-NPP','Los Angeles foothills'],
      [34.26,-118.49,56,'NOAA-21 VIIRS','Los Angeles foothills'],
      [34.39,-118.71,75,'MODIS Aqua','Los Angeles foothills'],
      [34.52,-118.49,115,'NOAA-20 VIIRS','Los Angeles foothills'],
      [33.67,-117.61,155,'VIIRS NOAA-20','Orange / Riverside'],
      [33.8,-117.39,45,'MODIS Terra','Orange / Riverside'],
      [33.93,-117.61,85,'VIIRS S-NPP','Orange / Riverside'],
      [33.76,-117.39,125,'NOAA-21 VIIRS','Orange / Riverside'],
      [33.89,-117.61,165,'MODIS Aqua','Orange / Riverside'],
      [34.02,-117.39,184,'NOAA-20 VIIRS','Orange / Riverside'],
      [32.77,-116.81,74,'VIIRS NOAA-20','San Diego backcountry'],
      [32.9,-116.59,114,'MODIS Terra','San Diego backcountry'],
      [33.03,-116.81,154,'VIIRS S-NPP','San Diego backcountry'],
      [32.86,-116.59,194,'NOAA-21 VIIRS','San Diego backcountry'],
      [32.99,-116.81,84,'MODIS Aqua','San Diego backcountry'],
      [33.12,-116.59,124,'NOAA-20 VIIRS','San Diego backcountry'],
      [36.27,-121.51,143,'VIIRS NOAA-20','Central Coast ranges'],
      [36.4,-121.29,183,'MODIS Terra','Central Coast ranges'],
      [36.53,-121.51,73,'VIIRS S-NPP','Central Coast ranges'],
      [36.36,-121.29,113,'NOAA-21 VIIRS','Central Coast ranges'],
      [36.49,-121.51,153,'MODIS Aqua','Central Coast ranges'],
      [36.62,-121.29,193,'NOAA-20 VIIRS','Central Coast ranges']
    ]
  }
};

let currentRegion = 'global';
let map, fireLayer, userLayer;

function dotRadius(frp) {
  return Math.max(4, Math.min(14, Math.sqrt(Number(frp) || 10) * 0.8));
}
function dotColor(frp) {
  const v = Number(frp) || 0;
  return v > 140 ? '#f24828' : v > 75 ? '#ff8a3d' : '#ffd36d';
}
function dotConfidence(frp) {
  const v = Number(frp) || 0;
  return v > 140 ? 'High' : v > 75 ? 'Nominal' : 'Low';
}

function updateStats() {
  const s = regions[currentRegion].stats;
  if ($('#incidentNumber')) $('#incidentNumber').textContent = Math.floor(s.fires).toLocaleString();
  if ($('#acreNumber')) $('#acreNumber').textContent = Math.floor(s.acres).toLocaleString();
  if ($('#deathNumber')) $('#deathNumber').textContent = Math.floor(s.deaths).toLocaleString();
}

function renderRegion(regionKey) {
  currentRegion = regionKey;
  const region = regions[regionKey];
  updateStats();
  if (!map || !fireLayer) return;
  fireLayer.clearLayers();
  map.flyTo(region.center, region.zoom, { animate: true, duration: 1.1 });
  region.dots.forEach(([lat, lng, frp, sat, place]) => {
    L.circleMarker([lat, lng], {
      radius: dotRadius(frp),
      color: '#fff4dd',
      weight: 1.2,
      fillColor: dotColor(frp),
      fillOpacity: 0.9
    }).bindPopup(`<div class="fire-map-popup"><h3>${place}</h3><p><strong>Satellite:</strong> ${sat}</p><p><strong>Confidence:</strong> ${dotConfidence(frp)}</p><p><strong>FRP intensity:</strong> ${Number(frp).toFixed(1)} MW</p></div>`).addTo(fireLayer);
  });
}


function chooseRegionForLocation(lat, lng) {
  if (lat >= 32 && lat <= 42.5 && lng >= -125 && lng <= -114) return 'california';
  if (lat >= 24 && lat <= 50 && lng >= -125 && lng <= -66) return 'us';
  if (lat >= 42 && lat <= 72 && lng >= -142 && lng <= -52) return 'canada';
  return 'global';
}

function setActiveFilter(regionKey) {
  $$('.filter').forEach(b => b.classList.toggle('active', b.dataset.region === regionKey));
}

function showNearMe() {
  const btn = $('#nearMe');
  if (!navigator.geolocation) {
    alert('Location is not available in this browser.');
    return;
  }
  if (btn) {
    btn.textContent = 'Finding...';
    btn.disabled = true;
  }
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const regionKey = chooseRegionForLocation(lat, lng);
    if (regions[regionKey]) {
      setActiveFilter(regionKey);
      renderRegion(regionKey);
    }
    if (userLayer) userLayer.clearLayers();
    if (map && userLayer) {
      L.circleMarker([lat, lng], {
        radius: 8,
        color: '#ffffff',
        weight: 2,
        fillColor: '#2d7dff',
        fillOpacity: 1
      }).bindPopup('<div class="fire-map-popup"><h3>You are here</h3><p>Location shown only after you allowed permission.</p></div>').addTo(userLayer);
      setTimeout(() => map.flyTo([lat, lng], regionKey === 'california' ? 10 : 8, { animate: true, duration: 1 }), 120);
    }
    if (btn) {
      btn.textContent = 'Fires Near Me';
      btn.disabled = false;
    }
  }, () => {
    if (btn) {
      btn.textContent = 'Fires Near Me';
      btn.disabled = false;
    }
    alert('Please allow location permission to use Fires Near Me.');
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
  });
}


function initMap() {
  const el = $('#fireMap');
  if (!el || typeof L === 'undefined') return;
  map = L.map('fireMap', { zoomControl: true, scrollWheelZoom: true, worldCopyJump: true }).setView(regions.global.center, regions.global.zoom);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri, Maxar',
    maxZoom: 18
  }).addTo(map);
  fireLayer = L.layerGroup().addTo(map);
  userLayer = L.layerGroup().addTo(map);
  renderRegion('global');
}

$$('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderRegion(btn.dataset.region);
  });
});

if ($('#zoomIn')) $('#zoomIn').onclick = () => map && map.zoomIn();
if ($('#zoomOut')) $('#zoomOut').onclick = () => map && map.zoomOut();
if ($('#resetMap')) $('#resetMap').onclick = () => map && renderRegion(currentRegion);
if ($('#nearMe')) $('#nearMe').onclick = showNearMe;
if ($('#refreshFireData')) $('#refreshFireData').onclick = () => {
  const region = regions[currentRegion];
  region.dots.forEach(d => { d[2] = Math.max(18, Math.min(210, d[2] + (Math.random() * 8 - 4))); });
  renderRegion(currentRegion);
};

setInterval(() => {
  const s = regions[currentRegion].stats;
  s.fires += Math.random() * 0.14;
  s.acres += Math.random() * 5.2 + 0.3;
  s.deaths += Math.random() * 0.01;
  updateStats();
}, 2600);

setProgress();
updateTime();
setInterval(updateTime, 1000);
parallax();
initMap();
addEventListener('scroll', () => { setProgress(); parallax(); }, { passive: true });
addEventListener('resize', parallax);
