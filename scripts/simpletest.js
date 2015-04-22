$(function () {
	'use strict';

	var channel = "staffpicks",
		width = "320";

	function getEmbedMarkup (URL) { 
		$.ajax({
			url: "https://vimeo.com/api/oembed.json?width=" + width + "&url=" + URL,
			statusCode: {
			    403: function (xhr) {
			        return;
			    }
			},
			success: function (data, status, xhr) {
				var thumbURL = data.thumbnail_url;
				console.log(thumbURL);
				$(".container").append("<img src=" + thumbURL + " >");
			},
			error: function (errorType) {
				console.log(errorType);
			}
		});
	}

	function loadVideosFormChannel (channel) {
		$.ajax({
			url: 'https://vimeo.com/api/v2/channel/' + channel + '/videos.json',
			success: function (data) {	
				$.each(data, function (i) {
					getEmbedMarkup(data[i].url);
				});
			},
			error: function (errorType) {
				console.log(errorType);
			}
		});
	}

	loadVideosFormChannel(channel);
});
