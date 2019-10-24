<script lang="ts" src="./app-setup.ts">
</script>
<style lang="scss" scoped src="./app-setup.scss">
</style>

<template>
  <div class="app-setup">
    <div class="app-setup__version">
      v. {{ appVersion }}
    </div>
    <div
        class="app-setup__body"
    >
      <div class="app-setup__info">
        <div class="app-setup__info-user">
          <contact-icon
            :name="user.name.split('@')[0]"
            :size="32"
          ></contact-icon>
          <div
            class="app-setup__info-user-status"
          >
            <b>{{ user.name }}</b>
            <span>{{ $t(user.status) }}</span>
          </div>
        </div>

        <ul class="app-setup__info-menu">
          <li
            v-for="item in setupMenu"
            :key="item.id"
            class="app-setup__info-menu-item"
            :class="{'is-selected': item.id === selectedSetupMenuItemId}"
            @click="selectedSetupMenuItemId = item.id"
          >
            <v-icon :size="18">
              {{ item.icon }}
            </v-icon>
            <span>
              {{ item.text }}
            </span>
          </li>
        </ul>
      </div>

      <v-btn
          class="app-setup__exit-btn"
          :color="colors.azure"
          @click="closeApp()"
      >
        {{ $t('app-setup.logout') }}
      </v-btn>
    </div>

    <div class="app-setup__content">
      <div v-if="selectedSetupMenuItemId">
        <h4 class="app-setup__content-title">
          {{ getSelectedSetupMenuItem(selectedSetupMenuItemId).text }}:
        </h4>
        <div
          v-for="item in getSelectedSetupMenuItem(selectedSetupMenuItemId).value"
          :key="item.code"
          class="app-setup__content-value"
          :class="{'is-selected': item.isSelected}"
          @click="selectSetupItem(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
