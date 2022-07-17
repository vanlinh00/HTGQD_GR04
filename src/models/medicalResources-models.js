const db = require('../config/databaseConfig');
const medical = function () {

}
medical.getAllRegion = () => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM region', (err, res) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
}
medical.getAllRegionAndPatient = () => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT epidemic_tatus.id as id,  epidemic_tatus.patient as patient,epidemic_tatus.p_condition as p_condition, epidemic_tatus.doctor as doctor, epidemic_tatus.num_doctors_needed as num_doctors_needed,epidemic_tatus.num_redundant_doctor as num_redundant_doctor, region.id as id_region , region.name as name_region FROM epidemic_tatus JOIN region ON epidemic_tatus.id_region = region.id  ', (err, res) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
}

medical.updateEpidemicTatusNumdoctorsNeeded = (id,num_doctors_needed) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`UPDATE epidemic_tatus SET num_doctors_needed='${num_doctors_needed}' WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};

medical.updateEpidemicTatusNumRedundantDoctor= (id,num_redundant_doctor) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`UPDATE epidemic_tatus SET num_redundant_doctor='${num_redundant_doctor}' WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};


module.exports = medical;

