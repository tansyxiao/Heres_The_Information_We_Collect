let img, bgVideo;
let videoLoadIndex = 0;
let isAllVideosLoaded = false;
let videos = {};
let videoNames;
let videoStates = {};
let assetWidth, assetHeight, assetRatio, canvasRatio, assetDisplayW, assetDisplayH, assetX, assetY;

const sharedVideoAttributes = {
  soprano: { x: 0.224, y: 0.5, rotation: 0, scale: 0.135 },
  mezzo: { x: 0.9, y: 0.145, rotation: 90, scale: 0.118 },
  countertenor: { x: 0.08, y: 0.36, rotation: -90, scale: 0.132 },
  tenor: { x: 0.676, y: 0.7, rotation: 0, scale: 0.124 },
  baritone: { x: 0.456, y: 0.73, rotation: -90, scale: 0.167 },
  bass: { x: 0.558, y: 0.25, rotation: 0, scale: 0.099 },
};

function preload() {
  img = loadImage('assets/image_mask.png');
  bgVideo = createVideo('assets/mouthclosed.mp4');
  videoNames = [
    'Advertising_soprano', 'Advertising_mezzo', 'Advertising_countertenor',
    'Advertising_tenor', 'Advertising_baritone', 'Advertising_bass',
    'Actions_mezzo', 'Actions_countertenor',
'Actions_baritone', 'Actions_bass',
    'Address_soprano', 'Address_mezzo', 'Address_countertenor',
'Address_tenor', 
    'Camera_mezzo', 'Camera_tenor', 'Camera_baritone', 
    'Choose_soprano', 'Choose_mezzo', 'Choose_tenor', 'Choose_baritone', 'Choose_bass',
    'Circumstances_soprano', 'Circumstances_mezzo', 'Circumstances_countertenor', 'Circumstances_tenor', 'Circumstances_bass',
    'Clients_soprano', 'Clients_mezzo', 'Clients_countertenor',
'Clients_tenor', 'Clients_baritone', 'Clients_bass',
    'Collect_soprano', 'Collect_mezzo', 'Collect_countertenor',
'Collect_tenor', 'Collect_baritone', 'Collect_bass',
    'Communication_soprano', 'Communication_mezzo', 'Communication_countertenor', 'Communication_tenor', 'Communication_baritone', 'Communication_bass',
    'Connections_soprano', 'Connections_mezzo', 'Connections_countertenor', 'Connections_bass',
    'Create_soprano', 'Create_countertenor', 'Create_bass',
    'Enforcement_soprano', 'Enforcement_mezzo', 'Enforcement_countertenor', 'Enforcement_tenor', 'Enforcement_baritone', 'Enforcement_bass',
    'Enjoy_soprano', 'Enjoy_mezzo', 'Enjoy_countertenor',
'Enjoy_tenor', 'Enjoy_baritone', 'Enjoy_bass',
    'Foreground_soprano', 'Foreground_mezzo', 'Foreground_countertenor', 'Foreground_bass',
    'Global_soprano', 'Global_mezzo', 'Global_countertenor',
'Global_tenor', 'Global_baritone', 'Global_bass',
    'Good_soprano', 'Good_mezzo', 'Good_countertenor',
'Good_tenor', 'Good_bass',
    'Health_soprano', 'Health_mezzo', 'Health_countertenor',
'Health_tenor', 'Health_baritone', 'Health_bass',
    'Human_soprano', 'Human_mezzo', 'Human_countertenor',
'Human_tenor', 'Human_baritone', 'Human_bass',
    'Identifiers_soprano', 'Identifiers_mezzo', 'Identifiers_tenor', 'Identifiers_baritone',
    'Interact_mezzo', 'Interact_countertenor', 'Interact_baritone',
    'Know_soprano', 'Know_mezzo', 'Know_countertenor',
'Know_tenor', 'Know_baritone', 'Know_bass',
    'Legal_soprano', 'Legal_mezzo', 'Legal_countertenor',
'Legal_tenor', 'Legal_baritone', 'Legal_bass',
    'Limited_soprano', 'Limited_mezzo', 'Limited_countertenor',
'Limited_tenor', 'Limited_baritone', 'Limited_bass',
    'Logged_soprano', 'Logged_mezzo', 'Logged_countertenor',
'Logged_tenor', 'Logged_baritone', 'Logged_bass',
    'Metadata_soprano', 'Metadata_mezzo', 'Metadata_countertenor',
'Metadata_tenor', 'Metadata_baritone', 'Metadata_bass',
    'Migration_soprano', 'Migration_mezzo', 'Migration_countertenor', 'Migration_tenor', 'Migration_baritone', 'Migration_bass',
    'Network_soprano', 'Network_mezzo', 'Network_baritone', 'Network_bass',
    'Others_soprano', 'Others_mezzo', 'Others_countertenor',
'Others_tenor', 'Others_baritone', 'Others_bass',
    'Parties_tenor', 'Parties_baritone', 'Parties_bass',
    'Partners_soprano', 'Partners_mezzo', 'Partners_countertenor',
    'Personalize_soprano', 'Personalize_mezzo', 'Personalize_tenor', 'Personalize_baritone', 'Personalize_bass',
    'Political_soprano', 'Political_mezzo', 'Political_countertenor', 'Political_tenor', 'Political_bass',
    'Profile_soprano', 'Profile_mezzo', 'Profile_countertenor',
'Profile_tenor', 'Profile_baritone', 'Profile_bass',
    'Property_soprano', 'Property_mezzo', 'Property_countertenor',
'Property_tenor', 'Property_baritone', 'Property_bass',
    'Safety_soprano', 'Safety_countertenor',
'Safety_tenor', 'Safety_baritone',
    'Systems_soprano', 'Systems_mezzo', 'Systems_countertenor',
'Systems_tenor', 'Systems_bass',
    'Terms_soprano', 'Terms_mezzo', 'Terms_countertenor',
'Terms_tenor', 'Terms_bass',
    'Transactions_soprano', 'Transactions_tenor', 'Transactions_baritone', 'Transactions_bass',
    'Understand_soprano', 'Understand_mezzo', 'Understand_countertenor', 'Understand_tenor', 'Understand_baritone', 'Understand_bass',
    'Unlawful_soprano', 'Unlawful_mezzo', 'Unlawful_countertenor', 'Unlawful_tenor', 'Unlawful_baritone', 'Unlawful_bass',
    'View_soprano', 'View_tenor', 'View_bass',
    'Warrant_soprano', 'Warrant_mezzo', 'Warrant_countertenor',
'Warrant_tenor', 'Warrant_baritone', 'Warrant_bass',
    'Information_mezzo1', 'Information_mezzo2', 'Information_mezzo3',
    'Information_bass1', 'Information_bass2', 'Information_bass3',
    'Products_soprano1', 'Products_soprano2', 'Products_soprano3',
    'Products_tenor1', 'Products_tenor2', 'Products_tenor3',
    'Devices_baritone1', 'Devices_baritone2', 'Devices_baritone3',
    'Devices_countertenor1', 'Devices_countertenor2', 'Devices_countertenor3',
    'Provide_mezzo1', 'Provide_mezzo2', 'Provide_mezzo3', 'Provide_tenor1',
    'Labor_mezzo', 'Thank_tenor', 'Instruction_baritone'
  ];

  // old loading code
  // videoNames.forEach(name => {
  //   videos[name] = createVideo(`assets/${name}.mp4`);
  //   videoStates[name] = false;
  //   videos[name].hide(); // Hide the video initially
  // });
}

