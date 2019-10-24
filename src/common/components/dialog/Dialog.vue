<script lang="ts" src="./dialog.ts">
</script>
<style lang="scss" scoped src="./dialog.scss">
</style>

<template>
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="500"
    >
        <v-card>
            <v-card-title class="dialog__title">
                {{ dialogService.dialogConfig.title }}
            </v-card-title>
            <v-card-text class="dialog__content">
                {{ dialogService.dialogConfig.content }}
            </v-card-text>
            <v-card-actions class="dialog__action">
                <v-btn
                    :color="colors.azure"
                    class="dialog__btn-cancel"
                    @click.stop.prevent="setDialogResponse(false, $event)"
                >
                    {{ dialogService.dialogConfig.cancelButton }}
                </v-btn>
                <v-btn
                    :color="colors.main"
                    class="dialog__btn-success"
                    @click.stop.prevent="setDialogResponse(true, $event)"
                >
                    {{ dialogService.dialogConfig.successButton }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>