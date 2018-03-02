$(document).ready(function(req, res){
        $.ajax({
            type: "GET",
            url: "/articles",
            dataType: 'json',
            success: function(data) {
                console.log(data);
                let html;
                for (i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td>" + data[i].id + "</td>";
                html += "<td>" + data[i].source + "</td>";
                html += "<td>" + data[i].author + "</td>";
                html += "<td>" + data[i].title + "</td>";
                html += "<td>" + data[i].description + "</td>";
                html += "<td>" + data[i].url + "</td>";
                html += "<td>" + data[i].urlToImage + "</td>";
                html += "<td>" + data[i].publishDate + "</td>";
                html += "</tr>";
                }
                $("#articlesTable > tbody").html(html);
            }
        });
});