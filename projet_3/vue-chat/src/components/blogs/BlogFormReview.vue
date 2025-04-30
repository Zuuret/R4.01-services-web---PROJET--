<template>
    <div class="container">
      <h5>Please confirm your entries</h5>
      <div v-for="field in fields" :key="field.name" class="flow-text">
        <label>{{ field.label }}</label>
        <p>{{ formValues[field.name] }}</p>
      </div>
      <button class="btn yellow darken-3 white-text" @click="onCancel">Back</button>
      <button class="btn green right white-text" @click="onSave">
        Save Blog <i class="material-icons right">email</i>
      </button>
    </div>
</template>
  
<script>
  import { toRefs } from 'vue';
  import formFields from './formFields';
  import { useBlogsStore } from '../../store';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'BlogFormReview',
    props: { formValues: Object },
    setup(props, { emit }) {
      const { formValues } = toRefs(props);
      const fields = formFields;
      const store = useBlogsStore();
      const router = useRouter();
  
      const onCancel = () => emit('cancel');
      const onSave = async () => {
        await store.submitBlog(formValues.value);
        router.push('/blogs');
      };
  
      return { formValues, fields, onCancel, onSave };
    }
  };
</script>
  