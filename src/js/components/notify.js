
import { CONFIGS } from '../config';

export const Message = function (text, error) {
	CONFIGS.elMessage.style.color = error ? 'red' : 'green';
	CONFIGS.elMessage.innerHTML = text || '';
}