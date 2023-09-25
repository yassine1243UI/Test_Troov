<template>
    <div>
      <h1>Liste des Produits</h1>
      <ul>
        <li v-for="produit in produits" :key="produit._id">
            <BlogItem :produits="produits" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import BlogItem from "@/components/BlogItem"; // Assurez-vous d'importer correctement le composant BlogItem
  
  export default {
    name: 'IndexPage',
    components: {
      BlogItem // Déclarer le composant BlogItem pour pouvoir l'utiliser
    },
    data() {
      return {
        produits: [] // Initialisez la propriété produits comme un tableau vide
      };
    },
  
    async asyncData({ $axios }) {
      try {
        const response = await $axios.get('/api/produit');
        return {
          produits: response.data
        };
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        return {
          produits: [] // Assurez-vous de retourner un tableau vide en cas d'erreur
        };
      }
    }
  }
  </script>
  