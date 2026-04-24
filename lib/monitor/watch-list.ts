// 入管局官网每日监控列表
// 新增页面只需追加条目，cron 会自动覆盖

export interface WatchTarget {
  id: string
  name: string
  url: string
}

export const watchList: WatchTarget[] = [
  {
    id: 'gijinkoku',
    name: '技人国官方页面',
    url: 'https://www.moj.go.jp/isa/applications/status/gijinkoku.html',
  },
  {
    id: 'keiei',
    name: '経営管理官方页面',
    url: 'https://www.moj.go.jp/isa/content/001448070.pdf',
  },
  {
    id: 'haigusha',
    name: '配偶者官方页面',
    url: 'https://www.moj.go.jp/isa/applications/status/spouseofJapanese.html',
  },
  {
    id: 'tokutei',
    name: '特定技能官方页面',
    url: 'https://www.moj.go.jp/isa/applications/status/tokuteiGinou.html',
  },
  {
    id: 'teijusha',
    name: '定住者官方页面',
    url: 'https://www.moj.go.jp/isa/applications/status/longterm.html',
  },
  {
    id: 'eijusha',
    name: '永住者官方页面',
    url: 'https://www.moj.go.jp/isa/applications/status/permanent_resident.html',
  },
  {
    id: 'shinsei_kikan',
    name: '審査処理期間',
    url: 'https://www.moj.go.jp/isa/applications/resources/shinsakikann.html',
  },
]
