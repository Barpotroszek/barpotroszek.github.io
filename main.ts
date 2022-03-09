async function getMedia(constraints) {
  let stream = await navigator.mediaDevices.getUserMedia(constraints);
  console.log(stream);
  const videos = stream.getVideoTracks();
  return stream
}

addEventListener("load", window)