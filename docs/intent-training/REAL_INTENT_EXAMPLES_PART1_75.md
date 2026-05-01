# Real Intent Examples — Part 1 / 4 (Q001-Q075)

主题：在留資格 转换 + HR + 跨签证综合

---

## 经管 → 人文（Q001-Q010）

- Q001:
  - query: "我现在是経営・管理，公司不想做了，想去朋友公司上班，能转技人国吗"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management, dormant-company-management-impact, visa-change-management-to-permanent]

- Q002:
  - query: "经管签证转人文知识 国际业务难度大不大？我是文系出身"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management, visa-change-student-to-engineer]

- Q003:
  - query: "公司经营不下去了，下个月想去日企打工，签证怎么办？"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [dormant-company-management-impact, visa-renewal-management]

- Q004:
  - query: "我经管在留期間还有2年，中途换技人国要重新算时间吗"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management, visa-change-management-to-permanent]

- Q005:
  - query: "经管签转打工签 公司还要保留吗？还是必须先注销"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [dormant-company-management-impact, hr-employment-notification]

- Q006:
  - query: "拿到内定了 但是我现在是经营管理签 怎么变更在留资格"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-student-to-engineer, visa-renewal-management]

- Q007:
  - query: "我是经管的 想去做翻译工作 这个属于人文还是技人国"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management]

- Q008:
  - query: "经营管理签下来才半年 现在想换工作签 入管会不会觉得我有问题"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management, dormant-company-management-impact]

- Q009:
  - query: "经管转技人国 学历不够本科怎么办 我是大专"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-skilled-to-engineer, visa-change-student-to-engineer]

- Q010:
  - query: "经营签证转工作签 需要等到下次更新还是随时可以申请"
  - expected_intent: visa-change-management-to-engineer
  - domain: visa
  - current_status: 経営・管理
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management]

---

## 人文 → 经管（Q011-Q020）

- Q011:
  - query: "在日本工作5年了 现在想自己开公司 技人国怎么转经管"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-engineer, visa-change-engineer-to-permanent]

- Q012:
  - query: "我现在是技人国 注册了株式会社 资本金500万 能不能马上转经管"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management, visa-renewal-engineer]

- Q013:
  - query: "技人国转经营管理 需要先辞职吗 还是可以兼着"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-engineer, hr-side-business]

- Q014:
  - query: "人文知识签证 想自己起业开店 在留資格变更要准备啥材料"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-engineer]

- Q015:
  - query: "现在做IT工程师 想跳出来开自己的合同会社 签证怎么搞"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-engineer, visa-change-engineer-to-permanent]

- Q016:
  - query: "技人国变更经管 事业计划书一定要日本人帮忙写吗"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management]

- Q017:
  - query: "我老婆要在国内继续工作 我一个人在日本起业 经管能批吗"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-dependent-to-management, visa-renewal-management]

- Q018:
  - query: "工作签转经营签 办公室一定要租独立的吗 共享办公空间行不行"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management]

- Q019:
  - query: "人文转经管 公司还没赚钱 能不能拿到签证"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management, dormant-company-management-impact]

- Q020:
  - query: "技人国签证还有8个月到期 想转经管 现在开始准备来得及吗"
  - expected_intent: visa-change-engineer-to-management
  - domain: visa
  - current_status: 技人国
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-engineer, visa-renewal-management]

---

## 特定技能 → 技人国（Q021-Q030）

- Q021:
  - query: "特定技能1号 现在公司想升我做正社员管理岗 能转技人国吗"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled, visa-change-skilled-to-skilled2]

- Q022:
  - query: "在介护行业做特定技能 大学读的是日语专业 能换技人国吗"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled]

- Q023:
  - query: "特定技能2号 想转工作签 需要满足什么条件"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能2号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled, visa-change-skilled-to-permanent]

- Q024:
  - query: "我特定技能在工厂干了3年 现在公司给我安排办公室翻译岗 这种情况签证怎么变"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled, hr-employment-notification]

