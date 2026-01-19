const KEY = "british_course_progress_v1";

export type Progress = {
  completedLessons: Record<string, boolean>;
  quizScores: Record<string, number>; // 0..10
};

export function loadProgress(): Progress {
  if (typeof window === "undefined") return { completedLessons: {}, quizScores: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completedLessons: {}, quizScores: {} };
    return JSON.parse(raw);
  } catch {
    return { completedLessons: {}, quizScores: {} };
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function markLessonCompleted(slug: string, completed: boolean) {
  const p = loadProgress();
  p.completedLessons[slug] = completed;
  saveProgress(p);
}

export function saveQuizScore(slug: string, score: number) {
  const p = loadProgress();
  p.quizScores[slug] = score;
  saveProgress(p);
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
