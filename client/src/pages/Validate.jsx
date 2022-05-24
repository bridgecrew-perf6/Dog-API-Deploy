export default function validate(body) {                       //Funcion externa para validar

    let errors = {}

    //NAME VALIDATE
    if(!body.name) errors.name = 'The name is not defined'
    if(body.name.length < 3) errors.name = 'The name is to short'
    if(body.name.match(/[0-9]/)) errors.name = 'The name cannot contain numbers'
    if(body.name.match(/  /)) errors.name = 'The name cannot contain more than two spaces'

    //HEIGHT VALIDATE
    if(Number(body.height_max) <= Number(body.height_min)) {
        errors.height_min = ' '
        errors.height_max = 'The height max must be mayor than height min'
    }
    if(Number(body.height_max) <= 0 || Number(body.height_min) <= 0) {
        errors.height_max = ' '
        errors.height_min = 'The heights data must be mayor than 0'
    }
    if (!body.height_max || !body.height_min) {
        errors.height_max = ' '
        errors.height_min = 'The height is required';
    }

    //WEIGHT VALIDATE
    if(Number(body.weight_max) <= Number(body.weight_min)) {
        errors.weight_min = ' '
        errors.weight_max = 'The weight max must be mayor than weight min'
    }
    if(Number(body.weight_max) <= 0 || Number(body.weight_min) <= 0) {
        errors.weight_max = ' '
        errors.weight_min = 'The weights data must be mayor than 0'
    }
    if (!body.weight_max || !body.weight_min) {
        errors.weight_max = ' '
        errors.weight_min = 'The weight is required';
    }

    //LIFE SPAN VALIDATE
    if(Number(body.life_span_max) <= Number(body.life_span_min)) {
        errors.life_span_min = ' '
        errors.life_span_max = 'The life span max must be mayor than life span min'
    }
    if(Number(body.life_span_max) <= 0 || Number(body.life_span_min) <= 0) {
        errors.life_span_max = ' '
        errors.life_span_min = 'The life span data must be mayor than 0'
    }
    if (!body.life_span_max || !body.life_span_min) {
        errors.life_span_max = ' '
        errors.life_span_min = 'The life span is required but is not obligatory';
    }

    //URL VALIDATE
    if (!body.image_url) errors.image_url = 'The URL image is required';

    //TEMPERAMENT VALIDATE
    if(body.temperament === 'Ok')errors.temperament = ''
    if(body.temperament === 'Not')errors.temperament = 'The temperament is not set'

    return errors;
}
