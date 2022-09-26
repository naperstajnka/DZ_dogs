const fillBreeds = function () {
    let url = 'https://dog.ceo/api/breeds/list';
    const select = document.getElementById('breeds')
    fetch(url)
        .then(function (responseObj) { 
            return responseObj.json();
        }).then(function (response) {
        if (response.status === 'success') {
            response.message.forEach(function (e) {
                const breedItem = document.createElement('option')
                breedItem.setAttribute('value', e)
                breedItem.text = e
                select.appendChild(breedItem)
            })
        }

    })
}

const getImages = function () {
    const countVal = document.getElementById('count').getAttribute('value');
    const count = parseInt(countVal, 10);
    const breedSelect = document.getElementById('breeds')
    const breed = breedSelect.options[breedSelect.selectedIndex].value;
    const url = 'https://dog.ceo/api/' +
        (breed === "" ? `breeds/image/random/` : `breed/${breed}/images/random/`) +
        count
    fetch(url)
        .then(function (responseObj) {
            return responseObj.json();
        }).then(function (response) {
        if (response.status === 'success') {
            const content = document.getElementById('content')
            content.innerHTML = ''
            const photos = response.message
            photos.forEach(function (e) {
                let li = document.createElement('li')
                let img = document.createElement('img')
                img.setAttribute('src', e)
                li.appendChild(img)
                content.appendChild(li);
            })
        }
    })
}

window.addEventListener('load', fillBreeds)

document.getElementsByTagName('button')[0].addEventListener('click', getImages)

document.getElementById('count').addEventListener('input', function () {
    if (parseInt(this.value,10) < 0) {
        alert("Количество должно быть положительным числом")
        this.setAttribute('value', 1)
        this.value = 1
    }
    this.setAttribute('value', this.value)
});

const formElements = document.getElementsByClassName("form-control")

for (let i = 0; i < formElements.length; i++) {
    formElements[i].addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const countEl = document.getElementById('count').getAttribute('value')
            if (parseInt(countEl, 10)) {
                document.getElementsByTagName('button')[0].click()
            }

        }

    })
}
