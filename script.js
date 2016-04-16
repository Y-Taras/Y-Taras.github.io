$(document).ready(function() {
    $("#search").keyup(function(e) {
        if (e.keyCode == 13) {
            $(".btn-search").click();
        }
    });
    $(".btn-search").on("click", function() {
        var searchItem = $("#search").val();
        if (searchItem === "") {
            return false;
        }
        var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srcwhat=text&srsearch=" + searchItem + "&callback=?";
        console.log('url ', url);
        $.getJSON(url, parseData);
    });
    $('#search').autocomplete({
        delay: 500,
        minlength: 2,
        source: function(request, response) {
            var url = "https://en.wikipedia.org/w/api.php?action=opensearch&suggest=true&search=" + request.term + "&callback=?";
            $.getJSON(url, function(data) {
                response(data[1]);
            });
        }
    });

    function parseData(json) {
        var elem = "";
        for (var i = 0; i < (json.query.search.length - 1); i++) {
            var title = json.query.search[i].title;
            var snippet = json.query.search[i].snippet;
            elem += '<a href = "https://en.wikipedia.org/wiki/' + title + '" target="_blank"><p class="well">' + snippet + '</p></a>';
            if (i === 0) { console.log('elem ', elem); }
        }
        $('#output').html(elem);
    }
});
