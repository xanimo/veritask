// Read a page's GET URL variables and return them as an associative array.
			function getUrlVars()
			{
    			var vars = [], hash;
    			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			for(var i = 0; i < hashes.length; i++)
    			{
        			hash = hashes[i].split('=');
        			vars.push(hash[0]);
        			vars[hash[0]] = hash[1];
    			}
    			return vars;
			}

			var search = getUrlVars()["search"];
			var pageSize = getUrlVars()["pageSize"];
			var pageQs = getUrlVars()["page"];
			var jsonCount = document.querySelectorAll('.card').length;
			console.log(jsonCount);
			console.log(search);
			console.log(pageSize);
			console.log(pageQs);

			$(".page-link").each(function(i) {
    			$(this).attr("id", "url" + i);
			});

			function calcPaginate(clicked_id) {
				alert(clicked_id);
				let pageLink = clicked_id.split("url")[1];
				let pagePassed;
				if (pageLink = pageQs) {
					pagePassed = pageLink;
				} else if (pageLink > pageQs) {
					pagePassed = pageLink;
					$(".page-link").each(function(i) {
						let j = pageLink + 1;
						$(this).attr("id", "url" + j);
						$(this).attr("value", j);
						$(this).text(j);
					});
				}
			}

			function yourFunction(page) {
			let pageQs = page;
			let searchTerm = $("#search").val().trim();
			let numRecords = $("#numRecords").val().trim();
			let startYear = $("#startYear").val().trim();
			let endYear = $("#endYear").val().trim();
    		var action_src = "/search&search=" + searchTerm + "&pageSize=" + numRecords + "&page=" + pageQs;
    		var your_form = document.getElementById('your_form');
    		your_form.action = action_src;
			}

			var items = $(".card").length;
			console.log("items: " + items);
			$(".card").each(function(i) {
    			$(this).attr("id", "card" + i);
			});
			$(".car").each(function(i) {
    			$(this).attr("id", "btn" + i);
			});
			$("input[name=urlImg]").each(function(i) {
    			$(this).attr("id", "urlImg" + i);
			});
			$("input[name=title]").each(function(i) {
    			$(this).attr("id", "title" + i);
			});
			$("input[name=description]").each(function(i) {
    			$(this).attr("id", "desc" + i);
			});
			$("input[name=source]").each(function(i) {
    			$(this).attr("id", "source" + i);
			});
			$("input[name=author]").each(function(i) {
    			$(this).attr("id", "author" + i);
			});
			$("input[name=pub]").each(function(i) {
    			$(this).attr("id", "pub" + i);
			});
			$("input[name=url]").each(function(i) {
    			$(this).attr("id", "url" + i);
			});

			// function reply_click(clicked_id) {
			// 	event.preventDefault();
			// 	alert(clicked_id);
			// 	var i = clicked_id.split("btn")[1];
			// 	$(this).on("click", function(event) {

			// 	    let urlImg = $("#urlImg" + i).val();
			// 	    console.log("Url Image: " + urlImg);
			// 	    let title = $("#title" + i).val();
			// 	    console.log("Title: " + title);
			// 	    let desc = $("#desc" + i).val();
			// 	    console.log("Description: " + desc);
			// 	    let source = $("#source" + i).val();
			// 	    console.log("Source: " + source);
			// 	    let author = $("#author" + i).val();
			// 	    console.log("Author: " + author);
			// 	    let pub = $("#pub" + i).val();
			// 	    console.log("Published At: " + pub);
			// 	    let url = $("#url" + i).val();
			// 	    console.log("Url: " + url);
			// 		console.log($(".card" + i).children('img').attr('src'));

			// 	}

		$(function() {
			function getUrlVars()
			{
    			var vars = [], hash;
    			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			for(var i = 0; i < hashes.length; i++)
    			{
        			hash = hashes[i].split('=');
        			vars.push(hash[0]);
        			vars[hash[0]] = hash[1];
    			}
    			return vars;
			}
				$("button[name=cardBtn]").on("click", function(event) {
					event.preventDefault();
					alert(this.id);
					var i = this.id.split("btn")[1];
					alert(i);
					let newFake = {
					source: $("#source" + i).val(),
					author: $("#author" + i).val(),
				    title: $("#title" + i).val(),
				    description: $("#desc" + i).val(),
				    url: $("#url" + i).val(),
				    urlToImage: $("#urlImg" + i).val(),
				    publishDate: $("#pub" + i).val(),
				    isFake: true 
				};

				localStorage.setItem("data", newFake);

				console.log(localStorage.getItem("data", newFake));

				$.ajax("/articles", {
					type: "POST",
					data: newFake
				}).then(
					function() {
						console.log("new article marked as fake");
						location.reload();
					});
			});
				$(".page-link").on("click", function(event) {
					event.preventDefault();
					alert(this.id);
					let previousPageLinkText = $(this).text();
					console.log(previousPageLinkText);
					let p = this.id.split("url")[1];
					console.log(p);
					paginateScrape(getUrlVars()["search"], getUrlVars()["pageSize"], previousPageLinkText);
					$(this).text(parseInt(previousPageLinkText) + 1)
				});

		function paginateScrape(searchTerm, pageSize, page) {
				// let startYear = $("#startYear").val().trim();
				// let endYear = $("#endYear").val().trim();
    		var action_src = "/search&search=" + searchTerm + "&pageSize=" + pageSize + "&page=" + page;
    		var your_form = document.getElementById('form2');
    		your_form.action = action_src;
    		your_form.submit();
			}
		});
			