- Q025:
  - query: "特定技能转技人国 学历必须本科以上吗 我在中国是高职"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-student-to-engineer]

- Q026:
  - query: "做料理人特定技能 想换签证去中华料理店当店长 算技人国吗"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-skilled-to-management, visa-renewal-skilled]

- Q027:
  - query: "特定技能签 工作内容跟技人国不一样吧 转的时候是不是要重新走面试"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled]

- Q028:
  - query: "特定技能可以直接申请技人国吗 还是必须先回国再来"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled]

- Q029:
  - query: "特定技能变更技人国 需要的文件清单有人能给我列一下吗"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled, visa-change-student-to-engineer]

- Q030:
  - query: "在饭店做特定技能2年了 N1过了 大学日语专业 能转人文国际业务吗"
  - expected_intent: visa-change-skilled-to-engineer
  - domain: visa
  - current_status: 特定技能1号
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-skilled]

---

## 留学 → 技人国（Q031-Q040）

- Q031:
  - query: "今年4月毕业 内定拿到了 留学转工作签什么时候能交材料"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-student, visa-change-student-to-jobhunting]

- Q032:
  - query: "留学生应届 内定的工作和我专业不太对口 能拿到技人国吗"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-student, visa-change-student-to-jobhunting]

- Q033:
  - query: "我3月毕业 4月入职 但是签证还没下来怎么办 能上班吗"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [hr-employment-notification, visa-renewal-student]

- Q034:
  - query: "专门学校毕业 想申请技人国 学历会被卡吗"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-skilled-to-engineer, visa-renewal-student]

- Q035:
  - query: "大学院修士毕业 内定是销售岗 这种岗位入管会批吗"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-student]

- Q036:
  - query: "留学转工作签 要交去年的住民税证明吗 我打工没怎么交税"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [tax-residence-tax, visa-renewal-student]

- Q037:
  - query: "毕业了还没找到工作 留学签到期前能申请什么签证缓冲一下"
  - expected_intent: visa-change-student-to-jobhunting
  - domain: visa
  - current_status: 留学
  - target_status: 特定活動（求职）
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-student-to-engineer, visa-renewal-student]

- Q038:
  - query: "学校开的成绩单和卒業見込証明書 这俩留学转工作签都要吗"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-student]

- Q039:
  - query: "我读完语言学校 现在拿到了一家公司offer 能直接转技人国不读专门学校"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-student, visa-change-skilled-to-engineer]

- Q040:
  - query: "留学签出勤率不到80% 现在想转技人国 会不会被拒"
  - expected_intent: visa-change-student-to-engineer
  - domain: visa
  - current_status: 留学
  - target_status: 技人国
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-student]

---

## 公司休眠 + 经营管理（Q041-Q050）

- Q041:
  - query: "公司没生意了想休眠 我经管签证还能保留吗"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-renewal-management, visa-change-management-to-engineer]

- Q042:
  - query: "公司决定异动届出 要交休眠申请 入管那边需要同步报告吗"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [hr-employment-notification, visa-renewal-management]

- Q043:
  - query: "公司停业了半年没收入 经管续签会不会被拒"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-renewal-management]

- Q044:
  - query: "我打算解散公司 经管签马上失效吗 还是有缓冲时间"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-change-management-to-engineer, visa-renewal-management]

- Q045:
  - query: "经管签证持有中 公司让会计帮忙做休眠 这事儿要不要主动通知入管"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-renewal-management, hr-employment-notification]

- Q046:
  - query: "公司零申告了2期 经管在留期間更新会被拒吗"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-renewal-management, tax-corporate-zero-filing]

- Q047:
  - query: "想暂时把公司休眠 出去打工一段时间再回来 经管签会不会丢"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-change-management-to-engineer, hr-side-business]

- Q048:
  - query: "公司解散清算中 经管签还剩1年 这期间我能继续待在日本吗"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-renewal-management, visa-change-management-to-engineer]

