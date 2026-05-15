import assert from 'node:assert/strict'
import test from 'node:test'

import {
  selectTerminalGuardrailFindings,
  validateAnswer,
  validateAnswerCompleteness,
  validatePermissionStateContradictions,
  validateRequiredSummaryLabels,
} from './guardrail-validator'
import { matchRouteGates } from './route-gates'

test('detects incomplete answer tails in a critical route family', () => {
  const routeGateMatches = matchRouteGates('更新申请审查中，原期限加两个月快到了，我还能继续上班吗？')
  const findings = validateAnswerCompleteness('先看这里\n当前判断：这件事要分开看。\n建议动作：', {
    routeGateMatches,
  })

  assert.ok(findings.some(f => f.id === 'answer-trailing-connector'))
  assert.equal(findings.find(f => f.id === 'answer-trailing-connector')?.severity, 'P1')
})

test('detects missing fixed answer-summary labels', () => {
  const findings = validateRequiredSummaryLabels('先看方向\n现在大概可以这样处理。')

  assert.ok(findings.some(f => f.id === 'answer-missing-label-先看这里'))
  assert.ok(findings.some(f => f.id === 'answer-missing-label-当前判断'))
  assert.ok(findings.some(f => f.id === 'answer-missing-label-建议动作'))
  assert.ok(findings.some(f => f.id === 'answer-missing-label-暂缓事项'))
})

test('detects overconfident special-period departure answer', () => {
  const findings = validatePermissionStateContradictions(
    '我更新申请中现在是特例期间，想临时回国一周，用みなし再入国回来没问题吗？',
    '当前判断：有みなし再入国的话出国没问题，回来后特例期间继续。',
  )

  assert.ok(findings.some(f => f.id === 'answer-special-period-departure-overconfidence'))
  assert.equal(findings.find(f => f.id === 'answer-special-period-departure-overconfidence')?.severity, 'P0')
})

test('does not flag cautious special-period departure deep-water wording', () => {
  const findings = validatePermissionStateContradictions(
    '我更新申请中现在是特例期间，想临时回国一周，用みなし再入国回来没问题吗？',
    '当前判断：特例期间中出国是深水区，不能只按普通みなし再入国规则处理。建议在出国前让入管或行政书士按申请状态和期限确认。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-special-period-departure-overconfidence'))
})

test('flags special-period departure answer that says yes then asks to confirm', () => {
  const findings = validatePermissionStateContradictions(
    '我续签中，旧签证到期后想回老家几天，回来入境日本会不会被机场拦？',
    '当前判断：两个月特例期间内回来就可以，通常没问题；不过最好再向入管确认一下。',
  )

  assert.ok(findings.some(f => f.id === 'answer-special-period-departure-overconfidence'))
})

test('flags special-period departure answer based on application stamp', () => {
  const findings = validatePermissionStateContradictions(
    '我申请更新中，卡背面有申请中章，能不能先出日本再回来？',
    '当前判断：在留卡背面有申请中章，所以可以再入国回来取结果。',
  )

  assert.ok(findings.some(f => f.id === 'answer-special-period-departure-overconfidence'))
})

test('flags special-period departure answer saying application is unaffected', () => {
  const findings = validatePermissionStateContradictions(
    '我变更申请中，结果出来前回国会不会影响申请？',
    '当前判断：短期回国不影响变更申请，回来以后继续等结果就行。',
  )

  assert.ok(findings.some(f => f.id === 'answer-special-period-departure-overconfidence'))
})

test('detects J-Skip 1600 false-positive answer language', () => {
  const findings = validatePermissionStateContradictions(
    '我年収1600万，高才想走J-Skip，可以吗？',
    '先看这里\n当前判断：J-Skip 有机会可行。\n建议动作：准备年收证明。\n暂缓事项：不要拖延。',
  )

  assert.ok(findings.some(f => f.id === 'answer-jskip-1200-1600-possible'))
  assert.equal(findings.find(f => f.id === 'answer-jskip-1200-1600-possible')?.severity, 'P0')
})

test('does not flag negated J-Skip rejection as false positive', () => {
  const findings = validatePermissionStateContradictions(
    '我博士毕业，予定年収1200万，公司说可以试J-Skip，这是真的吗？',
    '当前判断：预定年收1200万日元不满足J-Skip的硬性年收门槛，J-Skip路径不可行。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-jskip-1200-1600-possible'))
})

test('detects J-Find shikakugai bridge into employment', () => {
  const findings = validatePermissionStateContradictions(
    '我现在J-Find，拿到创业公司offer，职位是business development。能直接转HSP吗，还是必须先技人国？',
    '如果高度人才风险高，可以改申请技人国，并同时利用J-Find允许的资格外活动许可先入职。',
  )

  assert.ok(findings.some(f => f.id === 'answer-jfind-shikakugai-employment-bridge'))
  assert.equal(findings.find(f => f.id === 'answer-jfind-shikakugai-employment-bridge')?.severity, 'P0')
})

test('does not flag explicit warning against J-Find shikakugai bridge', () => {
  const findings = validatePermissionStateContradictions(
    '我现在J-Find，拿到创业公司offer，职位是business development。能直接转HSP吗？',
    '暂缓事项：不要把资格外活动许可当成正式就业的过渡桥；目标就业在留资格未解决前，不要先入职。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-jfind-shikakugai-employment-bridge'))
})

