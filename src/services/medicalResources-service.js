var medicalResourcesModels = require('../models/medicalResources-models')

var chooseRegionBySstart = [];
var chooseRegionBySminus = [];
var chooseRegionByCstart = [];

let getAllRegionAndPatient = () => {
    return new Promise((async (resolve, reject) => {
        try {
            var allRegionAndPatientBase = await medicalResourcesModels.getAllRegionAndPatient();

            if (allRegionAndPatientBase != undefined) {

                // tính số bệnh nhân / bác sĩ 
                var allRegionAndPatient = [];
                for (let i = 0; i < allRegionAndPatientBase.length; i++) {
                    var criteria = {
                        "id":allRegionAndPatientBase[i].id,
                        "id_region":allRegionAndPatientBase[i].id_region,
                        "name_region": allRegionAndPatientBase[i].name_region,
                        "patient": allRegionAndPatientBase[i].patient,
                        "doctor": allRegionAndPatientBase[i].doctor,
                        "ratioOfPatientsToDoctors": parseFloat((allRegionAndPatientBase[i].patient / allRegionAndPatientBase[i].doctor).toFixed(3)),
                        "p_condition": allRegionAndPatientBase[i].p_condition,
                    }
                    allRegionAndPatient.push(criteria);

                    // tính số bác sĩ cần và bác sĩ thừa

                    var c = parseInt(allRegionAndPatientBase[i].patient / 100);
                    var checkDoctor = allRegionAndPatientBase[i].doctor - c;

                    if (checkDoctor < 0)   // thiếu bác sĩ or bác sĩ cần
                    {
                        medicalResourcesModels.updateEpidemicTatusNumdoctorsNeeded(allRegionAndPatientBase[i].id, checkDoctor*-1);
                        medicalResourcesModels.updateEpidemicTatusNumShortageDoctors(allRegionAndPatientBase[i].id,0);
                    }
                
                    if (checkDoctor > 0)  // thừa bác sĩ
                    {
                        medicalResourcesModels.updateEpidemicTatusNumShortageDoctors(allRegionAndPatientBase[i].id, checkDoctor);
                        medicalResourcesModels.updateEpidemicTatusNumdoctorsNeeded(allRegionAndPatientBase[i].id, 0);
                    }
                    

                }

                // bước 1: chuẩn hóa
                // bước 2 nhân trọng số
                var maxPatient = 0;
                var maxP_condition = 0;
                var maxDoctor = 0;
                var maxRatioOfPatientsToDoctors = 0;

                for (let i = 0; i < allRegionAndPatient.length; i++) {
                    maxPatient = (maxPatient < allRegionAndPatient[i].patient) ? allRegionAndPatient[i].patient : maxPatient;
                    maxP_condition = (maxP_condition < allRegionAndPatient[i].p_condition) ? allRegionAndPatient[i].p_condition : maxP_condition;
                    maxDoctor = (maxDoctor < allRegionAndPatient[i].doctor) ? allRegionAndPatient[i].doctor : maxDoctor;
                    maxRatioOfPatientsToDoctors = (maxRatioOfPatientsToDoctors < allRegionAndPatient[i].ratioOfPatientsToDoctors) ? allRegionAndPatient[i].ratioOfPatientsToDoctors : maxRatioOfPatientsToDoctors;
                }

                var listCriteria = [];
                for (let i = 0; i < allRegionAndPatient.length; i++) {
                    var criteria = {
                        "id":allRegionAndPatient[i].id,
                        "id_region":allRegionAndPatient[i].id_region,
                        "name_region": allRegionAndPatient[i].name_region,
                        "patient": ((allRegionAndPatient[i].patient / maxPatient) * 0.1).toFixed(3),
                        "doctor": (maxDoctor / allRegionAndPatient[i].doctor).toFixed(3),
                        "ratioOfPatientsToDoctors": ((allRegionAndPatient[i].ratioOfPatientsToDoctors / maxRatioOfPatientsToDoctors) * 0.7).toFixed(3),
                        "p_condition": ((allRegionAndPatient[i].p_condition / maxP_condition) * 0.2).toFixed(3),

                    }
                    listCriteria.push(criteria);
                }


                // doctor là thuộc tính giá tri, nếu doctor càng ít thì càng phải điều đến vùng đấy
                // chuẩn hóa tiêu chi doctor về miền 0 _1 
                maxDoctor = 0;
                for (let i = 0; i < listCriteria.length; i++) {
                    maxDoctor = (maxDoctor < listCriteria[i].doctor) ? listCriteria[i].doctor : maxDoctor;
                }

                var listCriteriaStandardized = [];

                for (let i = 0; i < listCriteria.length; i++) {
                    var criteria = {
                        "id":listCriteria[i].id,
                        "id_region":listCriteria[i].id_region,
                        "name_region": listCriteria[i].name_region,
                        "patient": listCriteria[i].patient,
                        "doctor": ((listCriteria[i].doctor / maxDoctor) * 0.1).toFixed(3),
                        "ratioOfPatientsToDoctors": listCriteria[i].ratioOfPatientsToDoctors,
                        "p_condition": listCriteria[i].p_condition,

                    }
                    listCriteriaStandardized.push(criteria);
                }

                // console.log(listCriteriaStandardized);

                // bước 3 tìm A* và A-

                var listAstart = [];
                var listAminus = [];

                maxPatient = 0;
                maxDoctor = 0;
                maxRatioOfPatientsToDoctors = 0;
                maxP_condition = 0;

                let minPatient = listCriteriaStandardized[0].patient;
                let minDoctor = listCriteriaStandardized[0].doctor;
                let minRatioOfPatientsToDoctors = listCriteriaStandardized[0].ratioOfPatientsToDoctors;
                let minP_condition = listCriteriaStandardized[0].p_condition;

                for (let i = 0; i < listCriteriaStandardized.length; i++) {
                    maxPatient = (maxPatient < listCriteriaStandardized[i].patient) ? listCriteriaStandardized[i].patient : maxPatient;
                    maxDoctor = (maxDoctor < listCriteriaStandardized[i].doctor) ? listCriteriaStandardized[i].doctor : maxDoctor;
                    maxRatioOfPatientsToDoctors = (maxRatioOfPatientsToDoctors < listCriteriaStandardized[i].ratioOfPatientsToDoctors) ? listCriteriaStandardized[i].ratioOfPatientsToDoctors : maxRatioOfPatientsToDoctors;
                    maxP_condition = (maxP_condition < listCriteriaStandardized[i].p_condition) ? listCriteriaStandardized[i].p_condition : maxP_condition;

                    minPatient = (minPatient > listCriteriaStandardized[i].patient) ? listCriteriaStandardized[i].patient : minPatient;
                    minDoctor = (minDoctor > listCriteriaStandardized[i].doctor) ? listCriteriaStandardized[i].doctor : minDoctor;
                    minRatioOfPatientsToDoctors = (minRatioOfPatientsToDoctors > listCriteriaStandardized[i].ratioOfPatientsToDoctors) ? listCriteriaStandardized[i].ratioOfPatientsToDoctors : minRatioOfPatientsToDoctors;
                    minP_condition = (minP_condition > listCriteriaStandardized[i].p_condition) ? listCriteriaStandardized[i].p_condition : minP_condition;
                }

                listAstart.push(maxPatient);
                listAstart.push(maxDoctor);
                listAstart.push(maxRatioOfPatientsToDoctors);
                listAstart.push(maxP_condition);

                listAminus.push(minPatient);
                listAminus.push(minDoctor);
                listAminus.push(minRatioOfPatientsToDoctors);
                listAminus.push(minP_condition);

                console.log(" step 3: A* and A-");
                console.log(listAstart);
                console.log(listAminus);


                // bước 4 tìm S* và S-

                var sStar = [];
                var sMinus = [];

                for (let i = 0; i < listCriteriaStandardized.length; i++)   // công ty
                {
          
                    // tìm sStar
                    let numPatientsStar = Math.pow((listCriteriaStandardized[i].patient - listAstart[0]), 2);
                    let numDoctorsStar = Math.pow((listCriteriaStandardized[i].doctor - listAstart[1]), 2);
                    let numRatioOfPatientsToDoctorssStar = Math.pow((listCriteriaStandardized[i].ratioOfPatientsToDoctors - listAstart[2]), 2);
                    let numP_conditionsStar = Math.pow((listCriteriaStandardized[i].p_condition - listAstart[3]), 2);
                    let sumsStar = numPatientsStar + numDoctorsStar + numRatioOfPatientsToDoctorssStar + numP_conditionsStar;
                    let ressStar = (Math.pow(sumsStar, 1 / 2)).toFixed(3);
                    sStar.push(ressStar);

                     // tìm SMinus
                     let numPatientsMinus = Math.pow((listCriteriaStandardized[i].patient - listAminus[0]), 2);
                     let numDoctorsMinus = Math.pow((listCriteriaStandardized[i].doctor - listAminus[1]), 2);
                     let numRatioOfPatientsToDoctorssMinus = Math.pow((listCriteriaStandardized[i].ratioOfPatientsToDoctors - listAminus[2]), 2);
                     let numP_conditionsMinus = Math.pow((listCriteriaStandardized[i].p_condition - listAminus[3]), 2);
                     let sumsMinus = numPatientsMinus + numDoctorsMinus + numRatioOfPatientsToDoctorssMinus + numP_conditionsMinus;
                     let ressMinus = (Math.pow(sumsMinus, 1 / 2)).toFixed(3);
                     sMinus.push(ressMinus);
                }
                
                console.log("Step 4: S* and S-")
                console.log(sStar);
                console.log(sMinus);
                
            

                // bước 5: tìm c*
                var cStars = [];

                for (let i = 0; i < sStar.length; i++) {

                    let a = (sMinus[i] / (parseFloat(sStar[i]) + parseFloat(sMinus[i]))).toFixed(3);
                    cStars.push(a);
                }

                console.log("step 5: C* ");
                console.log(cStars);


              
                // bước này chỉ là để  là sửa đển in dữ liệu ra cái bảng thôi
               var listDataResult = [];
                for (let i = 0; i < listCriteriaStandardized.length; i++) {

                    var datResult = {
                            "id":listCriteriaStandardized[i].id,
                            "id_region":listCriteriaStandardized[i].id_region,
                            "name_region": listCriteriaStandardized[i].name_region,
                            "patient": listCriteriaStandardized[i].patient,
                            "doctor": listCriteriaStandardized[i].doctor,
                            "ratioOfPatientsToDoctors": listCriteriaStandardized[i].ratioOfPatientsToDoctors,
                            "p_condition": listCriteriaStandardized[i].p_condition,
                            "sStart_of_region": sStar[i],
                            "sMinus_of_region": sMinus[i],
                            "cStars_of_region": cStars[i],
                    
                    }

                    listDataResult.push(datResult);
                }
               
                // xếp thứ tự theo sStar
                listDataResultForsStar = [];
                listDataResultForsStar =listDataResult;
                listDataResultForsStar.sort(function(a, b){return a.sStart_of_region - b.sStart_of_region});
                

                //console.log(listDataResultForsStar);
                resolve(listDataResult);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            resolve(null);
        }
    }));
};

let chooseRegionBySstartd = () => {

    return chooseRegionBySstart;
}
module.exports = {

    getAllRegionAndPatient: getAllRegionAndPatient,

}