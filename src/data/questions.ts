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
    text: 'How long will the National Anthem last?',
    answers: [
      { letter: 'A', value: 'Over 89.5 seconds' },
      { letter: 'B', value: 'Under 89.5 seconds' },
    ],
    final: 'A',
  },
  {
    id: 1,
    text: 'Coin toss will be',
    answers: [
      { letter: 'A', value: 'Heads' },
      { letter: 'B', value: 'Tails' },
    ],
    final: 'A',
  },
  {
    id: 2,
    text: 'Which team will score first?',
    answers: [
      { letter: 'A', value: '49ers' },
      { letter: 'B', value: 'Chiefs' },
    ],
    final: 'A',
  },
  {
    id: 3,
    text:
      'Will the jersey number of the player who scores the first touchdown be:',
    answers: [
      { letter: 'A', value: 'Over 23.5' },
      { letter: 'B', value: 'Under 23.5' },
    ],
    final: 'B',
  },
  {
    id: 4,
    text: 'Will a quarterback throw an interception?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
    final: 'A',
  },
  {
    id: 5,
    text:
      'Will Taylor Swift be wearing the number 87 on her outfit? (Its on her necklace)',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
    final: 'A',
  },
  {
    id: 6,
    text:
      'Which penalty will be the first called of the game? (Accepted or declined penalties count)',
    answers: [
      { letter: 'A', value: 'False Start' },
      { letter: 'B', value: 'Offensive Holding' },
      { letter: 'C', value: 'Defensive Offsides' },
      { letter: 'D', value: 'Defensive Pass Interference/Holding' },
      { letter: 'E', value: 'Other' },
      {
        letter: 'F',
        value:
          'Offensive offsides on Chiefs #19 Kadarius Toney on a play that would have gone for a touchdown',
      },
    ],
    final: 'A',
  },
  {
    id: 7,
    text: 'Will both teams have the lead during some point of the first half?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
    final: 'B',
  },
  {
    id: 8,
    text: 'Which soccer star will appear in a commercial first?',
    answers: [
      { letter: 'A', value: 'Lionel Messi (Michelob Ultra commercial)' },
      { letter: 'B', value: 'David Beckham (Uber Eats commercial)' },
    ],
    final: 'A',
  },
  {
    id: 9,
    text:
      "What will be the result of Rob Gronkowski's Kick of Destiny 2? (FanDuel commercial)",
    answers: [
      { letter: 'A', value: 'Make' },
      { letter: 'B', value: 'Miss' },
    ],
    final: 'B',
  },
  {
    id: 10,
    text:
      'Who is Addison Rae coaching in the Nerds commercial? (note: Answer was none of the options)',
    answers: [
      { letter: 'A', value: 'Athlete' },
      { letter: 'B', value: 'Actor/Actress' },
      { letter: 'C', value: 'Musician' },
    ],
    final: 'D',
  },
  {
    id: 11,
    text: "Usher's First Song",
    answers: [
      { letter: 'A', value: 'My Way' },
      { letter: 'B', value: 'Yeah!' },
      { letter: 'C', value: 'OMG' },
      { letter: 'D', value: 'DJ Got Us Falling in Love' },
      { letter: 'E', value: 'Any other' },
    ],
    final: 'E',
  },
  {
    id: 12,
    text: 'Usher wears sunglasses at any point during performance',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
    final: 'B',
  },
  {
    id: 13,
    text: 'Will Lil Jon be a guest appearance during the halftime show?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
    final: 'A',
  },
  {
    id: 14,
    text: 'Usher outfit changes (note: taking off a shirt is not a change)',
    answers: [
      { letter: 'A', value: 'Over 1.5' },
      { letter: 'B', value: 'Under 1.5' },
    ],
    final: 'B',
  },
  {
    id: 15,
    text: 'Which team will score more points in the third quarter?',
    answers: [
      { letter: 'A', value: '49ers' },
      { letter: 'B', value: 'Chiefs' },
    ],
    final: 'B',
  },
  {
    id: 16,
    text: 'Will there be a field goal scored in the fourth quarter?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
    final: 'A',
  },
  {
    id: 17,
    text: 'Which team will score last?',
    answers: [
      { letter: 'A', value: 'Chiefs' },
      { letter: 'B', value: '49ers' },
    ],
    final: '',
  },
  {
    id: 18,
    text: 'Will the game go into overtime?',
    answers: [
      { letter: 'A', value: 'Yes' },
      { letter: 'B', value: 'No' },
    ],
    final: '',
  },
  {
    id: 19,
    text: 'Who will win The Big Game?',
    answers: [
      { letter: 'A', value: '49ers' },
      { letter: 'B', value: 'Chiefs' },
    ],
    final: '',
  },
  {
    id: 20,
    text: 'Color of liquid poured on the winning coach',
    answers: [
      { letter: 'A', value: 'Purple' },
      { letter: 'B', value: 'Orange' },
      { letter: 'C', value: 'Yellow/Green/Lime' },
      { letter: 'D', value: 'Clear/None' },
    ],
    final: '',
  },
  {
    id: 21,
    text:
      'TIEBREAKER: Total points scored in the game (Closest without going over)',
    answers: [],
    final: '',
  },
];
export default questions;
