export interface Answer {
  letter: string;
  value: string;
}
export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  final?: string;
}
const questions: Question[] = [
  {
    id: 0,
    text: 'How long will the National Anthem Last?',
    answers: [
      { letter: 'a', value: 'under 1:40' },
      { letter: 'b', value: 'over 1:40' },
    ],
  },
  {
    id: 1,
    text: 'What will the coin toss land on?',
    answers: [
      { letter: 'a', value: 'heads' },
      { letter: 'b', value: 'tails' },
    ],
  },
  {
    id: 2,
    text: 'Which media company’s commercial will air first?',
    answers: [
      { letter: 'a', value: 'Meta' },
      { letter: 'b', value: 'Amazon Prime' },
      { letter: 'c', value: 'Google' },
    ],
  },
  {
    id: 3,
    text: 'Which Anheuser-Busch brand commercial will air first?',
    answers: [
      { letter: 'a', value: 'Budweiser' },
      { letter: 'b', value: 'Bud Light Next' },
      { letter: 'c', value: 'Michelob Ultra' },
      { letter: 'b', value: 'Bud Light Seltzer Hard Soda' },
    ],
  },
  {
    id: 4,
    text: 'Will the score ever be tied again after it is 0-0?',
    answers: [
      { letter: 'a', value: 'yes' },
      { letter: 'b', value: 'no' },
    ],
  },
  {
    id: 5,
    text:
      'Will the jersey number of the player who scores the first touchdown be __?',
    answers: [
      { letter: 'a', value: 'under 24.5' },
      { letter: 'b', value: 'over 24.5' },
    ],
  },
  {
    id: 6,
    text:
      'What will be performing the first song played during the halftime show?',
    answers: [
      { letter: 'a', value: 'Emninem' },
      { letter: 'b', value: 'Snoop Dogg' },
      { letter: 'c', value: 'Dr. Dre' },
      { letter: 'd', value: 'Mary J blige' },
      { letter: 'e', value: 'Kendrick Lamar' },
    ],
  },
  {
    id: 7,
    text:
      'What color will Snoop Dogg’s first shoes be during the halftime performance?',
    answers: [
      { letter: 'a', value: 'Black White Gray/Silver' },
      { letter: 'b', value: 'Blue Green Purple' },
      { letter: 'c', value: 'Yellow/Gold Orange Red' },
    ],
  },
  {
    id: 8,
    text: 'Will more points be scored in the _____?',
    answers: [
      { letter: 'a', value: 'First Half' },
      { letter: 'b', value: 'Second Half' },
    ],
  },
  {
    id: 9,
    text: 'Who will be the first team to score?',
    answers: [
      { letter: 'a', value: 'Bengals' },
      { letter: 'b', value: 'Rams' },
    ],
  },

  {
    id: 10,
    text: 'What color liquid will be poured on the winning coach?',
    answers: [
      { letter: 'a', value: 'Orange' },
      { letter: 'b', value: 'Red/Pink' },
      { letter: 'c', value: 'Yellow/Green' },
      { letter: 'd', value: 'Blue/Purple/Clear' },
    ],
  },
  {
    id: 11,
    text: 'Who will have the lead at the end of the 3rd Quarter?',
    answers: [
      { letter: 'a', value: 'Bengals' },
      { letter: 'b', value: 'Rams' },
    ],
  },
  {
    id: 12,
    text: 'How many Field Goals will be scored in the first half?',
    answers: [
      { letter: 'a', value: '0' },
      { letter: 'b', value: '1' },
      { letter: 'c', value: '2' },
      { letter: 'd', value: 'more than 2' },
    ],
  },

  {
    id: 13,
    text:
      'TIEBREAKER: Total points scored in the game (Closest without going over)',
    answers: [],
  },
];
export default questions;
