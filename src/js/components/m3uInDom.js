import { CONFIGS } from '../config';

const clear = () => {
	list_m3u.innerHTML = '';
};

const render = (list = []) => {
	clear();

	list.forEach((el, i) => {
		let node = document.createElement('li');

		node.innerHTML = `
			<div class="index">${i + 1}</div>
			<div class="alias">${el.alias}</div>
			<div class="time">${el.time}</div>
			<div class="path">path: ${el.path}</div>`

		CONFIGS.elList.appendChild(node);
	});
};

export let Dom = {
	clear,
	render
}
