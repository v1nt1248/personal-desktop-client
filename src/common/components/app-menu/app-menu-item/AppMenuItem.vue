<template>
  <div
    class="app-menu-item"
    @click="selectMenuItem()"
  >
    <v-icon
      :size="24"
      class="app-menu-item__icon"
    >
      {{ item.icon }}
    </v-icon>
    <div
      v-if="item.badgeInfo"
      class="app-menu-item__info"
    >
      {{ item.badgeInfo }}
    </div>
    <div
      v-if="item.isActive"
      class="app-menu-item__active"
    ></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { VIcon } from 'vuetify/lib';
  import { appStore } from '@/common/di';
  @Component({
    components: {
      'v-icon': VIcon,
    },
  })
  export default class AppMenuItem extends Vue {
    @Prop() public item!: MenuNavItem;

    public selectMenuItem(): void {
      appStore.values.currentAppId = this.item.appId;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../common.scss";

  .app-menu-item {
    position: relative;
    box-sizing: box-sizing;
    width: $size-column;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .app-menu-item__icon {
    position: relative;
    color: var(--icon-default);
  }

  .app-menu-item__info {
    position: absolute;
    font-size: 12px;
    line-height: 1;
    font-weight: 600;
    padding: 5px $size-1x;
    border-radius: 11px;
    top: 10px;
    left: $size-6x;
    background-color: var(--azure);
    color: var(--white);
  }

  .app-menu-item__active {
    position: absolute;
    bottom: 0;
    height: 2px;
    left: 0;
    width: 100%;
    background-color: var(--azure);
  }
</style>
