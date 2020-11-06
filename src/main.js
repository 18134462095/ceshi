// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vconsole from 'vconsole'
// new Vconsole()
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './http'
import global from '@/utils/global'
import '@/utils/flexble.js'
import '@/components'
import '@/methodComp'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import VueTouch from 'vue-touch'
import {
  Lazyload
} from 'vant';
import vueFeedback from 'vue-feedback'
import {
  Toast,
  Dialog
} from 'vant';


let coordtransform = require('@/utils/coordinate')
// console.log(coordtransform, 'coordtransform')
Vue.prototype.coordtransform = coordtransform

import VueQuillEditor from 'vue-quill-editor'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {
  VTable,
  VPagination
} from 'vue-easytable'
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
Vue.use(VueQuillEditor)
Vue.use(Lazyload)
import Vant from 'vant'
import 'vant/lib/index.css'

// ES6
import vueToTop from 'vue-totop'

Vue.use(vueToTop)

Vue.config.productionTip = false
Vue.prototype.global = global
Vue.prototype.Toast = Toast
Vue.prototype.Dialog = Dialog

 
Vue.use(api)
Vue.use(vueFeedback)
Vue.use(Vant)
Vue.use(VueAwesomeSwiper)
Vue.use(VueTouch, {
  name: 'v-touch'
});

Vue.prototype.replaceHttp = url => {
  return /^http/.test(url) ? url : 'http:' + url
}

Vue.prototype.getInfo = function () {
  return this.$api.app.my.getMemberInfo().then(res => {
    if (res.code == 200) {
      store.commit('memberInfo', res.data)
      // 通知公告
      let pageIndex0 = 0
      this.$api.app.my.getNotices({
        pageIndex: pageIndex0
      }).then(ress => {
        store.commit('changeInform', ress.data)
        console.log(ress,'note')
      })
    } else {
      router.push('/login')
    }
  })
}

//购买跳转
Vue.prototype.getDetailUrl = function (url, type) {
  if (!plus) return
  let openUrl = "";
  
  if (url.substr(0, 5) === "https") {
    openUrl = url.substr(8);
    console.log(openUrl,'1')
  } else if (url.substr(0, 5) === "http:") {
    let surl = url.substr(5)
    console.log(surl)
    if(surl.substr(0,2) == "//"){
      openUrl = surl.substr(2);
    } else {
      openUrl = surl;
    }
  }
  switch (type) {
    case "TB":
      plus.runtime.openURL("taobao://" + openUrl, (err) => {
        if (err) {
          // Toast('请先安装淘宝App')
          if (isiOS) {
            plus.runtime.openURL('https://apps.apple.com/cn/app/%E6%89%8B%E6%9C%BA%E6%B7%98%E5%AE%9D-%E6%B7%98%E5%88%B0%E4%BD%A0%E8%AF%B4%E5%A5%BD/id387682726')
          } else {
            plus.runtime.openURL('http://shoutao.yushansem.com/lp21.html?c1=lv870zelrv91ppeeruwc2j5jvneiv3gb&c2=1581151840428&c3=lp21.html&c4=1581151840428&baidu_sem=184007878419_%CA%D6%BB%FA%CC%D4%B1%A6%CF%C2%D4%D8_40972071899&bd_vid=9849986241004872116')
          }
        }
      });
      break;
    case "TM":
      plus.runtime.openURL("tmall://" + openUrl, () => {
        plus.runtime.openURL("taobao://" + openUrl, (err) => {
          if (err) {
            if (isiOS) {
              plus.runtime.openURL('https://apps.apple.com/cn/app/%E6%89%8B%E6%9C%BA%E6%B7%98%E5%AE%9D-%E6%B7%98%E5%88%B0%E4%BD%A0%E8%AF%B4%E5%A5%BD/id387682726')
            } else {
              plus.runtime.openURL('http://shoutao.yushansem.com/lp21.html?c1=lv870zelrv91ppeeruwc2j5jvneiv3gb&c2=1581151840428&c3=lp21.html&c4=1581151840428&baidu_sem=184007878419_%CA%D6%BB%FA%CC%D4%B1%A6%CF%C2%D4%D8_40972071899&bd_vid=9849986241004872116')
            }
            // Toast('请先安装淘宝App')
          }
        });
      });
      break;
    case "JD":
      let jump = {
        category: "jump",
        des: "getCoupon",
        url: openUrl,
      };
      // jump =
      plus.runtime.openURL(
        "openApp.jdMobile://virtual?params=" +
        encodeURIComponent(JSON.stringify(jump)), (err) => {
          // console.log(err, 'jingdong')
          if (err) {
            // Toast('请先安装京东App')
            plus.runtime.openURL('https://h5.m.jd.com/active/download/download.html')
          }
        }
      );
      break;
    case "PDD":
      plus.runtime.openURL(url, (err) => {
        if (err) {
          // Toast('请先安装拼多多App')
          plus.runtime.openURL('https://lp.pinduoduo.com/template.html?type=4&id=1151621&acc=baidupinzhuan&src=baidu_sem&campaign=baidupinzhuan&cid=baidupinzhuan&imei_md5=B53BEE8B0A7B1BEF944FD399A83A6844&idfa_md5=__IDFA__')
        }
      });
      break;
    default:
      break;
  }
  return;
}

