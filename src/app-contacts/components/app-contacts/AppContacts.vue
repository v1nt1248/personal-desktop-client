<script lang="ts" src="./app-contacts.ts">
</script>
<style lang="scss" scoped src="./app-contacts.scss">
</style>

<template>
    <div class="app-contacts">
        <div v-show="!editedMode" class="app-contacts__wrap">
            <div class="app-contacts__column-header">
                <v-btn
                    rounded
                    @click="addNewContact()"
                >
                    + {{ $t('contact.newBtn.text') }}
                </v-btn>
            </div>
            <div class="app-contacts__column-content">
                <contact-list @select="onSelect($event)"></contact-list>
            </div>
        </div>
        <person
            v-show="person"
            :person="person"
            :disabled="personDisabled"
            @exit="onExit()"
        ></person>
    </div>
</template>
