import Form from "../model/form.js";

export async function patchPersonalInfo(req, res) {
    console.log("PATCH /student/application/personalInfo");

    const student = req.student;
    const body = req.body;
    const name =
        body.first + (body.middle ? ` ${body.middle} ` : " ") + body.last;

    body.name = name;

    try {
        let form = await Form.findOne({ owner: student._id });
        !form && (form = new Form({ owner: student._id }));

        form.personalInfo = { ...body };
        form.save();
        res.send({
            message: "Data saved successfully",
            data: form.personalInfo,
        });
    } catch (err) {
        console.log(err);
        res.send({ error: "Something went wrong" });
    }
}

export async function getPersonalInfo(req, res) {
    console.log("GET /student/application/personalInfo");

    const student = req.student;
    try {
        const form = await Form.findOne({ owner: student._id });
        res.send(form.personalInfo);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export async function patchFamilyInfo(req, res) {
    console.log("PATCH /student/application/FamilyInfo");
    const student = req.student;
    const body = req.body;
    const name =
        body.first + (body.middle ? ` ${body.middle} ` : " ") + body.last;
    body.name = name;
    try {
        let form = await Form.findOne({ owner: student._id });
        !form && (form = new Form({ owner: student._id }));
        form.FamilyInfo = { ...body };
        form.save();
        res.send({
            message: "Data saved successfully",
            data: form.FamilyInfo,
        });
    } catch (err) {
        console.log(err);
        res.send({ error: "Something went wrong" });
    }
}
export async function getFamilyInfo(req, res) {
    console.log("GET /student/application/FamilyInfo");
    const student = req.student;
    try {
        const form = await Form.findOne({ owner: student._id });
        res.send(form.FamilyInfo);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}
