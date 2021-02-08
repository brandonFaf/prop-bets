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
      { letter: 'a', value: 'under 1:59' },
      { letter: 'b', value: 'over 1:59' },
    ],
final:"b"
  },
  {
    id: 1,
    text: 'What will the coin toss land on?',
    answers: [
      { letter: 'a', value: 'heads' },
      { letter: 'b', value: 'tails' },
    ],
final:"a"
  },
  {
    id: 2,
    text: 'Will an M&M Spokescandy be wearing a mask?',
    answers: [
      { letter: 'a', value: 'yes' },
      { letter: 'b', value: 'no' },
    ],
  },
  {
    id: 3,
    text: 'Which Anheuser-Busch brand commercial will air first?',
    answers: [
      { letter: 'a', value: 'Bud Light' },
      { letter: 'b', value: 'Bud Light Seltzer Lemonade' },
      { letter: 'c', value: 'Michelob Ultra' },
      { letter: 'd', value: 'Michelob Ultra Organic Seltzer' },
    ],
final:"a"
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
final:"b"
  },
  {
    id: 6,
    text: 'What will be the first song played during the halftime show?',
    answers: [
      { letter: 'a', value: 'Starboy' },
      { letter: 'b', value: 'Blinding Lights' },
      { letter: 'c', value: "Can't feel my face" },
      { letter: 'd', value: 'Anything else' },
    ],
final:"a"
  },
  {
    id: 7,
    text: 'Who will be a special guest performer in the halftime show?',
    answers: [
      { letter: 'a', value: 'Ariana Grande' },
      { letter: 'b', value: 'Drake' },
      { letter: 'c', value: 'Anyone Else' },
      { letter: 'd', value: 'No One Else' },
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
    text: 'Who will be the last team to score?',
    answers: [
      { letter: 'a', value: 'Buccaneers' },
      { letter: 'b', value: 'Chiefs' },
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
    text:
      'TIEBREAKER: Total points scored in the game (Closest without going over)',
    answers: [],
  },
];
export default questions;
