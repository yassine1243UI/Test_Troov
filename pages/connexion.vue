<template>
  <!-- Nous avons le formulaire de connexion ici -->
    <div>
      <h2>Connexion</h2>
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
          <button type="submit">Se connecter</button>
          <router-link to="/inscription">
          <button>Page d'Inscription</button>
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
          // Notre Api permettant la connexion d'un utilisateur
          const response = await this.$axios.post('/api/conn', {
            email: this.email,
            mdp: this.mdp,
          });
  
          if (response.status === 201) {
            this.successMessage = 'Connexion réussie. Vous êtes maintenant connecté.';
            alert("Connexion réussie");
            this.$router.push('/blog'); 
          } else {
            console.error('Erreur lors de la connexion de l\'utilisateur');
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

  button{
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
