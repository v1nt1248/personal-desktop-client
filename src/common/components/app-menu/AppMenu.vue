<script lang="ts" src="./app-menu.ts">
</script>
<style lang="scss" src="./app-menu.scss">
</style>

<template>
  <div class="app-menu">
    <div class="app-menu__info">
      <button
        type="button"
        class="app-menu__setup"
        @click="toggleLeftMenu()"
      >
        <contact-icon
          :name="user.name"
          :size="32"
        ></contact-icon>
      </button>
      <div class="app-menu__info-user">
        <b>{{ user.name }}</b>
        <span>{{ $t(user.status) }}</span>
      </div>


      <div class="app-menu__apps">
        <app-menu-item
          v-for="item in menuItems"
          :key="item.appId"
          :item="item"
        ></app-menu-item>
      </div>
    </div>

    <div class="app-menu__action">
      <v-btn       
        icon
        @click="toggleRightMenu()"
      >
        <v-icon :size="24">
          person_outline
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>