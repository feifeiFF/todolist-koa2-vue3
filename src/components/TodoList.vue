<template>
  <div class="todolist">
    <TInput></TInput>
    <TList></TList>
    <TFooter></TFooter>
  </div>
</template>
<script >
import { reactive, defineComponent, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import TInput from './common/TInput.vue';
import TList from './common/TList.vue';
import TFooter from './common/TFooter.vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    TInput,
    TList,
    TFooter
  },
  setup () {
    const store = useStore();
    const state = reactive({
      list: [],
      input: ''
    });

    const todos = computed(() => {
      return store.state['index'].todoList || [];
    });

    console.log(store);

    return {
      ...toRefs(state),
      todos,
      store
    }

  },
  methods: {
    add () {
      console.log("hhhhhhhh", this.$store.state['index'].todoList || []);
      this.$store.dispatch("index/add", this.input)
    }
  }
})


</script>
<style  lang="scss">
.todolist {
  width: 800px;
  padding: 50px 20px;
  height: auto;
  margin: 15px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 20px 7px #ddd;
  background-image: radial-gradient(#fff, #fff, #ff98001f);
}
</style>