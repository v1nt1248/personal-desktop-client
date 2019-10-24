<script lang="ts" src="./person.ts">
</script>
<style lang="scss" scoped src="./person.scss">
</style>

<template>
  <div v-if="contact" class="person">
    <image-uploader
      :url="contact.photo"
      :size="180"
      :letters="contact.name || contact.mails[0] || ''"
      :disabled="disabled"
      @change="contact.photo = $event"
    ></image-uploader>
    <div class="person__form">
      <div class="person__form-toolbar">
        <div class="person__form-toolbar-btns">
          <v-btn
            type="button"
            icon
            large
            color="grey"
            @click="startAction('chat')"
          >
            <v-icon :size="24">chat</v-icon>
          </v-btn>
          <v-btn
            type="button"
            icon
            large
            color="grey"
            @click="startAction('mail')"
          >
            <v-icon :size="24">mail_outline</v-icon>
          </v-btn>
        </div>
        <v-btn
          type="button"
          icon
          large
          :color="colors.red"
          @click="startAction('delete')"
        >
          <v-icon :size="24">delete_outline</v-icon>
        </v-btn> 
      </div>

      <v-form
        ref="form"
        v-model="valid"
        class="person__form-content"
      >
        <v-text-field
          autofocus
          label="3NMail:"
          placeholder="Please enter 3Nmail"
          v-model="contact.mails[0]"
          :rules="[
            () => contact && !!contact.mails[0] || 'This field is required',
            () => contact && contact.mails[0] && mailReg.test(contact.mails[0]) || 'Not valid mail'
          ]"
          clearable
          :disabled="disabled"
          required
        ></v-text-field>
        <v-text-field
          label="Name:"
          placeholder="Please enter name"
          clearable
          :disabled="disabled"
          v-model="contact.name"
        ></v-text-field>
        <v-text-field
          label="Phone:"
          placeholder="Please enter phone"
          clearable
          :disabled="disabled"
          v-model="contact.phone"
        ></v-text-field>
        <v-textarea
          label="Notice:"
          placeholder="Please enter notice"
          auto-grow
          row-height="20"
          rows="1"
          clearable
          :disabled="disabled"
          v-model="contact.notice"
        ></v-textarea>
      </v-form>

      <div class="person__form-actions">
        <v-btn
          type="button"
          outlined
          :color="colors.azure"
          @click="startAction('cancel')"
        >
          Cancel
        </v-btn>

        <v-btn
          type="button"
          class="person__form-action-btn"
          :color="colors.azure"
          :disabled="!valid"
          @click="startAction('create')"
        >
          Create
        </v-btn> 
      </div>
    </div>
  </div>
</template>
