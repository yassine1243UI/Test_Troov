<template>
  <!-- Ici on a tout le front  -->
    <div>
      <h1>Liste des Produits</h1>
      <ul>
        <li v-for="produit in produits" :key="produit._id">
          <h2>{{ produit.titre }}</h2>
          <p>{{ produit.contenue }}</p>
          <!-- Le boutton de suppression -->
          <SuppressionBlog :blogId="produit.titre" @blogDeleted="handleBlogDeleted" />
        </li>
      </ul>
      <!-- Le formulaire pour ajouter un produit -->
      <h2>Ajouter un Produit</h2>
      <form @submit.prevent="addProduct">
        <div>
          <label for="titre">Titre :</label>
          <input type="text" id="titre" v-model="newProduct.titre" name="titre" />
        </div>
        <div>
          <label for="contenu">Contenu :</label>
          <textarea id="contenu" v-model="newProduct.contenu" name="contenu"></textarea>
        </div>
        <div>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.css';
  import SuppressionBlog from './suppressionBlog.vue';  
  export default {
    // On appelle notre Api permettant de visualiser les produits
    async asyncData({ $axios }) {
      try {
        const response = await $axios.get('/api/produit');
        const produits = response.data;
        return { produits };
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        return { produits: [] };
      }
    },
    data() {
      return {
        newProduct: {
          titre: '',
          contenue: '',
        },
      };
    },
    methods: {
      async addProduct() {
        try {
          //Notre Api permettant d'ajouter un produit
          const response = await this.$axios.post('/api/Ajt', this.newProduct);
  
          if (response.status === 200) {
            this.produits.push(response.data);
  
            this.newProduct.titre = '';
            this.newProduct.contenu = '';
  
            console.log('Produit ajouté avec succès');
          } else {
            console.error('Erreur lors de l\'ajout du produit');
          }
        } catch (error) {
          console.error('Erreur lors de la requête', error);
        }
      },
      handleBlogDeleted(blogId) {
        // Mise à jour de la liste des blogs en supprimant le blog supprimé
        this.produits = this.produits.filter((produit) => produit.titre !== blogId);
      },
    },
    components: {
    SuppressionBlog,
  },
  };
  </script>
  <style scoped>
  /* Styles spécifiques au composant */
  div {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 10px;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    margin: 0;
  }

  form {
    margin-top: 20px;
    border: 1px solid #ddd;
    padding: 20px;
  }

  label {
    font-weight: bold;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }
</style>
