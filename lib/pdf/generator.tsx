import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  renderToBuffer,
} from '@react-pdf/renderer'
import { VisaSession } from '@/types/session'
import { VISA_TYPES } from '@/lib/config/visa-types'
import { FORM_QUESTIONS } from '@/lib/config/visa-form-fields'

// ── Font registration ──────────────────────────────────────────────────────────
// Noto Sans JP covers: hiragana, katakana, kanji, and most CJK Unified Ideographs
// (including simplified Chinese characters used in names and addresses)
// "all" variant includes all unicode subsets

Font.register({
  family: 'NotoSansJP',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/files/noto-sans-jp-all-400-normal.woff',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/files/noto-sans-jp-all-700-normal.woff',
      fontWeight: 700,
    },
  ],
})

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP',
    fontSize: 9,
    paddingTop: 32,
    paddingBottom: 48,
    paddingHorizontal: 36,
    backgroundColor: '#ffffff',
  },
  // Header
  header: {
    backgroundColor: '#0d1d3a',
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerBrand: {
    color: '#ffa500',
    fontSize: 14,
    fontWeight: 700,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 700,
    marginTop: 2,
  },
  headerSub: {
    color: '#9999bb',
    fontSize: 7.5,
    marginTop: 3,
  },
  headerDate: {
    color: '#9999bb',
    fontSize: 7.5,
    textAlign: 'right',
  },
  // Warning
  warning: {
    backgroundColor: '#fffbeb',
    borderLeft: 3,
    borderLeftColor: '#fbbf24',
    borderLeftStyle: 'solid',
    padding: 7,
    marginBottom: 10,
  },
  warningText: {
    fontSize: 7.5,
    color: '#78716c',
    lineHeight: 1.5,
  },
  // Section
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    backgroundColor: '#1e3a5f',
    color: '#ffffff',
    fontSize: 9.5,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 0,
  },
  // Field row
  fieldRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderBottomStyle: 'solid',
    paddingVertical: 4,
    paddingHorizontal: 6,
    minHeight: 22,
    alignItems: 'center',
  },
  fieldRowAlt: {
    backgroundColor: '#fafafa',
  },
  fieldLabel: {
    width: '42%',
    fontSize: 8,
    color: '#555555',
    paddingRight: 6,
    lineHeight: 1.4,
  },
  fieldValue: {
    width: '58%',
    fontSize: 9,
    fontWeight: 700,
    color: '#111111',
    lineHeight: 1.4,
  },
  fieldEmpty: {
    width: '58%',
    fontSize: 8,
    color: '#cccccc',
    fontStyle: 'italic',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    fontSize: 7,
    color: '#9ca3af',
  },
  footerRight: {
    fontSize: 7,
    color: '#9ca3af',
  },
})

// ── Components ─────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string
  value?: string
  alt?: boolean
}

const Field: React.FC<FieldProps> = ({ label, value, alt }) => (
  <View style={[styles.fieldRow, alt ? styles.fieldRowAlt : {}]}>
    <Text style={styles.fieldLabel}>{label}</Text>
    {value ? (
      <Text style={styles.fieldValue}>{value}</Text>
    ) : (
      <Text style={styles.fieldEmpty}>（未記入）</Text>
    )}
  </View>
)

interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
)

// ── Main document ──────────────────────────────────────────────────────────────

interface DocumentProps {
  session: VisaSession
}

const ApplicationDocument: React.FC<DocumentProps> = ({ session }) => {
  const { formData } = session
  const visaType = VISA_TYPES[session.visaType]
  const questions = FORM_QUESTIONS[session.visaType] || []

  // Helper: get Japanese label from question config
  const label = (id: string): string =>
    questions.find(q => q.id === id)?.fieldLabelJa || id

  const today = new Date()
  const todayStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`

  return (
    <Document title="在留期間更新許可申請書" author="TEBIQ" language="ja">
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerBrand}>TEBIQ</Text>
            <Text style={styles.headerTitle}>在留期間更新許可申請書</Text>
            <Text style={styles.headerSub}>
              {visaType?.labelJa ?? session.visaType}　記入済み参考資料
            </Text>
          </View>
          <Text style={styles.headerDate}>作成日：{todayStr}</Text>
        </View>

        {/* Warning */}
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠ 本資料はAIが生成した記入参考資料です。実際の申請は入国管理局所定の様式をご使用ください。
          </Text>
          <Text style={styles.warningText}>
            各項目をご確認の上、「在留期間更新許可申請書」の対応欄に転記してください。
          </Text>
        </View>

        {/* Section 1: Personal */}
        <Section title="【申請人（本人）】">
          <Field label={label('nationality')}        value={formData?.nationality}     />
          <Field label={label('nameKanji')}          value={formData?.nameKanji}       alt />
          <Field label={label('nameRoman')}          value={formData?.nameRoman}       />
          <Field label={label('dateOfBirth')}        value={formData?.dateOfBirth}     alt />
          <Field label={label('gender')}             value={formData?.gender}          />
          <Field label={label('maritalStatus')}      value={formData?.maritalStatus}   alt />
          <Field label={label('addressJapan')}       value={formData?.addressJapan}    />
        </Section>

        {/* Section 2: Passport & Visa */}
        <Section title="【旅券・在留資格】">
          <Field label={label('passportNumber')}     value={formData?.passportNumber}     />
          <Field label={label('passportExpiry')}     value={formData?.passportExpiry}     alt />
          <Field label={label('residenceCardNumber')} value={formData?.residenceCardNumber} />
          <Field label="現在の在留資格"              value={visaType?.labelJa}            alt />
          <Field label={label('visaExpiryDate')}     value={formData?.visaExpiryDate}     />
          <Field label="希望する在留期間"            value="3年（または5年）"             alt />
        </Section>

        {/* Section 3: Employment */}
        <Section title="【在職の内容】">
          <Field label={label('employerName')}       value={formData?.employerName}    />
          <Field label={label('employerAddress')}    value={formData?.employerAddress} alt />
          <Field label={label('employerPhone')}      value={formData?.employerPhone}   />
          {formData?.department && (
            <Field label="部署名"                    value={formData.department}        alt />
          )}
          <Field label={label('jobTitle')}           value={formData?.jobTitle}        />
          <Field label={label('annualIncome')}       value={formData?.annualIncome}    alt />
          <Field label={label('isDispatched')}       value={formData?.isDispatched}    />
        </Section>

        {/* Section 4: Background */}
        <Section title="【学歴・職歴】">
          <Field label={label('finalEducation')}     value={formData?.finalEducation}  />
          <Field label={label('hasChangedJobs')}     value={formData?.hasChangedJobs}  alt />
          {formData?.previousEmployer && (
            <Field label={label('previousEmployer')} value={formData.previousEmployer} />
          )}
        </Section>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLeft}>TEBIQ - tebiq.jp</Text>
          <Text style={styles.footerRight}>
            参考資料のみ。入国管理局所定の様式で申請してください。
          </Text>
        </View>

      </Page>
    </Document>
  )
}

// ── Export ─────────────────────────────────────────────────────────────────────

export async function generateApplicationPDF(session: VisaSession): Promise<Uint8Array> {
  const buffer = await renderToBuffer(<ApplicationDocument session={session} />)
  return new Uint8Array(buffer)
}

// Backward-compatible alias (for any existing code calling generateMaterialsPDF)
export { generateApplicationPDF as generateMaterialsPDF }
