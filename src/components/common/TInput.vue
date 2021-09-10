<template>
  <div class="todolist-input-wrapper">
    <input
      type="text"
      v-model="input"
      @keyup.enter="add"
      class="todolist-input"
    />
  </div>
</template>
<script >
import { defineComponent, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TInput',
  setup () {
    const store = useStore();
    const state = reactive({
      input: ''
    });

    // 查询 TodoList
    async function addTodoList (data) {
      await store.dispatch("index/add", data)
    }


    return {
      ...toRefs(state),
      addTodoList
    }
  },

  methods: {
    async add () {
      await this.addTodoList(this.input);
      this.input = '';
    }
  }
})


</script>
<style  lang="scss">
.todolist-input-wrapper {
  width: 100%;
  height: auto;
  .todolist-input {
    width: 90%;
    height: 40px;
  }
  input {
    background-color: #faebd761;
    padding: 0 10px;
    border-color: sandybrown;
    border: 1px solid sandybrown;
  }
}
</style>