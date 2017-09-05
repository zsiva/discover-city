import fetch from 'isomorphic-fetch'

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


const fetchJson = (url) => fetch(url, {
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }).then(handleErrors);

export {
  fetchJson
}
