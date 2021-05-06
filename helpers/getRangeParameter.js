export default (products, parameters = false) => {
    const lengthNumbers = [], diameterNumbers = []
    var length = undefined, diameter = undefined;

    if(!parameters){
      for(var i = 0; i < products.length; i++){
        if(products[i]?.parametrs){
          length = products[i]?.parametrs.find(o => o.title === 'Délka' || o.title === 'Length')
          diameter = products[i]?.parametrs.find(o => o.title === 'Průměr' || o.title === 'Diameter')
          if(length){
            lengthNumbers.push(+length.value.substr(0, length.value.length - 3).split(',').join('.'))
          }
          if(diameter){
            diameterNumbers.push(+diameter.value.substr(0, diameter.value.length - 3).split(',').join('.'))
          }
        }
      }
      return {
        length: {
          min: parseInt(Math.min(...lengthNumbers)),
          max: parseInt(Math.max(...lengthNumbers))
        },
        diameter: {
          min: parseInt(Math.min(...diameterNumbers)),
          max: parseInt(Math.max(...diameterNumbers))
        }
      }
    }else if(parameters.lengthMin){
      return {
        length: {
          min: parseInt(parameters.lengthMin),
          max: parseInt(parameters.lengthMax)
        },
        diameter: {
          min: parseInt(parameters.diameterMin),
          max: parseInt(parameters.diameterMax)
        }
      }
    }
}
