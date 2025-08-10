export function parsePrice(priceString: string | undefined | null): number {
    if (!priceString) {
        return 0;
    }
    const match = priceString.match(/[\d,.]+/);
    if (!match) {
        return 0;
    }
    return parseFloat(match[0].replace(/,/g, ''));
}

