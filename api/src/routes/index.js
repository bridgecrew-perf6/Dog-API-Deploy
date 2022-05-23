const fetch = require("node-fetch");
const { Router } = require('express');
const { Temperament } = require("../db");
const router = Router();

const {
    getApiInfo,
    getDbInfo,
    createDog,
    getTemperaments,
    createNewTemperament
  } = require("../functions/model.js");

router.get("/dogs", async (req , res)=>{
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
          let arr= await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`).then(res => res.json())
          let id = 0
          arr = arr.map(e =>{
            if (!e.hasOwnProperty("reference_image_id")){
              id++;
              e.temperament = [{name:""}]
              e.reference_image_id = id
              e.image = {
                id: id,
                width: 1216,
                height: 1131,
                url: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
              }
            } else{
              e.temperament = [{name:""}]
              e.image = {
                url: `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg`
              }
            }
            return e
          })

          let find = []
          let allSearch = []

          if(dataDb.length > 0){
            find = dataDb.filter(
              (el) => el.name.toLowerCase().includes(req.query.name.toLowerCase())
            );
            allSearch = [...arr, ...find]
          } else{
            allSearch = [...arr]
          }
          
          console.log(allSearch)

          if(!allSearch) return res.status(400).json("Error")
          return res.status(200).json(allSearch)
      
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

router.post("/temperament", async (req,res) => {
  const {newTemperament} = req.body;
  createNewTemperament(newTemperament);
  return res.status(200).json({ msg: "New temperament created successfully" });
})

module.exports = router;
