// Xbox Streamer JavaScript File

const loginButton = document.getElementById("login-button");
const disconnectButton = document.getElementById("disconnect-button");
const authSection = document.getElementById("auth-section");
const streamSection = document.getElementById("stream-section");
const streamVideo = document.getElementById("stream-video");

// Replace this with your registered application's Client ID from Azure
const clientId = "YOUR_CLIENT_ID_HERE";
const redirectUri = window.location.origin; // Redirect users back to this page

// Handle Xbox Authentication
loginButton.addEventListener("click", () => {
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=XboxLive.signin`;
  window.location.href = authUrl;
});

// Handle the redirect back with the token
if (window.location.hash) {
  const token = window.location.hash
    .substring(1)
    .split("&")
    .find(param => param.startsWith("access_token"))
    ?.split("=")[1];

  if (token) {
    console.log("Authenticated successfully!");
    authSection.style.display = "none";
    streamSection.style.display = "block";

    // Start WebRTC stream once authenticated
    startStreaming(token);
  }
}

// Start Streaming
function startStreaming(token) {
  console.log("Starting the Xbox stream...");

  // Simulate a WebRTC connection (replace this with Xbox WebRTC settings)
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      streamVideo.srcObject = stream;
      console.log("Stream active!");
    })
    .catch((err) => {
      console.error("Error starting the stream:", err);
    });
}

// Disconnect the stream
disconnectButton.addEventListener("click", () => {
  if (streamVideo.srcObject) {
    const tracks = streamVideo.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    streamVideo.srcObject = null;
  }

  // Show auth screen again
  authSection.style.display = "block";
  streamSection.style.display = "none";
  console.log("Disconnected from the stream.");
});