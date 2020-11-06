import scan from './scan.vue';
export default {
    install(Vue, options = {}){
        const Scan = Vue.extend(scan);
        var instance;
        var currentMsg;
        window.addEventListener('popstate', () => {
            if (Boolean(instance)) {
                insatnce.show = false;
                instance = null;
                currentMsg = null;
            }
        });
        var boxFunc = (options = {}) => {
            instance = new Scan().$mount();
            document.body.appendChild(instance.$el)
            Object.assign(instance, options);
            Scan.prototype.callback = defaultCallback;
            return new Promise((resolve, reject) => {
                currentMsg = { resolve, reject }
            })
        };
        function defaultCallback(action) {
            if (action) {
                currentMsg.resolve(action);
            }
            currentMsg.reject('cancle');
        }
        Vue.prototype.Scan = Vue.Scan = boxFunc;
    }
}