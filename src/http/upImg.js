import axios from 'axios'
import { baseUrl } from '@/utils/global'

// 上传图片
export const upLoaderImg = (file, suc, fail) => {
    //file为 你读取成功的回调文件信息
    //创建一个文件对象
    var reader = new FileReader()
        //加载文件
    reader.readAsDataURL(file)
    reader.onload = function() {
        let { result } = this
        let img = new Image()
        img.src = result
        if (/gif|png/.test(file.type)) {
            upLoadFn(file)
            return
        }
        if (/mp4/.test(file.type)) {
            upLoadFn(file)
            return
        }
        if (img.complete) {
            compress();
        } else {
            img.onload = compress;
        }
        //压缩
        function compress() {
            var canvas = document.createElement('canvas')
            var ctx = canvas.getContext('2d')
            var width = img.width,
                height = img.height;
            canvas.width = width;
            canvas.height = height;
            // 铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            var ndata = canvas.toDataURL(file.type, 0.5);
            var arr = ndata.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var newFile = new File([u8arr], file.name, { type: mime });
            upLoadFn(newFile)
        }
        async function upLoadFn(newFile) {
            let params = new FormData()
            params.append('file', newFile)
            let config = {
                headers: { //添加请求头
                    'Content-Type': 'multipart/form-data'
                }
            }
            await axios.post(baseUrl + '/admin/pub/file/upload', params, config).then(res => {

                suc && suc(res)
            }).catch(err => {
                fail && fail(err)
            });
        }
    }
    return
}