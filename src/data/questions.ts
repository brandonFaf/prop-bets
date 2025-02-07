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
    text: 'Jon Batiste sings national anthem in:',
    answers: [
      { letter: 'A', value: 'Over 120.5 seconds' },
      { letter: 'B', value: 'Under 120.5 seconds' },
    ],
    final: '',
  },
  {
    id: 1,
    text: 'Will Jon Batiste perform national anthem with an instrument?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 2,
    text: 'Coin Toss',
    answers: [
      { letter: 'A', value: 'Heads' },
      { letter: 'B', value: 'Tails' },
    ],
  },
  {
    id: 3,
    text: "Tom Brady's tie color",
    answers: [
      { letter: 'A', value: 'Blue' },
      { letter: 'B', value: 'Gray' },
      { letter: 'C', value: 'Any other color' },
      { letter: 'D', value: 'No tie' },
    ],
  },
  {
    id: 4,
    text: 'Who will win the game',
    answers: [
      { letter: 'A', value: 'Chiefs' },
      { letter: 'B', value: 'Eagles' },
    ],
  },
  {
    id: 5,
    text: 'Will both teams convert a 4th down?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 6,
    text: 'What will be the jersey number of the first touchdown scorer?',
    answers: [
      { letter: 'A', value: 'Under 15.5' },
      { letter: 'B', value: 'Over 15.5' },
    ],
  },
  {
    id: 7,
    text: "Kendrick Lamar's opening Song of the halftime show:",
    answers: [
      { letter: 'A', value: 'TV Off' },
      { letter: 'B', value: 'Not Like Us' },
      { letter: 'C', value: 'All the Stars' },
      { letter: 'D', value: 'Humble' },
      { letter: 'E', value: 'Any other song' },
    ],
  },
  {
    id: 8,
    text:
      'How many celebrity guests will join Kendrick Lamar during the halftime show?',
    answers: [
      { letter: 'A', value: 'Under 3.5' },
      { letter: 'B', value: 'Over 3.5' },
    ],
  },
  {
    id: 9,
    text: 'Total Players With a Pass Attempt',
    answers: [
      { letter: 'A', value: 'Under 2.5' },
      { letter: 'B', value: 'Over 2.5' },
    ],
  },
  {
    id: 10,
    text: 'How many rushing yards will Saquon Barkley have?',
    answers: [
      { letter: 'A', value: 'Under 125' },
      { letter: 'B', value: 'Over 125' },
    ],
  },
  {
    id: 11,
    text: "How far will Mahomes' first touchdown pass be?",
    answers: [
      { letter: 'A', value: 'Under 9.5 yards' },
      { letter: 'B', value: 'Over 9.5 yards' },
    ],
  },
  {
    id: 12,
    text: 'Which team will have the longest made field goal?',
    answers: [
      { letter: 'A', value: 'Chiefs' },
      { letter: 'B', value: 'Eagles' },
    ],
  },
  {
    id: 13,
    text: 'Will any player score more than two touchdowns?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
  },
  {
    id: 14,
    text: 'Who will lead at the end of the third quarter?',
    answers: [
      { letter: 'A', value: 'Chiefs' },
      { letter: 'B', value: 'Eagles' },
      { letter: 'C', value: 'Tie' },
    ],
  },
  {
    id: 15,
    text: 'What will be the largest lead of the game?',
    answers: [
      { letter: 'A', value: 'Under 13.5' },
      { letter: 'B', value: 'Over 13.5' },
    ],
  },
  {
    id: 16,
    text:
      'What will the last score of the game be? (PAT and 2 pt conversion do not count)',
    answers: [
      { letter: 'A', value: 'Touchdown' },
      { letter: 'B', value: 'Field Goal' },
      { letter: 'C', value: 'Safety' },
    ],
  },
  {
    id: 17,
    text: 'Total combined points scored in the game:',
    answers: [
      { letter: 'A', value: 'Under 49.5' },
      { letter: 'B', value: 'Over 49.5' },
    ],
  },
  {
    id: 18,
    text: 'What color liquid will be dumped on the winning coach?',
    answers: [
      { letter: 'A', value: 'Orange' },
      { letter: 'B', value: 'Purple' },
      { letter: 'C', value: 'Yellow' },
      { letter: 'D', value: 'Clear' },
      { letter: 'E', value: 'Any other color' },
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
