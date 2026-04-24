'use client'
import { useState } from 'react'

const STORAGE_KEY = 'tebiq_check_answers'

interface MaterialItem {
  category: string
  name: string
  where: string
  whatToBring: string
  duration: string
  cost: string
  online: string
  pitfall: string
}

interface ProfileSnapshot {
  visaType: string
  expiryDate: string
  yearsInJapan: string
  companyType: string
  recentChanges: string[]
}

interface GenerateResponse {
  generatedAt: string
  visaType: string
  verdict: 'red' | 'yellow' | 'green'
  summary: string
  personalizedNotes: string
  triggered: { triggerLabel: string; severity: 'red' | 'yellow'; fixHint: string; selfFix: boolean }[]
  materials: MaterialItem[]
  profileSnapshot: ProfileSnapshot | null
}

const VISA_LABEL: Record<string, string> = {
  gijinkoku: '技術・人文知識・国際業務',
  haigusha: '日本人 / 永住者の配偶者',
  tokutei: '特定技能',
  teijusha: '定住者',
  keiei: '経営・管理',
}

export default function DownloadPackage({ visaType = 'gijinkoku' }: { visaType?: string }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (busy) return
    setError(null)
    setBusy(true)
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) {
        setError('未找到自查记录，请先完成问卷')
        return
      }
      const history = JSON.parse(raw)
      const res = await fetch('/api/generate-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, visaType }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j?.error ?? '生成失败，请稍后重试')
        return
      }
      const data: GenerateResponse = await res.json()
      openPrintWindow(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className="w-full min-h-[52px] bg-primary hover:bg-primary-hover disabled:opacity-60 text-title font-bold rounded-xl text-base transition-all"
      >
        {busy ? '生成中…可能需要 5-10 秒' : '立即获取'}
      </button>
      <p className="text-center text-muted text-xs mt-2">
        {busy ? '正在为你定制材料包' : '生成后会自动打开打印窗口，可保存为 PDF'}
      </p>
      {error && (
        <p className="text-center text-[#DC2626] text-xs mt-2">{error}</p>
      )}
    </div>
  )
}

function openPrintWindow(data: GenerateResponse) {
  const html = renderHtml(data)
  const w = window.open('', '_blank')
  if (!w) {
    alert('请允许弹出窗口以查看材料包')
    return
  }
  w.document.open()
  w.document.write(html)
  w.document.close()
  // 给浏览器一点时间渲染再触发打印
  setTimeout(() => {
    try {
      w.focus()
      w.print()
    } catch {
      /* user can manually print */
    }
  }, 600)
}

