$(document).ready(function() {
    var gifArray = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"]

    // set up initial buttons
    displayButtons()

    // check if button exists, then make if it doesn't
    $("#gif-button").on("click", function() {
        var search = $(".text").val().trim()
        if (search.length != 0 && !gifArray.includes(search)) {
            gifArray.push(search)
        }
        displayButtons()
    })

    // if button is clicked, display still gifs
    $(document).on("click", ".gif", function() {
        var name = $(this).html()
        displayGifs(name)
    })

    // if gif clicked, then play/pause gif
    $(document).on("click", ".img", function () {
        var state = $(this).attr("data-state")
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    })

    // if enter key is pressed
    $(document).keyup(function(event){
        if(event.keyCode == 13){
            $("#gif-button").click();
        }
    })

    function displayButtons() {
        $(".button-div").empty()
        for (i=0; i<gifArray.length; i++) {
            var button = $("<button>")
            button.html(gifArray[i])
            button.attr("class", "gif")
            $(".button-div").append(button)
        }
    }

    function displayGifs(name) {
        $(".animal-gif").empty()
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=sV5HWKgQ1QusBHL7LgOWbS4FEMyVAB90&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var div = $("<div>")
            var data = response.data
            for (i=0; i<data.length; i++) {
                var aurl = data[i].images.fixed_height.url
                var surl = data[i].images.fixed_height_still.url
                var img = $("<img>")
                img.attr("data-still", surl)
                img.attr("data-animate", aurl)
                img.attr("data-state", "still")
                img.attr("src", surl)
                img.attr("class", "img")

                if (i%3 != 2) {

                }

                $(".animal-gif").append("Rating: " + data[i].rating)
                $(".animal-gif").append($("<br>"))
                $(".animal-gif").append(img)
                $(".animal-gif").append($("<br>"))
            }
        })
    }
})