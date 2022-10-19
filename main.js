console.log('hi main.js')

const btn = document.querySelector('button');
const responseSection = document.getElementsByClassName('response-area')[0];

function printString() {
    console.log("button clicked")
}

btn.addEventListener('click', () => {
    printString()
    axios
        .get('https://swapi.dev/api/planets/?search=Alderaan')
        //Inside the callback passed to the .then, loop over the residents array returned on the results. It’s full of URLs.
        .then((res) => {
            console.log("res.data.results[0].residents.length:", res.data.results[0].residents.length)
            for (var i = 0; i < res.data.results[0].residents.length; i++) {
                console.log("inside forloop:", res.data.results[0].residents[i])
                let url = res.data.results[0].residents[i]
                axios
                    //In the loop, make another get request for each URL in the array.
                    .get(url)
                    //You’ll have another .then that has its own callback, inside which you should create an h2 element whose content is the name of the resident that you just requested. Append the h2 to your HTML document.
                    .then((res) => {
                        console.log("res.data.name", res.data.name)
                        const newElement = document.createElement('h2');
                        const newContent = document.createTextNode(res.data.name)
                        newElement.appendChild(newContent)
                        //append to response section
                        responseSection.appendChild(newElement)
                    })
            }
        })
});



