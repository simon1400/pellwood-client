const changeUrl = (size = false, category = false, search = false, parameters = {}, router) => {
  const queryUrl = router.query

  if(size) queryUrl.size = size
  if(category) queryUrl.category = category
  if(search !== false) queryUrl.search = search

  if(parameters.diameter || parameters.length) {
    queryUrl.diameterMin = parameters.diameter.min
    queryUrl.diameterMax = parameters.diameter.max
    queryUrl.lengthMin = parameters.length.min
    queryUrl.lengthMax = parameters.length.max
  }

  // var stringUrl = `${router.route}?`
  // for(var prop in queryUrl){
  //   stringUrl += `${prop}=${queryUrl[prop]}&`
  // }
  //
  // stringUrl = stringUrl.substr(0, stringUrl.length - 1)

  router.push({pathname: router.pathname, query: queryUrl}, undefined, { scroll: false })
}

export default changeUrl