- Q049:
  - query: "公司休眠期间能不能保留经管签 等以后再开张"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-renewal-management]

- Q050:
  - query: "我公司账上3年都是亏的 想休眠 经管签影响多大"
  - expected_intent: dormant-company-management-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-renewal-management, tax-corporate-zero-filing]

---

## 老板雇错签证（Q051-Q055）

- Q051:
  - query: "我老板雇了一个签证不能打工的人 我作为同事会被牵连吗"
  - expected_intent: employer-illegal-employment-impact
  - domain: visa
  - current_status: 技人国
  - target_status: --
  - subject: 雇员
  - template: hr-employment-violation
  - must_not_match: [hr-employment-notification, visa-renewal-engineer]

- Q052:
  - query: "公司被查出雇了非法滞在 我自己签证正常 会不会下次更新被拒"
  - expected_intent: employer-illegal-employment-impact
  - domain: visa
  - current_status: 技人国
  - target_status: --
  - subject: 雇员
  - template: hr-employment-violation
  - must_not_match: [visa-renewal-engineer, hr-employment-notification]

- Q053:
  - query: "老板招了一个家族滞在的人全职上班 入管来查 我被叫去问话怎么办"
  - expected_intent: employer-illegal-employment-impact
  - domain: visa
  - current_status: 技人国
  - target_status: --
  - subject: 雇员
  - template: hr-employment-violation
  - must_not_match: [hr-employment-notification, visa-change-dependent-to-engineer]

- Q054:
  - query: "我们店里有个留学生超过28小时打工 老板说没事 真的不会出问题吗 我也在这上班"
  - expected_intent: employer-illegal-employment-impact
  - domain: visa
  - current_status: 技人国
  - target_status: --
  - subject: 雇员
  - template: hr-employment-violation
  - must_not_match: [hr-employment-notification, visa-renewal-student]

- Q055:
  - query: "公司因为雇用不法在留被罚 我作为正社员要怎么自保 经管签证下次能更新吗"
  - expected_intent: employer-illegal-employment-impact
  - domain: visa
  - current_status: 経営・管理
  - target_status: --
  - subject: 雇员
  - template: hr-employment-violation
  - must_not_match: [visa-renewal-management, dormant-company-management-impact]

---

## HR 问题（Q056-Q065）

- Q056:
  - query: "公司新雇了一个外国人 入管那边的雇用届出怎么提交"
  - expected_intent: hr-employment-notification
  - domain: hr
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-employment-notification
  - must_not_match: [hr-social-insurance-onboarding, employer-illegal-employment-impact]

- Q057:
  - query: "外国人员工入职 雇用保险 厚生年金 社保 怎么一次办齐"
  - expected_intent: hr-social-insurance-onboarding
  - domain: social-insurance
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-onboarding
  - must_not_match: [hr-employment-notification, social-insurance-pension-individual]

- Q058:
  - query: "我招的中国员工还在国内 在留资格认定证明书发了 这期间公司要做啥"
  - expected_intent: hr-employment-notification
  - domain: hr
  - current_status: --
  - target_status: 技人国
  - subject: 雇主
  - template: hr-onboarding
  - must_not_match: [visa-change-student-to-engineer, hr-social-insurance-onboarding]

- Q059:
  - query: "我是HR 想确认一下外国员工签证类型 怎么验证他能不能合法上班"
  - expected_intent: hr-visa-verification
  - domain: hr
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-onboarding
  - must_not_match: [employer-illegal-employment-impact, hr-employment-notification]

- Q060:
  - query: "外国员工辞职了 雇用保险离职届和入管的离职届都要交吗"
  - expected_intent: hr-employment-notification
  - domain: hr
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-offboarding
  - must_not_match: [hr-social-insurance-onboarding, hr-visa-verification]

- Q061:
  - query: "公司老板让我帮员工搞签证更新 但不知道公司这边要准备什么材料"
  - expected_intent: hr-visa-renewal-employer-docs
  - domain: hr
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-employer-support
  - must_not_match: [visa-renewal-engineer, hr-employment-notification]

