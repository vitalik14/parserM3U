import { CONFIGS } from '../config';
import { Message } from './notify';
import { Dom } from './m3uInDom';

const _parsingValidFile = (arrLines, playlist) => {
	let line = false;

	for (let i = 0; i < arrLines.length; i++) {
		if (arrLines[i].includes(CONFIGS.codeComment)) {
			line = arrLines[i];

		} else if (!!arrLines[i].trim().length) {
			const path = arrLines[i].trim();
			let time, alias;
			let [hour, min] = ['--', '--'];

			if (line) {
				try {
					[time, alias] = (line.split(':')[1]).split(',');
				} catch (e) {
					console.log('Неправильный формат комментария к плейлисту');
				}
			}

			if (parseInt(time)) {
				let rawTime = (time / 60).toFixed(2);

				[hour, min] = [0 | rawTime, 0 | rawTime.split('.')[1] / 100 * 60];
				min = min < 10 ? `0${min}` : min;
			}

			if (!alias) {
				try {
					let arrPartPath = String.raw`${path}`.split('\\');
					alias = arrPartPath[arrPartPath.length - 1].split('.')[0];
				} catch (e) {
					alias = 'Unknown';
				}
			} else if (alias.includes('http')) {
				alias = path;
			}

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
			_parsingValidFile(arrLines, playlist);
		} else {
			Message('Неправильный формат плейлиста', 1);
		}

		this.fileReader.removeEventListener('loadend', parse);
		Dom.render(playlist);

	} else {
		Message('файл не является плейлистом', 1);
	}

	return playlist;
}

export const Parser = {
	parse
}