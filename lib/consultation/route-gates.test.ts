import assert from 'node:assert/strict'
import test from 'node:test'

import { getRouteGateIds, matchRouteGates, routeGatesToPromptContext } from './route-gates'

test('matches special period two-month boundary questions', () => {
  const matches = matchRouteGates('我更新到期前交了，现在过期两个月还在审查中，是不是可以继续上班等结果？')

  assert.ok(getRouteGateIds(matches).includes('special-period-two-month-boundary'))
})

test('matches special period departure deep-water questions', () => {
  const matches = matchRouteGates('我更新申请中现在是特例期间，想临时回国一周，用みなし再入国回来没问题吗？')

  assert.ok(getRouteGateIds(matches).includes('special-period-departure-deepwater'))
})

test('matches colloquial special period departure wording', () => {
  const matches = matchRouteGates('我续签中，旧签证到期后想回老家几天，回来入境日本会不会被机场拦？')

  assert.ok(getRouteGateIds(matches).includes('special-period-departure-deepwater'))
})

test('matches national tax sono3 route questions', () => {
  const matches = matchRouteGates('入管补件要求納税証明書その3，这个是去市役所还是税務署办？')

  assert.ok(getRouteGateIds(matches).includes('national-tax-certificate-sono3-route'))
})

test('matches resident tax fiscal-year and January 1 address questions', () => {
  const matches = matchRouteGates('永住补件要2025年度住民税課税証明，我1月1日搬家了，应该去哪个市开？')

  assert.ok(getRouteGateIds(matches).includes('resident-tax-fiscal-year-january-1'))
})

test('matches J-Skip 1200/1600 false-positive traps', () => {
  const matches = matchRouteGates('我年収1600万，高才想走J-Skip，是不是不用点数表也可能符合？')

  assert.ok(getRouteGateIds(matches).includes('j-skip-hard-eligibility-gate'))
})

test('matches J-Find employment transition bridge traps', () => {
  const matches = matchRouteGates('我现在J-Find，拿到创业公司的business development offer，能直接转HSP吗，还是必须先技人国？')

  assert.ok(getRouteGateIds(matches).includes('jfind-employment-transition-no-shikakugai-bridge'))
})

test('matches J-Find full-time work before status-change traps', () => {
  const matches = matchRouteGates('我符合J-Find学校名单，朋友公司让我先全职上班，之后再转工签可以吗？')

  assert.ok(getRouteGateIds(matches).includes('jfind-employment-transition-no-shikakugai-bridge'))
})

test('matches pending status-change current-activity-only traps', () => {
  const matches = matchRouteGates('我留学转技人国的变更申请已经受理了，现在可以去新公司全职上班吗？28小时限制还在吗？')

  assert.ok(getRouteGateIds(matches).includes('pending-status-change-current-activity-only'))
})

test('matches HSP1 institution-change permission traps', () => {
  const matches = matchRouteGates('我是高度専門職1号，换公司后点数够，14日届出以后能先入社吗？')

  assert.ok(getRouteGateIds(matches).includes('hsp1-institution-change-permission-first'))
})

test('does not match HSP1 institution-change gate for J-Find to HSP route comparison only', () => {
  const matches = matchRouteGates('我现在J-Find，拿到创业公司的offer，职位是business development。能直接转HSP吗？我点数大概75。')

  assert.ok(getRouteGateIds(matches).includes('jfind-employment-transition-no-shikakugai-bridge'))
  assert.ok(!getRouteGateIds(matches).includes('hsp1-institution-change-permission-first'))
})

test('matches work qualification certificate boundary questions', () => {
  const matches = matchRouteGates('拿到就労資格証明書以后，新工作是不是就算许可，可以开始上班？')

  assert.ok(getRouteGateIds(matches).includes('work-qualification-certificate-not-permission'))
})

test('matches ambiguous immigration notice taxonomy questions', () => {
  const matches = matchRouteGates('收到入管通知书，感觉是不许可みたい，上面有期限，我现在该怎么办？')

  assert.ok(getRouteGateIds(matches).includes('immigration-notice-taxonomy-first'))
})

