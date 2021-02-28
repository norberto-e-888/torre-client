import { PersonalityDichotomy } from '../typings';

export const PERSONALITY_DICHOTOMY_TO_PREFERENCES_MAP: {
	[key in PersonalityDichotomy]: [[string, string], [string, string]];
} = {
	[PersonalityDichotomy.Energy]: [
		['e', 'Extraversion'],
		['i', 'Introversion'],
	],
	[PersonalityDichotomy.Information]: [
		['s', 'Sensing'],
		['n', 'Intuition'],
	],
	[PersonalityDichotomy.Decisions]: [
		['t', 'Thinking'],
		['f', 'Feeling'],
	],
	[PersonalityDichotomy.Lifestyle]: [
		['j', 'Judgement'],
		['p', 'Perception'],
	],
};
