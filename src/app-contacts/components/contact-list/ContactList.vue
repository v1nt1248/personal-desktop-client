<script lang="ts" src="./contact-list.ts">
</script>
<style lang="scss" scoped src="./contact-list.scss">
</style>

<template>
  <div class="contact-list">
    <div class="contact-list__search-block">
      <v-text-field
        single-line
        prepend-inner-icon="search"
        clearable
        hide-details
        heigth="40"
        :color="colors.azure"
        v-model="searchText"
      ></v-text-field>
    </div>
    {{ searchText }}
  </div>
</template>
