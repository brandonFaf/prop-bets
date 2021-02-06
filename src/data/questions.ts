export interface Answer {
  letter: string;
  value: string;
}
export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}
const questions: Question[] = [
  {
    id: 0,
    text: 'How long will the National Anthem Last?',
    answers: [
      { letter: 'a', value: 'under 1:59' },
      { letter: 'b', value: 'over 1:59' },
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
];
export default questions;
