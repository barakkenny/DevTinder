function routeController (req, res, next) {
    const name = 'kehinde'
    if(!name){
        console.log('Unathourised')
    }
    next()
}

module.exports = routeController;