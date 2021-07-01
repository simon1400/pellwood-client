const changeUrl = (
  size = false,
  category = false,
  search = false,
  parameters = {},
  router,
  resetFilter = false
) => {
  var queryUrl = router.query

  if(!router.query.category){
    queryUrl.category = 'all'
  }

  if(size) queryUrl.size = size
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
      size,
      category: router.query.category
    }
  }

  router.push({pathname: router.pathname, query: queryUrl}, undefined, { scroll: false })
}

export default changeUrl
