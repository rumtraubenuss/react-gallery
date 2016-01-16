function getImages(callback) {
  fetch('http://localhost:8081/api')
  .then(res => res.json())
  .then(json => callback(json))
  .catch(ex => console.log('Could not fetch data from API', ex))
}

export default { getImages }
