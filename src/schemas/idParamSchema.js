const z = require("zod");

const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser numérico").transform(Number),
});

module.exports = idParamSchema;