test('does not flag J-Find warning that says not to start employment through shikakugai', () => {
  const findings = validatePermissionStateContradictions(
    '我是J-Find，现在有offer，想转技人国。公司希望我先入社。',
    '先提醒一点：在没有拿到正式雇用契約書原本前，不要用 J-Find 的资格外活动许可去开始实质入职工作。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-jfind-shikakugai-employment-bridge'))
})

test('does not flag J-Find answer that forbids work before HSP or gijinkoku permission', () => {
  const findings = validatePermissionStateContradictions(
    '我现在J-Find，拿到创业公司的business development offer。能直接转HSP吗？',
    '暂缓事项：在没有取得HSP或技人国许可前，不要以J-Find身份开始给这家公司做实质的business development工作，即使公司催入职也不行。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-jfind-shikakugai-employment-bridge'))
})

test('does not flag J-Find answer saying pre-permission work would be shikakugai', () => {
  const findings = validatePermissionStateContradictions(
    '我现在J-Find，拿到创业公司的business development offer。能直接转HSP吗？',
    '如果公司希望尽快开始工作，千万不要在变更许可下来前先干活，这属于资格外活动，可能影响审批。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-jfind-shikakugai-employment-bridge'))
})

test('detects J-Find shikakugai bridge in short follow-up context', () => {
  const findings = validateAnswer({
    question: [
      '那我可以先用资格外活动入职吗？',
      '我现在J-Find，拿到创业公司的business development offer，正在比较HSP和技人国变更路线。',
    ].join(' 　 '),
    answer: '先看这里\n当前判断：可以先用資格外活動許可开始工作，之后等HSP或技人国许可。\n建议动作：让公司准备材料。\n暂缓事项：注意期限。',
  })

  assert.ok(findings.some(f => f.id === 'answer-jfind-shikakugai-employment-bridge'))
})

test('detects pending change answer that expands work permission', () => {
  const findings = validatePermissionStateContradictions(
    '我留学转技人国的变更申请已经受理了，现在可以去新公司全职上班吗？',
    '当前判断：变更申请受理后就可以按新资格去新公司全职工作。',
  )

  assert.ok(findings.some(f => f.id === 'answer-pending-change-expands-work-permission'))
  assert.equal(findings.find(f => f.id === 'answer-pending-change-expands-work-permission')?.severity, 'P0')
})

test('does not flag explicit warning that pending change does not expand work permission', () => {
  const findings = validatePermissionStateContradictions(
    '我留学转技人国的变更申请已经受理了，现在可以去新公司全职上班吗？',
    '当前判断：变更申请受理不等于许可；许可出来前不能按新资格全职工作，仍要守当前留学资格的限制。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-pending-change-expands-work-permission'))
})

test('does not over-block pending change answer that preserves current permitted activity', () => {
  const findings = validatePermissionStateContradictions(
    '我技人国转HSP的变更申请已经受理了，现在还能继续原公司原来的IT工作吗？',
    '当前判断：变更申请受理不等于HSP许可，但在原技人国活动范围内继续原来的IT工作，和提前按新资格去新机构工作要分开看。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-pending-change-expands-work-permission'))
})

test('detects HSP1 notification equals permission answer language', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1，换公司后14日届出就可以入社吗？',
    '先看这里\n当前判断：14日届出后即可先入社。\n建议动作：提交届出。\n暂缓事项：保存副本。',
  )

  assert.ok(findings.some(f => f.id === 'answer-hsp1-notification-equals-permission'))
})

test('does not flag HSP1 answer saying 14-day notification is not enough', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1，换公司后14日届出就可以入社吗？',
    '当前判断：HSP1换机构，不是只完成14天届出就可以先进新公司工作；必须先取得许可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-notification-equals-permission'))
})

test('does not flag HSP1 answer that labels 14-day notification-only route as misconception', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1，换公司后14日届出就可以入社吗？',
    '你听说“14天内届出即可”是很常见的误解，14天届出不能替代机构变更许可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-notification-equals-permission'))
})

test('does not flag HSP1 answer rejecting notification-only route with company wording', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1，换公司后14日届出就可以入社吗？',
    '新公司说的“只要14天内届出就行”不靠谱。普通就劳资格中的届出规则和高度専門職1号的许可型机构变更要分开。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-notification-equals-permission'))
})

test('does not flag HSP1 answer with quoted notification-only misconception', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1，换公司后14日届出就可以入社吗？',
    '“14天内届出即可”这个说法不准确，HSP1换机构需要先取得许可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-notification-equals-permission'))
})

test('detects HSP1 work-certificate alternate-route language', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1号ロ，换公司但工作内容一样，14日届出就可以吗？',
    '建议动作：确认是否需要办理指定书変更許可申請，或取得就労資格証明書来确认合规。',
  )

  assert.ok(findings.some(f => f.id === 'answer-hsp1-certificate-as-alternate-route'))
  assert.equal(findings.find(f => f.id === 'answer-hsp1-certificate-as-alternate-route')?.severity, 'P1')
})

test('terminal-gates HSP1 work-certificate alternate-route finding', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1号ロ，换公司但工作内容一样，14日届出就可以吗？',
    '建议动作：先拿就労資格証明書确认合规。',
  )
  const terminal = selectTerminalGuardrailFindings(findings)

  assert.ok(terminal.some(f => f.id === 'answer-hsp1-certificate-as-alternate-route'))
})

test('does not flag explicit HSP1 warning that certificate is not a substitute', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1号ロ，换公司但工作内容一样，14日届出就可以吗？',
    '当前判断：就労資格証明書不能替代HSP1机构变更许可；需要先确认许可路线。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-certificate-as-alternate-route'))
})

