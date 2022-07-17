const { response } = require('express');
var medicalResourcesService = require('../services/medicalResources-Service')
let navigation = async function (req, res) {

    // Bảng quyết định
    var getAllRegionAndPatient = await medicalResourcesService.getAllRegionAndPatient();

    // get S*
    var chooseRegionBySstartd = await medicalResourcesService.chooseRegionBySstartFunsion();


    // get S-
    var chooseRegionBySminusReversed = await medicalResourcesService.chooseRegionBySminusFunsion().slice().reverse();

    // get c*
    var chooseRegionByCstartReversed = await medicalResourcesService.chooseRegionByCstartFunsion().slice().reverse();

    res.render('index', { getAllRegionAndPatient, chooseRegionBySstartd, chooseRegionBySminusReversed, chooseRegionByCstartReversed });
}

let chooseRegionBySstart = async function (req, res) {
    var chooseRegionBySstart = await medicalResourcesService.chooseRegionBySstartFunsion();

    var distributeMedical = await medicalResourcesService.distributeMedical(chooseRegionBySstart);

    //console.log(distributeMedical);

    res.render('chooseRegion', { distributeMedical });
}

let chooseRegionBySminus = async function (req, res) {

   // get S-
    var chooseRegionBySminusReversed = await medicalResourcesService.chooseRegionBySminusFunsion().slice().reverse();

    var distributeMedical = await medicalResourcesService.distributeMedical(chooseRegionBySminusReversed);

    res.render('chooseRegion', { distributeMedical });
}

let chooseRegionByCstart = async function(req,res){
    
    // get c*
    var chooseRegionByCstartReversed = await medicalResourcesService.chooseRegionByCstartFunsion().slice().reverse();

    var distributeMedical = await medicalResourcesService.distributeMedical(chooseRegionByCstartReversed);

    res.render('chooseRegion', { distributeMedical });
}

module.exports = {
    navigation: navigation,
    chooseRegionBySstart: chooseRegionBySstart,
    chooseRegionBySminus:chooseRegionBySminus,
    chooseRegionByCstart:chooseRegionByCstart,
}