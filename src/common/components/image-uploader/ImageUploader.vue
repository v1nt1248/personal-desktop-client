<script lang="ts" src="./image-uploader.ts">
</script>
<style lang="scss" scoped src="./image-uploader.scss">
</style>

<template>
    <div class="image-uploader">
        <div
            class="image-uploader__body"
            :style="wrapperStyle"
        >
            <span v-if="!urlInner" class="image-uploader__initials">
                {{ initials }}
            </span>
            <v-btn
                absolute
                icon
                large
                color="white"
                class="image-uploader__btn"
                @click="setImage()"
            >
                <v-icon :size="32">
                    {{ urlInner ? 'delete_outline' : 'add' }}
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>