test('does not flag HSP1 warning not to use work certificate as permission evidence', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1号ロ，换公司但工作内容一样，14日届出就可以吗？',
    '不要用就劳资格证明书或届出受理票当做已许可的证据去开始工作。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-certificate-as-alternate-route'))
})

test('detects HSP1 alternate workarounds before institution-change permission', () => {
  const findings = validatePermissionStateContradictions(
    '我高才1号换公司，变更许可来不及，下月能不能先入社？',
    '建议动作：可以先用业务委托或研修形式开始，雇佣合同等许可后再处理。',
  )

  assert.ok(findings.some(f => f.id === 'answer-hsp1-alternate-workaround-before-permission'))
})

test('does not flag HSP1 warning against alternate workarounds before permission', () => {
  const findings = validatePermissionStateContradictions(
    '我高才1号换公司，变更许可来不及，下月能不能先入社？',
    '许可前不能用业务委托、研修、准备工作或内部会议替代入社；只能延后入社日或签以许可生效为条件的合同。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-alternate-workaround-before-permission'))
})

test('does not flag HSP1 permission-conditional employment contract with no actual activity', () => {
  const findings = validatePermissionStateContradictions(
    '我是HSP1号ロ，换公司但工作内容还是机器学习。新公司说只要14天内届出，不用变更许可。',
    '建议动作：今天先不要开始新工作或任何为新机构的活动。以“许可生效后入职”为前提调整入职日，并签署以许可为条件的雇用契约。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp1-alternate-workaround-before-permission'))
})

test('detects work qualification certificate as permission language', () => {
  const findings = validatePermissionStateContradictions(
    '就労資格証明書可以代替变更许可吗？',
    '先看这里\n当前判断：拿到就労資格証明書就等于新工作许可。\n建议动作：给公司看。\n暂缓事项：无。',
  )

  assert.ok(findings.some(f => f.id === 'answer-work-certificate-as-permission'))
})

test('does not flag explicit work-certificate-not-permission warning', () => {
  const findings = validatePermissionStateContradictions(
    '就労資格証明書可以代替变更许可吗？',
    '暂缓事项：不要以为申请就労資格証明書就等于拿到了新工作的许可；它不是新的在留资格变更许可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-work-certificate-as-permission'))
})

test('does not flag work-certificate warning when negation appears before the matched phrase', () => {
  const findings = validatePermissionStateContradictions(
    '就労資格証明書可以代替变更许可吗？',
    '暂缓事项：不要以为就労資格証明書就等于拿到了新工作的许可；需要变更许可时仍要先等许可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-work-certificate-as-permission'))
})

test('does not flag answer saying work certificate is only proof, not permission', () => {
  const findings = validatePermissionStateContradictions(
    '技人国换工作，公司让我先申请就労資格証明書，这个期间能正常入社吗？',
    '就労資格証明書不是新的在留资格变更许可，它只是对“你现在这个资格能否做这份工作”的证明。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-work-certificate-as-permission'))
})

test('does not flag answer saying not to treat work certificate as permission', () => {
  const findings = validatePermissionStateContradictions(
    '技人国换工作，公司让我先申请就労資格証明書，这个期间能正常入社吗？',
    '不要把就労資格証明書当成就业许可；它只是确认材料。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-work-certificate-as-permission'))
})

test('does not flag answer saying do not think work certificate equals permission', () => {
  const findings = validatePermissionStateContradictions(
    '技人国换工作，公司让我先申请就労資格証明書，这个期间能正常入社吗？',
    '暂缓事项：不要认为拿到就労資格証明書就等同许可；它不是新的在留资格变更许可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-work-certificate-as-permission'))
})

test('detects wrong income-proof label for national tax sono3', () => {
  const findings = validatePermissionStateContradictions(
    '清单里写国税その3，这个是什么？',
    '国税の納税証明書その3（所得金額用）要去税务署开。',
  )

  assert.ok(findings.some(f => f.id === 'answer-sono3-income-proof-label'))
  assert.equal(findings.find(f => f.id === 'answer-sono3-income-proof-label')?.severity, 'P2')
})

test('does not flag answer saying municipality cannot issue national tax sono3', () => {
  const findings = validatePermissionStateContradictions(
    '入管补件要納税証明書その3，区役所只能开住民税，这个去哪开？',
    '区役所确实办不了。住民税是市区町村管的，而納税証明書その3要去税务署或 e-Tax 申请。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-routes-sono3-to-municipality'))
})

test('does not flag answer saying ward office only issues resident tax, not national tax sono3', () => {
  const findings = validatePermissionStateContradictions(
    '入管补件要納税証明書その3，区役所只能开住民税，这个去哪开？',
    '区役所只能开住民税（课税/纳税证明），而納税証明書その3是税务署或 e-Tax 出具的。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-routes-sono3-to-municipality'))
})

test('detects student shikakugai long vacation unlimited work language', () => {
  const findings = validatePermissionStateContradictions(
    '我是留学生，夏休み可以周40小时全职打工吗？',
    '当前判断：夏休み属于长期休假，可以全职工作，周40小时也可以。',
  )

  assert.ok(findings.some(f => f.id === 'answer-shikakugai-long-vacation-unlimited'))
  assert.equal(findings.find(f => f.id === 'answer-shikakugai-long-vacation-unlimited')?.severity, 'P1')
})

