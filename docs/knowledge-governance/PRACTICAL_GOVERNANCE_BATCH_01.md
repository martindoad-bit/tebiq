# Practical Governance Batch 01

> 治理対象: `docs/practical-fact-layer/cards/practical-001.md` 〜 `practical-050.md`
> 治理日: 2026-05-19
> 担当: 実務知識層治理窗口 (Claude)
> 前任生産者: FACT Operator（既存 frontmatter は前任分類）
> 新基準分桶: ANSWER_RUNTIME / MATERIALS_ONLY / LAW_SOURCE_ANCHOR / L5_ONLY / NEEDS_REWRITE / DUPLICATE / CONFLICT / REJECT / UNKNOWN

---

## 1. 本轮范围

- **輸入カード数**: 50（practical-001 〜 practical-050）
- **来源ディレクトリ**: `docs/practical-fact-layer/cards/`
- **処理時間**: 2026-05-19（治理窗口 Batch 01）
- **既存 frontmatter の分桶**: ほぼ全件が「ANSWER_RUNTIME」表記、2 件が「MATERIALS_ONLY」表記
- **source_type**: 全件が "official" または "official + scrivener_verified"
- **confidence**: 48 件 high、2 件 medium（practical-040 / practical-050）

---

## 2. 分桶結果

| Bucket | 数量 | 説明 |
|---|---:|---|
| ANSWER_RUNTIME | 48 | 答案に直接注入可。短版 runtime block 生成済 |
| MATERIALS_ONLY | 2 | practical-018（更新書類リスト）/ practical-034（配偶者申請書類） |
| LAW_SOURCE_ANCHOR | 0 | 本バッチには法源卡は含まれない |
| L5_ONLY | 0 | L5 専用カードはなし（深水信号は各カード内に分散） |
| NEEDS_REWRITE | 0 | 構造は安定、表述も実務的 |
| DUPLICATE | 0 | 50 張内に重複なし |
| CONFLICT | 0 | 本バッチ内には法源と直接矛盾するカードなし |
| REJECT | 0 | 来源・confidence ともに基準充足 |
| UNKNOWN | 0 | — |

**観察**: 前任 FACT Operator の生成品質は高く、構造・来源とも安定。再分桶での移動は最小限。

---

## 3. 可進入 ANSWER_RUNTIME 的卡

