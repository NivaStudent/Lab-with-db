let score = Number(localStorage.getItem("score")) || 0;

export function addPoints(p) {
  score += p;
  localStorage.setItem("score", score);
}

export function getScore() {
  return score;
}