test('detects multiple jobs each-28h shikakugai language', () => {
  const findings = validatePermissionStateContradictions(
    '留学生資格外活动，两个兼职掛け持ち，每份都可以28小时吗？',
    '当前判断：掛け持ちの場合はそれぞれ28時間以内なら大丈夫です。',
  )

  assert.ok(findings.some(f => f.id === 'answer-shikakugai-multiple-jobs-each-28h'))
})

test('does not flag shikakugai answer that states vacation daily cap', () => {
  const findings = validatePermissionStateContradictions(
    '我是留学生，夏休み可以周40小时全职打工吗？',
    '当前判断：长期休假也不是无限制；需要按一天8小时以内来确认，不能简单说可以全职。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-shikakugai-long-vacation-unlimited'))
})

test('detects shikakugai prohibited industry allowed language', () => {
  const findings = validatePermissionStateContradictions(
    '我是留学签，朋友介绍我去ガールズバー做ホール，说不是陪酒只是端酒，可以用資格外活動去做吗？',
    '当前判断：如果只是ホール端酒，不陪酒的话可以做。',
  )

  assert.ok(findings.some(f => f.id === 'answer-shikakugai-prohibited-industry-allowed'))
})

test('detects address-change automatic completion without card-presentation caveat', () => {
  const findings = validatePermissionStateContradictions(
    '我搬家后オンライン做了転入届，住民票改了，在留卡地址和入管也会自动更新吗？',
    '当前判断：住民票改了以后入管住居地届出就自动完成，不用另外处理在留卡地址。',
  )

  assert.ok(findings.some(f => f.id === 'answer-address-change-auto-without-card'))
})

test('does not flag address-change answer that asks whether residence card was presented', () => {
  const findings = validatePermissionStateContradictions(
    '搬家后住民票改了，入管也算通知了吗？',
    '当前判断：如果带在留卡到市区町村窗口办理，通常视为入管侧住居地届出也完成；如果没有提示在留卡，则需要确认是否另行处理。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-address-change-auto-without-card'))
})

test('detects minashi reentry over-one-year language', () => {
  const findings = validatePermissionStateContradictions(
    '我是永住者，准备回国2年，みなし再入国で戻れますか？',
    '当前判断：永住者可以长期在海外，みなし再入国でも2年后回来没有问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-minashi-reentry-unlimited-or-over-one-year'))
})

test('detects short-stay minashi reentry availability language', () => {
  const findings = validatePermissionStateContradictions(
    '我是観光ビザ短期滞在，回国后还想回来，可以用みなし再入国吗？',
    '当前判断：短期滞在也可以使用みなし再入国。',
  )

  assert.ok(findings.some(f => f.id === 'answer-short-stay-minashi-reentry-available'))
})

test('detects residence-card expiry equals status expiry language', () => {
  const findings = validatePermissionStateContradictions(
    '永住者ですが在留カードの有効期限が切れました，ビザも切れた？',
    '当前判断：在留カードが切れたので在留資格も失効し、必须离境。',
  )

  assert.ok(findings.some(f => f.id === 'answer-card-expiry-equals-status-expiry'))
})

test('detects tokubetsu kyoka fallback language', () => {
  const findings = validatePermissionStateContradictions(
    '不许可になっても在留特別許可があるって聞いた，申請できる？',
    '当前判断：不许可后可以申请在留特別許可作为兜底选项。',
  )

  assert.ok(findings.some(f => f.id === 'answer-tokubetsu-kyoka-normal-fallback'))
  assert.equal(findings.find(f => f.id === 'answer-tokubetsu-kyoka-normal-fallback')?.severity, 'P0')
})

test('does not flag tokubetsu kyoka non-normal-route warning', () => {
  const findings = validatePermissionStateContradictions(
    '在留特別許可とは何ですか？',
    '当前判断：在留特別許可不是普通在留申请，也不是不许可后的兜底路线；它是在退去强制手续中的特别许可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-tokubetsu-kyoka-normal-fallback'))
})

test('detects tokutei katsudo catch-all work language', () => {
  const findings = validatePermissionStateContradictions(
    '我是内定者特定活动，拿到内定了，可以直接入职工作吗？',
    '当前判断：内定者特定活動可以拿到内定后直接入职工作。',
  )

  assert.ok(findings.some(f => f.id === 'answer-tokutei-katsudo-catch-all-work'))
})

test('does not flag tokutei katsudo designation-scope warning', () => {
  const findings = validatePermissionStateContradictions(
    '特定活動ビザですが何ができますか？',
    '当前判断：特定活動不是何でも自由できる资格，必须先核对指定书写明的活动范围。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-tokutei-katsudo-catch-all-work'))
})

test('detects eijuu equals citizenship language', () => {
  const findings = validatePermissionStateContradictions(
    '永住拿到以后是不是就变成日本人？归化申请是在入管还是法務局？',
    '当前判断：永住就是取得日本国籍，归化也可以在入管申请。',
  )

  assert.ok(findings.some(f => f.id === 'answer-eijuu-equals-citizenship'))
})

test('detects third-party replacement of individual notification duty', () => {
  const findings = validatePermissionStateContradictions(
    '换工作以后公司HR说会帮我通知入管，所以本人14日届出不用管了吧？',
    '当前判断：公司HR会处理入管通知，所以本人不用做任何届出。',
  )

  assert.ok(findings.some(f => f.id === 'answer-third-party-replaces-individual-notification'))
})

test('detects remaining period as safety from status cancellation', () => {
  const findings = validatePermissionStateContradictions(
    '我离职4个月了，但是在留期限还有2年，会不会被取消？',
    '当前判断：在留期限还有2年，所以取消风险不用担心。',
  )

  assert.ok(findings.some(f => f.id === 'answer-period-remaining-means-no-cancellation'))
})

