import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '@/hooks/useTranslation'

interface ButtonsSubmitProps {
  sendOrder?: () => void;
}

const ButtonsSubmit = ({ sendOrder }: ButtonsSubmitProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  return(
    <>
      {router.pathname === '/basket' && (
        <Link href="/basket/checkout" className="tm-button tm-black-button">
          {t('checkout')}
        </Link>
      )}
      
      {router.pathname === '/basket/checkout' && (
        <button 
          className="tm-button tm-black-button" 
          onClick={sendOrder}
        >
          {t('sendorder')}
        </button>
      )}
    </>
  )
}

export default ButtonsSubmit
