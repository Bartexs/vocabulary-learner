export interface FlashcardProficiency {
    id: number,
    EF: number;                   // Easiness Factor
    interval: number;             // interwał w dniach
    repetitions: number;          // liczba kolejnych udanych powtórek
    lastReview?: string;          // data ostatniej powtórki
    nextReview?: string;          // następna data powtórki
    responseTime?: number;        // czas odpowiedzi użytkownika w sekundach
}

export function updateFSRS(
    card: FlashcardProficiency,
    quality: number,        // 0-5, jak dobrze użytkownik odpowiedział
    responseTime?: number    // opcjonalnie w sekundach
): FlashcardProficiency {
    const today = new Date();

        // Upewniamy się, że interval i EF są poprawne liczby
    if (!card.interval || isNaN(card.interval) || card.interval < 1) {
        card.interval = 1;
    }
    if (!card.EF || isNaN(card.EF)) {
        card.EF = 2.5; // standardowa wartość startowa w algorytmie SM-2 / FSRS
    }

    // Jeśli odpowiedź słaba
    if (quality < 3) {
        card.repetitions = 0;
        card.interval = 1;
    } else {
        card.repetitions += 1;

        // Mnożnik interwału wg EF i responseTime
        let intervalMultiplier = card.EF;
        if (responseTime !== undefined) {
            if (responseTime < 5) intervalMultiplier *= 1.1;   // szybka odpowiedź → dłuższy interval
            else if (responseTime > 15) intervalMultiplier *= 0.9; // wolna odpowiedź → krótszy interval
        }

        card.interval = Math.round(card.interval * intervalMultiplier);
    }

    // Aktualizacja EF
    card.EF = Math.max(1.3, card.EF + 0.1 - (5 - quality) * 0.08);

    // Aktualizacja dat
    card.lastReview = today.toISOString().split('T')[0];
    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(today.getDate() + card.interval);
    card.nextReview = nextReviewDate.toISOString().split('T')[0];

    return card;
}

// quality 0–5 ocenia poprawność odpowiedzi.

// Szybka odpowiedź → interwał wydłużony.

// Wolna odpowiedź → interwał skrócony.

// EF aktualizuje się zgodnie z klasycznym wzorem SM-2 / FSRS.

// lastReview i nextReview automatycznie ustawiane.