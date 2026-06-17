import { NextRouter } from "next/router";

const changeUrl = (
  size: number | string | false = false,
  category: string | false = false,
  search: string | false = false,
  parameters: any = {},
  router: NextRouter,
  resetFilter: boolean = false
) => {
  var queryUrl = { ...router.query } as any;

  if(!router.query.category){
    queryUrl.category = 'all'
    queryUrl.size = '6'
  }

  if(size) queryUrl.size = String(size)
  if(category) queryUrl.category = category
  if(search !== false) queryUrl.search = search

  if(parameters.diameter || parameters.length) {
    queryUrl.diameterMin = parameters.diameter.min
    queryUrl.diameterMax = parameters.diameter.max
    queryUrl.lengthMin = parameters.length.min
    queryUrl.lengthMax = parameters.length.max
  }

  if(resetFilter){
    queryUrl = {
      size: size ? String(size) : undefined,
      category: router.query.category
    }
  }

  router.push({pathname: router.pathname, query: queryUrl}, undefined, { scroll: false })
}

export default changeUrl
