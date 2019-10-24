<script lang="ts" src="./personal-client-desktop.ts">
</script>
<style lang="scss" src="./personal-client-desktop.scss">
</style>

<template>
    <v-app>
        <div
            id="client"
            class="personal-client-desktop"
            data-theme="default"
        >   
            <div class="personal-client-desktop__info">
                Application initialization ...
            </div>
            <transition name="fade" mode="out-in" appear>
                <router-view></router-view>
            </transition>
        </div>
    </v-app>
</template>
