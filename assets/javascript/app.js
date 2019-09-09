 // Favorite topics
 var topics = ["Friends", "Classic Rock", "Disney", "The Simpsons"];

 // Empty arrays to store images and gifs sources and isAnimated property
 var gifArray = [];
 var imgArray = [];

 function renderButtons() {

     // Deleting the movie buttons prior to adding new movie buttons
     // (this is necessary otherwise we will have repeat buttons)
     $(".buttons").empty();

     // Looping through the array of movies
     for (var i = 0; i < topics.length; i++) {

     // Then dynamicaly generating buttons for each movie in the array.
     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
     var newBtn = $("<button>");
     // Adding a class
     newBtn.addClass("topics").text(topics[i]);
     // Providing the button's text with a value of the movie at index i
     // Adding the button to the HTML
     $(".buttons").append(newBtn);
     }
 }

 $(document).on("click", ".topics", function() {
     // We get the term of the search from the text of the button
     var topic = $(this).text();
     var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ydet2pYHEjW6TV1lm0CfcqYtpGFmqapL&q=" + topic + "&limit=10&offset=0&rating=PG&lang=en";
     
     // Empty the two arrays from past searches and the display area
     gifArray = [];
     imgArray = [];
     
     $(".display-area").empty();

     // Requesting data from API
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function(response){
         console.log(response);
         for (var i = 0 ; i < 10 ; i++){

             // Save the resulting images and gifs URLs into their respective arrays
             imgArray.push({ src: response.data[i].images.fixed_width_still.url });
             // save the resulting gifs into an array of objects which properties are the src url and a boolean that
             // indicates if the animated gif is been displayed or not
             gifArray.push({ src: response.data[i].images.fixed_width.url, isAnimated: false });

             // creating img element saving their class and index for future match with the previously saved arrays
             var newFigure = $("<figure>").attr("class", "masonry-brick");
             var newImg = $("<img>").attr({"src": imgArray[i].src, "class": "gif-preview", "index": i});
             var newFigCaption = $("<figcaption>").html("Rate: " + response.data[i].rating + ".<br> Title: " + response.data[i].title + ".");
             
             newFigure.append(newImg, newFigCaption);

             $(".display-area").append(newFigure);

         }   
     });
 });

 $(document).on("click", ".gif-preview", function() {
     //Variable to store the link that will be toggled
     var newSrc;

     //checks the object property of isAnimated on index matching "index" attribute of clicked image
     if (!gifArray[$(this).attr("index")].isAnimated) {
         // gets source from previously saved array of animated gifs
         newSrc = gifArray[$(this).attr("index")].src;
     } else {
         // gets source from previously saved array of still images
         newSrc = imgArray[$(this).attr("index")].src;
     }
     // changes property of isAnimated to the opposite value
     gifArray[$(this).attr("index")].isAnimated = !gifArray[$(this).attr("index")].isAnimated;

     // sets the source of clicked image to the one we got from the array
     $(this).attr("src", newSrc);
 });

 $("#add-topic").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#topic-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

 renderButtons();