const cl = console.log;

const cardContainer = document.getElementById('cardContainer')

const inputSearch = document.getElementById('inputSearch')
const comment = document.getElementById('comment')

const btnname = document.getElementById('btnname')
const nameIcon = document.getElementById('nameicon')

const btncap = document.getElementById('btncap')
const capIcon = document.getElementById('capicon')

const btnpop = document.getElementById('btnpop')
const popIcon = document.getElementById('popicon')

const cardInfo = (display = countries) => {
    result = '';
    display.forEach(counrty => {
        result +=  
        `   <div class="col-lg-2">
            <div class="card countryCard">
              <img src="${counrty.flag}" class="card-img-top text-center flag" alt=" Country Flag">
              <div class="card-body">
                <h5 class="card-title">${counrty.name}</h5>
                <p class="card-text"><span>capital: </span>${counrty.capital}</p>
                <p class="card-text"><span>languages: </span>${counrty.languages}</p>
                <p class="card-text"><span>population: </span>${counrty.population}</p>
              </div>
            </div>
          </div>
        ` 
    })
    cardContainer.innerHTML = result;
}
cardInfo()

const onKeyUpFind = (eve) => {
    let searchWord = eve.target.value.toLowerCase();
    const filteredCountries = countries.filter(country => {
        return country.name.toLowerCase().includes(searchWord) ||
              (country.capital && country.capital.toLowerCase().includes(searchWord)) ||
              country.languages.some(lang => lang.toLowerCase().includes(searchWord))
    })
    cardInfo(filteredCountries)
    comment.innerHTML = `<strong>${filteredCountries.length}</strong> of ${countries.length} countries found`
}

let isAscendingName = true;

const onclickSortedNames = () => {
    nameIcon.classList.remove('d-none')
    capIcon.classList.add('d-none')
    popIcon.classList.add('d-none')
    if(isAscendingName){
        nameIcon.classList.remove('fa-arrow-down')
        nameIcon.classList.add('fa-arrow-up')
        countries.sort((a, b) => b.name.localeCompare(a.name))
    }else{
        nameIcon.classList.remove('fa-arrow-up')
        nameIcon.classList.add('fa-arrow-down')
        countries.sort((a, b) => a.name.localeCompare(b.name))
    }
    isAscendingName = !isAscendingName;
    cardInfo()
}

let isAscendingCapital = true;
const onclickSortedCap = () => {
    capIcon.classList.remove('d-none')
    nameIcon.classList.add('d-none')
    popIcon.classList.add('d-none')
    if(isAscendingCapital){
        capIcon.classList.add('fa-arrow-down')
        capIcon.classList.remove('fa-arrow-up')
        countries.sort((a, b) => {
            a.capital = a.capital || 'z-unknown'
            b.capital = b.capital || 'z-unknown'
            return a.capital.localeCompare(b.capital)
        })
    }else{
        capIcon.classList.remove('fa-arrow-down')
        capIcon.classList.add('fa-arrow-up')
        countries.sort((a, b) => {
             a.capital = a.capital || 'a-unknown'
            b.capital = b.capital || 'a-unknown'
            return b.capital.localeCompare(a.capital)
        })
    }
    isAscendingCapital = !isAscendingCapital;
    cardInfo()
}

let isAscendingPopulation = true;

const onclickSortedpop = () => {
capIcon.classList.add('d-none')
nameIcon.classList.add('d-none')
popIcon.classList.remove('d-none')
if(isAscendingPopulation){
    popIcon.classList.add('fa-arrow-down')
    popIcon.classList.remove('fa-arrow-up')
    countries.sort((a, b) => a.population - b.population)
}else{
    popIcon.classList.add('fa-arrow-up')
    popIcon.classList.remove('fa-arrow-down')
    countries.sort((a, b) => b.population - a.population)
}
    isAscendingPopulation = !isAscendingPopulation;
    cardInfo()
}


inputSearch.addEventListener('keyup', onKeyUpFind)
btnname.addEventListener('click', onclickSortedNames)
btncap.addEventListener('click', onclickSortedCap)
btnpop.addEventListener('click', onclickSortedpop)