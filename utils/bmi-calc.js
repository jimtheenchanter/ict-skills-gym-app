const logger = require('../utils/logger');
const bmiCalc = {
  calculateBmi(member, weight){
    logger.info(member, weight);
    let bmiValue = Math.round(Number(weight)/(Number(member.height) * Number(member.height)));
    return bmiValue;
  },
  
  determineCategory(bmiValue){
    let bmiCategory = "";
        if(bmiValue < 16){
            bmiCategory = "SEVERELY UNDERWEIGHT";
        }else if(bmiValue >= 16 && bmiValue < 18.5){
            bmiCategory = "UNDERWEIGHT";
        }else if(bmiValue >= 18.5 && bmiValue < 25){
            bmiCategory = "NORMAL";
        }else if(bmiValue >= 25 && bmiValue < 30){
            bmiCategory = "OVERWEIGHT";
        }else if(bmiValue >= 30 && bmiValue < 35){
            bmiCategory = "MODERATELY OBESE";
        }else if(bmiValue >= 35){
            bmiCategory = "SEVERELY OBESE";
        }
        return bmiCategory;
  },

  isIdealBodyWeight(member, assessment){
    
    let idealWeight;
        if(member.gender == "M"){
            if(member.getHeight() > 1.524 ){
                idealWeight = (50 + (((member.getHeight()-1.524)/0.0254) * 2.3));
            }else{
                idealWeight = 50;
            }
            if((idealWeight > assessment.weight - 0.2) && (idealWeight < assessment.weight + 0.2)){
                return true;
            }
        }else if(member.gender == "F"  
                 || member.gender == "Unspecified"
                )
        {
            if(member.getHeight() > 1.524 ){
                idealWeight = (45.5 + (((member.getHeight()-1.524)/0.0254) * 2.3));
            }
            else{
                idealWeight = 45.5;
            }
            if((idealWeight > assessment.weight - 0.2 && idealWeight < assessment.weight + 0.2))
                return true;
        }
        return false;
  }

}

module.exports = bmiCalc;