test('matches incomplete-material before-expiry bridge questions', () => {
  const matches = matchRouteGates('变更申请快到期了，材料不齐，可以先提交保住特例期间再后补吗？')

  assert.ok(getRouteGateIds(matches).includes('incomplete-materials-before-expiry-no-safe-bridge'))
})

test('matches student shikakugai 28h and long-vacation traps', () => {
  const matches = matchRouteGates('我是留学生，夏休み可以周40小时全职打工吗？资格外活动许可已经有了。')

  assert.ok(getRouteGateIds(matches).includes('student-shikakugai-28h-long-vacation-limit'))
})

test('matches address-change card presentation traps', () => {
  const matches = matchRouteGates('我搬家后オンライン做了転入届，住民票改了，在留卡地址和入管也会自动更新吗？')

  assert.ok(getRouteGateIds(matches).includes('address-change-card-window-dual-duty'))
})

test('matches minashi reentry one-year limit traps', () => {
  const matches = matchRouteGates('我是永住者，准备回国2年，みなし再入国で戻れますか？')

  assert.ok(getRouteGateIds(matches).includes('minashi-reentry-one-year-limit'))
})

test('matches residence card expiry vs status period traps', () => {
  const matches = matchRouteGates('我是永住者，在留卡有效期过期了，是不是在留资格也没了，必须出国？')

  assert.ok(getRouteGateIds(matches).includes('residence-card-expiry-vs-status-period'))
})

test('matches tokubetsu kyoka not-normal-route traps', () => {
  const matches = matchRouteGates('不许可以后可以申请在留特別許可作为兜底吗？')

  assert.ok(getRouteGateIds(matches).includes('tokubetsu-kyoka-not-normal-route'))
})

test('matches tokutei katsudo designation-scope traps', () => {
  const matches = matchRouteGates('我是内定者特定活动，拿到内定了，可以直接入职工作吗？')

  assert.ok(getRouteGateIds(matches).includes('tokutei-katsudo-designation-scope-boundary'))
})

test('matches kika vs eijuu confusion traps', () => {
  const matches = matchRouteGates('永住拿到以后是不是就变成日本人？归化申请是在入管还是法務局？')

  assert.ok(getRouteGateIds(matches).includes('kika-eijuu-different-authority-and-effect'))
})

test('matches third-party notification replacement traps', () => {
  const matches = matchRouteGates('换工作以后公司HR说会帮我通知入管，所以本人14日届出不用管了吧？')

  assert.ok(getRouteGateIds(matches).includes('individual-duty-not-replaced-by-third-party'))
})

test('matches status cancellation before expiry traps', () => {
  const matches = matchRouteGates('我离职4个月了，但是在留期限还有2年，会不会被取消？')

  assert.ok(getRouteGateIds(matches).includes('status-cancellation-before-expiry-boundary'))
})

test('matches false application truthfulness traps', () => {
  const matches = matchRouteGates('公司让我把实际工作内容稍微夸大写进技人国申请，这样写不准确但容易过，可以吗？')

  assert.ok(getRouteGateIds(matches).includes('application-truthfulness-no-false-info'))
})

test('matches ssw1 and ssw2 boundary traps', () => {
  const matches = matchRouteGates('特定技能1号满5年以后会自动升2号吗？2号是不是可以带家族？')

  assert.ok(getRouteGateIds(matches).includes('ssw1-ssw2-boundary'))
})

test('matches HSP income and PR shortcut traps', () => {
  const matches = matchRouteGates('高才点数算年收时，残業代和住宅手当可以算吗？70分是不是马上能永住？')

  assert.ok(getRouteGateIds(matches).includes('hsp-points-income-and-pr-shortcut-boundary'))
})

test('matches naitei and kyushoku tokutei katsudo work traps', () => {
  const matches = matchRouteGates('我是内定者特定活動，公司让我下周先入社上班，可以吗？')

  assert.ok(getRouteGateIds(matches).includes('tokutei-katsudo-naitei-kyushoku-work-boundary'))
})

test('matches TITP and ikusei shuro transition traps', () => {
  const matches = matchRouteGates('2027年以后技能実習会自动切换成育成就労吗？我能不能换公司？')

  assert.ok(getRouteGateIds(matches).includes('titp-ikusei-shuro-transition-boundary'))
})

