$(document).ready(function(){
    var topics = ['Chicago Bears', 'Green Bay Packers', 'Minnesota Vikings', 'Detroit Lions', 'Dallas Cowyboys', 'Philadelphia Eagles', 'Washington Redskins', 'New York Giants', 'Los Angeles Rams', 'Seattle Seahawks'];

  //  creating baseline NFL array buttons
    function buttonNFL(){
        $('#buttonsArea').empty();
        
        for ( var i=0; i < topics.length; i++) {
            //create all buttons
            var newButton = $('<button>');
            newButton.addClass('nfl');
            newButton.attr('data-name', topics[i]);
            newButton.text(topics[i]);
            $('#buttonsArea').append(newButton);
        }
    }    
    buttonNFL();
   

//on button click
  $(document).on('click', '.nfl', function() {

    var nfl = $(this).html(); 
    console.log(nfl);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nfl + "&api_key=CC9BQdSJPTV0gX9VISAvgUiPY96Wxn9E";
        // console.log(queryURL);
        $.ajax({url: queryURL, 
        method: 'GET'})
        .done(function(response) {
            // grabs the data
            var results = response.data;
            // console.log(results);
            //empties the div before adding more gifs
            $('#nflView').empty();
                //loops through the data
                for ( var j=0; j < results.length; j++) {
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  
                    var nflImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    nflImage.attr('data-state', 'still');
                    $('#nflView').prepend(nflImage);
                    nflImage.on('click', animateGif);
                    
                    // pulling the rating
                        var rating = results[j].rating;
                            // console.log(rating);
                        var displayRating= $('<p>').text("Rating: " + rating);
                        $('#nflView').prepend(displayRating);
            
                }
        });

        //animates the gif from still to animate and then back to still
        function animateGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                }
                
    })

       

//adding new buttons
$(document).on('click', '#addNFL', function(){
    if ($('#nfl-input').val().trim() == ''){
      alert('please add NFL team');
   }
   else {
    var nfl = $('#nfl-input').val().trim();
    topics.push(nfl);
    $('#nfl-input').val('');
    buttonNFL();
    return false;

    }

});

});