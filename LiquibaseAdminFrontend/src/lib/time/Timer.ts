export class Timer {
    private readonly duration: number

    private startTime: number

    constructor(seconds: number) {
        this.startTime = Date.now()
        this.duration = seconds * 1000
    }

    public static wait(ms: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

    reset() {
        this.startTime = Date.now()
    }

    hasExpired(): boolean {
        const currentTime = Date.now()
        const elapsedTime = currentTime - this.startTime
        return elapsedTime >= this.duration
    }
}