test('matches HSP2 automatic and PR equivalence traps', () => {
  const matches = matchRouteGates('高才2号是不是3年后自动变更？HSP2是不是等于永住，在留期限无期限？')

  assert.ok(getRouteGateIds(matches).includes('hsp2-not-automatic-not-pr'))
})

test('matches torikiji applicant responsibility traps', () => {
  const matches = matchRouteGates('行政书士代办申请以后，材料内容出错是不是就不是本人责任？')

  assert.ok(getRouteGateIds(matches).includes('torikiji-applicant-responsibility-boundary'))
})

test('matches PR pending current-status renewal traps', () => {
  const matches = matchRouteGates('永住申请中，现在的在留期限快到期了，是不是不用更新，等结果就行？')

  assert.ok(getRouteGateIds(matches).includes('pr-pending-current-status-not-auto-protected'))
})

test('matches non-permission special-period endpoint traps', () => {
  const matches = matchRouteGates('更新不许可了，原来已经在特例期间，现在还可以继续两个月再申请吗？')

  assert.ok(getRouteGateIds(matches).includes('nonpermission-special-period-ended-boundary'))
})

test('matches business-manager disposition before change traps', () => {
  const matches = matchRouteGates('我是经管签，公司不想要了，先休眠公司是不是更容易变更技人国？能马上入职新公司吗？')

  assert.ok(getRouteGateIds(matches).includes('business-manager-disposition-no-auto-success'))
})

test('does not match ordinary company-sponsored gijinkoku change as business-manager disposition', () => {
  const matches = matchRouteGates('公司帮我办技人国变更，需要准备什么材料？')

  assert.ok(!getRouteGateIds(matches).includes('business-manager-disposition-no-auto-success'))
})

test('matches business-manager 2025 reform hard fact traps', () => {
  const matches = matchRouteGates('现在经营管理是不是还是500万就能办？还是新规要3000万和常勤职员？')

  assert.ok(getRouteGateIds(matches).includes('business-manager-2025-reform-hard-fact-boundary'))
})

test('matches existing business-manager renewal transition questions', () => {
  const matches = matchRouteGates('我已经有经管签，2028年前续签是不是不用满足新规3000万？')

  assert.ok(getRouteGateIds(matches).includes('business-manager-2025-reform-hard-fact-boundary'))
})

test('matches DV address-safety first traps', () => {
  const matches = matchRouteGates('我被家暴分居了，配偶者签证更新需要材料，是不是要先联系老公拿资料？我不想让他知道新地址。')

  assert.ok(getRouteGateIds(matches).includes('dv-address-safety-first'))
})

test('does not match ordinary spouse separation as DV without safety signal', () => {
  const matches = matchRouteGates('我和日本人配偶普通分居了，配偶者签证更新材料应该怎么准备？')

  assert.ok(!getRouteGateIds(matches).includes('dv-address-safety-first'))
})

test('matches shikakugai blanket vs individual permission traps', () => {
  const matches = matchRouteGates('我是留学生，在留卡有資格外活動許可。包括许可是不是任何工作都可以做？特殊实习还要申请吗？')

  assert.ok(getRouteGateIds(matches).includes('shikakugai-hokatsu-kobetsu-boundary'))
})

test('matches notification-duty violation harmlessness traps', () => {
  const matches = matchRouteGates('转职以后所属機関届出忘了，14天已经过了，公司说会通知入管，本人是不是没问题？')

  assert.ok(getRouteGateIds(matches).includes('notification-duty-violation-not-harmless'))
})

test('matches renewal/change automatic-permission traps', () => {
  const matches = matchRouteGates('续签材料全部齐了，上次也许可了，这次是不是一定能更新通过？')

  assert.ok(getRouteGateIds(matches).includes('renewal-change-not-automatic-discretion'))
})

test('matches social-insurance and pension irrelevant traps', () => {
  const matches = matchRouteGates('我是自由职业，国民年金没加入过，永住或续签会不会有影响？')

  assert.ok(getRouteGateIds(matches).includes('social-insurance-pension-not-irrelevant'))
})

test('matches gijinkoku work-scope not-any-job traps', () => {
  const matches = matchRouteGates('我是技人国，公司最近安排我去工厂生产线做现场作业，这个工作签可以做吗？')

  assert.ok(getRouteGateIds(matches).includes('gijinkoku-work-scope-not-any-job'))
})