function renderHtml(data: GenerateResponse): string {
  const date = new Date(data.generatedAt)
  const dateStr = `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`
  const visaLabel = VISA_LABEL[data.visaType] ?? data.visaType
  const verdictLabel =
    data.verdict === 'red' ? '高风险（红色）' : data.verdict === 'yellow' ? '需注意（黄色）' : '可以准备（绿色）'

  const profileBlock = data.profileSnapshot
    ? `<dl class="profile">
        <div><dt>在留资格</dt><dd>${esc(data.profileSnapshot.visaType)}</dd></div>
        <div><dt>在留期限</dt><dd>${esc(data.profileSnapshot.expiryDate)}</dd></div>
        <div><dt>在日年数</dt><dd>${esc(data.profileSnapshot.yearsInJapan)}</dd></div>
        <div><dt>公司类别</dt><dd>${esc(data.profileSnapshot.companyType)}</dd></div>
        <div><dt>最近变化</dt><dd>${esc(data.profileSnapshot.recentChanges.join('、') || '无')}</dd></div>
      </dl>`
    : ''

  const triggeredBlock =
    data.triggered.length === 0
      ? `<p class="muted">未发现红 / 黄风险项。</p>`
      : data.triggered
          .map(
            t => `<div class="trigger ${t.severity}">
              <div class="trig-label">${t.severity === 'red' ? '高风险' : '需注意'} · ${esc(t.triggerLabel)}</div>
              <p>${esc(t.fixHint)}</p>
            </div>`,
          )
          .join('')

  const materialsBlock = groupByCategory(data.materials)
    .map(
      g => `<section class="cat">
        <h3>${esc(g.category)}</h3>
        ${g.items
          .map(
            m => `<article class="mat">
              <h4>□ ${esc(m.name)}</h4>
              <dl>
                <div><dt>去哪里开</dt><dd>${esc(m.where)}</dd></div>
                <div><dt>需要带</dt><dd>${esc(m.whatToBring)}</dd></div>
                <div><dt>多久拿到</dt><dd>${esc(m.duration)}</dd></div>
                <div><dt>大概费用</dt><dd>${esc(m.cost)}</dd></div>
                <div><dt>可在线办理</dt><dd>${esc(m.online)}</dd></div>
              </dl>
              <p class="pitfall">⚠ 常见踩坑：${esc(m.pitfall)}</p>
            </article>`,
          )
          .join('')}
      </section>`,
    )
    .join('')

  const finalChecklistBlock = data.materials
    .map(m => `<li><span class="ck">□</span><span>${esc(m.name)}</span></li>`)
    .join('')

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<title>TEBIQ 专属材料包 · ${esc(visaLabel)}</title>
<style>
  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,'Helvetica Neue','PingFang SC','Microsoft YaHei',sans-serif;color:#1E3A5F;background:#fff;line-height:1.7;font-size:14px}
  .page{max-width:780px;margin:0 auto;padding:36px 36px;position:relative}
  .page::before{content:'仅限本人使用';position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:80px;color:rgba(246,177,51,0.07);font-weight:bold;z-index:0;pointer-events:none;letter-spacing:8px}
  .page > *{position:relative;z-index:1}
  /* Cover */
  .cover{min-height:80vh;display:flex;flex-direction:column;justify-content:space-between;padding-top:80px;padding-bottom:60px;border-bottom:2px dashed #FFE9C4;margin-bottom:32px}
  .cover-brand{font-size:32px;letter-spacing:8px;color:#F6B133;font-weight:bold;border-bottom:3px solid #F6B133;padding-bottom:12px;display:inline-block}
  .cover h1{font-size:38px;margin:24px 0 4px;color:#1E3A5F;line-height:1.3}
  .cover-sub{color:#4A5563;font-size:16px;margin:8px 0 36px}
  .cover-meta{background:#FFF5E6;border-left:5px solid #F6B133;padding:16px 20px;border-radius:0 8px 8px 0}
  .cover-meta dt{font-size:12px;color:#6B7280;margin-top:6px}
  .cover-meta dd{font-size:15px;color:#1E3A5F;font-weight:600;margin:2px 0}
  .cover-foot{font-size:11px;color:#6B7280;line-height:1.7}
  /* Headers */
  header.section-h{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #F6B133;padding-bottom:6px;margin:36px 0 16px}
  header.section-h h2{margin:0;font-size:18px;color:#1E3A5F}
  header.section-h .pill{font-size:11px;color:#6B7280}
  .divider{border-top:1px dashed #E5E7EB;margin:28px 0}
  h3{font-size:13px;margin:20px 0 10px;color:#F6B133;text-transform:uppercase;letter-spacing:1.5px}
  h4{font-size:14px;margin:0 0 8px;color:#1E3A5F}
  p{margin:6px 0}
  .muted{color:#6B7280;font-size:12px}
  dl.profile{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;margin:0;background:#FFF5E6;padding:12px 16px;border-radius:8px;border:1px solid #FFE9C4}
  dl.profile div{display:flex;gap:8px;font-size:12px}
  dl.profile dt{color:#6B7280;flex-shrink:0}
  dl.profile dd{margin:0;color:#1E3A5F;font-weight:600}
  .summary{background:#FFF5E6;border-left:4px solid #F6B133;padding:14px 16px;border-radius:0 8px 8px 0}
  .summary strong{display:block;font-size:13px;margin-bottom:4px;color:#92400E}
  .notes{white-space:pre-line;background:#fff;border:1px solid #E5E7EB;padding:14px 16px;border-radius:8px}
  .trigger{border-left:4px solid #F6B133;background:#FFF5E6;padding:12px 14px;border-radius:0 8px 8px 0;margin:10px 0}
  .trigger.red{border-color:#DC2626;background:#FEE2E2}
  .trig-label{font-weight:bold;font-size:13px;margin-bottom:4px;color:#1E3A5F}
  .trigger p{margin:0;font-size:13px;color:#4A5563}
  .cat{margin-bottom:16px}
  .mat{border:1px solid #E5E7EB;border-left:4px solid #F6B133;border-radius:8px;padding:12px 14px;margin-bottom:10px;page-break-inside:avoid}
  .mat-title{display:flex;align-items:flex-start;gap:8px}
  .mat-check{flex-shrink:0;width:18px;height:18px;border:1.5px solid #6B7280;border-radius:3px;display:inline-block}
  .mat dl{margin:8px 0 0;display:grid;grid-template-columns:1fr;gap:3px}
  .mat dl div{display:flex;gap:6px;font-size:12px;line-height:1.5}
  .mat dl dt{color:#6B7280;flex-shrink:0;min-width:64px}
  .mat dl dd{margin:0;color:#4A5563}
  .pitfall{background:#FEF3C7;border-left:3px solid #F59E0B;padding:6px 10px;font-size:12px;color:#92400E;margin-top:8px;border-radius:0 4px 4px 0}
  /* Final checklist */
  .final-page{page-break-before:always;padding-top:30px;border-top:3px double #F6B133}
  .final-page h2{font-size:22px;color:#1E3A5F;margin:8px 0 6px}
  .final-page .lead{color:#4A5563;font-size:13px;margin-bottom:16px}
  .final-list{list-style:none;padding:0;margin:0;column-count:1}
  .final-list li{display:flex;align-items:flex-start;gap:10px;padding:8px 12px;border:1px solid #E5E7EB;border-radius:6px;margin-bottom:8px;font-size:13px;page-break-inside:avoid}
  .final-list .ck{display:inline-block;width:18px;height:18px;border:1.5px solid #1E3A5F;border-radius:3px;flex-shrink:0;margin-top:1px;text-align:center;line-height:14px;font-size:12px}
  .final-action{background:#FFF5E6;border:1px solid #FFE9C4;padding:14px 16px;border-radius:8px;margin-top:24px;font-size:13px;line-height:1.7}
  footer{margin-top:40px;padding-top:16px;border-top:1px solid #E5E7EB;color:#6B7280;font-size:11px;line-height:1.6;text-align:center}
  .running-foot{position:fixed;bottom:8px;left:0;right:0;text-align:center;color:#6B7280;font-size:10px}
  @media print{
    .no-print{display:none}
    .page{padding:18px 20px}
    .cover{min-height:auto;padding-top:24px;padding-bottom:24px}
    header.section-h{page-break-after:avoid}
    .mat{page-break-inside:avoid}
    .final-page{page-break-before:always}
  }
  .no-print{position:fixed;top:16px;right:16px;background:#1E3A5F;color:#fff;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:bold;cursor:pointer;border:0;box-shadow:0 4px 12px rgba(0,0,0,0.15)}
</style>
</head>
<body>
<button class="no-print" onclick="window.print()">打印 / 保存为 PDF</button>
<div class="page">
  <!-- Cover -->
  <section class="cover">
    <div>
      <div class="cover-brand">TEBIQ</div>
      <h1>专属材料包</h1>
      <div class="cover-sub">${esc(visaLabel)} · ${esc(verdictLabel)}</div>
      <dl class="cover-meta">
        <dt>生成日期</dt><dd>${dateStr}</dd>
        <dt>签证类型</dt><dd>${esc(visaLabel)}</dd>
        <dt>系统判定</dt><dd>${esc(verdictLabel)}</dd>
        <dt>材料清单</dt><dd>共 ${data.materials.length} 项</dd>
      </dl>
    </div>
    <div class="cover-foot">
      本材料包仅限本人使用 · 不得转让或转售<br/>
      本工具生成的内容仅供参考，请用户核对后自行修改提交，不构成法律服务<br/>
      tebiq.jp · TEBIQ 由持牌行政书士团队提供内容支持
    </div>
  </section>

  ${profileBlock ? `<header class="section-h"><h2>你的档案</h2><span class="pill">来自你的账号资料</span></header>${profileBlock}` : ''}

  <header class="section-h"><h2>你的情况摘要</h2><span class="pill">系统组合生成</span></header>
  <div class="summary">
    <strong>系统判定</strong>${esc(data.summary)}
  </div>

  <header class="section-h"><h2>你需要特别注意的地方</h2><span class="pill">AI 个性化建议</span></header>
  <div class="notes">${esc(data.personalizedNotes)}</div>

  <header class="section-h"><h2>触发的风险项</h2><span class="pill">${data.triggered.length} 项</span></header>
  ${triggeredBlock}

  <header class="section-h"><h2>需要准备的材料清单</h2><span class="pill">${data.materials.length} 项</span></header>
  ${materialsBlock}

  <!-- 最终 checklist 页 -->
  <section class="final-page">
    <header class="section-h"><h2>申请前最终 checklist</h2><span class="pill">递签当天最后核对</span></header>
    <p class="lead">递签前对着此清单逐项打勾，确认无遗漏。</p>
    <ul class="final-list">
      ${finalChecklistBlock}
      <li><span class="ck">□</span><span>所有材料按入管局指定顺序整理</span></li>
      <li><span class="ck">□</span><span>护照、在留卡、印鑑（如需要）随身携带</span></li>
      <li><span class="ck">□</span><span>申请料 4,000 日元（収入印紙，新在留卡时购买）</span></li>
      <li><span class="ck">□</span><span>有空白页用于贴照片</span></li>
      <li><span class="ck">□</span><span>预约入管局窗口或确认开门时间</span></li>
    </ul>
    <div class="final-action">
      <strong>提交后：</strong> 入管局会发受理証明，审查期间（通常 1-3 个月）可凭此证明合法继续居住和工作。<br/>
      <strong>如遇疑问：</strong> 联系 TEBIQ 平台合作书士，或致电入管インフォメーションセンター 0570-013904。
    </div>
  </section>

  <footer>
    本材料包由 TEBIQ 自动生成，仅供参考，请用户核对后自行修改提交。<br/>
    本工具不构成法律服务。复杂情况请咨询持牌行政书士。<br/>
    tebiq.jp · 生成于 ${dateStr}
  </footer>
</div>
</body>
</html>`
}

function groupByCategory(items: MaterialItem[]): { category: string; items: MaterialItem[] }[] {
  const map = new Map<string, MaterialItem[]>()
  for (const it of items) {
    if (!map.has(it.category)) map.set(it.category, [])
    map.get(it.category)!.push(it)
  }
  return Array.from(map, ([category, items]) => ({ category, items }))
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
