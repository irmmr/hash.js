// component main class
export class HashComponent {
    constructor(default_options = {}, options = {}) {
        this.config         = typeof options === 'object' ? options : {}
        this.default_config = typeof default_options === 'object' ? default_options : {}
    }
}
