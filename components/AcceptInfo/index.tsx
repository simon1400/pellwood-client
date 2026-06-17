import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

const AcceptInfo = () => {
  const { t } = useTranslation()

  return (
    <p>
      {t('accessCondition1')}{' '}
      <Link href={t('linkBusiness')} target="_blank" rel="noopener noreferrer">
        {t('accessCondition2')}
      </Link>
    </p>
  )
}

export default AcceptInfo
