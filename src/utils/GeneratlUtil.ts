export const calculateFiveStarRating = (rating: number, maxRating: number): number => {
    if (maxRating === 0) return 0; 
    const fiveStarRating = (rating / maxRating) * 5;
    return parseFloat(fiveStarRating.toFixed(1));
};

export function generateRandomFiveDigitNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}