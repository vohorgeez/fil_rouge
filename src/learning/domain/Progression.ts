import type { LearnerId, LessonId } from './ids.js';

// 2e aggregate
export class Progression {
    private readonly succeededLessons: LessonId[] = [];

    constructor(readonly learnerId: LearnerId) {}

    public recordSuccess(lessonId: LessonId): boolean {
        if (this.succeededLessons.some(l => l.equals(lessonId))) return false;
        this.succeededLessons.push(lessonId);
        return true;
    }

    public get level(): number {
        return this.succeededLessons.length;
    }
}