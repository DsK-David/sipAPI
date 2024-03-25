const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("SIP.db");
const PORT = process.env.PORT || "3000";

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS transferencia (
    id INTEGER PRIMARY KEY,
    usuario TEXT,
    valor INTEGER,
    status TEXT DEFAULT 'pendente',
    data DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    saldo INTEGER,
    numero_conta INTEGER UNIQUE
  )`);
});
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM usuario", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
app.get("/api/payments", (req, res) => {
  db.all("SELECT * FROM transferencia", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
app.post("/api/users", (req, res) => {
  const { nome, saldo } = req.body;

  db.get(`SELECT * FROM usuario WHERE nome = ?`, [nome], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      // Se o usuário já existir, retorna um erro
      return res
        .status(400)
        .json({ error: "Usuário com esse nome já existe." });
    }

    // Se o usuário não existir, prossegue com a inserção
    db.run(
      `INSERT INTO usuario (nome, saldo,numero_conta) VALUES (?, ?,ABS(RANDOM()) % 1000000 + 1)`,
      [nome, saldo],
      function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({
          id: this.lastID,
          nome: nome,
          saldo: saldo,
        });
      }
    );
  });
});
app.get("/api/users/:numero_conta", (req, res) => {
  const numeroConta = req.params.numero_conta;
  db.all(
    `SELECT * FROM usuario WHERE numero_conta=?`,
    [numeroConta],
    function (err, rows) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});
app.get("/api/users/nome/:nome", (req, res) => {
  const nome = req.params.nome;
  db.all(`SELECT * FROM usuario WHERE nome=?`, [nome], function (err, rows) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});
app.get("/api/payment/:nome/", (req, res) => {
  const nome = req.params.nome;
  db.all(
    `SELECT * FROM transferencia WHERE usuario=? `,
    [nome],
    function (err, rows) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});
app.post("/api/payment/:numero_conta", (req, res) => {
  const numero_conta = req.params.numero_conta;
  const { valor } = req.body;

  db.get(
    `SELECT saldo, nome FROM usuario WHERE numero_conta=?`,
    [numero_conta],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: "Conta não encontrada." });
      }

      const novoSaldo = row.saldo + valor;

      db.run(
        `UPDATE usuario SET saldo=? WHERE numero_conta=?`,
        [novoSaldo, numero_conta],
        function (err) {
          if (err) {
            return res.status(400).json({ error: err.message });
          }

          db.run(
            `INSERT INTO transferencia (usuario, valor, status) VALUES (?, ?, 'concluído')`,
            [row.nome, valor],
            function (err) {
              if (err) {
                return res.status(400).json({ error: err.message });
              }
              // Retorne uma resposta de sucesso
              res.json({
                message: "Pagamento realizado com sucesso.",
                novoSaldo,
              });
            }
          );
        }
      );
    }
  );
});

app.delete("/api/users/clear", (req, res) => {
  db.run(`DELETE FROM usuario`, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Todos os usuários foram removidos." });
  });
});

app.listen(PORT, () => {
  console.log("servidor do api funcionando");
});
