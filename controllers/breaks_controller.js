const RawSchema = require('../database/schemas/rawBreakSchema')

async function create(req,  res){ 
    let { start, end, date, employeename, floaters} = req.body;

    let rawbreak = await RawSchema.create({start, end, date, employeename, floaters}).catch(err => res.status(500).send(err))

}

async function update(req, res){ 

}
async function destroy(req, res){ 

}

module.exports = { 
    create, 
    update, 
    destroy
}