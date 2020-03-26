let Vue;
class Store {
    constructor(options) {
        this.state = new Vue({
            data: options.data
        });
        this.mutations = options.mutations;
        this.actions = options.actions;
        options.getters && this.handleGetters(options.getters)
    }
    commit = (type, arg) => {
        this.mutations[type](this.state.arg);
    }
    dispatch(type, arg) {
        this.actions[type]({ commit: this.commit, state: this.state }, arg);
    }
    handleGetters(getters) {
        this.getters = {};
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return this.getters[key](this.state);
                }
            })
        })
    }
}

function install(_Vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}




export default {
    Store,
    install
}