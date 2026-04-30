# Payment Strategy Note

## 当前状态

- Stripe: 已有代码骨架和账号准备，但本轮不接入、不验证、不作为已支持支付方式对外承诺。
- PayPay: 未接入。
- WeChat Pay / 微信支付: 未接入。
- Konbini / 便利店付款: 未接入。
- 当前 production 不应显示“已支持 PayPay / 微信支付 / Stripe 已可用”等承诺。

## 策略建议

### 订阅

订阅优先考虑 Stripe card / Apple Pay / Google Pay。

原因：
- 自动续费、取消、账单、收据和退款流程更接近订阅产品需求。
- Apple Pay / Google Pay 可以降低手机端输入卡号成本。
- 后台 webhook 和订阅状态同步相对成熟。

### 一次性付款

PayPay / Konbini 可以作为一次性付款候选。

适用场景：
- 单次咨询。
- 单次资料包。
- 一次性处理费。

### 微信支付

微信支付需要单独研究跨境收单、主体资质、结算币种、汇率和税务处理。本轮不建议承诺上线。

## 重要限制

- PayPay 适合一次性付款，不适合自动订阅。
- Stripe PayPay 不支持 Checkout subscription mode。
- Konbini 适合便利店付款，但不等同于自动月订阅。
- 如果使用 Konbini，用户付款和系统开通之间会存在确认延迟。
- 如果支付方式尚未确定，`/pricing`、`/tokusho`、`/privacy`、`/terms` 不应写成“已支持某支付方式”。

## 本轮结论

本轮只做支付策略记录和用户可见承诺降噪，不接 Stripe / PayPay / 微信支付。
