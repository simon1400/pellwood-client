import translate from '../../data/staticTranslate'
import { useRouter } from 'next/router'
import localize from '../../data/localize'
import Link from 'next/link'

const AcceptInfo = () => {

  const router = useRouter()
  const {lang} = localize(router.locale)

  return <p>{translate.accessCondition1[lang]} <Link href={translate.linkBuisness[lang]} target="_blank" rel="noopener noreferrer">{translate.accessCondition2[lang]}</Link></p>
}

export default AcceptInfo
