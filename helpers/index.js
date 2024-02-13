const errorHandling = (res, error) => {
    console.log(error)
    return (
        res.status(500).json({
            Error: error.message
        })
    )
}

const successHandling = (res, obj) => {
    return(
        res.status(200).json({
            results: obj
        })
    )
}

const incompleteHandling = res => {
    return(
        res.status(404).send(
            'Unable to complete request'
            )
    )
}

module.exports = {
    errorHandling,
    successHandling,
    incompleteHandling
}