/**
  * 平台类型
  */
@ApiModelProperty("平台类型")
private DockingTypeEnum dockingType;

/**
  * 个人预估佣金
  */
@ApiModelProperty("个人预估佣金")
private String memberForecastCommission;
/**
  * 是否需要转链
  */
@ApiModelProperty("是否需要转链")
private boolean isTurnChain;
/**
  * 宝贝+券二合一页面链接
  */
@ApiModelProperty("宝贝+券二合一页面链接")
private String couponShareUrl;
/**
  * 链接-宝贝推广链接【不领券购买链接】
  */
@ApiModelProperty("链接-宝贝推广链接【不领券购买链接】")
private String url;
/**
  * 搜索ID 【拼多多转链需要】
  */
@ApiModelProperty("搜索ID 【拼多多转链需要】")
private String searchId;

/**
  * 商品类目ID
  */
@ApiModelProperty("商品类目ID")
private Long categoryId;
/**
  * 商品类目名称
  */
@ApiModelProperty("商品类目名称")
private String categoryName;

/**
  * 是否有优惠券
  */
@ApiModelProperty("是否有优惠券")
private boolean hasCoupon;
/**
  * 优惠券（元）
  */
@ApiModelProperty("优惠券（元）")
private String couponAmount;
/**
  * 优惠券信息-优惠券结束时间
  */
@ApiModelProperty("优惠券结束时间")
private String couponEndTime;
/**
  * 优惠券信息-优惠券id
  */
@ApiModelProperty("优惠券id")
private String couponId;
/**
  * 优惠券信息-优惠券满减信息
  */
@ApiModelProperty("优惠券满减信息")
private String couponInfo;
/**
  * 优惠券信息-优惠券剩余量
  */
@ApiModelProperty("优惠券剩余量")
private Long couponRemainCount;

/**
  * 优惠券信息-优惠券起用门槛，满X元可用。如：满299元减20元
  */
@ApiModelProperty("优惠券起用门槛 如：满299元减20元")
private String couponStartFee;
/**
  * 优惠券信息-优惠券开始时间
  */
@ApiModelProperty("优惠券开始时间")
private String couponStartTime;
/**
  * 优惠券信息-优惠券总量
  */
@ApiModelProperty("优惠券总量")
private Long couponTotalCount;

/**
  * 商品信息-宝贝描述(推荐理由)
  */
@ApiModelProperty("商品信息-宝贝描述(推荐理由)")
private String itemDescription;
/**
  * 商品信息-宝贝id
  */
@ApiModelProperty("商品信息-宝贝id")
private Long itemId;

/**
  * 商品信息-商品主图
  */
@ApiModelProperty("商品信息-商品主图")
private String pictUrl;
/**
  * 商品信息-商品一口价格
  */
@ApiModelProperty("商品信息-商品一口价格")
private String reservePrice;
/**
  * 活动价
  */
@ApiModelProperty("活动价")
private String salePrice;
/**
  * 券后价
  */
@ApiModelProperty("券后价")
private String couponLastPrice;
/**
  * 商品信息-商品短标题
  */
@ApiModelProperty("商品信息-商品短标题")
private String shortTitle;
/**
  * 商品信息-商品标题
  */
@ApiModelProperty("商品信息-商品标题")
private String title;
/**
  * 商品信息-淘客30天推广量
  */
@ApiModelProperty("商品信息-淘客30天推广量")
private String tkTotalSales;