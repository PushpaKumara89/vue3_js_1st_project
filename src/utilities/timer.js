export default {
    data() {
        return {
            interval: ''
        }
    },
    methods: {
        timer(func, wait = 1000) {
            clearInterval(this.interval)
            this.interval = setInterval(func, wait);
            return this.interval
        },
    }
}