- Q062:
  - query: "中途入社的中国人 社保健保 1月内必须加入吗 还是可以拖一拖"
  - expected_intent: hr-social-insurance-onboarding
  - domain: social-insurance
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-onboarding
  - must_not_match: [social-insurance-pension-individual, hr-employment-notification]

- Q063:
  - query: "我们是小公司5人以下 没有社保 招外国人会不会签证申请被拒"
  - expected_intent: hr-small-company-no-insurance
  - domain: hr
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-employer-support
  - must_not_match: [hr-social-insurance-onboarding, employer-illegal-employment-impact]

- Q064:
  - query: "外国员工老婆来日本 配偶签申请 公司这边要不要出材料"
  - expected_intent: hr-dependent-application-employer-docs
  - domain: hr
  - current_status: --
  - target_status: 家族滞在
  - subject: 雇主
  - template: hr-employer-support
  - must_not_match: [visa-application-dependent, hr-employment-notification]

- Q065:
  - query: "我作为社长 给员工发工资 是按所得税源泉徴収还是另外算 中国员工有没有特殊"
  - expected_intent: hr-payroll-foreign-employee
  - domain: tax
  - current_status: --
  - target_status: --
  - subject: 雇主
  - template: hr-payroll
  - must_not_match: [tax-residence-tax, hr-social-insurance-onboarding]

---

## 跨签证综合（Q066-Q075）

- Q066:
  - query: "我老婆是家族滞在 现在想自己开网店 能直接转经管吗"
  - expected_intent: visa-change-dependent-to-management
  - domain: visa
  - current_status: 家族滞在
  - target_status: 経営・管理
  - subject: 家族
  - template: visa-change
  - must_not_match: [visa-change-dependent-to-engineer, hr-side-business]

- Q067:
  - query: "家族滞在签证 想做自由职业 接日本公司外包 算不算自営業"
  - expected_intent: visa-change-dependent-to-self-employed
  - domain: visa
  - current_status: 家族滞在
  - target_status: 経営・管理 / 特定活動
  - subject: 家族
  - template: visa-change
  - must_not_match: [hr-side-business, visa-change-dependent-to-engineer]

- Q068:
  - query: "高度专门职1号 想自己出来开公司 是申请2号还是转经管"
  - expected_intent: visa-change-hsp-to-management
  - domain: visa
  - current_status: 高度专门职1号
  - target_status: 経営・管理 / 高度专门职2号
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-hsp, visa-change-engineer-to-management]

- Q069:
  - query: "我打算从技人国转高度人材 70分够不够 工资多少有要求吗"
  - expected_intent: visa-change-engineer-to-hsp
  - domain: visa
  - current_status: 技人国
  - target_status: 高度专门职1号
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-engineer, visa-change-engineer-to-permanent]

- Q070:
  - query: "现在持有永驻 但想自己开公司 还需要再申请经管吗"
  - expected_intent: permanent-resident-self-employment
  - domain: visa
  - current_status: 永住
  - target_status: --
  - subject: 本人
  - template: visa-status-impact
  - must_not_match: [visa-change-engineer-to-management, visa-renewal-permanent]

- Q071:
  - query: "配偶签离婚了 之前一直全职带娃 现在想自己起业 怎么搞签证"
  - expected_intent: visa-change-spouse-divorced-to-management
  - domain: visa
  - current_status: 日本人配偶者
  - target_status: 経営・管理
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-dependent-to-management, visa-renewal-spouse]

- Q072:
  - query: "技人国转永住 我才工作3年 老婆是日本人 这种能不能走配偶路线快点"
  - expected_intent: visa-change-engineer-to-permanent-via-spouse
  - domain: visa
  - current_status: 技人国
  - target_status: 永住 / 日本人配偶者
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-change-engineer-to-permanent, visa-renewal-engineer]

