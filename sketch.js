//define parameters
const faceParams = {
    type: "tabby1" 
};

const faceNames = {
    tabby1: "tabby1",
    tabby2: "tabby2",
    tortie: "tortie",
    orange: "orange",
    siamese: "siamese"
};

const earNames = {
    tabby1: ["tabby1-ears1", "tabby1-ears2", "tabby1-ears3", "tabby1-ears4"],
    tabby2: ["tabby2-ears1", "tabby2-ears2", "tabby2-ears3", "tabby2-ears4"],
    tortie: ["tortie-ears1", "tortie-ears2", "tortie-ears3", "tortie-ears4"],
    orange: ["orange-ears1", "orange-ears2", "orange-ears3", "orange-ears4"],
    siamese: ["siamese-ears1", "siamese-ears2", "siamese-ears3", "siamese-ears4"]
};

const mouthNames = ["mouth1", "mouth2", "mouth3", "mouth4", "mouth5"];
const eyeNames = ["eyes1", "eyes2", "eyes3", "eyes4", "eyes5", "eyes6"];
const noseNames = ["nose1", "nose2", "nose3", "nose4", "nose5", "nose6"];
const extraNames = ["No Extra", "extra1", "extra2", "extra3", "extra4"];
const collarNames = ["No Collar", "collar1", "collar2"];
const accessoryNames = {
    noAccessory: "No Accessory",
    flower: "flower",
    bird: "bird",
    worm: "worm",
    sprout: "sprout",
    fish: "fish",
    bow: "bow"
};
const meowNames = {
    noMeow: "No Meow",
    meow1: "meow1",
    meow2: "meow2",
    meow3: "meow3",
    meow4: "meow4"
};

const faces = [];
const ears = [];
const mouths = [];
const eyes = [];
const noses = [];
const extras = [];
const collars = [];
const accessories = [];
const meows = [];

const earParams = {
    tabby1: 0,
    tabby2: 0,
    tortie: 0,
    orange: 0,
    siamese: 0
};

const mouthParams = {
    type: 0 
};

const eyeParams = {
    type: 0 
};

const noseParams = {
    type: 0 
};

const extraParams = {
    type: 0 
};

const collarParams = {
    type: 0 
};

const accessoryParams = {
    type: "noAccessory", 
    posX: 0, 
    posY: 0  
};

const meowParams = {
    type: "noMeow",
    posOffset: { x: 0, y: 0 } 
};

const backgroundColor = {
    color: "#d3d8ff" 
};

//images
function preload() {
    for (let name in faceNames) {
        faces.push(loadImage(`assets/${faceNames[name]}.png`));
        for (let i = 0; i < 4; i++) {
            ears.push(loadImage(`assets/${earNames[name][i]}.png`));
        }
    }

    for (let mouth of mouthNames) {
        mouths.push(loadImage(`assets/${mouth}.png`));
    }

    for (let eye of eyeNames) {
        eyes.push(loadImage(`assets/${eye}.png`));
    }

    for (let nose of noseNames) {
        noses.push(loadImage(`assets/${nose}.png`));
    }

    for (let extra of extraNames.slice(1)) {
        extras.push(loadImage(`assets/${extra}.png`));
    }

    for (let collar of collarNames.slice(1)) {
        collars.push(loadImage(`assets/${collar}.png`));
    }

    for (let accessory in accessoryNames) {
        if (accessory !== 'noAccessory') {
            accessories.push(loadImage(`assets/${accessory}.png`));
        }
    }

    for (let meow in meowNames) {
        if (meow !== 'noMeow') {
            meows.push(loadImage(`assets/${meow}.png`));
        }
    }
}

//tweakpane
const pane = new Tweakpane.Pane({ title: "Kitty Generator :3" });
const faceMenu = pane.addFolder({ title: "Face" });
faceMenu.addInput(faceParams, "type", { options: faceNames });

const earMenu = pane.addFolder({ title: "Ears" });
for (let name in earNames) {
    earParams[name] = 0;
    earMenu.addInput(earParams, name, { min: 0, max: 3, step: 1, label: `${name} Ears` });
}

const mouthMenu = pane.addFolder({ title: "Mouth" });
mouthMenu.addInput(mouthParams, "type", { min: 0, max: mouthNames.length - 1, step: 1, label: "Mouth Type" });

const eyeMenu = pane.addFolder({ title: "Eyes" });
eyeMenu.addInput(eyeParams, "type", { min: 0, max: eyeNames.length - 1, step: 1, label: "Eye Type" });

const noseMenu = pane.addFolder({ title: "Nose" });
noseMenu.addInput(noseParams, "type", { min: 0, max: noseNames.length - 1, step: 1, label: "Nose Type" });

const extraMenu = pane.addFolder({ title: "Extras" });
extraMenu.addInput(extraParams, "type", { min: 0, max: extraNames.length - 1, step: 1, label: "Extra Type" });

const collarMenu = pane.addFolder({ title: "Collar" });
collarMenu.addInput(collarParams, "type", { min: 0, max: collarNames.length - 1, step: 1, label: "Collar Type" });

