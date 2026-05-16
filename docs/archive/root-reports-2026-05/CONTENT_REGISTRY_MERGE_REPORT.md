# Content Registry Merge Report

## 基线
- main: `841a3ac3c7ec9bb746bf0a4198d7da74d340bc6d`
- source branch: `origin/content/index-and-review-registry`
- source head: `3e53bfcd8fd04db5eba26884ddd85755cba54940`

## diff 检查
- 是否包含 batch-06 documents: 是，source branch 含 `docs/knowledge-seed/documents/**`。
- 是否包含 batch-07 scenarios: 是，source branch 含 `docs/knowledge-seed/scenarios/**`。
- 是否直接 merge: 否。
- 是否 selective checkout: 是，只取 4 个内容治理索引文件。

## 已接入文件
1. `docs/knowledge-seed/CONTENT_INDEX.md`
2. `docs/knowledge-seed/REVIEW_REGISTRY.md`
3. `docs/knowledge-seed/SOURCE_INDEX.md`
4. `docs/knowledge-seed/SCHEMA_RECOMMENDATIONS.md`

## 未接入内容
1. batch-06 documents 正文。
2. batch-07 scenarios 正文。
3. `docs/knowledge-seed/scenarios/china-return-prep.md` 强词修订暂不接入；该文件属于 batch-07，等 scenarios schema/importer 接入时一起带入。
4. `AI_HANDOFF_CCB.md` 暂不接入；source 状态描述包含旧的 batch 状态，避免覆盖当前 main 的 handoff。

## 原因
- batch-06 需要 documents schema/importer。
- batch-07 需要 scenarios schema/importer。
- 当前只接入内容资产治理索引，不改变产品前台内容结构。

## 验证
- `npm run lint`: 通过。
- `npm run build`: 通过。
- `npx tsc --noEmit`: 通过。

## 是否建议 push main
- 是。
- 原因: 本次只新增文档索引和报告，不接入 batch-06/07 正文，不改 schema，不改前台逻辑；验证通过。