| card_id | 用户問題（1行） | 一句話結論 | 風險等級 | 来源強度 |
|---|---|---|---|---|
| practical-001 | 日本人と離婚した。届出は？ | 14日以内届出義務（19条の16）。怠ると更新で不利 | P0 | high・公式 |
| practical-002 | 離婚後も日本にいたい | 定住者・就労系への早期変更申請が安全 | P0 | high・公式 |
| practical-003 | 日本人配偶者が死亡した | 14日届出＋6か月内に変更準備。死別は許可率比較的高 | P1 | high・公式 |
| practical-004 | 別の日本人と再婚した | 離婚・再婚それぞれ14日届出。短期間再婚は偽装婚疑義 | P1 | high・公式 |
| practical-005 | バーチャルオフィスで経営管理可？ | 原則不可。実体事務所＋資本金500万円 | P0 | high・公式 |
| practical-006 | 赤字続きで経営管理更新できる？ | 即不許可ではないが事業継続意思・見通しの書面必須 | P0 | high・公式 |
| practical-007 | 技人国で転職した届出は？ | 前職・新職それぞれ14日以内。在留資格は失効せず | P0 | high・公式 |
| practical-008 | 転職後は変更か更新か | 業務が技人国範囲内なら更新、範囲外なら変更 | P1 | high・公式 |
| practical-009 | 技人国の副業はOK？ | 資格外活動許可必須・週28時間上限 | P1 | high・公式 |
| practical-010 | 永住申請で年金・税の滞納は？ | 完納が実質要件。滞納残は申請前に全額解消 | P0 | high・公式 |
| practical-011 | 永住申請中に在留期限が来る | 在留期限前提出で特例期間が適用される | P0 | high・公式 |
| practical-012 | 大学卒業後の就活ビザは？ | 特定活動（就職活動）、最長1年 | P1 | high・公式 |
| practical-013 | 留学のバイトが週28時間超 | 不法就労扱い・次回更新拒否リスク | P0 | high・公式 |
| practical-014 | 家族滞在で正社員になれる？ | アルバイト週28時間まで・正社員は変更必要 | P1 | high・公式 |
| practical-015 | 本体者が帰国・資格喪失 | 家族滞在は次回更新不可・独立資格へ変更 | P0 | high・公式 |
| practical-016 | 更新が不許可になった | 通知から最大2か月以内に専門家相談必須 | P0 | high・公式 |
| practical-017 | 引越し届出は？ | 市区町村に14日以内・在留カードも同時更新 | P1 | high・公式 |
| practical-019 | 高度専門職のポイント計算 | 最高学歴のみ・年収はボーナス含む・40歳以上も他で70点可 | P1 | high・公式 |
| practical-020 | 特定技能1号5年満了後は？ | 2号移行・他資格変更・帰国の3択 | P1 | high・公式 |
| practical-021 | 永住の在留歴10年計算は？ | 通算10年＋うち就労系5年。留学のみ10年は不可 | P0 | high・公式 |
| practical-022 | 一時帰国の再入国許可は？ | 1年以内はみなし・1年超は正規 | P1 | high・公式 |
| practical-023 | 永住と帰化の違いは？ | 永住＝外国籍維持。帰化＝日本国籍取得（原国籍喪失） | P1 | high・公式 |
| practical-024 | 技能実習から特定技能 | 良好修了＋同分野なら試験免除 | P1 | high・公式 |
| practical-025 | 在留カードを紛失した | 警察届出＋14日以内ISA再交付申請 | P1 | high・公式 |
| practical-026 | 研究と技人国の違いは？ | 学術機関＝研究、民間R&D＝技人国 | P1 | high・公式 |
| practical-027 | 1年更新を3年・5年にする方法 | ISAが個別判断。安定実態の積み重ねが鍵 | P1 | high・公式 |
| practical-028 | 外国人雇用の届出義務は？ | ハローワーク翌月末まで・在留資格未確認は不法就労助長罪 | P1 | high・公式 |
| practical-029 | 特定活動46号とは | 日本の大学・大学院卒＋N1で幅広い就労が可能 | P1 | high・公式 |
| practical-030 | 在留資格取消の通知が来た | 意見聴取段階で弁護士・行政書士相談が最後の機会 | P0 | high・公式 |
| practical-031 | 自分の会社を作って代表取締役 | 技人国→経営管理の変更申請が必須 | P1 | high・公式 |
| practical-032 | オンライン申請は？ | 本人はマイナンバーカード必須・審査期間は窓口と同じ | P1 | high・公式 |
| practical-033 | 日本人の子の養育で定住者 | 親権＋同居養育＋生計能力の3要件 | P1 | high・公式 |
| practical-035 | 文系卒で IT 業務に就ける？ | 理系業務には理系専攻または10年実務経験 | P1 | high・公式 |
| practical-036 | 介護で働く資格は？ | 介護＝国家資格必須・特定技能＝試験合格 | P1 | high・公式 |
| practical-037 | 補正書類の通知が来た | 通知の期限内提出。期限超過＝取下げ | P1 | high・公式 |
| practical-038 | 特定活動で何ができる？ | パスポート貼付の指定書で範囲を確認 | P1 | high・公式 |
| practical-039 | 料理人ビザの要件は？ | 外国特有料理＋10年以上経験。和食は対象外 | P1 | high・公式 |
| practical-040 | 行政書士に頼むべき？ | 複雑案件は依頼推奨。費用は更新3〜8万円程度 | P1 | medium・公式 |
| practical-041 | 海外から日本就労のフロー | COE→ビザ→入国。3〜5か月 | P1 | high・公式 |
| practical-042 | 子どもの在留資格は？ | 日本生まれ30日以内取得申請・外国生まれCOE | P1 | high・公式 |
| practical-043 | 倒産・リストラされた | 在留即失効せず・14日届出・無職6か月超で取消 | P0 | high・公式 |
| practical-044 | 永住者の継続義務は？ | カード7年更新・住所届出・再入国許可は通常通り | P1 | high・公式 |
| practical-045 | 技人国の給与水準は？ | 日本人同等以上・実務目安月20〜25万円以上 | P1 | high・公式 |
| practical-046 | 特定技能の支援計画とは？ | 1号は支援計画必須・自社実施か登録支援機関委託 | P1 | high・公式 |
| practical-047 | 特定技能で転職できる？ | 同分野は届出のみ・分野変更は試験＋変更申請 | P1 | high・公式 |
| practical-048 | 学校の先生になる資格は？ | 小中高＝教育・大学＝教授・語学スクール＝技人国 | P1 | high・公式 |
| practical-049 | 定住者の対象は？ | 告示（日系3世・中国帰国者等）と非告示（離婚後等） | P1 | high・公式 |
| practical-050 | 銀行口座・携帯は作れる？ | 法令制限なし・在留1年以上で開設しやすい | P1 | medium・公式 |