test('detects false application safe-after-permission language', () => {
  const findings = validatePermissionStateContradictions(
    '申请书里收入写高了一点，已经许可下来了，现在安全吗？',
    '当前判断：许可已经下来了，所以这个不实内容已经安全，后面没问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-false-application-safe-after-permission'))
})

test('does not flag truthfulness warning as false-application safe language', () => {
  const findings = validatePermissionStateContradictions(
    '申请书里收入写高了一点，已经许可下来了，现在安全吗？',
    '当前判断：许可已经下来也不代表安全；虚假或不实申请可能涉及取消风险，应尽快找律师或专业人士确认。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-false-application-safe-after-permission'))
})

test('detects ssw automatic transition and family overreach', () => {
  const findings = validatePermissionStateContradictions(
    '特定技能1号满5年以后会自动升2号吗？2号是不是可以带家族？',
    '当前判断：特定技能1号满五年会自动变成2号，特定技能1号也可以带家属。',
  )

  assert.ok(findings.some(f => f.id === 'answer-ssw-auto-or-family-overreach'))
})

test('detects HSP income and PR shortcut overreach', () => {
  const findings = validatePermissionStateContradictions(
    '高才点数算年收时，残業代和住宅手当可以算吗？70分是不是马上能永住？',
    '当前判断：残業代和住宅手当都可以算进高才年收，70点就可以马上申请永住。',
  )

  assert.ok(findings.some(f => f.id === 'answer-hsp-income-or-pr-shortcut-overreach'))
})

test('does not flag HSP income answer that warns against counting allowances casually', () => {
  const findings = validatePermissionStateContradictions(
    '高才点数算年收时，残業代和住宅手当可以算吗？',
    '你必须确认年収中是否混杂通勤手当、住宅手当、残业代等；这些不能随意计入，需要看哪些收入能被认可。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-hsp-income-or-pr-shortcut-overreach'))
})

test('detects naitei and kyushoku tokutei katsudo work overreach', () => {
  const findings = validatePermissionStateContradictions(
    '我是内定者特定活動，公司让我下周先入社上班，可以吗？',
    '当前判断：内定者特定活動已经有内定，所以可以在内定先公司上班。',
  )

  assert.ok(findings.some(f => f.id === 'answer-naitei-kyushoku-work-overreach'))
})

test('detects TITP and ikusei shuro automatic switch language', () => {
  const findings = validatePermissionStateContradictions(
    '2027年以后技能実習会自动切换成育成就労吗？我能不能换公司？',
    '当前判断：2027年以后所有技能实习生都会自动切换成育成就劳。',
  )

  assert.ok(findings.some(f => f.id === 'answer-titp-ikusei-auto-switch'))
})

test('detects HSP2 automatic or PR-equivalent language', () => {
  const findings = validatePermissionStateContradictions(
    '高才2号是不是3年后自动变更？HSP2是不是等于永住，在留期限无期限？',
    '当前判断：高才1号满3年会自动变成高才2号，高才2号等于永住。',
  )

  assert.ok(findings.some(f => f.id === 'answer-hsp2-automatic-or-pr-equivalent'))
})

test('detects torikiji applicant-responsibility removal language', () => {
  const findings = validatePermissionStateContradictions(
    '行政书士代办申请以后，材料内容出错是不是就不是本人责任？',
    '当前判断：交给行政书士代办后，本人不用确认内容，出错也不是本人责任。',
  )

  assert.ok(findings.some(f => f.id === 'answer-torikiji-removes-applicant-responsibility'))
})

test('does not flag ordinary company cleanup running alongside a status-change application', () => {
  const findings = validatePermissionStateContradictions(
    '我经管公司基本停业，拿到IT公司技人国内定。注销公司和变更申请怎么排顺序？',
    '至于公司要处理的事情（未收款、办公室解约等），可以和你准备变更申请同步进行，但次序不能颠倒。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-torikiji-removes-applicant-responsibility'))
})

test('detects PR pending replacing current-status renewal language', () => {
  const findings = validatePermissionStateContradictions(
    '永住申请中，现在的在留期限快到期了，是不是不用更新，等结果就行？',
    '当前判断：永住申请中，所以现在的在留资格不用更新，也有两个月特例期间。',
  )

  assert.ok(findings.some(f => f.id === 'answer-pr-pending-replaces-current-renewal'))
})

test('detects non-permission special-period continues language', () => {
  const findings = validatePermissionStateContradictions(
    '更新不许可了，原来已经在特例期间，现在还可以继续两个月再申请吗？',
    '当前判断：不许可后特例期间还会继续两个月，再申请就没问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-nonpermission-special-period-continues'))
})

test('detects business-manager disposition auto-success language', () => {
  const findings = validatePermissionStateContradictions(
    '我是经管签，公司不想要了，先休眠公司是不是更容易变更技人国？能马上入职新公司吗？',
    '当前判断：先休眠公司会提高技人国变更成功率，公司处理掉后可以马上入职新公司。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-disposition-auto-success'))
})

