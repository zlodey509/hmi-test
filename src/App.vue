<template>
  <header class="header">
    <router-link class="header__item" active-class="header__item-active" :to="{name: 'main'}">Main</router-link>
    <router-link class="header__item" active-class="header__item-active" :to="{name: 'map'}">Map</router-link>
  </header>
  
  <div class="container">
    <router-view></router-view>
  </div>
</template>