**短版 runtime block**: 全 48 件を `docs/knowledge-governance/runtime/PRACTICAL_BATCH_01_RUNTIME_BLOCKS.md` に集約済。

---

## 4. 可進入 MATERIALS_ONLY 的卡

| card_id | 材料/手続 | 復用場景 |
|---|---|---|
| practical-018 | 技人国・経営管理の更新時標準添付書類チェックリスト（カテゴリ別） | 材料Tab・更新申請チェックリストUI・材料桥（practical-008・practical-031 と連携） |
| practical-034 | 「日本人の配偶者等」の申請書類セット（戸籍・住民票・収入証明・婚姻実態書類） | 材料Tab・配偶者ビザ申請パッケージ（practical-001〜004 と連携） |

**注**: 両カードは「材料リスト＋簡単な解説」型で、判断ロジックは別カードに分散している。MATERIALS_ONLY としての利用が安全。

---

## 5. 法源錨点卡

本バッチ（practical-001〜050）には法源カードは含まれない。
- すべて「実務カード」分類で、法源は各カード内の「官方依据」セクションに引用されている。
- 別途 `docs/legal-source-cards/` または `docs/fact-cards/legal-source-engineering/` 系を Batch 02 以降で治理予定。

---

## 6. 需要 DOMAIN 判断的問題

| pdom_id | 関連カード | 問題 | DOMAIN 必要な理由 |
|---|---|---|---|
| pdom-001 | practical-001 | 「正当な理由」の現場認定基準（DV・調停中・失踪等の認定範囲） | ISA 窓口の裁量範囲が法文に明示なし。行政書士実務口径を要確認 |
| pdom-002 | practical-002 | 定住者（離婚後）申請で ISA が「正当理由」と「実体的生活基盤」のどちらを重視 | 提出書類の優先順位を決めるため、内部運用基準の確認が必要 |
| pdom-003 | practical-005 | バーチャルオフィス不可の根拠：公式ガイダンス／通達の存在有無 | 現在は省令解釈＋実務慣行ベース。公式根拠が欲しい |
| pdom-004 | practical-006 | 赤字継続時の「事業継続の意思と見通しを示す書面」の公式要件 | 理由書・事業計画書の標準内容を明確化したい |
| pdom-005 | practical-010 | 「直近5年の社会保険完納」確認書類として ISA が要求するもの（ねんきん定期便/ねんきんネット/年金記録照会等） | 2024年改正施行後の公式要件を確認したい |
| pdom-006 | practical-016 | 不許可後の在留特例期間の起算点（通知書受領日 vs 処分決定日）、および特例期間中の就労継続の法的根拠 | 実務の重要分岐点であり、ISA への直接照会または弁護士見解が必要 |

**DOMAIN への送付**: 上記 6 件を queue 化済。前バッチからの累計 DOMAIN queue（pdom-001〜009）に統合済（既存資料の頭出し）。

---

## 7. 重複/合并建議

本バッチ内に重複・合并候補なし。

