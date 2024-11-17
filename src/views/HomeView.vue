<template>
  <div class="home-page">
    <header class="hero-section">
      <div class="hero-content">
        <h1>Learn Languages Easily and Effectively</h1>
        <p>
          Explore a variety of languages at your own pace with our interactive
          lessons, challenges, and a supportive community.
        </p>
        <div class="cta-buttons">
          <router-link to="/RegisterPage" class="cta-btn"
            >Get Started</router-link
          >
          <router-link to="/LoginPage" class="cta-btn secondary"
            >Log In</router-link
          >
        </div>
      </div>
    </header>

    <section class="features">
      <h2>Why Choose Our Platform?</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <img src="/assets/vocabulary-icon.png" alt="Vocabulary" />
          <h3>Comprehensive Vocabulary</h3>
          <p>
            Learn the most common and essential words in your chosen language,
            categorized by topics for easier learning.
          </p>
        </div>
        <div class="feature-card">
          <img src="/assets/grammar-icon.png" alt="Grammar" />
          <h3>Grammar Made Simple</h3>
          <p>
            Understand the rules of your language with interactive lessons and
            examples, perfect for all proficiency levels.
          </p>
        </div>
        <div class="feature-card">
          <img src="/assets/assessment-icon.png" alt="Assessments" />
          <h3>Track Your Progress</h3>
          <p>
            Take language proficiency assessments and track your progress over
            time with visual charts and feedback.
          </p>
        </div>
      </div>
    </section>

    <section class="languages">
      <h2>Choose Your Language</h2>
      <div class="language-cards">
        <div
          class="language-card"
          v-for="language in languages"
          :key="language.id"
        >
          <img :src="language.image" alt="language.name" />
          <h3>{{ language.name }}</h3>
          <p>{{ language.description }}</p>
          <router-link :to="`/language/${language.id}`" class="cta-btn"
            >Start Learning</router-link
          >
        </div>
      </div>
    </section>

    <section class="testimonials">
      <h2>What Our Users Say</h2>
      <div class="testimonial-cards">
        <div class="testimonial-card">
          <p>
            "This platform made learning Spanish so easy! The interactive
            lessons and challenges kept me motivated every day."
          </p>
          <p>- Emily, Beginner Spanish Learner</p>
        </div>
        <div class="testimonial-card">
          <p>
            "I love how I can track my progress and get personalized
            recommendations for what to learn next. Highly recommended!"
          </p>
          <p>- John, Intermediate French Learner</p>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-content">
        <p>&copy; 2024 Language Learning Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languages: [
        {
          id: 1,
          name: "Spanish",
          description:
            "A widely spoken language in many countries around the world, including Spain and Latin America.",
          image: "/assets/spanish-icon.png",
        },
        {
          id: 2,
          name: "French",
          description:
            "Known for its beauty and use in international business, diplomacy, and culture.",
          image: "/assets/french-icon.png",
        },
        {
          id: 3,
          name: "German",
          description:
            "A key language in Europe, spoken by millions in Germany, Austria, and Switzerland.",
          image: "/assets/german-icon.png",
        },
        // Add more languages as necessary
      ],
    };
  },
};
</script>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.hero-section {
  background: url("/assets/hero-bg.jpg") no-repeat center center/cover;
  padding: 80px 20px;
  text-align: center;
  color: white;
}

.hero-section .hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-section .cta-buttons {
  margin-top: 20px;
}

.cta-btn {
  display: inline-block;
  padding: 15px 30px;
  margin: 10px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.cta-btn.secondary {
  background-color: #007bff;
}

.features,
.languages,
.testimonials {
  padding: 60px 20px;
  text-align: center;
}

.features h2,
.languages h2,
.testimonials h2 {
  font-size: 2rem;
  margin-bottom: 40px;
}

.feature-cards,
.language-cards,
.testimonial-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.feature-card,
.language-card,
.testimonial-card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-card img,
.language-card img {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
}

.language-card h3 {
  font-size: 1.5rem;
  margin-top: 10px;
}

.testimonial-card {
  font-style: italic;
  border-left: 4px solid #4caf50;
  padding-left: 20px;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
}

footer p {
  margin: 0;
}
</style>
