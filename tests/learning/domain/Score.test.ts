import { Score } from '../../../src/learning/domain/Score.js';
import { InvalidScoreError } from '../../../src/learning/domain/errors.js';
import { describe, expect, it } from 'vitest';

describe('Score', () => {
    it('should create a valid score', () => {
        const score = Score.create(84);
        expect(score).toBeInstanceOf(Score);
        expect(score.isSuccessful()).toBe(true);
    });
    it('should throw an error for invalid score', () => {
        expect(() => Score.create(101)).toThrow(InvalidScoreError);
        expect(() => Score.create(-1)).toThrow(InvalidScoreError);
        expect(() => Score.create(50.5)).toThrow(InvalidScoreError);
        expect(() => Score.create(NaN)).toThrow(InvalidScoreError);
    });
    it('should correctly compare two scores for equality', () => {
        const score1 = Score.create(90);
        const score2 = Score.create(90);
        const score3 = Score.create(80);
        expect(score1.equals(score2)).toBe(true);
        expect(score1.equals(score3)).toBe(false);
    });
    it('should correctly determine if a score is successful', () => {
        const successfulScore = Score.create(80);
        const unsuccessfulScore = Score.create(70);
        expect(successfulScore.isSuccessful()).toBe(true);
        expect(unsuccessfulScore.isSuccessful()).toBe(false);
    });
    it('should handle edge cases for score creation', () => {
        const closeScore = Score.create(74);
        const justScore = Score.create(75);
        const highScore = Score.create(100);
        const lowScore = Score.create(0);
        expect(closeScore.isSuccessful()).toBe(false);
        expect(justScore.isSuccessful()).toBe(true);
        expect(highScore.isSuccessful()).toBe(true);
        expect(lowScore.isSuccessful()).toBe(false);
    });
});

describe('Score.fromAnswers', () => {
    it('3 over 4 is 75, so succeeded', () => {
        expect(Score.fromAnswers(3, 4).toNumber()).toBe(75);
        expect(Score.fromAnswers(3, 4).isSuccessful()).toBe(true);
    });
    it('rounds to the floor: 2 over 3 is 66', () => {
        expect(Score.fromAnswers(2, 3).toNumber()).toBe(66);
    });
    it('refuses a zero total or an impossible result', () => {
        expect(() => Score.fromAnswers(0, 0)).toThrow(InvalidScoreError);
        expect(() => Score.fromAnswers(5, 4)).toThrow(InvalidScoreError);
    });
});