// Starter question pack for Eval Lab V0.
//
// 10 Answer Core regression Qs (mirror QA_GATES §3) +
// 20 DeepSeek-open Qs spanning the 在留行政 long tail.
//
// These seed the page on first load. Reviewers can add more via the
// import textarea or the "新增" button.

export interface StarterQuestion {
  question: string
  starter_tag: string
}

export const STARTER_QUESTIONS: StarterQuestion[] = [
  // ---- Answer Core 10 (matches scripts/test/test-answer-core-v1.ts) ----
  { question: '配偶签离婚后想转定住', starter_tag: 'answer-core-regression-Q01' },
  { question: '厚生年金截止日期是什么时候？', starter_tag: 'answer-core-regression-Q02' },
  { question: '家族滞在想转工作签', starter_tag: 'answer-core-regression-Q03' },
  { question: '我是经管签，想转人文签', starter_tag: 'answer-core-regression-Q04' },
  { question: '人文签转经管签怎么办', starter_tag: 'answer-core-regression-Q05' },
  { question: '经管续签材料有哪些', starter_tag: 'answer-core-regression-Q06' },
  { question: '代表取締役换人要通知入管吗', starter_tag: 'answer-core-regression-Q07' },
  { question: '入管让补材料，期限赶不上怎么办', starter_tag: 'answer-core-regression-Q08' },
  { question: '不许可通知书怎么办', starter_tag: 'answer-core-regression-Q09' },
  { question: '永住申请年金没交怎么办', starter_tag: 'answer-core-regression-Q10' },

  // ---- DeepSeek-open 20 — 在留行政长尾 ----
  { question: '搬家以后在留卡地址什么时候必须更新？逾期会怎样？', starter_tag: 'deepseek-open-01-zairyu-address' },
  { question: '换工作以后多少天内要向入管报告？怎么报？', starter_tag: 'deepseek-open-02-jobchange-tdkst' },
  { question: '日本人配偶离婚后第二个月才发现没做届出，现在补做来得及吗？', starter_tag: 'deepseek-open-03-haigusha-late-todoke' },
  { question: '经管签想加一个 director 同事进来挂名，会不会影响我自己的更新？', starter_tag: 'deepseek-open-04-keiei-director-add' },
  { question: '高度专门职 70 分够吗？我想知道大概什么职位什么收入能凑到。', starter_tag: 'deepseek-open-05-highly-skilled-70pt' },
  { question: '永住申请前补缴年金，记录上还会显示「滞纳过」吗？', starter_tag: 'deepseek-open-06-eiju-nenkin-tainouseki' },
  { question: '家族滞在的小孩 18 岁了能继续留在日本吗？还是必须自己换签？', starter_tag: 'deepseek-open-07-family-stay-child-18' },
  { question: '离职以后到入职前那两个月，国民健康保险一定要交吗？', starter_tag: 'deepseek-open-08-blank-period-kokuho' },
  { question: '在日本被警察问话，需要主动告诉公司吗？会影响在留更新吗？', starter_tag: 'deepseek-open-09-police-questioning' },
  { question: '我有日本国籍小孩，未婚妈妈身份能申请定住者吗？', starter_tag: 'deepseek-open-10-unmarried-mother-teiju' },
  { question: '经管签个人独资还是合资公司更稳？', starter_tag: 'deepseek-open-11-keiei-sole-vs-joint' },
  { question: '辞职信和离职票哪个才是入管要的？', starter_tag: 'deepseek-open-12-jishokuhyou-vs-jihyo' },
  { question: '在留卡丢了去派出所还是去入管？', starter_tag: 'deepseek-open-13-zairyu-card-lost' },
  { question: '日语 N1 对永住申请有帮助吗？没考会被拒吗？', starter_tag: 'deepseek-open-14-eiju-n1' },
  { question: '在日本买房会影响经营管理签吗？', starter_tag: 'deepseek-open-15-keiei-buy-house' },
  { question: '父母想来日本短期探亲三个月，要什么签？我要准备什么材料？', starter_tag: 'deepseek-open-16-parent-short-stay' },
  { question: '行政書士和入管哪个能给我"准批结论"？', starter_tag: 'deepseek-open-17-shoshi-vs-immigration' },
  { question: '不许可可以马上再申请吗？还是要等？', starter_tag: 'deepseek-open-18-fukyokai-resubmit' },
  { question: '经管签开了第二家公司，要不要分别报入管？', starter_tag: 'deepseek-open-19-keiei-second-company' },
  { question: '已经拿永住的人结婚归化要走哪条路？', starter_tag: 'deepseek-open-20-eiju-marriage-kika' },
]
