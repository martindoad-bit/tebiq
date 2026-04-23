// 付费架构 stub - 仅声明接口，未实现
// 后续接入 PayPay / Stripe / 微信支付时替换实现即可

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type ProductId =
  | 'tebiq_full_check' // 完整自查（红/黄解锁详细方案）
  | 'tebiq_consult' // 一次书士在线咨询
  | 'tebiq_doc_pack' // 完整材料包生成

export interface ProductPricing {
  id: ProductId
  name: string
  description: string
  amountJpy: number
}

export const PRODUCTS: Record<ProductId, ProductPricing> = {
  tebiq_full_check: {
    id: 'tebiq_full_check',
    name: '完整自查升级',
    description: '解锁全部红/黄项目的详细处理方案与材料模板',
    amountJpy: 980,
  },
  tebiq_consult: {
    id: 'tebiq_consult',
    name: '书士在线咨询',
    description: '30 分钟一对一咨询，针对你的具体情况',
    amountJpy: 4980,
  },
  tebiq_doc_pack: {
    id: 'tebiq_doc_pack',
    name: '完整材料包生成',
    description: '基于你的回答自动生成可打印的材料指引 PDF',
    amountJpy: 1980,
  },
}

export interface Order {
  id: string
  userId: string
  product: ProductId
  amountJpy: number
  status: OrderStatus
  createdAt: string
  paidAt?: string
  refundedAt?: string
  externalRef?: string // 第三方支付平台订单号
}

export interface CreateOrderInput {
  userId: string
  product: ProductId
  metadata?: Record<string, unknown>
}

export interface CreateOrderResult {
  order: Order
  redirectUrl: string // 支付页 URL
}

/**
 * 创建订单并返回支付跳转链接
 * 实现时调用 PayPay/Stripe/WeChatPay SDK
 */
export async function createOrder(_input: CreateOrderInput): Promise<CreateOrderResult> {
  throw new Error('createOrder not implemented')
}

/**
 * 第三方平台 webhook 回调时验证支付状态
 */
export async function verifyPayment(_orderId: string, _signature: string): Promise<boolean> {
  throw new Error('verifyPayment not implemented')
}

/**
 * 查询订单状态
 */
export async function getOrder(_orderId: string): Promise<Order | null> {
  throw new Error('getOrder not implemented')
}

/**
 * 列出用户订单
 */
export async function listUserOrders(_userId: string): Promise<Order[]> {
  throw new Error('listUserOrders not implemented')
}

/**
 * 退款
 */
export async function refundOrder(_orderId: string, _reason: string): Promise<boolean> {
  throw new Error('refundOrder not implemented')
}

/**
 * 检查用户是否已购买某产品（用于解锁付费内容）
 */
export async function userHasPurchased(_userId: string, _product: ProductId): Promise<boolean> {
  // 默认返回 false，框架预留
  return false
}
