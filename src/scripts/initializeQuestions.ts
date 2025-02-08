import { db } from '../data/firebaseConfig';
import questions from '../data/questions';

export const initializeQuestions = async () => {
  try {
    await db.collection('questions').doc('current').set({
      questions,
      lastUpdated: new Date(),
    });
    console.log('Questions initialized successfully');
  } catch (error) {
    console.error('Error initializing questions:', error);
  }
};
