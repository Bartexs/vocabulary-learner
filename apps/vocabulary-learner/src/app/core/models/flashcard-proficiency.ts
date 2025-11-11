export interface FlashcardProficiency {
    id: number,
    EF: number;                   // Easiness Factor
    interval: number;             // interwał w dniach
    repetitions: number;          // liczba kolejnych udanych powtórek
    lastReview?: string;          // data ostatniej powtórki
    nextReview?: string;          // następna data powtórki
    responseTime?: number;        // czas odpowiedzi użytkownika w sekundach
    knowledgeStars: number;      // 1–5 gwiazdek, całkowita znajomość słówka
}

// quality 0–5 ocenia poprawność odpowiedzi.

// Szybka odpowiedź → interwał wydłużony.

// Wolna odpowiedź → interwał skrócony.

// EF aktualizuje się zgodnie z klasycznym wzorem SM-2 / FSRS.

// lastReview i nextReview automatycznie ustawiane.