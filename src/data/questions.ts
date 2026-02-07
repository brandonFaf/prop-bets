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
    text: 'Charlie Puth sings national anthem in:',
    answers: [
      { letter: 'A', value: 'Under 120.5 seconds' },
      { letter: 'B', value: 'Over 120.5 seconds' },
    ],
    final: '',
  },
  {
    id: 1,
    text: 'Coin Toss:',
    answers: [
      { letter: 'A', value: 'Heads' },
      { letter: 'B', value: 'Tails' },
    ],
  },
  {
    id: 2,
    text: 'Total points scored in the first half:',
    answers: [
      { letter: 'A', value: 'Over 22.5' },
      { letter: 'B', value: 'Under 22.5' },
    ],
  },
  {
    id: 3,
    text: 'Will the first score of the game be:',
    answers: [
      { letter: 'A', value: 'Touchdown' },
      { letter: 'B', value: 'Field Goal' },
      { letter: 'C', value: 'Other' },
    ],
  },
  {
    id: 4,
    text: 'Longest punt return will be:',
    answers: [
      { letter: 'A', value: 'Over 18.5 yards' },
      { letter: 'B', value: 'Under 18.5 yards' },
    ],
  },
  {
    id: 5,
    text: 'Will either starting QB score a rushing touchdown?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 6,
    text: 'Color of Gatorade poured on winning coach:',
    answers: [
      { letter: 'A', value: 'Orange' },
      { letter: 'B', value: 'Blue' },
      { letter: 'C', value: 'Yellow/Lime Green' },
      { letter: 'D', value: 'Clear/Water' },
      { letter: 'E', value: 'Other' },
    ],
  },
  {
    id: 7,
    text: 'Will there be a two-point conversion?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 8,
    text: 'Sam Darnold passing yards in the first quarter:',
    answers: [
      { letter: 'A', value: 'Over 51.5' },
      { letter: 'B', value: 'Under 51.5' },
    ],
  },
  {
    id: 9,
    text:
      'Will there be a missed field goal attempt during the second quarter:',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 10,
    text: 'Halftime show guest performer will be:',
    answers: [
      { letter: 'A', value: 'Lady Gaga' },
      { letter: 'B', value: 'Cardi B' },
      { letter: 'C', value: 'Ricky Martin' },
      { letter: 'D', value: 'None of these' },
    ],
  },
  {
    id: 11,
    text: 'Who will lead at the end of the third quarter:',
    answers: [
      { letter: 'A', value: 'Patriots' },
      { letter: 'B', value: 'Seahawks' },
    ],
  },
  {
    id: 12,
    text: 'Who will win the game?',
    answers: [
      { letter: 'A', value: 'Patriots' },
      { letter: 'B', value: 'Seahawks' },
    ],
  },
  {
    id: 13,
    text:
      'What will be the first commercial played after the game has started?',
    answers: [
      { letter: 'A', value: 'Movie/TV show trailer' },
      { letter: 'B', value: 'Beer/Alcohol Company' },
      { letter: 'C', value: 'Food/Restaurant Company' },
      { letter: 'D', value: 'Technology Company' },
      { letter: 'E', value: 'Other' },
    ],
  },
  {
    id: 14,
    text: 'Jersey number of the second touchdown scorer:',
    answers: [
      { letter: 'A', value: 'Over 10.5' },
      { letter: 'B', value: 'Under 10.5' },
    ],
  },
  {
    id: 15,
    text: 'Will any non-QB throw a pass?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 16,
    text: 'Will there be a lead change at any point in the 4th quarter?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 17,
    text: 'Number of sacks in the second quarter:',
    answers: [
      { letter: 'A', value: 'Over 1.5' },
      { letter: 'B', value: 'Under 1.5' },
    ],
  },
  {
    id: 18,
    text: 'Which brand will have their commercial air first',
    answers: [
      { letter: 'A', value: 'Uber Eats' },
      { letter: 'B', value: 'Dove' },
    ],
  },
  {
    id: 19,
    text:
      'TIEBREAKER: Total points scored by the winning team (closest without going over)',
    answers: [],
  },
];

export default questions;
