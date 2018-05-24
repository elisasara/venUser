
$(document).ready(function () {
    var VenueIdInput = $("#venueid_fm");
    var AuthorNameInput = $("#Author_Name_fm");
    var CategoryInput = $("#category_fm");
    var ContentInput = $("#content_fm");
    var VenueRatingInput = $("#rating_venue_fm");
    var VenueForm = $("#venueForm");
                             
    $(VenueForm).on("submit", handleFormSubmit);  
    
    // var url = window.location.search;

    // var venueId;

    // if (url.indexOf("?/venues/") !== -1) {
    //   venueId = url.split("/")[1];
    //     getReviewData(venueID);
    // }

    // function getReviewData
    
    function handleFormSubmit(event) {
        event.preventDefault();

        if (!VenueIdInput.val().trim() || !AuthorNameInput.val().trim() || !CategoryInput.val().trim() || !VenueRatingInput.val().trim()) {
          return;
        }
        var newReveiw = {
            name_author: AuthorNameInput.val().trim(),
            category: CategoryInput.val().trim(),
            content: ContentInput.val().trim(),
            rating_venue: VenueRatingInput.val().trim(),
            venue_id: VenueIdInput.val().trim(),

        };
        submitPost(newReveiw);
        
    };
    function submitPost(post) {
        $.post("/api/reviews", post, function () {
            location.reload();
        });
    };

    
});