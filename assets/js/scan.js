let params = new URLSearchParams(document.location.search)
let idProduit = params.get("Produit")
if (idProduit == null || idProduit == "") {
    idProduit = "5997523311230"
}





document.querySelector("#scan_bouton").addEventListener("click", function () {
    let selectedDeviceId;
    const codeReader = new ZXing.BrowserMultiFormatReader();
    console.log("ZXing code reader initialized");
    codeReader
        .listVideoInputDevices()
        .then((videoInputDevices) => {
            const sourceSelect = document.getElementById("sourceSelect");
            selectedDeviceId = videoInputDevices[0].deviceId;
            if (videoInputDevices.length >= 1) {
                videoInputDevices.forEach((element) => {
                    const sourceOption = document.createElement("option");
                    sourceOption.text = element.label;
                    sourceOption.value = element.deviceId;
                    sourceSelect.appendChild(sourceOption);
                });
                sourceSelect.onchange = () => {
                    selectedDeviceId = sourceSelect.value;
                };

                const sourceSelectPanel = document.getElementById("sourceSelectPanel");
                sourceSelectPanel.style.display = "block";
                const video_container = document.querySelector("#video_container");
                video_container.style.display = "block";
                document.querySelector("#button_container").style.display = "block";
            }
            document.getElementById("startButton").addEventListener("click", () => {
                codeReader.decodeFromVideoDevice(
                    selectedDeviceId,
                    "video",
                );

                console.log(
                    `Started continous decode from camera with id ${selectedDeviceId}`
                );
            });
            document.getElementById("resetButton").addEventListener("click", () => {
                codeReader.reset();
                document.getElementById("result").textContent = "";
                console.log("Reset.");
            });
        })
        .catch((err) => {
            console.error(err);
        });
});