test('matches gijinkoku startup and management-change-first traps', () => {
  const matches = matchRouteGates('我现在是技人国，想副业设立公司当法人代表，可以先做起来以后再变更经营管理吗？')

  assert.ok(getRouteGateIds(matches).includes('gijinkoku-startup-management-change-first'))
})

test('matches CoE validity and entry-guarantee traps', () => {
  const matches = matchRouteGates('COE拿到了是不是一定能入国？有效期是6个月还是3个月，过期还能用吗？')

  assert.ok(getRouteGateIds(matches).includes('coe-not-entry-guarantee-three-month'))
})

test('matches renewal filing window and post-expiry special-period traps', () => {
  const matches = matchRouteGates('续签什么时候申请？是不是有特例期间，所以在留期限过期后再申请也没问题？')

  assert.ok(getRouteGateIds(matches).includes('renewal-filing-window-not-after-expiry'))
})

test('matches late-payment remediation not-erased traps', () => {
  const matches = matchRouteGates('住民税之前晚交了，但现在补缴完了，纳税证明也能开，永住风险是不是归零？')

  assert.ok(getRouteGateIds(matches).includes('late-payment-remediation-not-erased'))
})

test('matches pension exemption distinction traps', () => {
  const matches = matchRouteGates('国民年金免除和滞纳在永住审查里一样吗？外国人是不是不用管年金？')

  assert.ok(getRouteGateIds(matches).includes('pension-exemption-not-arrears-not-free-pass'))
})

test('matches dependent work-permission-required traps', () => {
  const matches = matchRouteGates('我是家族滞在，老公是技人国，我可以直接打工吗？还是要先申请資格外活動？')

  assert.ok(getRouteGateIds(matches).includes('dependent-work-permission-required'))
})

test('matches result postcard and exam-complete permission traps', () => {
  const matches = matchRouteGates('在线变更审查完了邮件来了，是不是许可了，可以去新公司入职上班吗？')

  assert.ok(getRouteGateIds(matches).includes('result-postcard-not-permission'))
})

test('matches short-stay work and shikakugai traps', () => {
  const matches = matchRouteGates('我是旅游签证90天来日本，拿到内定了，可以先申请资格外活动入职工作吗？')

  assert.ok(getRouteGateIds(matches).includes('short-stay-no-work-no-shikakugai'))
})

test('does not match ordinary short-stay business meeting alone as work trap', () => {
  const matches = matchRouteGates('我这次短期滞在来日本和客户开会、拜访取引先，这种商用访问需要注意什么？')

  assert.ok(!getRouteGateIds(matches).includes('short-stay-no-work-no-shikakugai'))
})

test('matches work-status side-job scope traps', () => {
  const matches = matchRouteGates('我现在是技人国人文签，晚上想做副业接单，收入不多，是不是没问题？')

  assert.ok(getRouteGateIds(matches).includes('work-status-side-job-scope-boundary'))
})

test('matches SSW job-change not-free traps', () => {
  const matches = matchRouteGates('我是特定技能1号，想从外食转到宿泊，听说特定技能可以自由转职，只要届出就行吗？')

  assert.ok(getRouteGateIds(matches).includes('ssw-job-change-not-free'))
})

test('matches nonpermission appeal and grace-period traps', () => {
  const matches = matchRouteGates('在留更新不许可了，我可以异议申立吗？不许可后是不是还有特例期间继续留？')

  assert.ok(getRouteGateIds(matches).includes('nonpermission-no-ordinary-appeal-no-grace'))
})

test('matches PR basic requirements not years-only traps', () => {
  const matches = matchRouteGates('我在日本住满10年了，其中留学比较久，是不是可以申请永住？税金年金会影响吗？')

  assert.ok(getRouteGateIds(matches).includes('pr-basic-requirements-not-years-only'))
})

test('matches PR card renewal still-required traps', () => {
  const matches = matchRouteGates('我是永住者，在留卡7年有效期快过期了。永住不是永久吗，卡还需要更新吗？')

  assert.ok(getRouteGateIds(matches).includes('pr-card-renewal-still-required'))
})

