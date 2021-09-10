<template>
  <div class="todolist-footer-wrapper">
    <div class="todolist-footer">
      <div>
        <input
          type="checkbox"
          name="checked"
          id="checked"
          :disabled="$store.state['index']['todoList'].length === 0"
          v-model="allChecked"
          @change="handleAllChecked"
        />
        <label for="checked">{{
          allChecked ? "Cancel Complete All" : "Complete All"
        }}</label>
      </div>
      <div>total: {{ $store.state.index.todoList.length }}</div>
    </div>
  </div>
</template>
<script >
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TFooter',
  setup () {
    const store = useStore();
    const state = reactive({
      input: ''
    });

    const allChecked = computed(() => {

      const allLength = store.state['index']['todoList'].length;
      if (allLength > 0) {
        return store.state['index']['todoList'].every(v => v.isFinished);
      } else {
        return false;
      }

    });

    // 查询 TodoList
    async function queryTodoList () {
      await store.dispatch("index/query")
    }

    const handleAllChecked = async (val) => {
      console.log(val, "val");
      let isFinished = val.target.checked ? 1 : 0;
      await store.dispatch('index/allFinsh', { isFinished });
      await queryTodoList();
    };

    return {
      ...toRefs(state),
      handleAllChecked,
      allChecked
    }
  },

  methods: {
    async add () {
      await this.$store.dispatch("index/add", this.input);
      this.input = '';
    }
  }
})


</script>
<style  lang="scss">
.todolist-footer-wrapper {
  width: 100%;
  .todolist-footer {
    background-color: #faebd761;
    margin: 0 auto;
    padding: 0 10px;
    width: 90%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      margin-left: 10px;
    }
  }
}
</style>