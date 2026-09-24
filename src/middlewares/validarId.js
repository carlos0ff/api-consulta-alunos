const idParamSchema = require("../schemas/idParamSchema");

const validarId = (request, response, next)=>{
    const result = idParamSchema.safeParse(request.params);
    if(!result.success){
        return response.status(400).json({ message: result.error.issues[0].message });
    }
    request.params.id = result.data.id;
    next();
};

module.exports = validarId;
