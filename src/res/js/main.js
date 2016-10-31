function addClass ( sDivId, sClassName ) {
	var aClassNames = getClassNames( sDivId );

	if ( aClassNames.indexOf( sClassName ) == -1 ) {
		aClassNames.push( sClassName );
	}

	document.getElementById( sDivId ).setAttribute( 'class', aClassNames.join(' ') );
}

function addVideoPlayer () {
	var bod = null,
	    mq = null,
	    src1 = null,
	    src2 = null,
	    vide = null;

	if ( window.matchMedia ) {
		mq = window.matchMedia('(min-width: 600px)');

		if ( mq.matches ) {
			vid = document.createElement('video');
			vid.setAttribute('playsinline', true);
			vid.setAttribute('loop', true);
			vid.setAttribute('autoplay', true);
			vid.setAttribute('muted', true);
			vid.setAttribute('poster', 'assets/img/background.jpg');
			vid.setAttribute('id', 'bgvid');

			src1 = document.createElement('source');
			src1.setAttribute('src', 'assets/video/background.webm');
			src1.setAttribute('type', 'video/webm');

			src2 = document.createElement('source');
			src2.setAttribute('src', 'assets/video/background.mp4');
			src2.setAttribute('type', 'video/mp4');

			vid.appendChild( src1 );
			vid.appendChild( src2 );

			bod = document.getElementsByTagName('body')[0];
			bod.insertBefore( vid, bod.firstChild );
		}
	}
}

function getClassNames ( sDivId ) {
	var el = document.getElementById( sDivId ),
	    sClassNames = null;

	if ( el ) {
		sClassNames = el.getAttribute('class');

		if ( sClassNames ) {
			return sClassNames.split(' ');
		}
	}

	return [];
}

function removeClass ( sDivId, sClassName ) {
	var aClassNames = getClassNames( sDivId ),
	    aTemp = [],
	    idx = aClassNames.indexOf( sClassName );


	for ( i = 0; i < aClassNames.length; i++ ) {
		if ( idx != i ) {
			aTemp.push( aClassNames[i] );
		}
	}

	document.getElementById( sDivId ).setAttribute( 'class', aTemp.join(' ') );
}

function sendEmail () {
	if ( document.getElementById('email').checkValidity() ) {
		swapVis( 'signupPost', 'signup' );

		$.ajax({
			url: 'email.php?email=' + encodeURI( document.getElementById('email').value ),
			method: 'GET'
		});
	}
}

function swapVis ( sShowId, sHideId ) {
	removeClass( sShowId, 'is-hidden' );
	addClass( sHideId, 'is-hidden' );
}

document.addEventListener('DOMContentLoaded', addVideoPlayer, false);