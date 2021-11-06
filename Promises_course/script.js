// region Setup
const API_URL = 'https://starwars.egghead.training/'
const output = document.getElementById("output");
const spinner = document.getElementById("spinner")

function getFilmTitles(films) {
    return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n")
}
// endregion

// add effect before data is on the screen // removed later with spinner
// output.innerText = "Loading ...";

///////////////////   Promise.reject instead of throw Error

// // should be "films" for correct response
// fetch(API_URL + "film")
//     .then(response => {
//         if (!response.ok) {
//             return Promise.reject(
//                 new Error("Unsuccessful response")
//                 // can be just message
//                 // "Unsuccessful response"
//                 // but in this way there will not be error code line in console to track/debug it
//             )
//         }
//         return response.json().then(films => {
//             output.innerText = getFilmTitles(films)
//         })
//     })
//     .catch(error => {
//         console.warn(error)
//         output.innerText = ":(";
//     })
//     .finally(() => {
//         spinner.remove();
//     })


///////////////////   adding spinner, promise.finally

// fetch(API_URL + "film")
//     .then(response => {
//         if (!response.ok) {
//             throw Error("Unsuccessful response");
//         }
//         return response.json().then(films => {
//             output.innerText = getFilmTitles(films)
//             // if we add return here, we will be able to return something in .catch method
//             return films;
//         })
//     })
//     .catch(error => {
//         console.warn(error)
//         output.innerText = ":(";
//         // throw new Error("...")
//         return []
//     })
//     .finally(() => {
//         spinner.remove();
//     })
//     // .then has access to films, in case no error
//     // if error - than what .catch returns will be console logged here (i.e. [])
//     .then(films => {
//         console.log(films)
//     })


///////////////////   if we try to access endpoint that does not exist ('movies')

// even if we got non-successful http status code (404) - promise is still resolved because did get back response

// fetch(API_URL + "movies")
//     // onFulfilled    
//     .then(response => {
//         if (!response.ok) {
//             throw Error("Unsuccessful response");
//         }
//         return response.json().then(films => {
//             output.innerText = getFilmTitles(films)
//         })
//     })
//     .catch(error => {
//         console.warn(error)
//         output.innerText = ":(";
//     })

// function getFilmTitles(films) {
//     return films
//     .sort((a, b) => a.episode_id - b.episode_id)
//     .map(film => `${film.episode_id}. ${film.title}`)
//     .join("\n")
// }

///////////////////   if response.json() failed - it can be tested using Promise.reject("Invalid JSON") --> use catch

// fetch(API_URL + "films")
//     // onFulfilled    
//     .then(response => {
//         return Promise.reject("Invalid JSON").then(films => {
//             output.innerText = getFilmTitles(films)
//         })
//     },

//     // catch is same as then, but only with one error argument
//     // catch method catches both response.json() fail and invalid domain names as above
//     // ).then(undefined, error => {
//         ).catch(error => {
//         console.warn(error)
//         output.innerText = ":(";
//     })

// function getFilmTitles(films) {
//     return films
//     .sort((a, b) => a.episode_id - b.episode_id)
//     .map(film => `${film.episode_id}. ${film.title}`)
//     .join("\n")
// }

///////////////////   adding error handler

// fetch(API_URL + "films").then(
//     // onFulfilled
//     response => {
//         return response.json().then(films => {
//             output.innerText = getFilmTitles(films)
//         })
//     },
//     // onRejected if we i.e. change domain to 'https://star-wars.egghead.training/'
//     error => {
//         console.warn(error)
//         output.innerText = ":(";
//     }
// )

// function getFilmTitles(films) {
//     return films
//     .sort((a, b) => a.episode_id - b.episode_id)
//     .map(film => `${film.episode_id}. ${film.title}`)
//     .join("\n")
// }

///////////////////   simplified/refactored version

// fetch(API_URL + "films")
//     .then(resp => resp.json())
//     .then(films => {
//         output.innerText = getFilmTitles(films)
//     })

// function getFilmTitles(films) {
//     return films
//     .sort((a, b) => a.episode_id - b.episode_id)
//     .map(film => `${film.episode_id}. ${film.title}`)
//     .join("\n")
// }

///////////////////// Start of the project // See simplified/refactored version above

// const responsePromise = fetch(API_URL + "films");
// responsePromise
//     .then(response => {
//     // this shows all filsms
//     console.log(response.json())
//     return response.json() 
// })
//     .then(films => {
//         const filmTitles = films
//             .sort((a, b) => a.episode_id - b.episode_id)
//             .map(film => `${film.episode_id}. ${film.title}`)
//             .join("\n"); 
//         output.innerText = filmTitles;
//     console.log(filmTitles)
// })










