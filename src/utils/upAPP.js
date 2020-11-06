import { Dialog } from 'vant';
import { baseUrl } from './global';
export const upAPP = function (a) {
    console.log(a,'a')
    // 获取设备型号
    var wgtVer = null;
    function plusReady() {
        // ......
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid, function (inf) {
            wgtVer = inf.versionCode;
            // console.log(wgtVer,'version')
            localStorage.versions = wgtVer
            // console.log(localStorage.versions,'localStorage.version')

            // if (isiOS) {
            //     return
            // }
            checkUpdate()
        });
    }
    if (window.plus) {
        plusReady();
    } else {
        document.addEventListener('plusready', plusReady, false);
    }
    // 检测更新
    var checkUrl = "http://www.genshengkeji.com:8510/pub/appDownload?appPackName=plus.quanwanggou&versionCode=1&" + Date.now();
    // console.log(checkUrl)
    function checkUpdate() {
        var xhr = new plus.net.XMLHttpRequest();
        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 4:
                    if (xhr.status == 200) {
                        let responseText = JSON.parse(xhr.responseText);
                        // console.log(responseText,'343')
                        var newVer = responseText.data.versionCode;
                        var wgtUrl = responseText.data.url;
                        localStorage.newVer = newVer
                        // console.log( localStorage.newVer,' localStorage.newVer')
                        // console.log(wgtVer<newVer,'wgtVer<newVer')
                        if (wgtVer && newVer && (wgtVer < newVer)) {
                            if (isiOS) {
                                if (a == undefined) {
                                    Dialog.alert({
                                        title: '发现新版本',
                                        message: '请到APPSTORE进行更新'
                                    })
                                    // .then(() => {
                                    //     window.location.href="https://apps.apple.com/cn/app/%E5%85%A8%E7%BD%91%E6%83%A0/id1535316976"
                                    // })
                                }
                            } else {
                                // console.log(a,'a')
                                // if (a == undefined) {
                                    Dialog.confirm({
                                        title: '发现新版本',
                                        message: '是否确认更新？'
                                    }).then(() => {
                                        downWgt(wgtUrl);  // 下载升级包
                                    })
                                // } else {
                                //     Dialog.confirm({
                                //         title: '发现新版本',
                                //         message: '是否确认更新？'
                                //     }).then(() => {
                                //         downWgt(wgtUrl);  // 下载升级包
                                //     })
                                // }
                            }
                        } else {
                            if (a) {
                                plus.nativeUI.alert("无新版本可更新！");
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        xhr.open('POST', checkUrl);
        xhr.setRequestHeader("Content-Type", 'application/json;charset=UTF-8')
        xhr.send();
    }
    // 下载wgt文件
    function downWgt(wgtUrl) {
        var connection = plus.networkinfo.getCurrentType();
        function down() {
            plus.downloader.createDownload(wgtUrl, { filename: "_doc/update/" }, function (d, status) {
                if (status == 200) {
                    installWgt(d.filename); // 安装wgt包
                } else {
                    // if (a == undefined) {
                        plus.nativeUI.alert("下载wgt失败！");
                    // }
                }
                plus.nativeUI.closeWaiting();
            }).start();
        }
        if (connection == 3) {
            down()
        } else {
            Dialog.confirm({
                title: '当前非 WIFI 网络',
                message: '确定更新将使用运营商网络更新'
            }).then(() => {
                down(wgtUrl);  // 下载升级包
            })
        }
    }
    function installWgt(path) {
        plus.runtime.install(path, {}, function () {
            // if (a == undefined) {
                plus.nativeUI.alert("应用资源更新完成！", function () {
                    plus.runtime.restart();
                });
            // }
        }, function (e) {
            // if (a == undefined) {
                plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
            // }
        });
    }
}