- Q073:
  - query: "我老公是经管签 我家族滞在 现在我也想做生意 同时持两个签证可以吗"
  - expected_intent: visa-change-dependent-to-management
  - domain: visa
  - current_status: 家族滞在
  - target_status: 経営・管理
  - subject: 家族
  - template: visa-change
  - must_not_match: [hr-side-business, visa-renewal-management]

- Q074:
  - query: "持特定技能2号 老婆能带过来吗 然后小孩学校怎么办"
  - expected_intent: skilled-2-family-bring
  - domain: visa
  - current_status: 特定技能2号
  - target_status: 家族滞在
  - subject: 家族
  - template: visa-application-dependent
  - must_not_match: [visa-renewal-skilled, visa-change-dependent-to-engineer]

- Q075:
  - query: "经管签证5年了 想申请永住 但是公司去年亏损 会被拒吗"
  - expected_intent: visa-change-management-to-permanent
  - domain: visa
  - current_status: 経営・管理
  - target_status: 永住
  - subject: 本人
  - template: visa-change
  - must_not_match: [visa-renewal-management, dormant-company-management-impact]

---

## 报告

- 总条数: 75
- 唯一 expected_intent slug 数: 22
  - visa-change-management-to-engineer (Q001-Q010, 10条)
  - visa-change-engineer-to-management (Q011-Q020, 10条)
  - visa-change-skilled-to-engineer (Q021-Q030, 10条)
  - visa-change-student-to-engineer (Q031-Q036, Q038-Q040, 9条)
  - visa-change-student-to-jobhunting (Q037, 1条)
  - dormant-company-management-impact (Q041-Q050, 10条)
  - employer-illegal-employment-impact (Q051-Q055, 5条)
  - hr-employment-notification (Q056, Q058, Q060, 3条)
  - hr-social-insurance-onboarding (Q057, Q062, 2条)
  - hr-visa-verification (Q059, 1条)
  - hr-visa-renewal-employer-docs (Q061, 1条)
  - hr-small-company-no-insurance (Q063, 1条)
  - hr-dependent-application-employer-docs (Q064, 1条)
  - hr-payroll-foreign-employee (Q065, 1条)
  - visa-change-dependent-to-management (Q066, Q073, 2条)
  - visa-change-dependent-to-self-employed (Q067, 1条)
  - visa-change-hsp-to-management (Q068, 1条)
  - visa-change-engineer-to-hsp (Q069, 1条)
  - permanent-resident-self-employment (Q070, 1条)
  - visa-change-spouse-divorced-to-management (Q071, 1条)
  - visa-change-engineer-to-permanent-via-spouse (Q072, 1条)
  - skilled-2-family-bring (Q074, 1条)
  - visa-change-management-to-permanent (Q075, 1条)

- 难点:
  1. **same-slug 区分**：同一 slug 下 10 条 query 必须保留风格多样性（口语 / 半正式 / 错别字 / 中日混合 / 一句话 vs 多句），避免训练集过拟合到固定句式。
  2. **must_not_match 边界设定**：经管和技人国互转、留学和特定技能转技人国都共享部分关键词（学历、本科、内定、办公室），需精确列出"近义但不同"的 intent，让 CCA 能区分"续签"vs"变更"vs"影响判定"。
  3. **HR 视角 query 稀缺**：真实社长 / HR 提问数据少，10 条 HR 类要覆盖入职/离职/续签支援/社保/payroll 5 个子场景，每子场景仅 1-2 条样本，容易和"本人视角"混淆，靠 subject 字段强标 `雇主` 来分流。
  4. **跨签证综合 long-tail**：高度专门职 / 永住 / 配偶离婚 / 特定技能 2 号家族 等 slug 各自仅 1 条样本，覆盖率低 — 已在 must_not_match 中显式排除常见误命中（renewal / change-to-permanent），后续 P2/P3 batch 可补样本。
  5. **slug 命名一致性**：保持 `<动作>-<from>-to-<to>` 模式；HR 类放弃 from/to 改用 `hr-<topic>` 模式，已在文档中明示并保持类型一致。
