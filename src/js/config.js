const id = document.getElementById;

export const CONFIGS = {
	elInput: id('file'),
	elMessage: id('message'),
	elList: id('list_m3u'),
	loader: id('loader'),
	delimiterFormat: 'base64,',
	codeHeadline: '#EXTM3U',
	codeComment: '#EXTINF',
	allowFormat: ['audio/mpegurl', 'audio/x-mpegurl', 'application/x-mpegurl'],
	maxSizeFile: 1000000,
	defaultAlias: 'Unknown'
};