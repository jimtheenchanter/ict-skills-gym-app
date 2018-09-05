const logger = require('../utils/logger');
const bmiCalc = {
    calculateBmi(member, weight) {
        logger.info(member, weight);
        let bmiValue = parseFloat(Number(weight) / (Number(member.height) * Number(member.height))).toFixed(2);
        return bmiValue;
    },

    determineCategory(bmiValue) {
        let bmiCategory = "";
        if (bmiValue < 16) {
            bmiCategory = "SEVERELY UNDERWEIGHT";
        } else if (bmiValue >= 16 && bmiValue < 18.5) {
            bmiCategory = "UNDERWEIGHT";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            bmiCategory = "NORMAL";
        } else if (bmiValue >= 25 && bmiValue < 30) {
            bmiCategory = "OVERWEIGHT";
        } else if (bmiValue >= 30 && bmiValue < 35) {
            bmiCategory = "MODERATELY OBESE";
        } else if (bmiValue >= 35) {
            bmiCategory = "SEVERELY OBESE";
        }
        return bmiCategory;
    },

    isIdealBodyWeight(member) {


        const fiveFeet = 60.0;
        let idealBodyWeight = "0";
        let convertMetresToInches = parseFloat(member.height * 39.37);
        const inches = convertMetresToInches;

        if (inches <= fiveFeet) {
            if (member.gender == "M") {
                idealBodyWeight = 50;
            } else {
                idealBodyWeight = 45.5;
            }
        } else {
            if (member.gender == "F") {
                idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
            } else {
                idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);
            }
        }

        return ((idealBodyWeight <= (member.weight + 2.0))
            && (idealBodyWeight >= (member.weight - 2.0))
        );
    },

    // trend(member) {
    //
    //     let isHigher = 0;
    //     if (assessmentStore.getMemberAssessments.length == 0 || assessmentStore.getMemberAssessments.length == 1) {
    //         if (assessmentStore.getLatestAssessment(loggedInMember.id).weight > loggedInMember.startingweight) {
    //             isHigher = true;
    //         } else {
    //             isHigher = false;
    //         }
    //
    //         if (assessmentStore.getMemberAssessments(assessmentStore.getMemberAssessments.length - 1).weight < loggedInMember.weight) {
    //             isHigher = true;
    //         } else {
    //             isHigher = false;
    //         }
    //         return trend;
    //
    //     }
    //     ;
    // },
}

module.exports = bmiCalc;