const accessoryMenu = pane.addFolder({ title: "Accessories" });
accessoryMenu.addInput(accessoryParams, "type", { options: accessoryNames })
    .on('change', (value) => {
        console.log(`Selected accessory: ${value}`);
    });
accessoryMenu.addInput(accessoryParams, 'posX', { min: -200, max: 200, step: 1, label: "Accessory X Position" });
accessoryMenu.addInput(accessoryParams, 'posY', { min: -200, max: 200, step: 1, label: "Accessory Y Position" });

const meowMenu = pane.addFolder({ title: "Meow" });
meowMenu.addInput(meowParams, "type", { options: meowNames });
meowMenu.addInput(meowParams.posOffset, 'x', { min: -100, max: 100, step: 1, label: "Meow X Position" });
meowMenu.addInput(meowParams.posOffset, 'y', { min: -100, max: 100, step: 1, label: "Meow Y Position" });

pane.addInput(backgroundColor, 'color', { label: 'Background Color' });

pane.addButton({ title: 'Save Picture' }).on('click', () => {
    saveCanvas('myKitty', 'png');
});

//canvas
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
}

function draw() {
    background(backgroundColor.color);
    const scaleFactor = 0.85;

    const selectedFaceIndex = Object.keys(faceNames).indexOf(faceParams.type);

// 	const selectedEarIndex = earNames[faceParams.type].indexOf(earParams.type);
// 	const selectedEar = ears[selectedEarIndex];
  
// 	if (selectedFace) {
// 	  image(selectedFace, width / 2, height / 2, selectedFace.width / 2.8, selectedFace.height / 2.8);
// 	}
  
// 	if (selectedEar) {
// 	  image(selectedEar, width / 2, height / 2, selectedEar.width / 2.8, selectedEar.height / 2.8);
// 	}
//   }
    
    for (let name in earNames) {
        const selectedEarIndex = earParams[name];
        const selectedEarType = earNames[name][selectedEarIndex];
        const earIndex = selectedFaceIndex * 4 + selectedEarIndex;

        if (faceParams.type === name) {
            const selectedEar = ears[earIndex];
            if (selectedEar) {
                image(selectedEar, width / 2, height / 2, selectedEar.width * scaleFactor / 2.8, selectedEar.height * scaleFactor / 2.8);
            }
        }
    }

    const selectedFace = faces[selectedFaceIndex];
    if (selectedFace) {
        image(selectedFace, width / 2, height / 2, selectedFace.width * scaleFactor / 2.8, selectedFace.height * scaleFactor / 2.8);
    }

    const selectedMouth = mouths[mouthParams.type];
    if (selectedMouth) {
        image(selectedMouth, width / 2, height / 2 - 5, selectedMouth.width * scaleFactor / 2.8, selectedMouth.height * scaleFactor / 2.8);
    }

    const selectedEye = eyes[eyeParams.type];
    if (selectedEye) {
        image(selectedEye, width / 2, height / 2 - 10, selectedEye.width * scaleFactor / 2.8, selectedEye.height * scaleFactor / 2.8);
    }

    const selectedNose = noses[noseParams.type];
    if (selectedNose) {
        image(selectedNose, width / 2, height / 2 - 12, selectedNose.width * scaleFactor / 2.8, selectedNose.height * scaleFactor / 2.8);
    }

    const selectedExtra = extraParams.type > 0 ? extras[extraParams.type - 1] : null;
    if (selectedExtra) {
        image(selectedExtra, width / 2, height / 2, selectedExtra.width * scaleFactor / 2.8, selectedExtra.height * scaleFactor / 2.8);
    }

    const selectedCollar = collarParams.type > 0 ? collars[collarParams.type - 1] : null;
    if (selectedCollar) {
        image(selectedCollar, width / 2, height / 2, selectedCollar.width * scaleFactor / 2.8, selectedCollar.height * scaleFactor / 2.8);
    }

    const selectedAccessory = accessoryParams.type !== "noAccessory" 
        ? accessories[Object.keys(accessoryNames).indexOf(accessoryParams.type) - 1] 
        : null;
    if (selectedAccessory) {
        image(selectedAccessory, width / 2 + accessoryParams.posX, height / 2 + accessoryParams.posY, selectedAccessory.width * scaleFactor / 2.8, selectedAccessory.height * scaleFactor / 2.8);
    }

    const selectedMeow = meowParams.type !== "noMeow" 
        ? meows[Object.keys(meowNames).indexOf(meowParams.type) - 1] 
        : null;
    if (selectedMeow) {
        const posX = map(meowParams.posOffset.x, -100, 100, width / 2 - 150, width / 2 + 150);
        const posY = map(meowParams.posOffset.y, -100, 100, height / 2 - 250, height / 2 + 150);
        image(selectedMeow, posX, posY, selectedMeow.width * scaleFactor / 2.8, selectedMeow.height * scaleFactor / 2.8);
    }
}