function start() {
    bgVideo.volume(0);
    bgVideo.loop();
    document.getElementById('popup').classList.add('hidden');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let popupWindow = document.getElementById('popup');
  // popupWindow.addEventListener('click', start);

  bgVideo.hide();
  angleMode(DEGREES);

  assetRatio = 16 / 9;

  if (annyang) {
    let commands = {
      "help": callWindow,
      "cast": callCast,
      "close": closeWindow,
      "fullscreen": setfullScreen,
      "exit fullscreen": exitFullScreen,
      "(*anything) account (*anything)": () => triggerVideos('Account'),
      "(*anything) advertising (*anything)": () => triggerVideos('Advertising'),
      "(*anything) actions (*anything)": () => triggerVideos('Actions'),
      "(*anything) address (*anything)": () => triggerVideos('Address'),
      "(*anything) camera (*anything)": () => triggerVideos('Camera'),
      "(*anything) choose (*anything)": () => triggerVideos('Choose'),
      "(*anything) circumstances (*anything)": () => triggerVideos('Circumstances'),
      "(*anything) clients (*anything)": () => triggerVideos('Clients'),
      "(*anything) collect (*anything)": () => triggerVideos('Collect'),
      "(*anything) communication (*anything)": () => triggerVideos('Communication'),
      "(*anything) connections (*anything)": () => triggerVideos('Connections'),
      "(*anything) create (*anything)": () => triggerVideos('Create'),
      "(*anything) enforcement (*anything)": () => triggerVideos('Enforcement'),
      "(*anything) enjoy (*anything)": () => triggerVideos('Enjoy'),
      "(*anything) foreground (*anything)": () => triggerVideos('Foreground'),
      "(*anything) global (*anything)": () => triggerVideos('Global'),
      "(*anything) good (*anything)": () => triggerVideos('Good'),
      "(*anything) health (*anything)": () => triggerVideos('Health'),
      "(*anything) human (*anything)": () => triggerVideos('Human'),
      "(*anything) identifiers (*anything)": () => triggerVideos('Identifiers'),
      "(*anything) interact (*anything)": () => triggerVideos('Interact'),
      "(*anything) know (*anything)": () => triggerVideos('Know'),
      "(*anything) legal (*anything)": () => triggerVideos('Legal'),
      "(*anything) limited (*anything)": () => triggerVideos('Limited'),
      "(*anything) logged in (*anything)": () => triggerVideos('Logged'),
      "(*anything) data (*anything)": () => triggerVideos('Metadata'),
      "(*anything) migration (*anything)": () => triggerVideos('Migration'),
      "(*anything) network (*anything)": () => triggerVideos('Network'),
      "(*anything) others (*anything)": () => triggerVideos('Others'),
      "(*anything) parties (*anything)": () => triggerVideos('Parties'),
      "(*anything) partners (*anything)": () => triggerVideos('Partners'),
      "(*anything) personalize (*anything)": () => triggerVideos('Personalize'),
      "(*anything) political (*anything)": () => triggerVideos('Political'),
      "(*anything) profile (*anything)": () => triggerVideos('Profile'),
      "(*anything) property (*anything)": () => triggerVideos('Property'),
      "(*anything) safety (*anything)": () => triggerVideos('Safety'),
      "(*anything) systems (*anything)": () => triggerVideos('Systems'),
      "(*anything) terms (*anything)": () => triggerVideos('Terms'),
      "(*anything) transactions (*anything)": () => triggerVideos('Transactions'),
      "(*anything) understand (*anything)": () => triggerVideos('Understand'),
      "(*anything) unlawful (*anything)": () => triggerVideos('Unlawful'),
      "(*anything) view (*anything)": () => triggerVideos('View'),
      "(*anything) search warrant (*anything)": () => triggerVideos('Warrant'),
      "(*anything) information (*anything)": () => triggerVideos('Information'),
      "(*anything) products (*anything)": () => triggerVideos('Products'),
      "(*anything) devices (*anything)": () => triggerVideos('Devices'),
      "(*anything) provide (*anything)": () => triggerVideos('Provide'),
      "(*anything) unpaid (*anything)": () => triggerVideos('Labor'),
      "(*anything) hourly wage (*anything)": () => triggerVideos('Labor'),
      "(*anything) what is this (*anything)": () => triggerVideos('Instruction'),
      "(*anything) how does this work (*anything)": () => triggerVideos('Instruction'),
      "(*anything) how does it work (*anything)": () => triggerVideos('Instruction'),
      "(*anything) thank you (*anything)": () => triggerVideos('Thank')
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

function callWindow() {
  document.getElementById('cues').classList.remove('hidden');
  document.getElementById('cast').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');

  select('#closePopup').mouseClicked(() => {
    popup.addClass('hidden');
  });
    start();
}

function callCast() {
  document.getElementById('cast').classList.remove('hidden');
  document.getElementById('cues').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');

  select('#closePopup').mouseClicked(() => {
    popup.addClass('hidden');
  });
    start();
}

function closeWindow() {
  document.getElementById('cues').classList.add('hidden');
  document.getElementById('cast').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');
  start();
}

function setfullScreen() {
    fullscreen(!fullscreen());
  }

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

// function to load videos one by one.
// when finished it will display the start button
// and hide the loading text
function loadNextVideo() {
  if (videoLoadIndex < videoNames.length) {
    const name = videoNames[videoLoadIndex];
    console.log(`Loading video: ${name}`);
    videos[name] = createVideo(`assets/${name}.mp4`);
    videoStates[name] = false;
    videos[name].hide();
    videoLoadIndex++;
    return;
  }

  isAllVideosLoaded = true;

  // hide loading text
  let loading = document.getElementById('loading');
  loading.style.display = 'none';

  // set start button to visible
  document.getElementById('popup').classList.remove('hidden');

}

function draw() {
  background(0);

  adjustCanvasToVideo();
  image(bgVideo, assetX, assetY, assetDisplayW, assetDisplayH);

  // do some check to see if all videos are loaded
  // if not load te next video
  if(!isAllVideosLoaded) loadNextVideo();
 
 // skip this if all videos are not loaded
  if(isAllVideosLoaded){
        Object.keys(videos).forEach(name => {
          if (videoStates[name]) {
            let videoType = name.split('_')[1].toLowerCase();
            if (name.startsWith('Information_') || name.startsWith('Products_') || name.startsWith('Devices_') || name.startsWith('Provide_')) {
              const matches = name.match(/(soprano|mezzo|bass|tenor|baritone|countertenor)/);
              videoType = matches ? matches[0] : '';
            }

            const attributes = sharedVideoAttributes[videoType];
            if (attributes) {
              const { x, y, rotation, scale } = attributes;
              const posX = assetX + assetDisplayW * x;
              const posY = assetY + assetDisplayH * y;
              const sizeW = assetDisplayW * scale;
              const sizeH = assetDisplayH * scale;

              push();
              translate(posX, posY);
              rotate(rotation);
              image(videos[name], 0, 0, sizeW, sizeH);
              pop();
            }

            if (abs(videos[name].duration() - videos[name].time()) < 0.05) {
              videoStates[name] = false;
              videos[name].stop();
            }
          }
        });
  }

  image(img, assetX, assetY, assetDisplayW, assetDisplayH);

}

function triggerVideos(prefix) {
  console.log("Triggering videos for:" + prefix);
  if (prefix === 'Information' || prefix === 'Products' || prefix === 'Devices' || prefix === 'Provide') {
    let categories;
    switch (prefix) {
      case 'Information':
        categories = ['mezzo', 'bass'];
        break;
      case 'Products':
        categories = ['soprano', 'tenor'];
        break;
      case 'Devices':
        categories = ['baritone', 'countertenor'];
        break;
      case 'Provide':
        categories = ['mezzo', 'tenor'];
        break;
    }
    categories.forEach(category => {
      const videoKeys = Object.keys(videos).filter(key => key.startsWith(`${prefix}_${category}`));
      if (videoKeys.length > 0) {
        const randomKey = videoKeys[Math.floor(Math.random() * videoKeys.length)];
        videos[randomKey].play();
        videoStates[randomKey] = true;
      }
    });
  } else {
    Object.keys(videos).forEach(name => {
      if (name.startsWith(prefix)) {
        videos[name].play();
        videoStates[name] = true;
      }
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === 32) {
    fullscreen(!fullscreen());
  }
}

function adjustCanvasToVideo() {
  canvasRatio = width / height;

  if (assetRatio > canvasRatio) {
    assetDisplayW = width;
    assetDisplayH = width / assetRatio;
  } else {
    assetDisplayH = height;
    assetDisplayW = height * assetRatio;
  }

  assetX = (width - assetDisplayW) / 2;
  assetY = (height - assetDisplayH) / 2;
}




