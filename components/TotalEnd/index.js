import TotalEnd from './TotalEnd'

const TotalEndWrap = ({
  sum,
  sale,
  sumBefore,
  basket,
  delivery,
  payment
}) => {

  return <TotalEnd 
          sum={sum}
          sale={sale}
          sumBefore={sumBefore}
          basket={basket}
          delivery={delivery}
          payment={payment} />
}

export default TotalEndWrap
