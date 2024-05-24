const button = document.getElementById("location")
async function getCordinates() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        long = position.coords.longitude
        lat = position.coords.latitude
        console.log(long)
        console.log(lat)
        await getAddress(long, lat)
    })
}

async function getAddress(long, lat) {
    try {
        // getCordinates()
        // console.log(long)
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'JaswanthSudha (jaswanthsudha2021@gmail.com)'
            }
        })
        const json = await response.json()
        console.log(json)
    }
    catch (error) {
        console.log(error);
    }
}
button.addEventListener("click", () => {
    getCordinates()
})


