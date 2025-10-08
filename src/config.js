// Eğer create-react-app kullanıyorsan .env içine REACT_APP_BACKEND_URL yazabilirsin.
// process.env.REACT_APP_BACKEND_URL öncelikli olacak, yoksa default kullanılacak.
export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://acil-servis-quiz-version2.onrender.com";