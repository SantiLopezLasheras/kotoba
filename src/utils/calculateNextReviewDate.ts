export function calculateNextReviewDate(frequency: number): Date {
  const now = new Date();
  const interval = frequency === 0 ? 1 : frequency * 2;
  now.setDate(now.getDate() + interval);
  return now;
}
