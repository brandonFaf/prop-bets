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
    final: 'b',
  },
  {
    id: 1,
    text: 'What will the coin toss land on?',
    answers: [
      { letter: 'a', value: 'heads' },
      { letter: 'b', value: 'tails' },
    ],
    final: 'b',
  },
  {
    id: 2,
    text: 'Which beer company will be mentioned in a commerical first?',
    answers: [
      { letter: 'a', value: 'Bud Lite' },
      { letter: 'b', value: 'Coors Lite' },
      { letter: 'c', value: 'Miller Lite' },
    ],
  },
  {
    id: 3,
    text: 'Who will win the Super Bowl?',
    answers: [
      { letter: 'a', value: 'Chiefs' },
      { letter: 'b', value: 'Eagles' },
    ],
  },
  {
    id: 4,
    text: 'Will both teams have the lead at some point during the fist half?',
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
      { letter: 'a', value: 'under 11.5' },
      { letter: 'b', value: 'over 11.5' },
    ],
    final:'a'
  },
  {
    id: 6,
    text:
      "What will be the color of Rihanna's first outfit in the halftime show?",
    answers: [
      { letter: 'a', value: 'Black' },
      { letter: 'b', value: 'Gold' },
      { letter: 'c', value: 'Silver/Grey' },
      { letter: 'd', value: 'White' },
      { letter: 'e', value: 'Green' },
      { letter: 'f', value: 'Red' },
      { letter: 'g', value: 'Other' },
    ],
  },
  {
    id: 7,
    text: 'Will a football be used as a prop during the halftime show?',
    answers: [
      { letter: 'a', value: 'Yes' },
      { letter: 'b', value: 'No' },
    ],
  },
  {
    id: 8,
    text: "What will be Rihanna's lasat song at the halftime show?",
    answers: [
      { letter: 'a', value: 'Diamonds' },
      { letter: 'b', value: 'Run this Town' },
      { letter: 'c', value: 'Umbrella' },
      { letter: 'd', value: "Don't stop the music" },
      { letter: 'e', value: 'We found love' },
      { letter: 'f', value: 'Other' },
    ],
  },
  {
    id: 9,
    text: 'Who will be the first team to score?',
    answers: [
      { letter: 'a', value: 'Chiefs' },
      { letter: 'b', value: 'Eagles' },
    ],
    final:'b'
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
    text: 'Will Maya Rudolph appear in an M&Ms commercial?',
    answers: [
      { letter: 'a', value: 'Yes' },
      { letter: 'b', value: 'No' },
    ],
  },
  {
    id: 12,
    text: 'How many Field Goals will be scored in the second half?',
    answers: [
      { letter: 'a', value: '0' },
      { letter: 'b', value: '1' },
      { letter: 'c', value: '2' },
      { letter: 'd', value: 'more than 2' },
    ],
  },
  {
    id: 13,
    text: 'Which company will be seen first in a commercial?',
    answers: [
      { letter: 'a', value: 'Doritos' },
      { letter: 'b', value: 'Pringles' },
    ],
  },
  {
    id: 14,
    text: 'Will the game go into overtime?',
    answers: [
      { letter: 'a', value: 'Yes' },
      { letter: 'b', value: 'No' },
    ],
  },
  {
    id: 15,
    text: 'Will the last score of the game be...?',
    answers: [
      { letter: 'a', value: 'Rushing' },
      { letter: 'b', value: 'Passing' },
      { letter: 'c', value: 'Other' },
    ],
  },

  {
    id: 16,
    text:
      'TIEBREAKER: Total points scored in the game (Closest without going over)',
    answers: [],
  },
];
export default questions;
