// Set up variables
//***********************************************************
var apiKey = "d9e811dda52145e39c98c7a8e501fff3"
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
//URL base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ apiKey;

// variable to track number of articles
var articleCounter = 0;
// functions
//***********************************************************

function runQuery(numArticles, queryURL){
	//Ajax function
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(NYTData){
		$("#wellSection").empty();
		for (var i = 0 ; i < numArticles; i++){
		console.log("----------------------------------------------")
		//start dumping to html
		var wellSection = $("<div>");
		wellSection.addClass("well");
		wellSection.attr("id", "articleWell-" + i);
		$("#wellSection").append(wellSection);

		if(NYTData.response.docs[i].headline != "null"){
			console.log(NYTData.response.docs[i].headline.main);
			$("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main +"</h3>");
		}

		if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
			console.log(NYTData.response.docs[i].byline.original)
			$("#articleWell-" + i).append("<h4>" + NYTData.response.docs[i].byline.original +"</h4>")
		}

		if(NYTData.response.docs[i].section_name != "null"){
			console.log(NYTData.response.docs[i].section_name);
			$("#articleWell-" + i).append("<h4>" + NYTData.response.docs[i].section_name +"</h4>");
		}

		if(NYTData.response.docs[i].pub_date != "null"){
		$("#articleWell-" + i).append("<h4>" + NYTData.response.docs[i].pub_date +"</h4>")
		console.log(NYTData.response.docs[i].pub_date);			
		}
		if(NYTData.response.docs[i].web_url != "null"){
		$("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url +">" + NYTData.response.docs[i].web_url +"</a>" )
		console.log(NYTData.response.docs[i].web_url);			
		}
		//attach the content to well.
		}
		console.log(queryURL)
		console.log(numArticles)
		console.log(NYTData);
	})
}

// main process
//***********************************************************
$("#searchBtn").on('click',function(){
	var searchTerm = $("#search").val().trim();
	var newURL = queryURLBase + "&q=" + searchTerm;

	//get number of records
	numResults = $("#numRecords").val();
	//get start and end year
	startYear = $("#startYear").val().trim();
	endYear = $("#endYear").val().trim();

	if(parseInt(startYear)){
		startYear = startYear + "0101"
		newURL = newURL + "&begin_date=" + startYear;
	}

	if(parseInt(endYear)){
		endYear = endYear + "0101"
		newURL = newURL + "&end_date=" + endYear;
	}

	// newURL = newURL + "&begin_date=" + startYear + "&end_date" + endYear;
	//send the ajax call
	runQuery(numResults, newURL)
	return false;
})



// retreive user input and conver to variables
// use those variables to run ajax call
// break down the nyt object to usable fields
// dynamically generate the content in html

// dealing with edge cases -- bugs 