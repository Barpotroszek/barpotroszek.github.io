var w = 640,
  h = 480,
  margin = 10,
  backgroundColor = "#348cdf",
  amount = 0,
  maxPhotos = 4;

window.addEventListener("load", () => {
  var photo = document.getElementById("photo");
  window.canvas = document.querySelector("canvas");
  var startButton = document.getElementById("btnStart");
  window.captureButton = document.getElementById("btnCapture");
});

function setRadius(val) {
  // const styleSheet;
  const root = document.documentElement;
  root.style.setProperty("--radius", `${val}px`);
}

async function startStream() {
  var camDiv = document.querySelector("video");
  const constraints = {
    video: true,
    audio: false,
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  const video = stream.getVideoTracks()[0];
  var { height, width } = video.getSettings();
  w = width;
  h = height;
  console.log(height, width);
  camDiv.style.height = `${h}px`;
  camDiv.style.width = `${w}px`;
  camDiv.srcObject = stream;
  camDiv.play();
  window.camDiv = camDiv;
  setRadius(Math.floor(h / 2));
}

const hideCountDownMask = () =>
  document.getElementById("CountDownMask").classList.add("hidden");

function setCountdownContent(txt) {
  const attr = document.createAttribute("data-content");
  attr.value = txt;
  const mask = document.getElementById("CountDownMask");
  mask.classList.remove("hidden");
  mask.attributes.setNamedItem(attr);
  mask.style.setProperty(
    "--text-size",
    `${6 / (((txt.length % 2) + 2) * 0.4)}em`
  );
}

function clearPreview() {
  context = canvas.getContext("2d");
  canvas.width = 10;
  canvas.height = 10;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
  amount = 0;
  captureButton.disabled = false;
}

function getGradient(context) {
  var color_picker_1 = document.getElementById("color1");
  var color_picker_2 = document.getElementById("color2");
  const gradient = context.createLinearGradient(0, 0, w, h);
  let color1 = color_picker_1.value;
  let color2 = color_picker_2.value;
  gradient.addColorStop(0.5, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

async function captureFrame() {
  let layout;
  for (const a of document.getElementsByName("layout"))
    if (a.checked) {
      layout = a.value;
      break;
    }
  var context = canvas.getContext("2d");
  const img = new Image();
  if (amount) img.src = photo.getAttribute("src");
  canvas.width = layout == "Kolumna" ? w + 2 * margin : margin + 2*(margin+w);
  canvas.height = layout == "Kolumna" ? margin +(amount + 1) * (h + margin) : margin + 2*(margin+h);

  context.fillStyle = getGradient(context);
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
  const frame = document.createElement("canvas");
  frame.width = w;
  frame.height = h;
  const frameCtx = frame.getContext("2d");
  frameCtx.save();
  frameCtx.scale(-1, 1);
  frameCtx.drawImage(camDiv, 0, 0, -w, h);
  frameCtx.restore();

  if (layout == "Kolumna") {
    context.drawImage(frame, margin, amount * (h + margin) + margin, w, h);
  } else {
    context.drawImage(frame, margin + (amount % 2) * (w + margin), margin + Math.floor(amount / 2) * (h + margin), w, h);
  }
  amount += 1;

  var data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}

async function makeShoot() {
  let a = 5;
  captureButton.disabled = true;
  setCountdownContent(`${a--}`);
  const countDown = setInterval(function () {
    let text = `${a--}`;
    if (a <= 0) {
      text = "Smile";
      setTimeout(() => {
        hideCountDownMask();
        captureFrame();
        if (amount < maxPhotos) captureButton.disabled = false;
      }, 1000);
      window.clearInterval(countDown);
    }
    setCountdownContent(text);
  }, 1000);
  return countDown;
}

/**
 ** TODO: CountDown
 * TODO: Downloading...
 * TODO: Zmienić wszystkie eventy przycisków na addEventListener
 ** TODO: Bakcground color picker
 ** TODO: Gradient in background? https://www.w3schools.com/graphics/canvas_gradients.asp
 * TODO: Title from Party
 */
