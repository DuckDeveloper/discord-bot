class EventObserver {
    subscribers: Array<<T>(data?: T) => void>

    constructor() {
        this.subscribers = []
    }

    subscribe(fn: <T>(data?: T) => void): void {
        if (this.subscribers.some(subscriber => subscriber === fn)) {
            console.log('Was subscribed')
            return
        }

        this.subscribers.push(fn)
    }

    unsubscribe(fn: <T>(data?: T) => void): void {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn)
    }

    broadcast<T>(data?: T): void {
        console.log(2)
        this.subscribers.forEach(subscriber => subscriber(data))
    }
}

export default EventObserver