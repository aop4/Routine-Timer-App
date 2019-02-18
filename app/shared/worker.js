require("globals");

onMessage = function(msg) {
    postMessage("Hiya from worker");
}
