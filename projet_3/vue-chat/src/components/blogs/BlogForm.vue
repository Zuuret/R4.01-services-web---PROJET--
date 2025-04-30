<template>
    <div class="container">
      <form @submit.prevent="onSubmit">
        <div v-for="field in fields" :key="field.name" class="input-field">
          <input v-model="form[field.name]" :id="field.name" type="text" />
          <label :for="field.name">{{ field.label }}</label>
          <span class="helper-text red-text" v-if="errors[field.name]">{{ errors[field.name] }}</span>
        </div>
        <router-link to="/blogs" class="btn-flat red white-text">Cancel</router-link>
        <button type="submit" class="btn teal right white-text">
          Next <i class="material-icons right">done</i>
        </button>
      </form>
    </div>
</template>
  
<script>
  import { reactive } from 'vue';
  import formFields from './formFields';
  
  export default {
    name: 'BlogForm',
    emits: ['next'],
    setup(_, { emit }) {
      const form = reactive({ title: '', content: '' });
      const errors = reactive({});
      const fields = formFields;
  
      const validate = () => {
        let valid = true;
        fields.forEach(f => {
          if (!form[f.name]) {
            errors[f.name] = 'You must provide a value';
            valid = false;
          } else {
            errors[f.name] = '';
          }
        });
        return valid;
      };
  
      const onSubmit = () => {
        if (validate()) {
          emit('next', { ...form });
        }
      };
  
      return { form, errors, fields, onSubmit };
    }
  };
</script>
  