<template>
  <BlogItem />
</template>

<script>
export default {
  name: 'IndexPage',
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
