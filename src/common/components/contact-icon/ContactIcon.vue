<script lang="ts" src="./contact-icon.ts">
</script>
<style lang="scss" scoped src="./contact-icon.scss">
</style>

<template>
  <div
    class="contact-icon hexMask"
    :style="blockStyle"
  >
    <div
      v-if="!isSelect && !photo"
      class="contact-icon__letter"
      :style="getNameStyle()"
    >
      {{ getLetters() }}
    </div>

    <v-icon
      v-if="isSelect"
      :size="innerSize / 2"
    >
      check
    </v-icon>
  </div>
</template>
