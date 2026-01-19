import { course } from "./course";
import { loadProgress } from "./storage";

export function courseStats() {
  if (typeof window === "undefined") {
    return { total: course.length, completed: 0, percent: 0 };
  }
  const p = loadProgress();
  const total = course.length;
  const completed = Object.values(p.completedLessons).filter(Boolean).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { total, completed, percent };
}
