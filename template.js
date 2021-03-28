function getQueryVariable(variable) {
	var query = decodeURI(window.location.search.substring(1));
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return '';
};
function isHidden(oDiv) {
	var vDiv = document.getElementById(oDiv);
	vDiv.style.display = (vDiv.style.display == 'block') ? 'none': 'block';
};
function pdf(pdfName) {
	var pdfUrl = "Pdf/" + pdfName + ".pdf";
	document.getElementById('pdf').src = pdfUrl;
	document.getElementById('pdf').style.display = (document.getElementById('pdf').style.display == 'block') ? 'none': 'block';
};
function launchIntoFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
};
var pageName = document.title;
document.title = pageName + "—在线状态";
function getHiddenProp() {
	var prefixes = ['webkit', 'moz', 'ms', 'o'];
	if ('hidden' in document) return 'hidden';
	for (var i = 0; i < prefixes.length; i++) {
		if ((prefixes[i] + 'Hidden') in document) return prefixes[i] + 'Hidden';
	}
	return null;
};
function getVisibilityState() {
	var prefixes = ['webkit', 'moz', 'ms', 'o'];
	if ('visibilityState' in document) return 'visibilityState';
	for (var i = 0; i < prefixes.length; i++) {
		if ((prefixes[i] + 'VisibilityState') in document) return prefixes[i] + 'VisibilityState';
	}
	return null;
};
var visProp = getHiddenProp();
var hidden = 0
if (visProp) {
	var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
	document.addEventListener(evtname,
	function() {
		if (document[getVisibilityState()] == 'visible') {
			document.title = pageName + "—在线状态";
			var cl = ["yellow", "red", "blue", "purple", "green", "pink"];
			var color = cl[Math.round(Math.random() * cl.length)];
			document.getElementById("content").style.background = color;
		} else {
			document.title = pageName + "—掉线状态";
			hidden = hidden + 1
			if (hidden % 3 == 0) {
				document.getElementById("tip").innerHTML = "请勿频繁切换";
				document.getElementById("tip").style.border = "inset";
			} else {
				document.getElementById("tip").innerHTML = "";
				document.getElementById("tip").style.border = "None";
			}
		}
	},
	false);
}