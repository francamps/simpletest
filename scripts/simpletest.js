$(function () {

	var channel = "staffpicks",
		width = "660",
		baseURL = 'https://vimeo.com/api/v2/channel/',
		request = '/videos.json',
		baseOEmbed = 'https://vimeo.com/api/oembed.json?url=';

	/**
	*
	* Load and display videos
	*
	*/

	function addVideoToList (videoObj) {
		if (videoObj.embed_privacy === "anywhere") {
			var id = videoObj.id,
				title = videoObj.title,
				thumbnail = '<img height=40 src=' + videoObj.thumbnail_small + '>';

			var dataCall = document.createElement('div');
				dataCall.setAttribute('class', 'video-list-object');
				dataCall.setAttribute('id', 'video-list-object-' + id);
				dataCall.innerHTML = '<span>' + title + '</span>';
			
			document.getElementById("video-list").appendChild(dataCall);
			$('#video-list-object-' + id).prepend(thumbnail);

			bindVideoDisplay(videoObj);
		}
	}

	function addVideos(videos) {
		for (var i = 0; i < videos.length; i++) {
			addVideoToList(videos[i]);
		}
		$('.video-list-object:first').trigger('click');
		bindScrollbar();
	}

	function loadVideosFromChannel (channel) {
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
		$.ajax({
			url: baseOEmbed + video.url + '&width=' + width + '&title=false',
			success: function (oEmbedObj, textResponse, code) {
				var allVideo = $.extend({}, oEmbedObj, video);
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
		$(".video-thumbnail").html(video.html);

		// Info
		$(".video-info .likes").html(video.stats_number_of_likes);
		$(".video-info .plays").html(video.stats_number_of_plays);
		$(".video-info .author").html("By: " + video.user_name);
		$(".video-description").html(video.description);
 
		bindShowMore();
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

	function bindShowMore () {
		$('.show-more').click(function () {
			if ($(this).hasClass('showing-more')) {
				$('.video-description')
					.css({'height': '100px'});
				$('.show-more')
					.html('Show more')
					.removeClass('showing-more');
			} else {
				$('.video-description')
					.css({'height': 'auto'});
				$('.show-more')
					.html('Show less')
					.addClass('showing-more');
			}
			
		});		
	}

	function bindScrollbar () {
		$('#video-list').perfectScrollbar({
			suppressScrollX: true
		});
	}	

	loadVideosFromChannel(channel);
}());