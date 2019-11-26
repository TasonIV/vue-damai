<template>
  <div class="agree">
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title border-1px">VIP会员权益规则</span>
    </div>
    <div class="container">
      <div class="content">
        <h3>大麦网VIP会员常见问题</h3>
        1.会员有哪些权益？
        答：会员身份标识+全场通用组合优惠券包+各类品牌优惠券，更多惊喜权益陆续推出中。
        2.怎么查看会员信息？
        答：您可以通过登录大麦网VIP会员中心查询您的账号信息详情，包括已开通的服务内容、服务期限。
        3.优惠券怎么获取？
        答：用户购买会员后，组合券包将自动发放到用户大麦网账户中。品牌优惠券需用户进入品牌馆点击领取。其他品类优惠券的领取以相关服务页面公布为准。
        4.怎么查看优惠券？
        答：进入“我的"--"优惠券"即可查看。
        5.为什么“我的"--"优惠券"里找不到品牌券？
        答：品牌优惠券需用户进入品牌馆，点击领取。
        6.会员有效期？
        答：您可以通过登录大麦网VIP会员中心查询服务期限。
        7.优惠券有效期？
        答：组合优惠券的有效期与会员有效期一致。品牌券的有效期为领取后90天。其他品类优惠券的有效期以相关服务页面公布为准。
        8.优惠券怎么使用？
        答：（1）组合优惠券可用于购买大麦网全部在售项目（部分不支持任何优惠券使用的项目除外）；品牌券可用于购买品牌馆对应品牌下的在售项目（部分不支持任何优惠券使用的项目除外）。
        （2）用户付款时订单总金额达到满减额度时，优惠券金额将在支付时自动抵扣。用户拥有多张优惠券时，仅可任选一张符合抵用条件的优惠券使用。所有优惠劵不可叠加或累计使用，一个订单只能使用一张优惠券。
        （3）可使用渠道：大麦客户端（IOS/Andriod）、大麦网PC端（www.damai.cn）、大麦网M站（m.damai.cn）、大麦网微信小程序、大麦网支付宝小程序。
        （4） 优惠券不可兑现、不可转让、不可出售、过期作废。
        9.若退款，优惠券退吗？
        答：如使用优惠券购买的项目发生用户个人原因导致的退款，优惠券无法退还。
        10.优惠券可以赠送给他人使用吗？
        答：抱歉不支持赠送，优惠券仅限订购VIP会员卡的用户账户使用。
        11. 购买会员后，怎么申请开发票？
        答：需要您联系客服小二，由小二帮您申请。
        原则上开取普通增值税发票，普通增值税发票需提供完整的公司抬头和纳税识别号（三证合一后统称为“ 统一社会信用代码”）。
        如您需要开增值税专用发票，需特别告知客服小二。增值税专用发票需要您提供纳税识别号（三证合一后统称为“统一社会信用代码”）、地址、电话、开户行及账号，客户并上传公司的营业执照副本、税务登记证副本、开户许可证、一般纳税人资质证明/国税一般纳税人查询结果（盖公章的扫描件）。
        仅支持电子发票，提交申请后7个工作日内开具。
        12. 购买会员后，可以退吗？
        答：您有权申请取消VIP会员服务，但此取消行为将无法获得已交纳的VIP会员服务费的退还（因大麦网原因导致购买时被重复扣款或无法提供会员权益的情形除外）。
        13. 一个账号可以多买多个会员吗？
        答：同一账号可以购买多个会员资格，但无法同时生效（即：依开通时间排序，首个会员资格到期后，第二个会员资格方才生效。）
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$emit("q-back");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../../public/scss/index.scss";
@import "../../../../public/scss/mixin.scss";

.agree {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 20;
}

.header {
  padding: 0 0.3rem;
  height: 1rem;
  text-align: center;
  background: #fff;
  @include scale-border-bottom(rgba(7, 17, 27, 0.2));

  .close {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: 1rem;
    font-size: 0.4rem;
    line-height: 1rem;
    text-align: center;
  }

  .title {
    font-size: 0.42rem;
    vertical-align: middle;
    position: relative;
    top: -0.14rem;
  }
}

.container {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 0.3rem;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .content {
    padding: 0.3rem 0;
    font-size: 0.3rem;
    line-height: 0.46rem;
  }
}
</style>