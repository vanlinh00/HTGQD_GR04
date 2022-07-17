var medicalResourcesService = require('../services/medicalResources-Service')
let navigation = async function (req, res) {  

    // Bảng quyết định
    var getAllRegionAndPatient= await medicalResourcesService.getAllRegionAndPatient();

    // get S*
    var chooseRegionBySstartd= await medicalResourcesService.chooseRegionBySstartFunsion();

    // get S-
    var chooseRegionBySminusReversed= await medicalResourcesService.chooseRegionBySminusFunsion();
     
    // get c*
    var chooseRegionByCstartReversed= await medicalResourcesService.chooseRegionByCstartFunsion();



   // console.log(chooseRegionByCstartReversed);
    res.render('index',{getAllRegionAndPatient,chooseRegionBySstartd,chooseRegionBySminusReversed,chooseRegionByCstartReversed});
}

module.exports = {
   navigation: navigation,
}