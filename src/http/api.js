/*
 * 接口统一集成模块
 */
import app from './app/a' // 系统全局接口 或 商城接口
import manager from './manager/a' // 后台管理接口

// 默认全部导出
export default {
    app,
    manager
}