**潜在的な相互参照（合并ではなく相互リンク推奨）**:
- practical-001 + practical-002 + practical-003 + practical-004: 「配偶者等」ライフサイクル（離婚→継続→死別→再婚）の連続カードセット
- practical-005 + practical-006 + practical-031: 「経営管理」三部作（事務所要件→赤字更新→技人国からの変更）
- practical-009 + practical-013 + practical-014: 「資格外活動（週28時間）」三部作（技人国副業・留学バイト・家族滞在バイト）
- practical-007 + practical-008 + practical-043: 「技人国の転職／失業」連動セット
- practical-021 + practical-010 + practical-011: 「永住申請」連動セット（10年要件→公的義務→特例期間）

answer ランタイムでの注入時は単独投入で十分だが、深水案件では複数カードの連動参照が必要。

---

## 8. 本轮最有価値的 10 張卡

優先順位順（answer ランタイム注入の頻度・リスク影響度ベース）:

1. **practical-001** — 配偶者等：離婚後14日届出義務。最頻出 P0 案件のひとつ。
2. **practical-010** — 永住：公的義務完納要件。2024年改正で明文化された審査ポイント。
3. **practical-007** — 技人国：転職時の14日届出。日常的に発生する手続き。
4. **practical-016** — 不許可後の特例期間と再申請。緊急案件で即時対応必須。
5. **practical-005** — 経営管理：バーチャルオフィス問題。起業相談で頻出の誤解。
6. **practical-021** — 永住：在留歴10年計算と5年就労要件の落とし穴。
7. **practical-013** — 留学：アルバイト週28時間超過リスク。次回更新に直結。
8. **practical-022** — 再入国許可：1年と5年の選択。永住失効リスクと連動。
9. **practical-043** — 倒産・リストラ時の対応。失業外国人の即時対応カード。
10. **practical-006** — 経営管理：赤字継続更新。経営者の典型 P0 案件。

---

## 9. 本轮不能使用的高風險卡

該当なし。50 張すべて confidence: high（48 件）または medium（2 件）・source: official 基準を充足。

**注意点（弱め）**:
- practical-040（行政書士活用）: confidence: medium。費用相場は地域・難易度で変動するため、安全表述では「一般的に」「目安」と留保。
- practical-050（銀行口座・携帯）: confidence: medium・各機関規程に依拠する性質。安全表述では「各機関に直接確認」を強調。

両カードとも ANSWER_RUNTIME として利用可だが、注入時の留保表現を厳守すること。

---

## 10. Codex 主工程窓口への交付物

| 種別 | パス | 用途 |
|---|---|---|
| Runtime blocks | `docs/knowledge-governance/runtime/PRACTICAL_BATCH_01_RUNTIME_BLOCKS.md` | answer ランタイムへの直接注入用（48 ANSWER_RUNTIME + 2 MATERIALS_ONLY） |
| Materials-only リスト | 本レポートの §4 を直接参照 | 材料Tab・材料桥構築用 |
| DOMAIN queue | 本レポート §6（pdom-001〜006） | DOMAIN-CC への送付対象 |
| Reject リスト | 該当なし | — |
| Conflict リスト | 該当なし | — |

**Ingestion 推奨フロー**:
1. answer ランタイムは runtime_blocks.md の yaml を直接読み込んで card_id 毎の `short_answer` + `practical_rule` + `should_not_say` を P0/P1 ガード生成のシードに使う。
2. UI 側材料Tab は MATERIALS_ONLY の 2 件＋ ANSWER_RUNTIME 各カードの material_bridge 配列を統合して材料リストを生成。
3. DOMAIN 復核ループは §6 の 6 件を queue 化（既存 pdom-001〜009 と一致するためマージ）。

---

## 次バッチ予告

- **Batch 02**: practical-051 〜 practical-100（50 張）
- 想定: 在留資格・手続き系で前任が作成した中後期カード（実務側面が多い）
- 法源カードは別途 Batch（`fact-cards/legal-source-engineering/` 系を予定）

---

## Handoff Note

- 完成日: 2026-05-19
- 担当: 実務知識層治理窗口 (Claude)
- 状態: 完了、Codex 主工程と DOMAIN-CC への配信可
- 次の作業: PRACTICAL_GOVERNANCE_BATCH_02.md（practical-051〜100）
- 既存 frontmatter との差分: 50 張中 0 張で分桶変更（既存判断を維持）
