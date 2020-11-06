<template>
  <div class="ahome conwidth">
    <!-- ahome -->
    <div class="touxiang">
      <div class="title">
        <div class="img">
          <img src="@/assets/my/title.png" alt />
        </div>
        <p>zhengtai</p>
      </div>
      <div class="close" @click="closeChange">
        <img src="@/assets/my/close.png" alt />
      </div>
    </div>
    <div class="content">
      <van-dropdown-menu>
        <van-dropdown-item :value="value1" :options="option1" @change="checkclick" />
      </van-dropdown-menu>
      <van-tabs :active="active" @change="tabchange" class="tabs" type="card" v-if="value1==0">
        <van-tab v-for="(item,index) in tablist" :key="index" :title="item.title">
          <p class="nodata" v-if="item.conlist.length == 0">暂无内容</p>
          <van-tabs swipeable v-else :active="activetwo" @click="childtab">
            <van-tab v-for="i in item.conlist" :key="i.name" :title="i.name">
              <!--系统设置 修改密码 * -->
              <div v-if="active==3 & activetwo==0" class="gaimi">
                <p class="title">修改密码</p>
                <van-cell-group class="gaimigroup">
                  <van-field
                    v-model="systemSettings.oldpassword"
                    label="原密码"
                    type="password"
                    placeholder="原密码"
                  />

                  <van-field
                    v-model="systemSettings.newpassword"
                    label="新密码"
                    type="password"
                    placeholder="新密码"
                  />
                  <p class="tip">4-20位字母或数字</p>
                  <van-field
                    v-model="systemSettings.newpassword2"
                    label="确认新密码"
                    type="password"
                    placeholder="确认新密码"
                  />
                  <p class="tip">4-20位字母或数字</p>
                </van-cell-group>
                <div class="btnflex">
                  <van-button class="smallbtn" size="small" @click="systemSettingsSubmit">确定</van-button>
                  <van-button class="smallbtn" size="small" @click="systemSettingsClose">取消</van-button>
                </div>
              </div>
              <!--系统设置 注册设置 * -->
              <div v-if="active==3 & activetwo==1" class="gaimi">
                <p class="title">注册设置</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>代理</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in zhuceSettingsSelect"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                    <!-- <van-dropdown-menu class="dropdownmenu">
                      <van-dropdown-item :value="value2" :options="zhuce" @change="optionchange" />
                    </van-dropdown-menu>-->
                  </div>
                  <div class="flexzhuce">
                    <p>注册赠送购物余额</p>
                    <input type="text" v-model="zhuceSettings.zcsMoney" />
                  </div>
                  <div class="flexzhuce">
                    <p>注册有效期</p>
                    <input type="text" v-model="zhuceSettings.zcsDate" />
                  </div>
                  <div class="flexzhuce radiotag">
                    <p>邀请码开关</p>
                    <van-radio-group
                      class="group"
                      v-model="zhuceSettings.zcsRadiocode"
                      @change="invitationCode"
                    >
                      <van-radio class="vanradio" :name="1">开启</van-radio>
                      <van-radio class="vanradio" :name="2">关闭</van-radio>
                    </van-radio-group>
                  </div>
                  <div class="flexzhuce radiotag">
                    <p>IOS审核伪装页面</p>
                    <van-radio-group
                      class="group"
                      v-model="zhuceSettings.zcsRadioios"
                      @change="ioseExamine"
                    >
                      <van-radio class="vanradio" :name="1">开启</van-radio>
                      <van-radio class="vanradio" :name="2">关闭</van-radio>
                    </van-radio-group>
                  </div>
                  <div class="flexzhuce radiotag">
                    <p>网络电话</p>
                    <van-radio-group
                      class="group"
                      v-model="zhuceSettings.zcsRadiotel"
                      @change="intelTel"
                    >
                      <van-radio class="vanradio" :name="1">显示</van-radio>
                      <van-radio class="vanradio" :name="2">隐藏</van-radio>
                    </van-radio-group>
                  </div>
                  <div class="btnflex">
                    <van-button class="smallbtn" size="small" @click="zhuceSettingsSubmit">确定</van-button>
                    <van-button class="smallbtn" size="small" @click="zhuceSettingsClose">取消</van-button>
                  </div>
                </div>
              </div>
              <!--系统设置 系统公告 -->
              <div v-if="active==3 & activetwo==2" class="gaimi">
                <p class="title">系统公告</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>标题</p>
                    <input type="text" v-model="stystemGonggao.sggTitle" />
                  </div>
                  <div class="flexzhuce">
                    <p>内容</p>
                    <!-- <input type="text" v-model="systext" /> -->
                    <textarea class="textarea" type="text" v-model="stystemGonggao.sggContent"></textarea>
                  </div>
                  <div class="flexzhuce">
                    <p>时间</p>
                    <input disabled type="text" v-model="stystemGonggao.sggDate" />
                  </div>
                  <div class="btnflex">
                    <van-button class="smallbtn" size="small" @click="stystemGonggaoSubmit">确定</van-button>
                    <!-- <van-button class="smallbtn" size="small">取消</van-button> -->
                  </div>
                </div>
              </div>
              <!--系统设置 注册协议 -->
              <div v-if="active==3 & activetwo==3" class="gaimi">
                <p class="title">注册协议</p>
                <div class="zhuce">
                  <!-- vue-quill-editor -->
                  <quill-editor
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)"
                    style="height:300px"
                  ></quill-editor>
                  <div class="btnflex" style="margin-top:150px;">
                    <van-button class="smallbtn" size="small">确定</van-button>
                  </div>
                </div>
              </div>
              <!--卡密管理 卡密生成 * -->
              <div v-if="active==1 & activetwo==0" class="gaimi">
                <p class="title">卡密生成</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>数量(张)</p>
                    <input type="text" v-model="shengcheng.scNum" />
                  </div>
                  <div class="flexzhuce radiotag">
                    <p>卡种类</p>
                    <van-radio-group
                      class="group"
                      v-model="shengcheng.scRadio"
                      @change="invitationCode"
                    >
                      <van-radio class="vanradio" :name="1">混合卡</van-radio>
                      <van-radio class="vanradio" :name="2">购物余额卡</van-radio>
                    </van-radio-group>
                  </div>
                  <div class="flexzhuce">
                    <p>面值</p>
                    <input type="text" v-model="shengcheng.scMoney" />
                  </div>
                  <div class="flexzhuce">
                    <p>激活期限</p>
                    <!-- <div> -->
                    <input
                      type="text"
                      readonly
                      v-model="shengcheng.scDate"
                      @click="opendate('shengcheng')"
                    />
                    <!-- </div> -->
                  </div>
                  <div class="flexzhuce">
                    <p>用户有效期增加(天)</p>
                    <input type="text" v-model="shengcheng.scDay" />
                  </div>
                  <div class="flexzhuce">
                    <p>所属客户</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in shengchengSelect"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="flexzhuce">
                    <p>备注</p>
                    <input type="text" v-model="shengcheng.scDesc" />
                  </div>
                  <div class="btnflex">
                    <van-button class="smallbtn" size="small" @click="shengchengClick">确定</van-button>
                  </div>
                </div>
              </div>
              <!--卡密管理 卡密划拨 * -->
              <div v-if="active==1 & activetwo==1" class="gaimi">
                <p class="title">卡密划拨</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>日期</p>
                    <div class="radiotag">
                      <input
                        type="text"
                        readonly
                        v-model="huabo.hbselectdate1"
                        @click="opendate('huabo1')"
                      />
                      <span style="margin:0 5px">-</span>
                      <input
                        type="text"
                        readonly
                        v-model="huabo.hbselectdate2"
                        @click="opendate('huabo2')"
                      />
                    </div>
                  </div>
                  <div class="flexzhuce">
                    <p>批次号</p>
                    <input type="text" v-model="huabo.hbpici" />
                  </div>
                  <div class="flexzhuce">
                    <p>卡号段</p>
                    <div class="radiotag">
                      <input type="text" v-model="huabo.hbkahao1" />
                      <span style="margin:0 5px">-</span>
                      <input type="text" v-model="huabo.hbkahao2" />
                    </div>
                  </div>
                  <div class="btnflex">
                    <van-button class="smallbtn" size="small" @click="huaboSearch">搜索</van-button>
                  </div>
                  <div v-show="huaboshow">
                    <div class="flexzhuce">
                      <p>划拨给代理</p>
                      <select id="groupselect" @change="optionchange">
                        <option :value="h.value" v-for="h in huaboselect1" :key="h.text">{{h.text}}</option>
                      </select>
                    </div>
                    <div class="flexzhuce">
                      <p>划拨给商家</p>
                      <select id="groupselect" @change="optionchange">
                        <option
                          :value="b.value"
                          v-for="(b,index) in huaboselect2"
                          :key="index"
                        >{{b.text}}</option>
                      </select>
                    </div>
                    <div class="btnflex">
                      <van-button class="smallbtn" size="small" @click="huaboQueren">确认划拨</van-button>
                    </div>
                  </div>
                  <v-table
                    is-horizontal-resize
                    style="width:100%"
                    :columns="columns"
                    :table-data="tableData"
                    row-hover-color="#eee"
                    row-click-color="#edf7ff"
                  ></v-table>
                  <!-- <v-pagination :total="200" size="small"></v-pagination> -->
                </div>
              </div>
              <!--卡密管理 充值记录 * -->
              <div v-if="active==1 & activetwo==2" class="gaimi">
                <p class="title">充值记录</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>卡号段</p>
                    <div class="radiotag">
                      <input type="text" v-model="chongzhi.czkahao1" />
                      <span style="margin:0 5px">-</span>
                      <input type="text" v-model="chongzhi.czkahao2" />
                    </div>
                  </div>
                  <div class="flexzhuce">
                    <p>充值账号</p>
                    <input type="text" v-model="chongzhi.czZhanghao" />
                  </div>
                  <div class="flexzhuce">
                    <p>激活时间</p>
                    <input
                      type="text"
                      readonly
                      v-model="chongzhi.czSelectDate"
                      @click="opendate('chongzhi')"
                    />
                  </div>
                  <div class="flexzhuce">
                    <p>面值</p>
                    <input type="text" v-model="chongzhi.czMoney" />
                  </div>
                  <div class="flexzhuce">
                    <p>代理商</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in chongzhiSelect"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="btnflex">
                    <van-button class="smallbtn" size="small" @click="chongzhiSeach">搜索</van-button>
                  </div>
                </div>
              </div>
              <!--卡密管理 卡密管理 * -->
              <div v-if="active==1 & activetwo==3" class="gaimi">
                <p class="title">卡密管理</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>日期</p>
                    <div class="radiotag">
                      <input
                        type="text"
                        readonly
                        v-model="kmguanli.glSelectDate1"
                        @click="opendate('kmgl1')"
                      />
                      <span style="margin:0 5px">-</span>
                      <input
                        type="text"
                        readonly
                        v-model="kmguanli.glSelectDate2"
                        @click="opendate('kmgl2')"
                      />
                    </div>
                  </div>
                  <div class="flexzhuce">
                    <p>卡状态</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in kmguSelect1"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="flexzhuce">
                    <p>代理商</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in kmguSelect2"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="flexzhuce">
                    <p>商家</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in kmguSelect3"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="flexzhuce">
                    <p>卡种类</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in kmguSelect4"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="flexzhuce">
                    <p>卡号段</p>
                    <div class="radiotag">
                      <input type="text" v-model="kmguanli.glkahao1" />
                      <span style="margin:0 5px">-</span>
                      <input type="text" v-model="kmguanli.glkahao2" />
                    </div>
                  </div>
                  <div class="flexzhuce">
                    <p>面值</p>
                    <input type="text" v-model="kmguanli.glMoney" />
                  </div>
                  <div class="flexzhuce">
                    <p>批次号</p>
                    <input type="text" v-model="kmguanli.glpici" />
                  </div>
                  <div class="btnzu">
                    <van-button class="btns" icon="search" @click="kmglSeach">搜索</van-button>
                    <van-button class="btns" icon="success" @click="kmglDaochu">卡密导出</van-button>
                    <div v-show="editshow">
                      <van-button class="btns" icon="success" @click="kmglEdit">批量修改</van-button>
                      <van-button class="btns" icon="cross" @click="kmglDongjie">冻结查询结果</van-button>
                      <van-button class="btns" icon="success" @click="kmglJiesuo">解锁查询结果</van-button>
                    </div>
                  </div>
                </div>
              </div>
              <!--客户管理 添加代理 * -->
              <div v-if="active==2 & activetwo==0" class="gaimi">
                <p class="title">添加代理</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>客户名</p>
                    <input type="text" v-model="addDaili.addUsername" />
                    <p class="tiptishi">
                      用户名由5-15个英文字母或数字或下划线组成
                      <span style="color:red;">请谨慎操作,确认后将不支持修改</span>
                    </p>
                  </div>
                  <div class="flexzhuce">
                    <p>手机号码</p>
                    <input type="text" v-model="addDaili.addPhone" />
                    <p class="tiptishi">手机号码前面无需加0</p>
                  </div>
                  <div class="flexzhuce">
                    <p>初始密码</p>
                    <input type="text" v-model="addDaili.addPassword" />
                  </div>
                  <div class="flexzhuce">
                    <p>固定电话</p>
                    <input type="text" v-model="addDaili.addTel" />
                  </div>
                  <div class="flexzhuce">
                    <p>电子邮箱</p>
                    <input type="text" v-model="addDaili.addEmil" />
                  </div>
                  <div class="flexzhuce">
                    <p>代理KEY</p>
                    <input type="text" v-model="addDaili.addKey" />
                    <p class="tiptishi">KEY是代理的唯一标识，如果为空则默认为代理名</p>
                  </div>
                  <div class="flexzhuce">
                    <p>地理位置</p>
                    <input
                      type="text"
                      readonly
                      @click="showareaclick"
                      v-model="addDaili.addAddressShengshi"
                      placeholder="请选择省市"
                    />
                    <input
                      type="text"
                      style="margin-top: 10px;"
                      v-model="addDaili.addAddressOther"
                      placeholder="请填写详细地址"
                    />
                  </div>
                  <div class="flexzhuce">
                    <p>上传头像</p>
                    <van-uploader :before-read="beforeRead" class="uploader">
                      <van-button icon="plus" type="primary">上传文件</van-button>
                    </van-uploader>
                    <input type="text" v-model="addDaili.addUploaderimg" />
                  </div>
                  <div class="flexzhuce">
                    <p>兑换类型</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in addDailiSelect1"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="flexzhuce">
                    <p>兑换比例%</p>
                    <input type="text" v-model="addDaili.addDhbi" />
                  </div>
                  <div class="flexzhuce">
                    <p>重复兑换</p>
                    <select id="groupselect" @change="optionchange">
                      <option
                        :value="op.value"
                        v-for="(op,index) in addDailiSelect2"
                        :key="index"
                      >{{op.text}}</option>
                    </select>
                  </div>
                  <div class="flexzhuce">
                    <p>分配给此代理佣金比例(%)</p>
                    <input type="text" v-model="addDaili.addFpyjbl" />
                  </div>
                  <div class="flexzhuce">
                    <p>开通商家数量</p>
                    <input type="text" v-model="addDaili.addSjNum" />
                  </div>
                  <div class="flexzhuce">
                    <p>开通代理数量</p>
                    <input type="text" v-model="addDaili.addDlNum" />
                  </div>
                  <div class="flexzhuce">
                    <p>晋升用户数量</p>
                    <input type="text" v-model="addDaili.addYhNum" />
                  </div>
                  <div class="flexzhuce">
                    <p>备注</p>
                    <textarea
                      class="textarea"
                      type="text"
                      style="height: 100px;"
                      v-model="addDaili.addDesc"
                    ></textarea>
                  </div>
                  <div class="btnflex">
                    <van-button class="smallbtn" size="small" @click="addDailiSubmit">确定</van-button>
                    <van-button class="smallbtn" size="small" @click="addDailiClose">取消</van-button>
                  </div>
                </div>
              </div>
              <!--客户管理 代理管理 * -->
              <div v-if="active==2 & activetwo==1" class="gaimi">
                <p class="title">代理管理</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>客户名称</p>
                    <input type="text" v-model="dailiGl.dailiGlName" />
                  </div>
                  <div class="btnzu">
                    <van-button class="btns" icon="search" @click="dailiGlSeach">搜索</van-button>
                    <van-button class="btns" @click="dailiGlHuifuPassword">恢复默认密码</van-button>
                    <van-button class="btns" @click="dailiGlKaiqi">开启</van-button>
                    <van-button class="btns" @click="dailiGlGuanbi">关闭</van-button>
                  </div>
                </div>
              </div>
              <!--客户管理 商家管理 * -->
              <div v-if="active==2 & activetwo==2" class="gaimi">
                <p class="title">商家管理</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>商家名称</p>
                    <input type="text" v-model="shangjiaGl.sjglName" />
                  </div>
                  <div class="btnzu">
                    <van-button class="btns" icon="search" @click="shangjiaGlSeach">搜索</van-button>
                    <van-button class="btns" @click="sjgladd" icon="plus">添加</van-button>
                  </div>
                </div>
              </div>
              <!--客户管理 用户管理 * -->
              <div v-if="active==2 & activetwo==3" class="gaimi">
                <p class="title">用户管理</p>
                <div class="zhuce">
                  <div class="flexzhuce">
                    <p>客户名称</p>
                    <input type="text" v-model="yonghuGl.yhglName" />
                  </div>
                  <div class="btnzu">
                    <van-button class="btns" icon="search" @click="yonghuGlSeach">搜索</van-button>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </van-tab>
      </van-tabs>
      <van-tabs
        :active="active2"
        @change="tabchange"
        class="tabs"
        type="card"
        :ellipsis="false"
        v-if="value1==1"
      >
        <van-tab v-for="item in tablist2" :key="item.title" :title="item.title">
          <p class="nodata" v-if="item.conlist.length == 0">暂无内容</p>
          <van-tabs v-else :active="activetwo2" @click="childtab">
            <van-tab v-for="i in item.conlist" :key="i.name" :title="i.name"></van-tab>
          </van-tabs>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 日期弹窗 * -->
    <van-popup v-model="show" @close="onClose" style="width:100%">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="shengChengConfirm"
        @cancel="shengChengCancel"
      />
    </van-popup>
    <!-- 省市弹窗 -->
    <van-popup v-model="showarea" @close="onClose" style="width:100%">
      <van-area
        title="选择省市"
        @confirm="areaqueren"
        @cancel="areaquxiao"
        :area-list="areaList"
        :columns-num="2"
      />
    </van-popup>
    <!-- 商家管理添加弹窗 * -->
    <van-popup v-model="sjgladdshow" style="width:95%" closeable>
      <div class="sjgltc">
        <p class="title">添加</p>
        <div class="sjgl">
          <div class="sjglflex">
            <p>用户名</p>
            <input type="text" v-model="sjgladdDialog.sjgladdName" placeholder="用户名" />
          </div>
          <div class="sjglflex">
            <p>登录账号</p>
            <input type="text" v-model="sjgladdDialog.sjgladdZhanghao" placeholder="登录账号 英文字符加数字" />
          </div>
          <div class="sjglflex">
            <p>登录密码</p>
            <input type="text" v-model="sjgladdDialog.sjgladdPassword" placeholder="登录密码" />
          </div>
          <div class="sjglflex">
            <p>电话号码</p>
            <input type="text" v-model="sjgladdDialog.sjgladdTel" placeholder="电话号码" />
          </div>
          <div class="sjglflex">
            <p>服务热线</p>
            <input type="text" v-model="sjgladdDialog.sjgladd400" placeholder="服务热线" />
          </div>
          <div class="sjglblock">
            <p>分配给此商家佣金比例</p>
            <input type="text" v-model="sjgladdDialog.sjgladdFpsjyj" placeholder="分配给此商家佣金比例" />
          </div>
          <div class="sjglblock">
            <p>晋升高级会员额度</p>
            <input type="text" v-model="sjgladdDialog.sjgladdGjhy" placeholder="晋升高级会员额度" />
          </div>
          <div class="sjglblock">
            <p>商家分类</p>
            <select id="groupselect" @change="optionchange">
              <option
                :value="op.value"
                v-for="(op,index) in sjgladdDialogSelect1"
                :key="index"
              >{{op.text}}</option>
            </select>
          </div>
          <div class="sjglblock">
            <p>地理位置</p>
            <input
              type="text"
              readonly
              @click="showareaclick"
              v-model="sjgladdDialog.sjgladdShengShi"
              placeholder="请选择省市"
            />
            <input
              style="margin-top: 10px;"
              type="text"
              v-model="sjgladdDialog.sjgladdOther"
              placeholder="请填写详细地址"
            />
          </div>
          <div class="sjglblock">
            <p>优惠券兑换类型</p>
            <select id="groupselect" @change="optionchange">
              <option
                :value="op.value"
                v-for="(op,index) in sjgladdDialogSelect2"
                :key="index"
              >{{op.text}}</option>
            </select>
          </div>
          <div class="sjglblock">
            <p>优惠券兑换比例%</p>
            <input type="text" v-model="sjgladdDialog.sjgladdYhq" placeholder="优惠券兑换比例%" />
          </div>
          <div class="sjglblock">
            <p>上传头像</p>
            <van-uploader :before-read="beforeRead" class="uploader">
              <van-button class="button" icon="plus" type="primary">上传文件</van-button>
            </van-uploader>
            <input style="margin-top:10px;" type="text" v-model="sjgladdDialog.sjgladdUploaderimg" />
          </div>
          <div class="sjglblock">
            <p>淘商城appid</p>
            <input type="text" v-model="sjgladdDialog.sjgladdAppid" placeholder="淘商城appid" />
          </div>
          <div class="sjglblock">
            <p>淘商城appkey</p>
            <input type="text" v-model="sjgladdDialog.sjgladdAppkey" placeholder="淘商城appkey" />
          </div>
          <div class="btnflex">
            <van-button class="smallbtn" size="small" @click="sjgladdDialogSubmit">确定</van-button>
            <van-button class="smallbtn" @click="sjgladdDialogClose" size="small">取消</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { formatWithSeperator } from "@/utils/datetime";
