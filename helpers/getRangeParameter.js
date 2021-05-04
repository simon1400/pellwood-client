export default (products) => {
    const lengthNumbers = [], diameterNumbers = []
    var length = undefined, diameter = undefined;

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

    const rangeNum = {
      length: {
        min: Math.min(...lengthNumbers),
        max: Math.max(...lengthNumbers)
      },
      diameter: {
        min: Math.min(...diameterNumbers),
        max: Math.max(...diameterNumbers)
      }
    }

    return rangeNum

}
