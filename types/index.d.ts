type Trade = {
    asset: string;
    amount: number;
    direction: 'CALL' | 'PUT';
    expiry: number;
    status?: string;
    entryPrice?: number;
    exitPrice?: number;
    profitOrLoss?: number;
}
type ChartData = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}