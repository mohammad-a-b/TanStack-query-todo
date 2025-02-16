<script setup></script>
<template>
  <header>
    <nav>
      <router-link to="/" class="nav-link">Todo Manager</router-link>
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
    </nav>
  </header>
  <main class="app-container">
    <router-view />
  </main>
</template>

<style>
.app-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.app-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 30px;
}
header {
  background: linear-gradient(135deg, #2d3436, #0984e3);
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
nav {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  gap: 40px;
}
.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s;
}
.nav-link:hover {
  color: #dfe6e9;
}
</style>
<!-- <template> 
  <div class="app-container">
    <header>
      <nav>
        <router-link to="/" class="nav-link">Todo Manager</router-link>
        <router-link to="/dashboard" class="nav-link">داشبورد</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>© 2025 Todo App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
.app-container { font-family: 'Roboto', sans-serif; background: #f5f7fa; min-height: 100vh; display: flex; flex-direction: column; }
header { background: linear-gradient(135deg, #2d3436, #0984e3); padding: 20px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
nav { max-width: 900px; margin: 0 auto; display: flex; justify-content: center; gap: 40px; }
.nav-link { text-decoration: none; color: #ffffff; font-size: 1.2rem; font-weight: 500; transition: color 0.3s; }
.nav-link:hover { color: #dfe6e9; }
footer { text-align: center; padding: 15px; background: #2d3436; color: #fff; font-size: 0.9rem; }
</style> -->
