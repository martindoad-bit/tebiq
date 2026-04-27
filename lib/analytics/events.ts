/**
 * 事件名称常量。集中在一个地方便于：
 *  - 全局搜索某个事件出现在哪些 surface
 *  - 拼写不踩坑
 *  - admin KPI 看板按 enum 列举
 *
 * 命名规范：`{domain}.{action}.{result?}`
 * domain = photo | quiz | cta | subscribe | invite | auth | error
 * 不同 surface 的同一动作用同一名字，差异放 payload。
 */
export const EVENT = {
  // 拍照即懂
  PHOTO_RECOGNIZE_ATTEMPT: 'photo.recognize.attempt',
  PHOTO_RECOGNIZE_SUCCESS: 'photo.recognize.success',
  PHOTO_RECOGNIZE_FAIL: 'photo.recognize.fail',
  PHOTO_QUOTA_EXCEEDED: 'photo.quota.exceeded',

  // 续签自查
  QUIZ_START: 'quiz.start',
  QUIZ_VISA_SELECTED: 'quiz.visa_selected',
  QUIZ_QUESTION_ANSWERED: 'quiz.question_answered',
  QUIZ_COMPLETED: 'quiz.completed',
  QUIZ_ABANDONED: 'quiz.abandoned',

  // CTA / 转化
  CTA_CLICK: 'cta.click',
  SUBSCRIBE_CHECKOUT_STARTED: 'subscribe.checkout_started',
  SUBSCRIBE_CHECKOUT_COMPLETED: 'subscribe.checkout_completed',
  INVITE_LINK_GENERATED: 'invite.link_generated',
  INVITE_LINK_SHARED: 'invite.link_shared',

  // 认证
  AUTH_OTP_SENT: 'auth.otp_sent',
  AUTH_LOGIN_SUCCESS: 'auth.login_success',
  AUTH_LOGIN_FAIL: 'auth.login_fail',

  // 错误（特别记录到 events 表，正式 stack trace 落 error_logs）
  CLIENT_ERROR: 'error.client',
} as const

export type EventName = (typeof EVENT)[keyof typeof EVENT]

/** 所有合法事件名（admin 看板按这个枚举绘制） */
export const ALL_EVENTS = Object.values(EVENT)
