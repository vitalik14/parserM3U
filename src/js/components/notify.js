
import { CONFIGS } from '../config';

export const Message = (text, error) => {
	CONFIGS.elMessage.style.color = error ? 'red' : 'green';
	CONFIGS.elMessage.innerHTML = text || '';
}