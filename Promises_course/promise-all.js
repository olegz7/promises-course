const API_URL = 'https://starwars.egghead.training/'


const output = document.getElementById("output");
const spinner = document.getElementById("spinner")

function queryAPI(endpoint) {
  return fetch(API_URL + endpoint)
    .then(response => {
      return response.ok 
      ? response.json()
        // .then(films => output.innerText = films
        //   .map(film => film.title)
        //   .join("\n"))
      : Promise.reject(Error("Unsuccessful response"))    
    })
}


///////////////////  Promise.allSettled refactorin of if statements

Promise.allSettled([
  queryAPI("films").then(f => `${f.length} films`),
  queryAPI("planets").then(p => `${p.length} planets`),
  queryAPI("species").then(s => `${s.length} species`),
  queryAPI("vehicles").then(v => `${v.length} vehicles`)
])
  .then(results => {
    const statistics = results
      .filter(result => result.status === "fulfilled")
      .map(result => result.value);
    output.innerText = statistics.length === 0 ? 
      "Failed to load statistics :("
      : statistics.join("\n")
    // output.innerText = 
    //   `${films.length} films, ` +
    //   `${planets.length} planets, ` +
    //   `${species.length} species` 
    
})
  .catch(error => {
    console.warn(error)
    output.innerText = ":("
  })
  .finally(() => {
    spinner.remove();
  })


// ///////////////////  Promise.allSettled (shows everything except movies)

// Promise.allSettled([
//   queryAPI("movies"),
//   queryAPI("planets"),
//   queryAPI("species")
// ])
//   .then(([films, planets, species]) => {
//     const statistics = [];
//     if (films.status === "fulfilled") {
//       statistics.push(`${films.value.length} films`)
//     }
//     if (planets.status === "fulfilled") {
//       statistics.push(`${planets.value.length} planets`)
//     }
//     if (species.status === "fulfilled") {
//       statistics.push(`${species.value.length} species`)
//     }
//     output.innerText = statistics.join("\n")
//     // output.innerText = 
//     //   `${films.length} films, ` +
//     //   `${planets.length} planets, ` +
//     //   `${species.length} species` 
    
// })
//   .catch(error => {
//     console.warn(error)
//     output.innerText = ":("
//   })
//   .finally(() => {
//     spinner.remove();
//   })




///////////////////  Promise.all

// // if all promises are fulfilled the returned promise is fulfilled, 
// // if any promise fails, the returned promise is rejected

// Promise.all([
//   queryAPI("films"),
//   queryAPI("planets"),
//   queryAPI("species")
// ])
//   .then(([films, planets, species]) => {
//     output.innerText = 
//       `${films.length} films, ` +
//       `${planets.length} planets, ` +
//       `${species.length} species` 
    
// })
//   .catch(error => {
//     console.warn(error)
//     output.innerText = ":("
//   })
//   .finally(() => {
//     spinner.remove();
//   })

// // here two ajax requests go one after another, promise/all can be used
// queryAPI("films")
//   .then(films => {
//     return queryAPI("planets").then(planets => {
//       output.innerText = 
//       `${films.length} films, ` +
//       `${planets.length} planets`
//     })
//     // output.innerText = films
//     //   .map(film => film.title)
//     //   .join("\n")
    
//   })
//   // need to hide spinner after promise has been settled
//   .finally(() => {
//     spinner.remove();
//   })
  









// function getFilmTitles(films) {
//   return films
//   .sort((a, b) => a.episode_id - b.episode_id)
//   .map(film => `${film.episode_id}. ${film.title}`)
//   .join("\n")
// }

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