test('matches gijinkoku JLPT fixed-threshold traps', () => {
  const matches = matchRouteGates('人文签申请是不是必须有JLPT N2？我只有N3还能申请技人国吗？')

  assert.ok(getRouteGateIds(matches).includes('gijinkoku-jlpt-not-formal-not-irrelevant'))
})

test('matches unseparated gijinkoku JLPT wording', () => {
  const matches = matchRouteGates('技术人文知识国际业务签证没有 N2 能不能申请？公司岗位主要是贸易事务。')

  assert.ok(getRouteGateIds(matches).includes('gijinkoku-jlpt-not-formal-not-irrelevant'))
})

test('matches foreign-worker social-insurance optional traps', () => {
  const matches = matchRouteGates('我是外国人技人国全职，公司说不用给我上社会保险，这个和签证永住有关系吗？')

  assert.ok(getRouteGateIds(matches).includes('foreign-worker-social-insurance-not-optional'))
})

test('matches implicit foreign-worker social-insurance traps in TEBIQ context', () => {
  const matches = matchRouteGates('公司说不用给我交厚生年金，工资多发一点可以吗？')

  assert.ok(getRouteGateIds(matches).includes('foreign-worker-social-insurance-not-optional'))
})

test('does not match PR card guardrail for ordinary credit card expiry', () => {
  const matches = matchRouteGates('我的信用卡7年有效期快到了，PR活动报名还能用吗？')

  assert.ok(!getRouteGateIds(matches).includes('pr-card-renewal-still-required'))
})

test('does not match an ordinary non-guardrail question', () => {
  const matches = matchRouteGates('在留卡丢了，第一步应该去哪里补办？')

  assert.deepEqual(matches, [])
})

test('renders prompt context with hard boundary language', () => {
  const matches = matchRouteGates('我年收1200万，可以走J-Skip永住吗？')
  const prompt = routeGatesToPromptContext(matches)

  assert.ok(prompt)
  assert.match(prompt, /不用于预测许可结果/)
  assert.match(prompt, /禁止说法/)
  assert.match(prompt, /1200万/)
})

test('matches short follow-up when root context carries the route family', () => {
  const composedFollowUpInput = [
    '那我可以先上班吗？',
    '我是高度専門職1号，准备换公司，新公司说点数够，14日届出就可以。',
  ].join(' 　 ')
  const matches = matchRouteGates(composedFollowUpInput)

  assert.ok(getRouteGateIds(matches).includes('hsp1-institution-change-permission-first'))
})

test('HSP1 institution-change prompt forbids contractor or training workaround before permission', () => {
  const matches = matchRouteGates('我是HSP1号ロ换公司，许可来不及，可以先业务委托或研修开始吗？')
  const prompt = routeGatesToPromptContext(matches)

  assert.ok(prompt)
  assert.match(prompt, /业务委托、外包、研修、准备工作/)
  assert.match(prompt, /不开始任何实际活动/)
})

test('matches short J-Find follow-up when root context carries employment transition', () => {
  const composedFollowUpInput = [
    '那我可以先用资格外活动入职吗？',
    '我现在J-Find，拿到创业公司的business development offer，正在比较HSP和技人国变更路线。',
  ].join(' 　 ')
  const matches = matchRouteGates(composedFollowUpInput)

  assert.ok(getRouteGateIds(matches).includes('jfind-employment-transition-no-shikakugai-bridge'))
})

test('matches short pending-change follow-up when root context carries target work start', () => {
  const composedFollowUpInput = [
    '那提交以后可以先全职吗？',
    '我现在留学，已经准备提交转技人国的在留資格変更申请，新公司希望我下周入社。',
  ].join(' 　 ')
  const matches = matchRouteGates(composedFollowUpInput)

  assert.ok(getRouteGateIds(matches).includes('pending-status-change-current-activity-only'))
})

test('matches work-certificate follow-up when prior context carries certificate facts', () => {
  const composedFollowUpInput = [
    '那这个能不能代替变更许可？',
    '前面说的是就労資格証明書，新工作内容和现在资格可能不一样。',
  ].join(' 　 ')
  const matches = matchRouteGates(composedFollowUpInput)

  assert.ok(getRouteGateIds(matches).includes('work-qualification-certificate-not-permission'))
})
