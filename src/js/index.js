import { CONFIGS } from './config';
import { Message } from './components/notify';
import { Parser } from './components/parser';

import '../css/style.styl';

let loader = (status) => {
	if (status) {
		CONFIGS.loader.style.display = 'block';
	} else {
		CONFIGS.loader.style.display = 'none';
	}
}

CONFIGS.elInput.addEventListener('change', function file({ target }) {
	const files = (target || window.event.srcElement).files;

	if (FileReader && files && files.length) {
		const fileReader = new FileReader();
		loader(true);

		fileReader.addEventListener('loadend', Parser.parse.bind({ fileReader, loader }));
		fileReader.addEventListener('load', function ({ total }) {
			if (total > 1000000) {
				loader(false);
				Message('Плейлист слишком большой', 1);
				this.abort();
			}
		});

		fileReader.addEventListener('error', e => {
			Message(`Ошибка чтения плейлиста ${e}`, 1);
			loader(false);
		});

		fileReader.readAsDataURL(files[0]);
	} else {
		Message('');
	}
});