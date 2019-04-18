import { CONFIGS } from '../config';
import { Message } from './notify';
import { Dom } from './m3uInDom';

const _parsingValidFile = (arrLines, playlist) => {
	let line = false;

	for (let i = 0; i < arrLines.length; i++) {
		if (arrLines[i].includes(CONFIGS.codeComment)) { // check comment line
			line = arrLines[i];

		} else if (!!arrLines[i].trim().length) { // check path file
			const path = arrLines[i].trim();
			let time, alias;
			let [hour, min] = ['--', '--']; // default time string

			if (line) {
				try {
					[time, alias] = (line.split(':')[1]).split(',');
				} catch (e) {
					console.log('Неправильный формат комментария к плейлисту');
				}
			}

			if (parseInt(time)) {
				let rawTime = (time / 60).toFixed(2);
				//parse time a in comment line
				[hour, min] = [0 | rawTime, 0 | rawTime.split('.')[1] / 100 * 60];
				min = min < 10 ? `0${min}` : min;
			}

			if (!alias) {
				// if path is local
				try {
					let arrPartPath = String.raw`${path}`.split('\\');
					alias = arrPartPath[arrPartPath.length - 1].split('.')[0];
				} catch (e) {
					alias = CONFIGS.defaultAlias;
				}
			} else if (alias.includes('http')) { // if path is url
				alias = path;
			}
			// add item in playlist
			playlist.push({
				alias,
				time: `${hour} : ${min}`,
				path: arrLines[i].trim()
			})

			line = false;
		}
	}
}

let parse = function ({ target: { result }, total }) {
	let arrLines;
	let playlist = [];
	const rawFile = result.split(CONFIGS.delimiterFormat);

	this.loader(false);
	Dom.clear();

	if (rawFile.length > 1 && CONFIGS.allowFormat.some((el) => rawFile[0].includes(el))) {
		let validError = false;
		Message('Плейлист загружен');

		// decode files m3u|| m3u8
		try {
			arrLines = decodeURIComponent(escape(window.atob(rawFile[1]))).split(/\n/);
		} catch (e) {
			validError = true;
		}

		if (validError) {
			try {
				arrLines = decodeURI(window.atob(rawFile[1])).split(/\n/);
			} catch (e) {
				Message(`Ошибка кодировки плейлиста ${e}`, 1);
				return playlist;
			}
		}
		if ((arrLines.length && (arrLines.shift()).trim() === CONFIGS.codeHeadline)) {
			// main parse
			_parsingValidFile(arrLines, playlist);
		} else {
			Message('Неправильный формат плейлиста', 1);
		}

		this.fileReader.removeEventListener('loadend', parse);
		//added to dom
		Dom.render(playlist);

	} else {
		Message('файл не является плейлистом', 1);
	}

	return playlist;
}

export const Parser = {
	parse
}