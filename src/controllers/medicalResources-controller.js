var medicalResourcesService = require('../services/medicalResources-Service')
let navigation = async function (req, res) {  
    var getAllRegionAndPatient= await medicalResourcesService.getAllRegionAndPatient();
   //console.log(getAllRegionAndPatient);
    res.render('index',{getAllRegionAndPatient});
}

module.exports = {
   navigation: navigation,
}