const Form = require("../models/formModels");

//POST form controller
const SubmitForm = async(req,res)=>{
    try{
        const fields = req.body;
        for(const field of fields){
            await new Promise((resolve,reject)=>{
                Form.createForm(field,(error,result)=>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(result);
                    }
                });
            });
        }

        res.status(201).json({
            success: true,
            message: "Form Submitted Successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//GET form controller
const getforms = (req,res)=>{
    Form.GetForm((error,result)=>{
        if(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
        res.status(200).json(results);
    });
};

module.exports ={
    SubmitForm,
    getforms
}