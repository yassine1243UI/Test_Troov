<template>
  <!-- Nous avons le formulaire d'inscription ici -->
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label>Email:</label>
          <input v-model="email" type="text" />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input v-model="mdp" type="password" />
        </div>
        <div>
          <button type="submit">S'inscrire</button>
          <router-link to="/connexion">
            <button>Page de Connexion</button>
          </router-link>
        </div>
      </form>
      <p>{{ successMessage }}</p>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        mdp: '',
        successMessage: '',
      };
    },
    methods: {
      async handleSubmit() {
        try {
          // Nous avons ici l'Api qui permet l'inscription
          const response = await this.$axios.post('/api/Inscr', {
            email: this.email,
            mdp: this.mdp,
          });
  
          if (response.status === 201) {
            this.successMessage = 'Inscription réussie. Vous pouvez maintenant vous connecter.';
            alert("Inscription réussie");
            this.$router.push('/blog'); // Rediriger vers la page de connexion
          } else {
            console.error('Erreur lors de l\'inscription de l\'utilisateur');
          }
        } catch (error) {
          // Capturer l'erreur ici
          console.error('Erreur lors de la requête', error);
        }
      },
    },
  };
</script>
  
  <style scoped>
  div {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
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
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  