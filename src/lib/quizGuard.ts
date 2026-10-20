/**
 * Lets the site nav ask before leaving a live Operator or skill run.
 * The run itself is already on disk; the confirm is only there so one tap
 * does not abandon it silently.
 */

export interface QuizGuardState {
  question: number;
  total: number;
}

let quizGuard: QuizGuardState | null = null;

export function setQuizGuard(state: QuizGuardState | null): void {
  quizGuard = state;
}

export function getQuizGuard(): QuizGuardState | null {
  return quizGuard;
}

type LeaveEvent = {
  defaultPrevented: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  button: number;
  preventDefault: () => void;
};

export function blockQuizLeave(event: LeaveEvent): void {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }
  const guard = quizGuard;
  if (!guard) return;
  const leave = window.confirm(
    `Leave this test? You're on question ${guard.question} of ${guard.total}. Answers so far stay on this device for 24 hours, and you can resume from the intro.`,
  );
  if (!leave) event.preventDefault();
}
