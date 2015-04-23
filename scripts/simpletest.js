$(function () {

	var channel = "staffpicks",
		width = "660",
		baseURL = 'https://vimeo.com/api/v2/channel/',
		request = '/videos.json',		
		baseOEmbed = 'https://vimeo.com/api/oembed.json?url=',
		videoData;

	function addVideoToList (videoObj) {
		if (videoObj.embed_privacy === "anywhere") {
			var id = videoObj.id,
				title = videoObj.title;

			var dataCall = document.createElement('div');
				dataCall.setAttribute('class', 'video-list-object');
				dataCall.setAttribute('id', 'video-list-object-' + id);
				dataCall.innerHTML = title;
			
			document.getElementById("video-list").appendChild(dataCall);

			bindVideoDisplay(videoObj);
		}
	}

	function addVideos(videos) {
		for (var i = 0; i < videos.length; i++) {
			addVideoToList(videos[i]);
		}
		$('.video-list-object:first').trigger('click');
	}

	function loadVideosFormChannel (channel) {
		$.ajax({
			url: baseURL + channel + request,
			success: function (dataCall, textResponse, code) {
				addVideos(dataCall);
			},
			error: function (errorResponse) {
				console.log(errorResponse);
			}
		});
	}

	function loadOEmbed (video) {
		console.log(video);
		$.ajax({
			url: baseOEmbed + video.url + '&width=' + width,
			success: function (oEmbedObj, textResponse, code) {
				var allVideo = $.extend({}, video, oEmbedObj);
				fillVideoDisplay(allVideo);
			},
			error: function (errorResponse) {
				console.log(errorResponse);
			}
		});
	}

	function fillVideoDisplay (video) {
		// Add content
		$(".video-title").html(video.title);
		//$(".video-thumbnail").html('<img width=660px src=' + video.thumbnail_large + '>');
		$(".video-thumbnail").html(video.html);
		$(".video-info .likes").html(video.stats_number_of_likes);
		$(".video-info .plays").html(video.stats_number_of_plays);
		$(".video-info .author").html("By: " + video.user_name);
		$(".video-description").html(video.description);
	}

	function bindVideoDisplay (video) {
		document.getElementById('video-list-object-' + video.id)
			.addEventListener('click', function () {

				// Keep video list highlighted
				$('.video-list-object').removeClass('active');
				$(this).addClass('active');

				loadOEmbed(video);
			});
	}

	$('#video-list').perfectScrollbar();
	loadVideosFormChannel(channel);

}());