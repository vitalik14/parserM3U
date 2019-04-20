import { CONFIGS } from './config';
import { Message } from './components/notify';
import { Parser } from './components/parser';

import '../css/style.styl';

const loader = (status) => {
	if (status) {
		CONFIGS.loader.style.display = 'block';
	} else {
		CONFIGS.loader.style.display = 'none';
	}
}

CONFIGS.elInput.addEventListener('change', function file({ target }) {
	const files = (target || window.event.srcElement).files;

	if (FileReader && files && files.length) { //check is there a file

		if (files[0].size > CONFIGS.maxSizeFile) {// if big file skip
			Message(`Плейлист слишком большой (max: ${0 | (CONFIGS.maxSizeFile / 1024)} кб)`, 1);
			return false;
		}

		const fileReader = new FileReader();
		loader(true);

		fileReader.addEventListener('loadend', Parser.parse.bind({ fileReader, loader }));

		fileReader.addEventListener('error', e => {
			Message(`Ошибка чтения плейлиста ${e}`, 1);
			loader(false);
		});

		fileReader.addEventListener('abort', e => {
			Message(`Ошибка при загрузке ${e}`, 1);
			loader(false);
		});

		fileReader.readAsDataURL(files[0]);
	} else {
		Message('');
	}
});