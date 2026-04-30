import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'

export const metadata = {
  title: '隐私政策 | TEBIQ',
  description: 'TEBIQ 的个人信息处理、数据保留、第三方处理者和用户权利说明。',
}

export default function PrivacyPolicyPage() {
  return (
    <AppShell appBar={<AppBar title="隐私政策" back />}>
      <article className="mt-3 space-y-3">
        <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
          <h1 className="text-[17px] font-medium leading-snug text-ink">
            隐私政策 / プライバシーポリシー
          </h1>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash">
            TEBIQ 仅为日文文书识别、文字理解、自查记录和提醒提供工具性处理。信息仅供参考，具体以官方公式 website 或专家为准。
          </p>
        </section>

        <PolicySection title="1. 收集的数据">
          用户上传的图片、粘贴的文字、自查问卷、账号信息、提醒记录、处理日志。TEBIQ 不要求上传与当前处理无关的材料。
        </PolicySection>
        <PolicySection title="2. 运营主体">
          运营主体：刺狐合同会社。連絡先：contact@tebiq.jp。
        </PolicySection>
        <PolicySection title="3. 使用目的">
          用于 AI 识别、翻译解释、期限提醒、记录查询、服务安全和错误排查。不用于广告定向出售。
        </PolicySection>
        <PolicySection title="4. 第三方处理者">
          AI 处理使用 AWS Bedrock Tokyo region。上传内容在日本区域内处理，结果写入日本区域数据库。
        </PolicySection>
        <PolicySection title="5. 数据保留">
          免费用户可查看最近 30 天记录。付费会员可长期查看。用户可在 /settings 导出或申请删除。
        </PolicySection>
        <PolicySection title="6. 跨境传输">
          当前生产处理和存储位于 Tokyo region。TEBIQ 不主动把用户上传内容传输到日本境外。
        </PolicySection>
        <PolicySection title="7. 用户权利">
          用户可导出自己的记录，可申请删除账号。删除申请后进入 30 天处理期，期间可由运营执行最终清理。
        </PolicySection>
        <PolicySection title="8. 未成年人">
          TEBIQ 不面向 14 岁以下用户。不收集 14 岁以下儿童信息。
        </PolicySection>
        <PolicySection title="9. APPI 対応">
          個人情報の取扱いは、利用目的を限定し、必要な範囲で処理します。開示、訂正、削除の依頼は settings から受け付けます。
        </PolicySection>
      </article>
    </AppShell>
  )
}

function PolicySection({ title, children }: { title: string; children: string }) {
  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="text-[13px] font-medium text-ink">{title}</h2>
      <p className="mt-2 text-[12px] leading-[1.7] text-slate">{children}</p>
    </section>
  )
}
