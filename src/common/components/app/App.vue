<script lang="ts" src="./app.ts">
</script>
<style lang="scss" src="./app.scss">
</style>

<template>
    <div class="app">
        <app-menu :menuItems="menusData"></app-menu>
        <p-dialog></p-dialog>
        <transition name="fade" mode="out-in" appear>
            <router-view></router-view>
        </transition>

        <v-navigation-drawer
            :value="isLeftSidebarOpen"
            left
            absolute
            clipped
            disable-route-watcher
            temporary
            width="590"
            @input="onChangeLeftSidebarStatus($event)"
        >
            <app-setup></app-setup>
        </v-navigation-drawer>

        <v-navigation-drawer
            :value="isRightSidebarOpen"
            right
            absolute
            clipped
            disable-route-watcher
            temporary
            stateless
            width="380"
            @input="onChangeRightSidebarStatus($event)"
        >
            <app-contacts v-closable:[isClosable]="qwe()"></app-contacts>
        </v-navigation-drawer>
    </div>
</template>