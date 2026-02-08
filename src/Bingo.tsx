import React, { useEffect, useMemo, useState } from 'react';
import firebase from 'firebase';
import { db } from './data/firebaseConfig';
import { bingoOptions } from './data/bingoOptions';

const LOCAL_STORAGE_KEY = 'name60';
const GAME_DOC_ID = 'current';
const CARD_COLLECTION = 'bingoCards60';
const GAME_COLLECTION = 'bingoGame60';
const GRID_SIZE = 5;
const FREE_INDEX = 12;

type BingoCardDoc = {
  name: string;
  card: string[];
  createdAt?: firebase.firestore.Timestamp;
  bingoTurn?: number;
  bingoAt?: firebase.firestore.Timestamp;
};

type BingoGameDoc = {
  turn: number;
  occurred: string[];
  eventLog?: {
    option: string;
    turn: number;
    at: string;
    by: string;
  }[];
};

const createCard = () => {
  const options = [...bingoOptions];
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const card: string[] = new Array(GRID_SIZE * GRID_SIZE).fill('');
  let optionIndex = 0;
  for (let i = 0; i < card.length; i += 1) {
    if (i === FREE_INDEX) {
      card[i] = 'FREE';
      continue;
    }
    card[i] = options[optionIndex];
    optionIndex += 1;
  }
  return card;
};

const getWinningLines = () => {
  const lines: number[][] = [];
  for (let r = 0; r < GRID_SIZE; r += 1) {
    const row: number[] = [];
    for (let c = 0; c < GRID_SIZE; c += 1) {
      row.push(r * GRID_SIZE + c);
    }
    lines.push(row);
  }
  for (let c = 0; c < GRID_SIZE; c += 1) {
    const col: number[] = [];
    for (let r = 0; r < GRID_SIZE; r += 1) {
      col.push(r * GRID_SIZE + c);
    }
    lines.push(col);
  }
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);
  return lines;
};

