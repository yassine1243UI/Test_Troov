const mongoose = require('mongoose');
const Blog = require("../blog");
const Inscription = require("../user");
const express = require('express');
const bcrypt = require('bcrypt'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000', // L'URL de votre site React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Les méthodes HTTP autorisées
    credentials: true, // Autorisez l'envoi de cookies lors des requêtes CORS
  };
  
  app.use(cors(corsOptions));
  

(async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/troov", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connexion réussie");
    } catch (err) {
        console.log("Erreur lors de la connexion à MongoDB ou de la création du document : " + err);
    }
})();


// Dans votre serveur Express
app.get('/api/produit', async (req, res) => {
    try {
        const result = await Blog.find().maxTimeMS(10000);
        res.json(result);
    } catch (err) {
        console.error("Erreur lors de la récupération des données : " + err);
        res.status(500).json({ error: "Erreur lors de la récupération des données" });
    }
});

app.post('/api/Ajt', async (req, res) => {
    try {
        const { titre, contenu } = req.body; // Déstructurez les données du formulaire
        const result = await Blog.create({ titre, contenue: contenu }); // Utilisez "contenue" pour le contenu
        res.json(result);
    } catch (err) {
        console.error("Erreur lors de la création du blog : " + err);
        res.status(500).json({ error: "Erreur lors de la création du blog" });
    }
});

app.delete('/api/Suppr', async (req, res) => {
    const { titre } = req.body; // Récupérez le titre à supprimer à partir du corps de la requête DELETE
    try {
        const result = await Blog.deleteOne({ titre });
        if (result.deletedCount === 1) {
            // Suppression réussie
            res.json({ message: "Blog supprimé avec succès." });
        } else {
            // Aucun blog avec ce titre n'a été trouvé
            res.status(404).json({ error: "Blog non trouvé." });
        }
    } catch (err) {
        console.error("Erreur lors de la suppression du blog : " + err);
        res.status(500).json({ error: "Erreur lors de la suppression du blog." });
    }
});


app.post('/api/Inscr', async (req, res) => {
    try {
        const { email, mdp } = req.body;        
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const plainPassword = req.body.mdp;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds); // Hachez le mot de passe
        
        // Utilisez le mot de passe haché lors de la création de l'utilisateur
        const result = await Inscription.create({ email, mdp: hashedPassword });
        
        res.json(result);
    } catch (err) {
        console.error("Erreur lors de la création d'un utilisateur : " + err);
        res.status(500).json({ error: "Erreur lors de la création d'un utilisateur" });
    }
});

app.post('/api/conn', async (req, res) => {
    const bcrypt = require('bcrypt');
    const {email, mdp} = req.body;
    const user = await Inscription.findOne({email});
    
    if (!user) {
        //Si le user n'existe pas

        return res.status(401).json({message: "Nom d'utilisateur ou mot de passe incorrect."})
    }
    const passwordMatch = await bcrypt.compare(mdp, user.mdp)

    if (!passwordMatch){
        return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect."});
    }

    else{
        return res.status(201).json({message: "Vous etes connecter "})
    }

})

app.listen(8000, () => {
    console.log(`Le serveur est en cours d'exécution sur le port 8000`);
  });