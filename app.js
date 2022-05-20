var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up de los parametros de busqueda
var params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Inicia la busqueda usando los parametros.
T.get('search/tweets', params, function(err, data, response) {

  // Si no hay error procede
  if(!err){

    // Mira entre los tweets retornados
    for(let i = 0; i < data.statuses.length; i++){

      // Coge la ID del tweet de los datos obtenidos
      let id = { id: data.statuses[i].id_str }

      // Intenta favorite del tweet seleccionado
      T.post('favorites/create', id, function(err, response){

        // Si el favorito falla, log del mensaje de error
        if(err){
          console.log(err[0].message);
        }

        // Si el favorito es funcional, log de la url del tweet
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }

      });
    }

  } else {
    console.log(err);
  }
  
})