const clientes = require('../models/clientes')

const getAll = (req, res) => {
    clientes.find((err, clientes) => {
      if (err) {
        res.status(500).send({message: err.message})
      }
      res.status(200).send(clientes)
    })
};

const getCompradores = (req, res) => {
    clientes.find({comprou:true},(err, clientes) => {
      if (err) {
        res.status(500).send({message: err.message})
      }
      res.status(200).send(clientes.map(({ nome, email }) => ({nome, email})));
    })

};

const getByCpf = (req, res) => {
    clientes.find({ cpf: req.params.cpf },(err, clientes) => {
      if (err) {
        res.status(500).send({message: err.message})
      }
      res.status(200).send(clientes);
    })
};

const postCliente = (req, res) => {
  const cliente = new clientes(req.body)

  cliente.save(err  => {
    if (err) {
      res.status(500).send({ message: err.message})
    }
    res.status(201).send(cliente.toJSON())
  })
}

module.exports = {
    getAll,
    getCompradores,
    getByCpf,
    postCliente
}