const Bingo = () => {
  const [name, setName] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? '',
  );
  const [cardDoc, setCardDoc] = useState<BingoCardDoc | null>(null);
  const [game, setGame] = useState<BingoGameDoc>({
    turn: 0,
    occurred: [],
  });
  const [allCards, setAllCards] = useState<BingoCardDoc[]>([]);

  useEffect(() => {
    const gameRef = db.collection(GAME_COLLECTION).doc(GAME_DOC_ID);
    const unsubscribe = gameRef.onSnapshot((snap) => {
      if (!snap.exists) {
        gameRef.set({ turn: 0, occurred: [], eventLog: [] });
        return;
      }
      setGame(snap.data() as BingoGameDoc);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!name) return undefined;
    const cardRef = db.collection(CARD_COLLECTION).doc(name.toLowerCase());
    const unsubscribe = cardRef.onSnapshot(async (snap) => {
      if (!snap.exists) {
        const newCard = createCard();
        const payload: BingoCardDoc = {
          name,
          card: newCard,
          createdAt: firebase.firestore.Timestamp.now(),
        };
        await cardRef.set(payload);
        setCardDoc(payload);
        return;
      }
      setCardDoc(snap.data() as BingoCardDoc);
    });
    return () => unsubscribe();
  }, [name]);

  useEffect(() => {
    const unsubscribe = db
      .collection(CARD_COLLECTION)
      .onSnapshot((snapshot) => {
        const cards: BingoCardDoc[] = [];
        snapshot.forEach((doc) => {
          cards.push(doc.data() as BingoCardDoc);
        });
        setAllCards(cards);
      });
    return () => unsubscribe();
  }, []);

  const occurredSet = useMemo(() => new Set(game.occurred), [game.occurred]);

  const winningLines = useMemo(() => getWinningLines(), []);

  const marked = useMemo(() => {
    if (!cardDoc?.card) return [];
    return cardDoc.card.map((value, index) => {
      if (index === FREE_INDEX) return true;
      return occurredSet.has(value);
    });
  }, [cardDoc, occurredSet]);

  const winningIndices = useMemo(() => {
    const winners = new Set<number>();
    if (!marked.length) return winners;
    winningLines.forEach((line) => {
      if (line.every((index) => marked[index])) {
        line.forEach((index) => winners.add(index));
      }
    });
    return winners;
  }, [marked, winningLines]);

  const hasBingo = winningIndices.size > 0;

  useEffect(() => {
    if (!cardDoc || !hasBingo) return;
    if (cardDoc.bingoTurn) return;
    const cardRef = db
      .collection(CARD_COLLECTION)
      .doc(cardDoc.name.toLowerCase());
    cardRef.update({
      bingoTurn: game.turn,
      bingoAt: firebase.firestore.Timestamp.now(),
    });
  }, [cardDoc, hasBingo, game.turn]);

  const leaderboardRows = useMemo(() => {
    const occurred = new Set(game.occurred);
    return allCards
      .map((card) => {
        const markedCount = card.card.reduce((acc, value, index) => {
          if (index === FREE_INDEX) return acc + 1;
          return occurred.has(value) ? acc + 1 : acc;
        }, 0);
        return {
          name: card.name,
          markedCount,
          bingoTurn: card.bingoTurn,
        };
      })
      .sort((a, b) => {
        if (a.bingoTurn && b.bingoTurn) {
          return a.bingoTurn - b.bingoTurn;
        }
        if (a.bingoTurn) return -1;
        if (b.bingoTurn) return 1;
        return b.markedCount - a.markedCount;
      });
  }, [allCards, game.occurred]);

  return (
    <div className="bingo-page">
      <header className="bingo-header">
        <div>
          <p className="bingo-eyebrow">Super Bowl Bingo</p>
          <h1>
            Prop Bets Bingo <span className="bingo-beta">Beta</span>
          </h1>
          <p className="bingo-note">
            This is new and may not work perfectly yet.
          </p>
        </div>
        <div className="bingo-actions">
          <a href="/" className="bingo-link">
            Prop Bets
          </a>
        </div>
      </header>

      {!name ? (
        <section className="bingo-card-section">
          <h2>Complete the prop bets first</h2>
          <p>
            You need to fill out the questions and set your name before you can
            access a bingo card.
          </p>
          <a href="/" className="bingo-link">
            Go to Prop Bets
          </a>
        </section>
      ) : (
        <section className="bingo-card-section">
          <div className="bingo-card-header">
            <div>
              <h2>Your card</h2>
              <p className="bingo-subtitle">
                Turn {game.turn} · {game.occurred.length} events called
              </p>
            </div>
            <div className="bingo-status">
              <span className={hasBingo ? 'status-win' : 'status-wait'}>
                {cardDoc?.bingoTurn
                  ? `Bingo on turn ${cardDoc.bingoTurn}`
                  : hasBingo
                  ? 'Bingo!'
                  : 'No bingo yet'}
              </span>
            </div>
          </div>

          <div className="bingo-grid">
            {cardDoc?.card?.map((value, index) => {
              const isFree = index === FREE_INDEX;
              const isMarked = marked[index];
              const isWinning = winningIndices.has(index);
              return (
                <div
                  key={`${value}-${index}`}
                  className={`bingo-cell ${isMarked ? 'marked' : ''} ${
                    isWinning ? 'winning' : ''
                  } ${isFree ? 'free' : ''}`}
                >
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="bingo-winners">
        <h2>Bingo leaderboard</h2>
        {leaderboardRows.length === 0 ? (
          <p>No bingo cards yet.</p>
        ) : (
          <table className="bingo-leaderboard">
            <thead>
              <tr>
                <th>Name</th>
                <th>Marked</th>
                <th>First Bingo</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>
                    {row.markedCount}/{GRID_SIZE * GRID_SIZE}
                  </td>
                  <td>{row.bingoTurn ? `Turn ${row.bingoTurn}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Bingo;
