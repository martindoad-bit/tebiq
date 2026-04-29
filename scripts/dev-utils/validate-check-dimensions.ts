import {
  CHECK_DIMENSION_VISA_TYPES,
  readCheckDimensionDocs,
  validateCheckDimensionDoc,
} from './check-dimension-content'

async function main() {
  const docs = await readCheckDimensionDocs()
  const issues = docs.flatMap(validateCheckDimensionDoc)
  const errors = issues.filter(issue => issue.level === 'error')
  const warnings = issues.filter(issue => issue.level === 'warning')
  const byVisa = new Map<string, number>()

  for (const doc of docs) {
    const visaType = doc.frontmatter.visa_type ?? '(missing)'
    byVisa.set(visaType, (byVisa.get(visaType) ?? 0) + 1)
  }

  console.log(`check dimension files: ${docs.length}`)
  for (const visaType of CHECK_DIMENSION_VISA_TYPES) {
    console.log(`- ${visaType}: ${byVisa.get(visaType) ?? 0}`)
  }

  if (warnings.length > 0) {
    console.log(`warnings: ${warnings.length}`)
    for (const issue of warnings) {
      console.log(`- [warning] ${issue.file} ${issue.field}: ${issue.message}`)
    }
  }

  if (errors.length > 0) {
    console.error(`errors: ${errors.length}`)
    for (const issue of errors) {
      console.error(`- [error] ${issue.file} ${issue.field}: ${issue.message}`)
    }
    process.exitCode = 1
    return
  }

  console.log('check dimension validation passed')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