import { quillEditor } from "vue-quill-editor";
import Quill from "quill";
import area from "@/utils/area";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      //标签切换
      active: 0,
      activetwo: 0,
      active2: 0,
      activetwo2: 0,
      //卡密生成
      shengchengSelect: [{ text: "zhengtai", value: 0 }],
      shengcheng: {
        scNum: "",
        scRadio: 1,
        scMoney: "",
        scDate: new Date(),
        scDay: "",
        scDesc: ""
      },
      //卡密划拨
      huabo: {
        hbselectdate1: "",
        hbselectdate2: "",
        hbpici: "",
        hbkahao1: "",
        hbkahao2: ""
      },
      huaboselect1: [
        { text: "代理", value: 0 },
        { text: "代理1", value: 1 }
      ],
      huaboselect2: [{ text: "商家", value: 0 }],
      //卡密划拨表格
      tableData: [
        {
          name: "吴伟",
          tel: "183*****6678",
          hobby: "钢琴、书法、唱歌",
          address: "上海市松江区乐都西路867-871号"
        }
      ],
      columns: [
        {
          field: "name",
          title: "姓名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "tel",
          title: "手机号码",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "hobby",
          title: "爱好",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "address",
          title: "地址",
          width: 280,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ],
      //充值记录 卡密
      chongzhi: {
        czkahao1: "",
        czkahao2: "",
        czZhanghao: "",
        czSelectDate: "",
        czMoney: ""
      },
      chongzhiSelect: [
        { text: "代理", value: 0 },
        { text: "代理1", value: 1 }
      ],
      //卡密管理
      kmguanli: {
        glSelectDate1: "",
        glSelectDate2: "",
        glkahao1: "",
        glkahao2: "",
        glMoney: "",
        glpici: ""
      },
      kmguSelect1: [{ text: "卡状态", value: 0 }],
      kmguSelect2: [{ text: "代理商", value: 0 }],
      kmguSelect3: [{ text: "商家", value: 0 }],
      kmguSelect4: [{ text: "卡种类", value: 0 }],
      editshow: false,
      //添加代理
      addDaili: {
        addUsername: "",
        addPhone: "",
        addPassword: "",
        addTel: "",
        addEmil: "",
        addKey: "",
        addAddressShengshi: "",
        addAddressOther: "",
        addUploaderimg: "",
        addDhbi: "",
        addFpyjbl: "",
        addSjNum: "",
        addDlNum: "",
        addYhNum: "",
        addDesc: ""
      },
      addDailiSelect1: [{ text: "兑换类型", value: 0 }],
      addDailiSelect2: [{ text: "重复兑换", value: 0 }],
      //代理管理
      dailiGl: {
        dailiGlName: ""
      },
      //商家管理
      shangjiaGl: {
        sjglName: ""
      },
      //商家管理添加弹窗
      sjgladdDialog: {
        sjgladdName: "",
        sjgladdZhanghao: "",
        sjgladdPassword: "",
        sjgladdTel: "",
        sjgladd400: "",
        sjgladdFpsjyj: "",
        sjgladdGjhy: "",
        sjgladdShengShi: "",
        sjgladdOther: "",
        sjgladdYhq: "",
        sjgladdUploaderimg: "",
        sjgladdAppid: "",
        sjgladdAppkey: ""
      },
      sjgladdDialogSelect1: [{ text: "商家分类", value: 0 }],
      sjgladdDialogSelect2: [{ text: "优惠券兑换类型", value: 0 }],
      //用户管理
      yonghuGl: {
        yhglName: ""
      },
      //修改密码
      systemSettings: {
        oldpassword: "",
        newpassword: "",
        newpassword2: ""
      },
      //注册设置
      zhuceSettings: {
        zcsMoney: "",
        zcsDate: "",
        zcsRadiocode: 1,
        zcsRadioios: 1,
        zcsRadiotel: 1
      },
      zhuceSettingsSelect: [
        { text: "代理", value: 0 },
        { text: "代理2", value: 1 },
        { text: "代理3", value: 2 }
      ],
      //系统公告
      stystemGonggao: {
        sggTitle: "",
        sggContent: "",
        sggDate: new Date()
      },
      option1: [
        { text: "a", value: 0 },
        { text: "b", value: 1 }
      ],
      value1: 0,
      value2: 0,
      zhucevalue: 0,
      tablist: [
        {
          title: "财务管理",
          conlist: []
        },
        {
          title: "卡密管理",
          conlist: [
            {
              name: "卡密生成"
            },
            {
              name: "卡密划拨"
            },
            {
              name: "充值记录"
            },
            {
              name: "卡密管理"
            }
          ]
        },
        {
          title: "客户管理",
          conlist: [
            {
              name: "添加代理"
            },
            {
              name: "代理管理"
            },
            {
              name: "商家管理"
            },
            {
              name: "用户管理"
            }
          ]
        },
        {
          title: "系统设置",
          conlist: [
            {
              name: "修改密码"
            },
            {
              name: "注册设置"
            },
            {
              name: "系统公告"
            },
            {
              name: "注册协议"
            }
          ]
        }
      ],
      tablist2: [
        {
          title: "话单管理",
          conlist: [
            {
              name: "话单查询"
            },
            {
              name: "正在通话"
            }
          ]
        },
        {
          title: "广告管理",
          conlist: [
            {
              name: "广告列表"
            }
          ]
        },
        {
          title: "微信分享设置",
          conlist: [
            {
              name: "微信参数配置"
            }
          ]
        },
        {
          title: "话费油卡管理",
          conlist: [
            {
              name: "订单管理"
            },
            {
              name: "支付配置"
            }
          ]
        },
        {
          title: "帮助中心",
          conlist: [
            {
              name: "关于我们"
            },
            {
              name: "帮助中心"
            }
          ]
        },
        {
          title: "软件更新",
          conlist: [
            {
              name: "更新设置"
            },
            {
              name: "更新列表"
            }
          ]
        },
        {
          title: "优惠券管理",
          conlist: [
            {
              name: "领券记录"
            },
            {
              name: "联盟订单"
            },
            {
              name: "分销设置"
            }
          ]
        },
        {
          title: "自营商品管理",
          conlist: [
            {
              name: "自营商品"
            },
            {
              name: "自营商品分类"
            },
            {
              name: "订单管理"
            }
          ]
        },
        {
          title: "导航图标管理",
          conlist: [
            {
              name: "导航图标"
            }
          ]
        }
      ],
      // money: "",
      // zhucedate: "",
      // radiocode: 1,
      // radioios: 1,
      // radiotel: 1,
      // systitle: "欢迎使用",
      // systext: "欢迎使用",
      // stystemGonggao.sggDate: new Date(),
      content: "",
      editorOption: {},
      // isClear: false,
      // detail: "请输入 注册协议 内容",
      // num: "",
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      areaList: {},
      showarea: false,
      // areaadress: "",
      // adress: "",
      // uploaderimg: "",
      // selectdate1: "",
      // selectdate2: "",
      huaboshow: false,
      sjgladdshow: false,
      publicbtn: "",
      publicImg: ""
    };
  },
  created() {
    let now = this.stystemGonggao.sggDate;
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month > 10 ? month : "0" + month;
    let date = now.getDate();
    date = date > 10 ? date : "0" + date;
    let hour = now.getHours();
    hour = hour > 10 ? hour : "0" + hour;
    let minute = now.getMinutes();
    minute = minute > 10 ? minute : "0" + minute;
    let second = now.getSeconds();
    second = second > 10 ? second : "0" + second;
    this.stystemGonggao.sggDate =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second;
    this.shengcheng.scDate = year + "/" + month + "/" + date;
  },
  mounted() {
    this.areaList = area;
  },
  methods: {
    //卡密生成确定按钮
    shengchengClick() {
      // console.log("卡密生成");
    },
    //卡密划拨搜索事件
    huaboSearch() {
      // console.log("划拨搜索");
      this.huaboshow = true;
    },
    //卡密划拨确认划拨
    huaboQueren() {
      // console.log("确认划拨");
    },
    // 卡密 充值记录搜索事件
    chongzhiSeach() {
      // console.log("充值记录");
    },
    //卡密管理搜索
    kmglSeach() {
      // console.log("卡密管理搜索");
      this.editshow = true;
    },
    //卡密管理解锁
    kmglJiesuo() {
      // console.log("密管理解锁");
    },
    //卡密管理冻结
    kmglDongjie() {
      // console.log("密管理冻结");
    },
    //卡密管理批量修改
    kmglEdit() {
      // console.log("卡密管理批量修改");
    },
    //卡密管理导出
    kmglDaochu() {
      // console.log("卡密管理导出");
    },
    //添加何理确定
    addDailiSubmit() {
      // console.log("添加何理确定");
    },
    //添加代理取消
    addDailiClose() {
      // console.log("添加代理取消");
    },
    //代理管理搜索
    dailiGlSeach() {},
    //代理管理恢复默认密码
    dailiGlHuifuPassword() {},
    //代理管理开启
    dailiGlKaiqi() {},
    //代理管理关闭
    dailiGlGuanbi() {},
    //商家管理搜索
    shangjiaGlSeach() {},
    // 商家管理添加
    sjgladd() {
      this.sjgladdshow = true;
    },
    //用户管理搜索
    yonghuGlSeach() {},
    //商家管理添加确定按钮
    sjgladdDialogSubmit() {
      this.sjgladdshow = false;
    },
    //商家管理添加取消按钮
    sjgladdDialogClose() {
      this.sjgladdshow = false;
    },
    //修改密码确定
    systemSettingsSubmit() {},
    //修改密码取消
    systemSettingsClose() {},
    //注册设置确定
    zhuceSettingsSubmit() {},
    //注册设置取消
    zhuceSettingsClose() {},
    //系统公告确定
    stystemGonggaoSubmit() {},

    //公共打开日期选择弹窗
    opendate(val) {
      // console.log(val, "huabo");
      this.publicbtn = val;
      this.show = true;
    },
    //弹窗关闭，公共
    onClose() {},
    //一级标签切换
    checkclick(value) {
      // console.log(value, "value");
      this.value1 = value;
    },
    //二级标签切换
    tabchange(curr) {
      // console.log(curr, "e");
      this.active = curr;
      // this.active2 = curr;
    },
    //三级标签切换
    childtab(i) {
      // console.log(i, "iii");
      this.activetwo = i;
    },
    //新零售营销系统退出按钮
    closeChange() {},
    //radio
    invitationCode(m) {
      // console.log(m, "mmm");
    },
    ioseExamine(s) {}, //radio
    intelTel(t) {}, //radio
    //input下拉框
    optionchange(event) {
      // console.log(event, "op");
    },
    //注册协议富文本失去焦点
    onEditorBlur(quill) {
      // console.log("editor blur!");
    },
    //注册协议富文本获取焦点
    onEditorFocus(quill) {
      // console.log("focus!");
    },
    //注册协议富文本初始加载
    onEditorReady(quill) {
      // console.log("editor ready!");
    },
    //注册协议富文本内容变化
    onEditorChange({ quill, html, text }) {
      this.content = html;
      // console.log("editor change!", this.content);
    },
    //所有日期选择
    shengChengConfirm(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      month = month > 10 ? month : "0" + month;
      let date = val.getDate();
      date = date > 10 ? date : "0" + date;
      let nyr = year + "/" + month + "/" + date;
      if (this.publicbtn === "huabo1") {
        this.huabo.hbselectdate1 = nyr;
      } else if (this.publicbtn === "huabo2") {
        this.huabo.hbselectdate2 = nyr;
      } else if (this.publicbtn === "shengcheng") {
        this.shengcheng.scDate = nyr;
      } else if (this.publicbtn === "chongzhi") {
        this.chongzhi.czSelectDate = nyr;
      } else if (this.publicbtn === "kmgl1") {
        this.kmguanli.glSelectDate1 = nyr;
      } else if (this.publicbtn === "kmgl2") {
        this.kmguanli.glSelectDate2 = nyr;
      }

      this.show = false;
    },
    //所有日期取消
    shengChengCancel(val) {
      // console.log(val, "cancel");
      this.show = false;
    },
    //添加代理 地理位置
    showareaclick() {
      this.showarea = true;
    },
    //省市选择
    areaqueren(v) {
      // console.log(v, "ren");
      this.sjgladdDialog.sjgladdShengShi = v[0].name + v[1].name;
      this.addDaili.addAddressShengshi = v[0].name + v[1].name;
      this.showarea = false;
    },
    //省市取消
    areaquxiao(v) {
      // console.log(v, "xiao");
      this.showarea = false;
    },
    //上传图片
    beforeRead(file) {
      // console.log(file, "file");
      this.sjgladdDialog.sjgladdUploaderimg = file.name;
      this.addDaili.addUploaderimg = file.name;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
<style lang="scss" scoped>
.ahome {
  .touxiang {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.533333rem /* 40/75 */;
    background: #efeeee78;
    .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .img {
        width: 1.9rem;
        height: 1.9rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      p {
        font-size: 0.533333rem /* 40/75 */;
        margin-left: 0.266667rem /* 20/75 */;
      }
    }
    .close {
      width: 0.8rem;
      height: 0.8rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .content {
    >>> .van-tabbar--fixed {
      position: relative;
      // top: 0;
    }
    >>> .van-tabbar-item__icon {
      font-size: 0.746667rem /* 56/75 */;
    }
    .tabs {
      font-size: 0.426667rem;
      >>> .van-tab {
        font-size: 0.426667rem /* 32/75 */;
      }
      >>> .van-tabs__line {
        width: 1.733333rem /* 130/75 */ !important;
      }
      >>> .van-tabs__wrap {
        margin: 0.533333rem /* 40/75 */ 0;
      }
      .nodata {
        text-align: center;
        color: #bd3333;
      }
      .gaimi {
        // height: 10rem;
        margin: 0 0.53333rem;
        border: 1px solid #c8c4c4;
        border-radius: 0.533333rem /* 40/75 */;
        overflow: hidden;
        margin-bottom: 0.533333rem;
        .title {
          font-size: 0.426667rem /* 32/75 */;
          line-height: 1.3rem;
          background: #a2a1a121;
          padding: 0 0.533333rem /* 40/75 */;
        }
        .gaimigroup {
          padding: 0 0.533333rem /* 40/75 */;
          >>> .van-cell {
            border: 1px solid #c8c4c4;
            border-radius: 20px;
            margin: 20px 0 0 0;
          }
          .tip {
            color: #858282;
            padding: 5px 0 0 15px;
            font-size: 0.373333rem;
          }
        }
        .btnzu {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .btns {
            background: #337ab7;
            height: 1rem;
            border-radius: 10px;
            font-size: 0.3rem;
            color: #fff;
          }
        }

        .zhuce {
          padding: 0.533333rem /* 40/75 */;
          .flexzhuce {
            margin-bottom: 0.4rem;

            .tiptishi {
              font-size: 0.373333rem;
            }
            .dropdownmenu {
              width: 80%;
              border: 1px solid #00000054;
              border-radius: 10px;
              overflow: hidden;
              background: none;
              >>> .van-overlay {
                height: 0;
                background: none;
              }
              >>> .van-dropdown-item {
                width: 62%;
                margin: 0px 41px;
              }
              >>> .van-dropdown-menu__bar {
                height: 1rem;
              }
            }

            p {
              margin-bottom: 0.2rem;
            }
            input {
              width: 100%;
              height: 1rem;
              border: 1px solid #00000054;
              border-radius: 0.266667rem;
              padding: 0 0.266667rem;
            }
            .group {
              display: flex;
              align-items: center;
              font-size: 0.373333rem;
              .vanradio {
                margin-left: 0.266667rem;
              }
            }
            .textarea {
              width: 100%;
              height: 300px;
              border-radius: 10px;
              padding: 10px;
            }
          }
          .radiotag {
            display: flex;
            align-items: center;
            justify-content: space-between;
            // flex-wrap: wrap;
          }
        }
      }
    }
  }
  .sjgltc {
    // margin: 0 auto;
    font-size: 0.426667rem;
    .title {
      font-size: 0.426667rem /* 32/75 */;
      line-height: 1.3rem;
      background: #a2a1a121;
      padding: 0 0.266667rem;
    }
    input {
      width: 70%;
      height: 1rem;
      border-radius: 0.266667rem;
      border: 1px solid #0000007d;
      padding: 0 0.266667rem;
    }
    .sjgl {
      padding: 0 0.5rem;
      .sjglflex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0 0 0;
      }
      .sjglblock {
        padding-top: 0.5rem;
        p {
          margin-bottom: 0.2rem;
        }
        input {
          width: 100%;
        }
      }
    }
  }
}
.btnflex {
  display: flex;
  justify-content: space-around;
  margin: 0.6rem /* 50/75 */;
  .smallbtn {
    width: 2.133333rem /* 160/75 */;
    border: 1px solid #9e9898;
    border-radius: 0.533333rem /* 40/75 */;
    &:first-child {
      color: #fff;
      background: #337ab7;
    }
  }
}
.uploader {
  // height: 1rem;
  overflow: hidden;
  border-radius: 10px;
  // margin-top: 10px;
  .button {
    height: 1rem;
  }
}
table {
  width: 100%;
  word-break: break-word;
  font-size: 14px;
}
select {
  width: 100%;
  text-align: center;
  height: 1rem;
  border-radius: 10px;
  margin-top: 0.266667rem;
  padding: 0 0.266667rem;
}
</style>