


document.querySelector("#buttonScan").addEventListener("click", function () {
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
                    (result, err) => {
                        if (result) {

                            console.log(result);
                            document.getElementById("result").textContent = result.text;
                            document.querySelector("#nProduit").value = result.text;
                            document.getElementById("searchbutton").click()

                        }
                        if (err && !(err instanceof ZXing.NotFoundException)) {
                            console.error(err);
                            document.getElementById("result").textContent = err;
                        }
                    }
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

            console.log(videoInputDevices); // Pour vérifier les caméras détectées
            console.log(selectedDeviceId);  // Pour confirmer l'ID de l'appareil sélectionné
        })
        .catch((err) => {
            console.error(err);
        });
});