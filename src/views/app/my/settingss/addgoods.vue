<template>
  <div class="addgoods" :key="key">
    <div v-if="$route.query.isadd==1">
      <app-title>添加收货地址</app-title>
      <div class="conwidth">
        <van-address-edit
          :area-list="areaList"
          :address-info="AddressInfo"
          show-set-default
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
        />
      </div>
    </div>
    <div v-if="$route.query.isadd==2">
      <app-title>编辑收货地址</app-title>
      <div class="conwidth">
        <div class="minheight">
          <van-address-edit
            :area-list="areaList"
            :address-info="AddressInfo2"
            show-set-default
            show-area
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-detail="detailChange"
            @change-default="isDefaultChange"
            @change-area="areaChange"
          >
            <van-cell class="deleteaddress" @click="deleteshow=true" value="删除该收货地址" />
          </van-address-edit>
        </div>
      </div>
    </div>
    <!-- 删除弹窗 -->
    <van-dialog
      v-model="deleteshow"
      @cancel="deleteshow=false"
      @confirm="deleteaddress"
      title="删除"
      show-cancel-button
    >
      <p class="deletetext">是否确认删除？</p>
    </van-dialog>
    <!-- <van-dialog v-model="backShow" title="标题" show-cancel-button>
      <p>当前修改内容未保存，是否退出？</p>
    </van-dialog>-->
  </div>
</template>
<script>
import area from "@/utils/area";
export default {
  name: "Addgoods",
  data() {
    return {
      // backShow:false,
      areaList: {},
      AddressInfo: {},
      AddressInfo2: {},
      deleteshow: false,
      arr2name: "",
      idDefaultedit: null,
      isProvince: null,
      isCity: null,
      isCounty: null,
      delete: false,
      key: 0,
    };
  },

  watch: {

  },
  beforeRouteLeave(to, from, next) {
    let addressdom = document.querySelectorAll(
      ".van-address-edit__fields .van-field__control"
    );
    let a2 = this.AddressInfo2;
    if (this.delete) {
      addressdom[0].value = a2.name;
      addressdom[1].value = a2.tel;
    }
    if (this.$route.query.isadd == 2) {
      if (
        (this.arr2name != a2.addressDetail) |
        (this.idDefaultedit != a2.isDefault) |
        (this.isProvince != a2.province) |
        (this.isCity != a2.city) |
        (this.isCounty != a2.county) |
        (addressdom[0].value != a2.name) |
        (addressdom[1].value != a2.tel)
      ) {
        this.Dialog.confirm({
          title: '提示',
          message: '当前修改内容未保存，是否退出？',
        })
          .then(() => {
            next();
          })
          .catch(() => {
            next(false);
          });
      } else {
        next(true);
      }
    } else {
      next(true);
    }
  },
  created() {
    // this.edits();
    let equery = this.$route.query;
    if (equery.isDefault == "true") {
      equery.isDefault = true;
    } else {
      equery.isDefault = false;
    }
    this.arr2name = equery.addressDetail;
    this.idDefaultedit = equery.isDefault;
    this.isProvince = equery.province;
    this.isCity = equery.city;
    this.isCounty = equery.county;
    this.AddressInfo2 = equery;
  },
  mounted() {
    this.areaList = area;
  },
  methods: {
    //地区
    areaChange(values) {
      this.isProvince = values[0].name;
      this.isCity = values[1].name;
      this.isCounty = values[2].name;
    },
    //是否默认
    isDefaultChange(value) {
      this.idDefaultedit = value;
    },
    //详细地址
    detailChange(value) {
      this.arr2name = value;
    },
    //新增 修改
    onSave(content) {
      //跳过守卫，重新赋值
      this.AddressInfo2 = content;
      let arr = {};
      if (this.$route.query.isadd == 1) {
        //add
        arr = {
          address: content.addressDetail,
          city: content.city,
          country: content.county,
          isDefault: content.isDefault,
          name: content.name,
          phone: content.tel,
          province: content.province,
          areaCode: content.areaCode,
        };
      } else if (this.$route.query.isadd == 2) {
        //edit
        arr = {
          id: this.$route.query.id,
          address: content.addressDetail,
          city: content.city,
          country: content.county,
          isDefault: content.isDefault,
          name: content.name,
          phone: content.tel,
          province: content.province,
          areaCode: content.areaCode,
        };
      }
      this.$api.app.my.getSaveAddress(arr).then((res) => {
        if (res.code == 200) {
          if (this.$route.query.isadd == 1) {
            this.Toast("新增成功");
          } else {
            this.Toast("修改成功");
          }
          this.$router.back();
        } else {
          this.Toast(res.msg);
        }
      });
    },
    //删除地址
    deleteaddress() {
      this.delete = true;
      let eqr = this.AddressInfo2;
      this.arr2name = eqr.addressDetail;
      this.idDefaultedit = eqr.isDefault;
      this.isProvince = eqr.province;
      this.isCity = eqr.city;
      this.isCounty = eqr.county;

      this.$api.app.my.getDeleteAddress(this.$route.query.id).then((res) => {
        if (res.code == 200) {
          this.Toast("删除成功");
          this.$router.back();
          this.$forceUpdate();
        } else {
          this.Toast(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.addgoods {
  max-height: 100vh;
  overflow: hidden;
}
>>> .van-cell {
  padding: 10px 25px;
  font-size: 0.373333rem;
}
//   >>> .van-field__label {
//     width: 4em;
//   }
.margintop {
  margin-top: 0.133333rem;
}
>>> .van-switch {
  background: #aeaeae;
}
>>> .van-switch--on {
  background: #fe5747;
}
>>> .van-cell__value--alone {
  color: #fe5747;
}
>>> .van-button {
  width: 100%;
  height: 1.2rem;
  background: linear-gradient(
    150deg,
    rgba(253, 87, 71, 1),
    rgba(251, 33, 71, 1)
  );
  box-shadow: 0px 4px 16px 0px rgba(161, 161, 161, 0.41);
  border-radius: 0.133333rem;
  font-size: 0.373333rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
>>> .van-address-edit-detail {
  padding: 0;
}
>>> .van-address-edit {
  padding: 0;
}
>>> .van-address-edit__fields {
  border-radius: 0;
}
>>> .van-address-edit__default {
  border-radius: 0;
}
>>> .van-address-edit__buttons {
  margin-top: 165px;
  padding: 0.853333rem 0.533333rem;
}
.minheight {
  >>> .van-address-edit__default {
    margin-top: -95px;
    border-radius: 0;
  }
  .deleteaddress {
    margin-top: 58px;
  }
}
.deletetext {
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 94px;
  color: #ef5457;
}
>>> .van-dialog {
  .van-button {
    background: none;
    box-shadow: none;
    color: #000;
  }
  .van-dialog__confirm,
  .van-dialog__confirm:active {
    color: #fe5747;
  }
}
</style>