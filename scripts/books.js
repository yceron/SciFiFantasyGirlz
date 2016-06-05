var tooltip;

var viewModel = kendo.observable({
    currentBook: null,

    closePanel: function() {
        this.set("currentBook", null);
    },

    ratingDisplay: function(starsValue) {
        var maxStars = 5;
        var emptyStarTemplate = '<span class="glyphicon glyphicon-star-empty"></span>';
        var filledStarTemplate = '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
        var starsHtml = "";

        var emtpyStars = maxStars - starsValue;

        for (var j = 0; j < starsValue; j++) {
            starsHtml = starsHtml + filledStarTemplate;
        }

        for (var i = 0; i < emtpyStars; i++) {
            starsHtml = starsHtml + emptyStarTemplate;
        }

        return starsHtml;
    },

    bookImageUrl: function() {
        if (this.get("currentBook")) {
            return "images/covers/" + this.get("currentBook").bookid + ".jpg";
        }
    },

    groupRatingStars: function() {
        if (this.get("currentBook")) {
            var starsValue = parseInt(this.get("currentBook").group_rating_avg);
            return this.ratingDisplay(starsValue);
        }
    },

    goodreadsRatingStars: function() {
        if (this.get("currentBook")) {
            var starsValue = parseInt(this.get("currentBook").average_rating);
            return this.ratingDisplay(starsValue);
        }
    }

});

function onSeriesHover(e) {
    viewModel.set("currentBook", e.dataItem);
}

function onDataBound(e) {
    viewModel.set("currentBook", e.sender.dataSource.at(5));
}

function createChart() {
    $("#chart").kendoChart({
        theme: "bootstrap",
        dataSource: {
            transport: {
                read: {
                    url: "data/group_read_books.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "startdate",
                dir: "asc"
            }
        },
        title: {
            text: "Sci-Fi & Fantasy Girlz Read Books",
            font: "bold 18px 'Raleway', sans-serif"
        },
        legend: {
            position: "bottom"
        },
        series: [{
            type: "line",
            field: "average_rating",
            name: "Goodreads average rating",
            color: "#007eff",
            axis: "groupavgrating"
        }, {
            type: "bar",
            field: "group_rating_avg",
            name: "Sci-Fi & Fantasy Girlz average rating",
            color: "#73c100",
            axis: "groupavgrating"
        }],
        valueAxes: [{
            name: "groupavgrating",
            color: "#007eff",
            min: 1,
            max: 5
        }
        ],
        categoryAxis: {
            field: "read_date_label",
            labels: {
                rotation: -45
            }
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "#= dataItem.title #"
        },
        seriesClick: onSeriesHover,
        dataBound: onDataBound
    });
}



$(window).on("resize", function () {
    $("#chart").data("kendoChart").refresh();
});

$(document).ready(function () {
    createChart();

    kendo.bind($("#readBooks"), viewModel);
});

