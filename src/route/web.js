
var medicalResourcesController= require('../controllers/medicalResources-controller')

let initWebRoutes = async (app) => {
    app.get('/',medicalResourcesController.navigation);
}  
module.exports = initWebRoutes;