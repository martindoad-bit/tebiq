// Starter question pack for Eval Lab V1.
//
// 100 questions across 10 scenarios, designed to span the surface area
// production hits in week-1: visa transfers, 经管, 工作 / 转职, 家族 /
// 离婚, 永住 / 年金 / 税金, 补材料 / 不许可 / 入管通知, 区役所 /
// 在留卡 / 通知, 年金 / 社保 / 税务, 回国 / 出境 / 再入国, 高风险
// 边界判断.
//
// Each entry has a stable `starter_tag` (e.g. eval-lab-v1-A01) so the
// idempotent seed can re-run without duplicates.

export interface StarterQuestion {
  question: string
  starter_tag: string
  scenario: string  // matches the A-J grouping below
}

export const STARTER_QUESTIONS: StarterQuestion[] = [
  // --- A. 转签 / 方向题 (10) ---
  { question: '经营管理签怎么转技术・人文知识・国际业务？', starter_tag: 'eval-lab-v1-A01', scenario: 'A_visa_transfer' },
  { question: '技人国签证怎么转经营管理？', starter_tag: 'eval-lab-v1-A02', scenario: 'A_visa_transfer' },
  { question: '我是经管签，想转人文签，应该怎么准备？', starter_tag: 'eval-lab-v1-A03', scenario: 'A_visa_transfer' },
  { question: '我是人文签，想开公司转经管签，怎么办？', starter_tag: 'eval-lab-v1-A04', scenario: 'A_visa_transfer' },
  { question: '家族滞在想转工作签怎么办？', starter_tag: 'eval-lab-v1-A05', scenario: 'A_visa_transfer' },
  { question: '留学签想转人文签，需要什么条件？', starter_tag: 'eval-lab-v1-A06', scenario: 'A_visa_transfer' },
  { question: '经营管理签转高度专门职有可能吗？', starter_tag: 'eval-lab-v1-A07', scenario: 'A_visa_transfer' },
  { question: '人文签转定住者可以吗？', starter_tag: 'eval-lab-v1-A08', scenario: 'A_visa_transfer' },
  { question: '配偶签离婚后想转定住怎么办？', starter_tag: 'eval-lab-v1-A09', scenario: 'A_visa_transfer' },
  { question: '定住者想转永住，应该注意什么？', starter_tag: 'eval-lab-v1-A10', scenario: 'A_visa_transfer' },

  // --- B. 经营管理 (10) ---
  { question: '经管签搬办公室要通知哪里？', starter_tag: 'eval-lab-v1-B01', scenario: 'B_keiei' },
  { question: '经管签办公室搬到共享办公可以吗？', starter_tag: 'eval-lab-v1-B02', scenario: 'B_keiei' },
  { question: '经管签办公室搬到自宅办公可以吗？', starter_tag: 'eval-lab-v1-B03', scenario: 'B_keiei' },
  { question: '经管签更新材料有哪些？', starter_tag: 'eval-lab-v1-B04', scenario: 'B_keiei' },
  { question: '经管签公司没盈利还能更新吗？', starter_tag: 'eval-lab-v1-B05', scenario: 'B_keiei' },
  { question: '经管签资本金不够会影响更新吗？', starter_tag: 'eval-lab-v1-B06', scenario: 'B_keiei' },
  { question: '经管签想放弃回国，公司要怎么处理？', starter_tag: 'eval-lab-v1-B07', scenario: 'B_keiei' },
  { question: '经管签代表取締役换人要通知入管吗？', starter_tag: 'eval-lab-v1-B08', scenario: 'B_keiei' },
  { question: '经管签公司地址变更，法务局和入管都要办吗？', starter_tag: 'eval-lab-v1-B09', scenario: 'B_keiei' },
  { question: '经管签下次更新前，办公室照片和名牌要准备吗？', starter_tag: 'eval-lab-v1-B10', scenario: 'B_keiei' },

  // --- C. 技人国 / 工作 / 转职 (10) ---
  { question: '人文签换工作后要通知入管吗？', starter_tag: 'eval-lab-v1-C01', scenario: 'C_jinbun_work' },
  { question: '人文签离职后还没找到工作怎么办？', starter_tag: 'eval-lab-v1-C02', scenario: 'C_jinbun_work' },
  { question: '人文签工作内容和原来不一样会影响签证吗？', starter_tag: 'eval-lab-v1-C03', scenario: 'C_jinbun_work' },
  { question: '人文签公司不给材料怎么办？', starter_tag: 'eval-lab-v1-C04', scenario: 'C_jinbun_work' },
  { question: '人文签更新前换工作会不会危险？', starter_tag: 'eval-lab-v1-C05', scenario: 'C_jinbun_work' },
  { question: '技人国签证可以做销售工作吗？', starter_tag: 'eval-lab-v1-C06', scenario: 'C_jinbun_work' },
  { question: '技人国签证可以做餐饮店现场工作吗？', starter_tag: 'eval-lab-v1-C07', scenario: 'C_jinbun_work' },
  { question: '工作签证辞职后多久内要找到新工作？', starter_tag: 'eval-lab-v1-C08', scenario: 'C_jinbun_work' },
  { question: '转职后工资降低会影响更新吗？', starter_tag: 'eval-lab-v1-C09', scenario: 'C_jinbun_work' },
  { question: '公司倒闭了，我的人文签怎么办？', starter_tag: 'eval-lab-v1-C10', scenario: 'C_jinbun_work' },

  // --- D. 家族 / 配偶 / 离婚 (10) ---
  { question: '家族滞在想打工怎么办？', starter_tag: 'eval-lab-v1-D01', scenario: 'D_family_haigusha' },
  { question: '家族滞在打工超过 28 小时怎么办？', starter_tag: 'eval-lab-v1-D02', scenario: 'D_family_haigusha' },
  { question: '家族滞在想转工作签需要什么？', starter_tag: 'eval-lab-v1-D03', scenario: 'D_family_haigusha' },
  { question: '配偶签分居会影响更新吗？', starter_tag: 'eval-lab-v1-D04', scenario: 'D_family_haigusha' },
  { question: '日本人配偶签离婚后还能留在日本吗？', starter_tag: 'eval-lab-v1-D05', scenario: 'D_family_haigusha' },
  { question: '配偶签离婚后多久要处理在留问题？', starter_tag: 'eval-lab-v1-D06', scenario: 'D_family_haigusha' },
  { question: '配偶签和日本人分居但没离婚，更新会怎样？', starter_tag: 'eval-lab-v1-D07', scenario: 'D_family_haigusha' },
  { question: '配偶签想转定住，需要准备什么？', starter_tag: 'eval-lab-v1-D08', scenario: 'D_family_haigusha' },
  { question: '家人的在留资格跟我有关，我换签证会影响他们吗？', starter_tag: 'eval-lab-v1-D09', scenario: 'D_family_haigusha' },
  { question: '家族滞在的孩子毕业后能继续留在日本吗？', starter_tag: 'eval-lab-v1-D10', scenario: 'D_family_haigusha' },

  // --- E. 永住 / 年金 / 税金 (10) ---
  { question: '永住申请前年金没交怎么办？', starter_tag: 'eval-lab-v1-E01', scenario: 'E_eiju_basic' },
  { question: '永住申请前住民税晚交过一次怎么办？', starter_tag: 'eval-lab-v1-E02', scenario: 'E_eiju_basic' },
  { question: '永住申请前换工作会不会影响？', starter_tag: 'eval-lab-v1-E03', scenario: 'E_eiju_basic' },
  { question: '永住申请前收入不稳定怎么办？', starter_tag: 'eval-lab-v1-E04', scenario: 'E_eiju_basic' },
  { question: '永住申请前配偶的税金年金也要看吗？', starter_tag: 'eval-lab-v1-E05', scenario: 'E_eiju_basic' },
  { question: '永住申请前公司换了地址，会影响吗？', starter_tag: 'eval-lab-v1-E06', scenario: 'E_eiju_basic' },
  { question: '永住不许可后多久可以再申请？', starter_tag: 'eval-lab-v1-E07', scenario: 'E_eiju_basic' },
  { question: '永住申请中可以换工作吗？', starter_tag: 'eval-lab-v1-E08', scenario: 'E_eiju_basic' },
  { question: '永住申请中可以搬家吗？', starter_tag: 'eval-lab-v1-E09', scenario: 'E_eiju_basic' },
  { question: '永住申请前健康保险晚交过怎么办？', starter_tag: 'eval-lab-v1-E10', scenario: 'E_eiju_basic' },

  // --- F. 补材料 / 不许可 / 入管通知 (10) ---
  { question: '入管让我补材料，但期限赶不上怎么办？', starter_tag: 'eval-lab-v1-F01', scenario: 'F_immigration_notice' },
  { question: '补材料期限已经过了怎么办？', starter_tag: 'eval-lab-v1-F02', scenario: 'F_immigration_notice' },
  { question: '补材料通知书看不懂怎么办？', starter_tag: 'eval-lab-v1-F03', scenario: 'F_immigration_notice' },
  { question: '入管要求补交理由书，应该怎么写？', starter_tag: 'eval-lab-v1-F04', scenario: 'F_immigration_notice' },
  { question: '收到不许可通知书怎么办？', starter_tag: 'eval-lab-v1-F05', scenario: 'F_immigration_notice' },
  { question: '不许可后还能留在日本多久？', starter_tag: 'eval-lab-v1-F06', scenario: 'F_immigration_notice' },
  { question: '不许可后还能再申请吗？', starter_tag: 'eval-lab-v1-F07', scenario: 'F_immigration_notice' },
  { question: '不许可通知书上写的期限是什么意思？', starter_tag: 'eval-lab-v1-F08', scenario: 'F_immigration_notice' },
  { question: '入管让去窗口说明情况，我该准备什么？', starter_tag: 'eval-lab-v1-F09', scenario: 'F_immigration_notice' },
  { question: '入管寄来的日文通知，我不知道是什么怎么办？', starter_tag: 'eval-lab-v1-F10', scenario: 'F_immigration_notice' },

  // --- G. 区役所 / 地址 / 在留卡 / 通知 (10) ---
  { question: '在留卡地址和实际住址不一致怎么办？', starter_tag: 'eval-lab-v1-G01', scenario: 'G_kuyakusho_zairyu' },
  { question: '搬家后区役所和入管都要通知吗？', starter_tag: 'eval-lab-v1-G02', scenario: 'G_kuyakusho_zairyu' },
  { question: '搬家后在留卡地址什么时候要改？', starter_tag: 'eval-lab-v1-G03', scenario: 'G_kuyakusho_zairyu' },
  { question: '在留卡丢了怎么办？', starter_tag: 'eval-lab-v1-G04', scenario: 'G_kuyakusho_zairyu' },
  { question: '在留卡快到期但还没收到更新结果怎么办？', starter_tag: 'eval-lab-v1-G05', scenario: 'G_kuyakusho_zairyu' },
  { question: '收到区役所的日文通知，看不懂怎么办？', starter_tag: 'eval-lab-v1-G06', scenario: 'G_kuyakusho_zairyu' },
  { question: '收到税务署的日文通知，看不懂怎么办？', starter_tag: 'eval-lab-v1-G07', scenario: 'G_kuyakusho_zairyu' },
  { question: '海外转出届应该什么时候办？', starter_tag: 'eval-lab-v1-G08', scenario: 'G_kuyakusho_zairyu' },
  { question: '回日本后住民登录要怎么做？', starter_tag: 'eval-lab-v1-G09', scenario: 'G_kuyakusho_zairyu' },
  { question: '住民票信息和在留卡信息不一致怎么办？', starter_tag: 'eval-lab-v1-G10', scenario: 'G_kuyakusho_zairyu' },

  // --- H. 年金 / 社保 / 税务 (10) ---
  { question: '厚生年金截止日期是什么时候？', starter_tag: 'eval-lab-v1-H01', scenario: 'H_pension_tax' },
  { question: '国民年金没交会影响签证吗？', starter_tag: 'eval-lab-v1-H02', scenario: 'H_pension_tax' },
  { question: '住民税没交会影响更新吗？', starter_tag: 'eval-lab-v1-H03', scenario: 'H_pension_tax' },
  { question: '公司没有给我加入社保怎么办？', starter_tag: 'eval-lab-v1-H04', scenario: 'H_pension_tax' },
  { question: '离职后健康保险要怎么处理？', starter_tag: 'eval-lab-v1-H05', scenario: 'H_pension_tax' },
  { question: '回国前年金脱退一时金怎么办？', starter_tag: 'eval-lab-v1-H06', scenario: 'H_pension_tax' },
  { question: '回国前要不要指定纳税管理人？', starter_tag: 'eval-lab-v1-H07', scenario: 'H_pension_tax' },
  { question: '确定申告没做会影响签证吗？', starter_tag: 'eval-lab-v1-H08', scenario: 'H_pension_tax' },
  { question: '税务署通知让我补税，会影响永住吗？', starter_tag: 'eval-lab-v1-H09', scenario: 'H_pension_tax' },
  { question: '住民税晚交和未交有什么区别？', starter_tag: 'eval-lab-v1-H10', scenario: 'H_pension_tax' },

  // --- I. 回国 / 出境 / 再入国 (10) ---
  { question: '想放弃经管签回国，要办什么手续？', starter_tag: 'eval-lab-v1-I01', scenario: 'I_exit_reentry' },
  { question: '回国后在留卡要不要还？', starter_tag: 'eval-lab-v1-I02', scenario: 'I_exit_reentry' },
  { question: '再入国许可和みなし再入国有什么区别？', starter_tag: 'eval-lab-v1-I03', scenario: 'I_exit_reentry' },
  { question: '签证更新中可以出境吗？', starter_tag: 'eval-lab-v1-I04', scenario: 'I_exit_reentry' },
  { question: '更新申请中回国，会影响结果吗？', starter_tag: 'eval-lab-v1-I05', scenario: 'I_exit_reentry' },
  { question: '离开日本一年以上，在留资格会怎样？', starter_tag: 'eval-lab-v1-I06', scenario: 'I_exit_reentry' },
  { question: '回国后以后还能办旅游签吗？', starter_tag: 'eval-lab-v1-I07', scenario: 'I_exit_reentry' },
  { question: '公司还没清算，我可以直接回国吗？', starter_tag: 'eval-lab-v1-I08', scenario: 'I_exit_reentry' },
  { question: '回国前区役所、税务、年金要办什么？', starter_tag: 'eval-lab-v1-I09', scenario: 'I_exit_reentry' },
  { question: '非再入国出境是什么意思？', starter_tag: 'eval-lab-v1-I10', scenario: 'I_exit_reentry' },

  // --- J. 边界 / 高风险 / 通知理解 (10) ---
  { question: '我不知道自己现在该办什么手续，怎么办？', starter_tag: 'eval-lab-v1-J01', scenario: 'J_edge_risk' },
  { question: '我收到一封日文信，只知道是入管寄来的，怎么办？', starter_tag: 'eval-lab-v1-J02', scenario: 'J_edge_risk' },
  { question: '我签证快到期了，但材料还没准备好怎么办？', starter_tag: 'eval-lab-v1-J03', scenario: 'J_edge_risk' },
  { question: '我被公司解雇了，在留怎么办？', starter_tag: 'eval-lab-v1-J04', scenario: 'J_edge_risk' },
  { question: '我离婚了，但还没告诉入管怎么办？', starter_tag: 'eval-lab-v1-J05', scenario: 'J_edge_risk' },
  { question: '我在日本开公司但实际没怎么经营，会影响经管更新吗？', starter_tag: 'eval-lab-v1-J06', scenario: 'J_edge_risk' },
  { question: '我想从打工转成自己开店，应该怎么走？', starter_tag: 'eval-lab-v1-J07', scenario: 'J_edge_risk' },
  { question: '我的在留资格和现在实际工作不一致怎么办？', starter_tag: 'eval-lab-v1-J08', scenario: 'J_edge_risk' },
  { question: '我之前有税金年金问题，现在想申请永住怎么办？', starter_tag: 'eval-lab-v1-J09', scenario: 'J_edge_risk' },
  { question: '我担心自己漏了手续，怎么检查？', starter_tag: 'eval-lab-v1-J10', scenario: 'J_edge_risk' },
]
