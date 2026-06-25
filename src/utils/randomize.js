// Deterministic seeded shuffle so same student always gets same questions
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function hashStr(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

function seededShuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestionsForStudent(name, mcqPool, codingPool) {
  const seed = hashStr(name.trim().toLowerCase());
  const rand = seededRandom(seed);
  const shuffledMCQ = seededShuffle(mcqPool, rand);
  const shuffledCoding = seededShuffle(codingPool, rand);
  return {
    mcq: shuffledMCQ.slice(0, 10),
    coding: shuffledCoding.slice(0, 2),
  };
}
