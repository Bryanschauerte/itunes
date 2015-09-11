var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

    //format the data otherwise it will just thow all the objects out that it finds, which ng-grid doesnt understand



    this.formatData = function(data){
      return {
        AlbumArt: data.artworkUrl100,
        Artist: data.artistName,
        Collection: data.collectionName,
        CollectionPrice: data.collectionPrice,
        Play: data.previewUrl,
        Type: data.kind,
        TrackPrice: data.trackPrice,
        Country: data.country

      }
    };



    this.artistRequest = function(artist){
      console.log("service fired");
      var deferred = $q.defer();

      $http({
        method: "JSONP",
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'

      }).then(function(response){

        console.log(response);

        var parsedResponse = response.data.results;
        var artists = [];

                console.log(parsedResponse);


        for(var i =0; i < parsedResponse.length; i++){
          artists.push(this.formatData(parsedResponse[i]));

}
console.log(artists);
        deferred.resolve(artists);
//bind(this) allows me to bind to the service 'this'
      }.bind(this));

      return deferred.promise;
    };

});