test('detects business-manager 2025 reform old 500man shortcut language', () => {
  const findings = validatePermissionStateContradictions(
    '现在经营管理是不是还是500万就能办？',
    '当前判断：经营管理只要准备500万资本金就可以申请，基本满足条件。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
  assert.equal(findings.find(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts')?.severity, 'P0')
})

test('detects business-manager 2025 reform false no-source wording for 500man', () => {
  const findings = validatePermissionStateContradictions(
    '经管签500万这个说法到底是什么？',
    '当前判断：500万这个说法完全没有来源，在省令上不存在。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
})

test('detects business-manager 2025 reform mixed 3000man or two employees wording', () => {
  const findings = validatePermissionStateContradictions(
    '现在经营管理新规到底是3000万还是雇员？',
    '当前判断：改正后只要满足3000万资本金或2名常勤职员二选一即可。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
})

test('detects business-manager 3000man as enough or likely-safe wording', () => {
  const findings = validatePermissionStateContradictions(
    '现在经营管理是不是要3000万？有3000万是不是就稳了？',
    '当前判断：经营管理有3000万资本金基本就满足条件，申请基本稳。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
})

test('detects existing business-manager immediate full-new-rule overstrict wording', () => {
  const findings = validatePermissionStateContradictions(
    '我已经有经管签，2027年更新但还没有3000万，是不是续不了？',
    '当前判断：现在已有经营管理也要在下次更新马上满足3000万，否则续不了。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
})

test('detects startup designated activity one-size-fits-all transition wording', () => {
  const findings = validatePermissionStateContradictions(
    '我现在是创业特定活动，转经营管理时看旧500万还是新3000万？',
    '当前判断：创业特定活动转经营管理一律还能按旧基准500万处理。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
})

test('detects business-manager full-time employee scope overreach', () => {
  const findings = validatePermissionStateContradictions(
    '经营管理新规常勤职员，我公司有技人国员工和留学生兼职，可以算吗？',
    '当前判断：技人国员工和留学生兼职都可以算作常勤职员，满足新规。',
  )

  assert.ok(findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
})

test('does not flag business-manager 2025 reform wording that separates old and new rules', () => {
  const findings = validatePermissionStateContradictions(
    '经管签500万和3000万到底怎么理解？',
    '当前判断：500万属于改正前旧基准相关说法，改正后不能继续当通用条件。2025年新基准要把1名常勤职员、3000万资本金等、日语、经历和事业计划专业确认一起看；既存经管到2028年前更新还要按过渡期个别确认。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-business-manager-2025-reform-mixed-hard-facts'))
})

test('detects DV contact-abuser or guarantee language', () => {
  const findings = validatePermissionStateContradictions(
    '我被家暴分居了，配偶者签证更新需要材料，是不是要先联系老公拿资料？我不想让他知道新地址。',
    '当前判断：第一步先联系配偶者拿材料，把新地址告诉对方方便手续；有DV就一定能转定住者。',
  )

  assert.ok(findings.some(f => f.id === 'answer-dv-contact-abuser-or-guarantee'))
})

test('does not flag ordinary spouse separation as DV without safety signal', () => {
  const findings = validatePermissionStateContradictions(
    '我和日本人配偶普通分居了，配偶者签证更新材料应该怎么准备？',
    '当前判断：需要先确认婚姻实态、同居或分居理由、住民票和身元保证材料。',
  )

  assert.ok(!findings.some(f => f.id === 'answer-dv-contact-abuser-or-guarantee'))
})

test('detects shikakugai blanket permission overreach', () => {
  const findings = validatePermissionStateContradictions(
    '我是留学生，在留卡有資格外活動許可。包括许可是不是任何工作都可以做？',
    '当前判断：有包括许可就可以做任何工作，基本不用再看工作内容。',
  )

  assert.ok(findings.some(f => f.id === 'answer-shikakugai-hokatsu-unlimited-or-needless-application'))
})

test('detects notification-duty harmlessness or replacement language', () => {
  const findings = validatePermissionStateContradictions(
    '转职以后所属機関届出忘了，14天已经过了，公司说会通知入管，本人是不是没问题？',
    '当前判断：14天过了也没关系，现在补交就完全没问题；公司会处理的话本人不用做。',
  )

  assert.ok(findings.some(f => f.id === 'answer-notification-duty-harmless-or-replaced'))
})

test('detects renewal/change guaranteed-by-docs language', () => {
  const findings = validatePermissionStateContradictions(
    '续签材料全部齐了，上次也许可了，这次是不是一定能更新通过？',
    '当前判断：材料全部齐了，而且上次通过，所以这次一定能更新许可。',
  )

  assert.ok(findings.some(f => f.id === 'answer-renewal-change-guaranteed-by-docs'))
})

test('detects social-insurance and pension irrelevant language', () => {
  const findings = validatePermissionStateContradictions(
    '我是自由职业，国民年金没加入过，永住或续签会不会有影响？',
    '当前判断：年金没加入和入管在留申请无关，不影响永住或续签。',
  )

  assert.ok(findings.some(f => f.id === 'answer-social-insurance-pension-irrelevant'))
})

test('detects gijinkoku any-job or manual-work-safe language', () => {
  const findings = validatePermissionStateContradictions(
    '我是技人国，公司最近安排我去工厂生产线做现场作业，这个工作签可以做吗？',
    '当前判断：技人国是工作签，公司安排的工作就可以做，工厂生产线也没问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-gijinkoku-any-job-or-manual-work-safe'))
})

test('detects gijinkoku startup-management safe-without-change language', () => {
  const findings = validatePermissionStateContradictions(
    '我现在是技人国，想副业设立公司当法人代表，可以先做起来以后再变更经营管理吗？',
    '当前判断：副业小规模公司用技人国也没问题，先公司设立经营，之后再变更经营管理就行。',
  )

  assert.ok(findings.some(f => f.id === 'answer-gijinkoku-startup-management-safe-without-change'))
})

test('detects CoE entry-guarantee or long-validity language', () => {
  const findings = validatePermissionStateContradictions(
    'COE拿到了是不是一定能入国？有效期是6个月还是3个月，过期还能用吗？',
    '当前判断：CoE拿到后一定可以入国，有效期一般是6个月，过期也可以试着用。',
  )

  assert.ok(findings.some(f => f.id === 'answer-coe-guarantees-entry-or-long-validity'))
})

test('detects renewal timing special-period-after-expiry language', () => {
  const findings = validatePermissionStateContradictions(
    '续签什么时候申请？是不是有特例期间，所以在留期限过期后再申请也没问题？',
    '当前判断：特例期间可以保护期限后申请，所以过期后再提交更新申请也没问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-renewal-timing-special-period-after-expiry'))
})

test('detects late-payment remediation-erases-history language', () => {
  const findings = validatePermissionStateContradictions(
    '住民税之前晚交了，但现在补缴完了，纳税证明也能开，永住风险是不是归零？',
    '当前判断：补缴后风险归零，纳税证明能开出来就说明入管不会看以前迟缴。',
  )

  assert.ok(findings.some(f => f.id === 'answer-late-payment-remediation-erases-history'))
})

test('detects corrected tax filing framed as no renewal impact', () => {
  const findings = validatePermissionStateContradictions(
    '去年副业收入忘了报，税务署让我做修正申告，我也补税了。下次更新在留是不是不会影响？',
    '当前判断：修正申告済みなので更新には影響ありません，已经处理完就没问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-late-payment-remediation-erases-history'))
})

test('detects pension exemption equals arrears or free-pass language', () => {
  const findings = validatePermissionStateContradictions(
    '国民年金免除和滞纳在永住审查里一样吗？外国人是不是不用管年金？',
    '当前判断：免除和滞纳一样，外国人本来就不用管国民年金。',
  )

  assert.ok(findings.some(f => f.id === 'answer-pension-exemption-equals-arrears-or-free-pass'))
})

test('detects dependent work without permission language', () => {
  const findings = validatePermissionStateContradictions(
    '我是家族滞在，老公是技人国，我可以直接打工吗？还是要先申请資格外活動？',
    '当前判断：配偶者有工作签，所以家族滞在本人也可以直接打工；资格外活动申请中可以先做。',
  )

  assert.ok(findings.some(f => f.id === 'answer-dependent-can-work-without-permit'))
})

test('detects postcard or exam-complete equals permission language', () => {
  const findings = validatePermissionStateContradictions(
    '在线变更审查完了邮件来了，是不是许可了，可以去新公司入职上班吗？',
    '当前判断：審査完了就是许可通过，可以去新公司上班。',
  )

  assert.ok(findings.some(f => f.id === 'answer-postcard-or-exam-complete-equals-permission'))
})

test('detects exam-complete before card pickup framed as safe travel', () => {
  const findings = validatePermissionStateContradictions(
    '我在留資格変更申请显示审查结束了，还没去拿新卡。现在想先出国，回来再领结果可以吗？',
    '当前判断：审查结束后还没领取新卡也可以先出国，回来再领结果没问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-postcard-or-exam-complete-equals-permission'))
})

test('detects short-stay work or shikakugai-safe language', () => {
  const findings = validatePermissionStateContradictions(
    '我是旅游签证90天来日本，拿到内定了，可以先申请资格外活动入职工作吗？',
    '当前判断：短期滞在期间可以申请资格外活动许可，拿到内定后可以先入职。',
  )

  assert.ok(findings.some(f => f.id === 'answer-short-stay-work-or-shikakugai-safe'))
})

test('detects work-status side-job unrestricted language', () => {
  const findings = validatePermissionStateContradictions(
    '我现在是技人国人文签，晚上想做副业接单，收入不多，是不是没问题？',
    '当前判断：有工作签就可以自由副业，副业收入少的话在留上没问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-work-status-side-job-unrestricted'))
})

test('detects SSW job-change free or notification-only language', () => {
  const findings = validatePermissionStateContradictions(
    '我是特定技能1号，想从外食转到宿泊，听说特定技能可以自由转职，只要届出就行吗？',
    '当前判断：特定技能没有转职限制，不同领域也只要届出就可以。',
  )

  assert.ok(findings.some(f => f.id === 'answer-ssw-job-change-free-or-notification-only'))
})

test('detects nonpermission appeal or grace-period language', () => {
  const findings = validatePermissionStateContradictions(
    '在留更新不许可了，我可以异议申立吗？不许可后是不是还有特例期间继续留？',
    '当前判断：不许可后可以審査請求，异议申立期间也有特例期间继续合法停留。',
  )

  assert.ok(findings.some(f => f.id === 'answer-nonpermission-appeal-or-grace-period'))
})

test('detects PR years-only or public-obligation irrelevant language', () => {
  const findings = validatePermissionStateContradictions(
    '我在日本住满10年了，其中留学比较久，是不是可以申请永住？税金年金会影响吗？',
    '当前判断：永住只看年数，日本住满10年就可以申请，税金年金和永住无关。',
  )

  assert.ok(findings.some(f => f.id === 'answer-pr-years-only-or-public-obligations-irrelevant'))
})

test('detects soft PR years-only and remediation-erases-risk language', () => {
  const findings = validatePermissionStateContradictions(
    '想申请永住，但是之前有几次住民税和年金交晚了，不是没交，是后来补上的。这种会不会影响永住？',
    '当前判断：补缴完对永住就没有影响了，基本就是年数问题。',
  )

  assert.ok(findings.some(f => f.id === 'answer-pr-years-only-or-public-obligations-irrelevant'))
})

test('detects PR card renewal not-needed or status-lost language', () => {
  const findings = validatePermissionStateContradictions(
    '我是永住者，在留卡7年有效期快过期了。永住不是永久吗，卡还需要更新吗？',
    '当前判断：永住者在留卡不需要更新，或者卡过期就自动失去永住资格。',
  )

  assert.ok(findings.some(f => f.id === 'answer-pr-card-renewal-not-needed-or-status-lost'))
})

test('detects gijinkoku JLPT fixed or irrelevant language', () => {
  const findings = validatePermissionStateContradictions(
    '人文签申请是不是必须有JLPT N2？我只有N3还能申请技人国吗？',
    '当前判断：技人国必须有JLPT N2；如果没有N2就不能申请。',
  )

  assert.ok(findings.some(f => f.id === 'answer-gijinkoku-jlpt-fixed-or-irrelevant'))
})

test('detects unseparated gijinkoku Japanese-irrelevant language', () => {
  const findings = validatePermissionStateContradictions(
    '技术人文知识国际业务没有 N2 能不能申请？岗位需要海外客户邮件对应。',
    '当前判断：海外客户岗位下，日本语能力和技术人文知识国际业务完全无关。',
  )

  assert.ok(findings.some(f => f.id === 'answer-gijinkoku-jlpt-fixed-or-irrelevant'))
})

test('detects foreign-worker social-insurance optional language', () => {
  const findings = validatePermissionStateContradictions(
    '我是外国人技人国全职，公司说不用给我上社会保险，这个和签证永住有关系吗？',
    '当前判断：外国人不用加入社会保险，公司不给上也和本人完全无关。',
  )

  assert.ok(findings.some(f => f.id === 'answer-foreign-worker-social-insurance-optional'))
})

test('detects employer wage supplement replacing social insurance language', () => {
  const findings = validatePermissionStateContradictions(
    '公司说不用给我交厚生年金，工资多发一点可以吗？',
    '当前判断：公司不给上厚生年金也不影响签证，工资多给一点可以替代社保。',
  )

  assert.ok(findings.some(f => f.id === 'answer-foreign-worker-social-insurance-optional'))
})

test('validateAnswer combines route-gate, label, and contradiction checks', () => {
  const findings = validateAnswer({
    question: '我年收1200万，可以走J-Skip吗？',
    answer: '当前判断：J-Skip 可能走。建议动作：准备材料。',
  })

  assert.ok(findings.some(f => f.id === 'answer-missing-label-先看这里'))
  assert.ok(findings.some(f => f.id === 'answer-jskip-1200-1600-possible'))
})

test('selects terminal findings for stream completion gating', () => {
  const routeGateMatches = matchRouteGates('更新申请审查中，原期限加两个月快到了，我还能继续等吗？')
  const findings = validateAnswer({
    question: '更新申请审查中，原期限加两个月快到了，我还能继续等吗？',
    answer: '先看这里\n当前判断：这不是无限延长\n建议动作：先确认原期限',
    routeGateMatches,
  })
  const terminal = selectTerminalGuardrailFindings(findings, { routeGateMatches })

  assert.ok(terminal.some(f => f.id === 'answer-no-terminal-punctuation'))
  assert.ok(terminal.some(f => f.id === 'answer-missing-label-暂缓事项'))
})

test('terminal-gates Loop2L high-risk answer contradictions', () => {
  const findings = validateAnswer({
    question: '我在日本住满10年了，其中留学比较久，是不是可以申请永住？税金年金会影响吗？',
    answer: '先看这里\n当前判断：永住只看年数，日本住满10年就可以申请，税金年金和永住无关。\n建议动作：准备申请。\n暂缓事项：没有。',
  })
  const terminal = selectTerminalGuardrailFindings(findings)

  assert.ok(terminal.some(f => f.id === 'answer-pr-years-only-or-public-obligations-irrelevant'))
})

test('does not terminal-gate non-critical missing punctuation alone', () => {
  const findings = validateAnswerCompleteness('普通问题可以这样处理')
  const terminal = selectTerminalGuardrailFindings(findings)

  assert.ok(findings.some(f => f.id === 'answer-no-terminal-punctuation'))
  assert.ok(!terminal.some(f => f.id === 'answer-no-terminal-punctuation'))
})

test('does not flag terminal punctuation wrapped in markdown emphasis', () => {
  const findings = validateAnswerCompleteness('这份说明书建议先请行政书士看一下是否符合在留逻辑再提交，不要自己即兴发挥。**')

  assert.ok(!findings.some(f => f.id === 'answer-no-terminal-punctuation'))
})

test('safe complete answer passes focused validator checks', () => {
  const answer = [
    '先看这里',
    '当前判断：这类问题先区分手续状态和材料状态，不能把补件或受付直接当作许可。',
    '建议动作：先确认通知书日文标题、日期、期限和要求动作，再按窗口要求准备可取得材料。',
    '暂缓事项：不要把不完整材料递交说成一定能受理，也不要超过通知书上的期限。',
    '正文里可以继续说明国税、住民税、在留期限和工作开始日的关系，但不预测入管会许可或不许可。',
  ].join('\n')

  const findings = validateAnswer({
    question: '补件通知来了，材料不齐，快到期了怎么办？',
    answer,
  })

  assert.deepEqual(findings, [])
})
