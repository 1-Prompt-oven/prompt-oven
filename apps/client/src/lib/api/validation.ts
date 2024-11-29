// Type guard for API responses
export function isValidResponse<T>(data: unknown): data is { result: T } {
    return (
        typeof data === 'object' && 
        data !== null && 
        'result' in data &&
        typeof (data as { result: unknown }).result === 'object'
    )
} 