import {
  upAPP
} from '@/utils/upAPP';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeMount() {
    let _this = this
    localStorage.noback = ''
    document.addEventListener('plusready', function () {
      let webview = plus.webview.currentWebview();
      plus.navigator.setFullscreen(false);
      let first = true;
      _this.checkArguments();
      _this.getCopy()
      upAPP()
      document.addEventListener('newintent', function () {
        _this.checkArguments();
      }, false);
      document.addEventListener('resume', function () {
        _this.getCopy()
      })
      plus.key.addEventListener('backbutton', function () {
        if (localStorage.noback) {
          if (_this.$route.matched[0].instances.default.noBack) {
            let nowPage = _this.$route.matched[0].instances.default
            nowPage.noBack()
          }
          return
        }
        let index = location.hash.indexOf('?')
        let hash;
        if (index == -1) {
          hash = location.hash
        } else {
          hash = location.hash.slice(0, index)
        }
        let flag = hash !== '#/app/index' && hash !== '#/login' && hash !== '#/app/commission' && hash !== '#/app/support' && hash !== '#/app/my'
        if (flag) {
          webview.back();
        } else {
          if (first) {
            first = false;
            Toast('再按一次退出应用')
            setTimeout(function () {
              first = true;
            }, 1000);
          } else {
            plus.runtime.quit();
          }
        }
      });

      // let pinf = plus.push.getClientInfo();
      // let cid = pinf.clientid;
      // console.log(cid,'cid')
      // plus.push.addEventListener('click', function (msg) {
      //   // 分析msg.payload处理业务逻辑 
      //   console.log('You clicked: ' + msg.content);
      // }, false);

    });
  },
  mounted() {
    // this.getInfo();
    this.$api.app.home.getDockingType().then(res => {
      let tuanyou = {
        name: "tuanyou",
        title: "团油",
        value: 5,
        logo: "http://gdown.baidu.com/img/0/512_512/f52d035ad78effc86ef7fe680f6b0131.png"
      }
      res.data.push(tuanyou)

      this.$store.commit('changeDockTpye', res.data)
    })
    this.$api.app.taobao.getTbWl().then(res => {
      this.$store.commit('changeTbwl', res.data)
      res.data.forEach(i => {
        if (i.title == '天天特卖') {
          this.$api.app.taobao.dgOptimusMaterial({
            materialId: i.value,
            deviceType
          }).then(hot => {
            if (hot.code == 200) {
              this.$store.commit('changeHotrec', hot.data)
            } else {
              Toast.fail('获取信息失败')
            }
          })
        }
      })
    })
  },
  created() {

    // 引导页面

    // 安卓上架这块放开
    if (localStorage.start) {
      if (localStorage.start != '0') {
        this.$router.push('Start')
      } else {
        this.$router.push('advertising')
      }
    } else {
      this.$router.push('advertising')
    }

    // ios上架这快放开
    // if (localStorage.start != '0') {
    //   this.$router.push('Start')
    // }

  },
  methods: {
    getCopy() {
      let reg = RegExp(/yaoqing_/);
      console.log(reg,"123")
      if (isiOS) {
        let UIPasteboard = plus.ios.importClass("UIPasteboard");
        let generalPasteboard = UIPasteboard.generalPasteboard();
        let clip = generalPasteboard.plusCallMethod({
          valueForPasteboardType: "public.utf8-plain-text"
        });
        if (clip && clip.match(reg)) {
          let parentInviteCode = clip.slice(clip.indexOf('_')+1)
          this.$api.app.my.bindParent({
            parentInviteCode
          }).then(res=>{
            console.log(res,'yaoqing')
          })
        }else {
          this.getSearch(clip)
        }
      } else {
        let context = plus.android.importClass("android.content.Context");
        let main = plus.android.runtimeMainActivity();
        let clip = main.getSystemService(context.CLIPBOARD_SERVICE);
        let text = plus.android.invoke(clip, "getText")
        console.log(text.match(reg),'1')
        if (text && text.match(reg)) {
          let parentInviteCode =text.slice(text.indexOf('_')+1)
          console.log(parentInviteCode,"2")
          this.$api.app.my.bindParent({
            parentInviteCode
          }).then(res=>{
            console.log(res,'yaoqing')
          })
        }else {
          this.getSearch(text)
        }
      }
    },
    // getSearch(v) {
    //   if (v) {
    //     let kouling = v.match(/(₴|₳|\$|¢|€|₤|￥|＄|《|》)(\S+)(₴|₳|\$|¢|€|₤|￥|＄|《|》)/g)
    //     console.log(kouling,'kouling')
    //     if (!kouling) return
    //     let message = kouling[0]
    //     function flag () {

    //       let save = localStorage.copyContent
    //       if (save) {
    //         let getSave = JSON.parse(save)
    //         if (getSave.message == message) {
    //           console.log(4)
    //           if (getSave.time < Date.now()) {
    //             localStorage.removeItem('copyContent')
    //             return true
    //           } else {
    //             console.log(5)
    //             return false
    //           }
    //         } else {
    //           return true
    //         }
    //       } else {
    //         return true
    //       }
    //     }
    //     if (flag()) {
    //       let save = {
    //         message,
    //         time: Date.now() + 1000 * 60 * 60 * 24
    //       }
    //       localStorage.copyContent = JSON.stringify(save)
    //       this.$nextTick(() => {
    //         console.log('nextTick')
    //         this.$api.app.home.query({
    //           "coupon": false,
    //           "dockingType": {
    //             "name": "TB",
    //             "title": "淘宝",
    //             "value": 1
    //           },
    //           "ip": returnCitySN.cip,
    //           "keyword": message,
    //         }).then(res => {
    //           if (res.code == 200) {
    //             console.log(res.code)
    //             let params = res.data.resultList[0]
    //             this.Kouling({
    //               v
    //             }).then(() => {
    //               let name = this.$route.name
    //               switch (name) {
    //                 case 'Detail':
    //                   this.$router.replace({
    //                     name: 'Detail2',
    //                     params
    //                   })
    //                   break;
    //                 case 'Detail2':
    //                   this.$router.replace({
    //                     name: 'Detail',
    //                     params
    //                   })
    //                   break;
    //                 default:
    //                   this.$router.push({
    //                     name: 'Detail',
    //                     params
    //                   })
    //                   break;
    //               }
    //             })
    //           }
    //         })
    //       })
    //     }
    //     // this.$router.push('/app/search?content=' + v)
    //   }
    // },
    getSearch(v) {
      if (typeof (v) == 'string') {
        let kouling = v.match(/(₴|₳|\$|¢|€|₤|￥|＄|《|》)(\S+)(₴|₳|\$|¢|€|₤|￥|＄|《|》)/g)
        // console.log(kouling, 'kouling')
        if (!kouling) return
        let message = kouling[0]

        function flag() {
          let save = localStorage.copyContent
          if (save) {
            let getSave = JSON.parse(save)
            if (getSave.message == message) {
              if (getSave.time < Date.now()) {
                localStorage.removeItem('copyContent')
                return true
              } else {
                return false
              }
            } else {
              return true
            }
          } else {
            return true
          }
        }
        if (flag()) {
          let save = {
            message,
            time: Date.now() + 1000 * 60 * 60 * 24
          }
          localStorage.copyContent = JSON.stringify(save)
          // this.$nextTick(() => {
          this.$router.push('/app/search?content=' + v)
          // })
        }
      }
    },
    checkArguments() {
      let args = plus.runtime.arguments;
      if (args) {
        // 处理args
      }
    }
  }
})
