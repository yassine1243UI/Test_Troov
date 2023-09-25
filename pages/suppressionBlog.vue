<template>
    <div>
      <button @click="deleteBlog">Supprimer</button>
    </div>
</template>
  
  <script>
  export default {
    props: {
      blogId: String,
    },
    methods: {
      async deleteBlog() {
        try {
          const response = await this.$axios.delete('/api/Suppr', {
            data: { titre: this.blogId },
          });
  
          if (response.status === 200) {
            // Émettre un événement pour informer le composant parent de la suppression
            this.$emit('blogDeleted', this.blogId);
            console.log('Blog supprimé avec succès');
          } else {
            console.error('Erreur lors de la suppression du blog');
          }
        } catch (error) {
          console.error('Erreur lors de la requête', error);
        }
      },
    },
  };
</script>
  
  <style scoped>
  /* Styles spécifiques au composant */
  button {
    background-color: #dc3545;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c82333;
  }
  </style>
  