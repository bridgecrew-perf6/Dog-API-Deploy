const { Router } = require('express');
const { Temperament } = require("../db");
const router = Router();

const {
    getApiInfo,
    getDbInfo,
    createDog,
    getTemperaments,
  } = require("../functions/model.js");

router.get("/dogs", async (req , res)=>{
  console.log("llega al get")

    const dataApi = await getApiInfo();
    const dataDb = await getDbInfo();

    let allData = [...dataApi,...dataDb];
    allData.sort((a, b) => {
        // sort api & db
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
    });
    
    if (req.query.name && req.query.name.length > 1) {
        let find = allData.find(
          (el) => el.name.toLowerCase() == req.query.name.toLowerCase()
        );
        if (find) return res.status(200).json([find]);
        else return res.status(404).json({ error: "There is no such race" });
    }
    return res.status(200).json(allData);
});

router.get("/dogs/:idRaza", async (req , res)=>{
    const { idRaza } = req.params; 

    // :::::::::::::::::::::POSIBLE MEJORA! AGREGAR CONDICIONAL PARA VER SI EL ID
    //:::::::::::::::::::::: ES DE LA DB O DE LA API     .findByPk()
    const dataApi = getApiInfo();
    const dataDb = getDbInfo();

    let allData = dataApi.concat(dataDb);

    const filterInfo = allData.filter(e=> e.id === idRaza);

    return res.status(200).json(filterInfo);
});

router.get("/temperament", async (req, res) => {
    console.log("llego aqui")
    Temperament.findAll().then(async (response) => {
      if (response.length == 0) {
        console.log("The information comes from the api");
        getTemperaments().then((response) => res.status(200).json(response));
      } else {
        console.log("The information comes from the db");
        return res.status(200).json(response);
      }
    });
});

router.post("/dog", async (req,res) => {
    const {name,height,weight,life_span,image,temperament} = req.body;
    createDog(name,height,weight,life_span,image,temperament);
    return res.status(200).json({ msg: "Dog created successfully" });
})

module.exports = router;
