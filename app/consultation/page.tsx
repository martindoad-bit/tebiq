import { Suspense } from 'react'
import ConsultationForm from './ConsultationForm'

export const metadata = {
  title: '预约行政书士咨询 | TEBIQ',
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base" />}>
      <ConsultationForm />
    </Suspense>
  )
}
