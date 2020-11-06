import kouling from './kouling.vue';
export default {
    install(Vue, options = {}){
        const Kouling = Vue.extend(kouling);
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
            instance = new Kouling().$mount();
            document.body.appendChild(instance.$el)
            Object.assign(instance, options);
            Kouling.prototype.callback = defaultCallback;
            return new Promise((resolve, reject) => {
                currentMsg = { resolve, reject }
            })
        };
        function defaultCallback(action) {
            if (action === 'confirm') {
                currentMsg.resolve('confirm');
            }
            currentMsg.reject('cancle');
        }
        Vue.prototype.Kouling = Vue.Kouling = boxFunc;
    }
}