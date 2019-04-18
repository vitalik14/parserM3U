export const CONFIGS = {
	elInput: document.getElementById('file'),
	elMessage: document.getElementById('message'),
	elList: document.getElementById('list_m3u'),
	loader: document.getElementById('loader'),
	delimiterFormat: 'base64,',
	codeHeadline: '#EXTM3U',
	codeComment: '#EXTINF',
	allowFormat: ['audio/mpegurl', 'audio/x-mpegurl', 'application/x-mpegurl'],
	maxSizeFile: 1000000,
	defaultAlias: 'Unknown'
};