
var medicalResourcesController= require('../controllers/medicalResources-controller')

let initWebRoutes = async (app) => {
    app.get('/',medicalResourcesController.navigation);
    app.get('/chooseRegionBySstart',medicalResourcesController.chooseRegionBySstart);
    app.get('/chooseRegionBySminus',medicalResourcesController.chooseRegionBySminus);
    app.get('/chooseRegionByCstart',medicalResourcesController.chooseRegionByCstart);
}  
module.exports = initWebRoutes;