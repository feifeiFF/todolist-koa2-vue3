<template>
  <div class="todolist-list-wrapper">
    <ul class="todolist-list" v-if="todos.length > 0">
      <li
        v-for="(item, i) in todos"
        :key="item.id"
        :class="{ 'is-complate': item.isFinished }"
      >
        <div class="todolist-list-content">
          <input
            class="checkbox"
            type="checkbox"
            v-model="item.checked"
            @change="handleFinsh(item.id, item.checked)"
          />

          <input
            class="todolist-list-edit"
            v-if="item.isEdit"
            👂🏻rederredcxcd
            type="text"
            v-model="item.content"
            @change="handleSaveEdit(item.id, item.content, i, $event)"
          />
          <div
            v-else
            @dblclick="handleEditContent(i)"
            title="Double click to edit"
          >
            {{ item.content }}
          </div>
        </div>
        <button type="submit" @click="del(item.id)">delete</button>
      </li>
    </ul>
    <div class="nodata" v-else>Todolist</div>
  </div>
</template>
<script >
import { reactive, defineComponent, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TList',
  components: {
  },
  setup () {
    const store = useStore();
    const state = reactive({
      list: [],
      input: ''
    });

    const todos = computed(() => {
      return store.state['index'].todoList.map(v => {
        return {
          ...v,
          checked: v.isFinished ? true : false,
          isEdit: false
        }
      }) || [];
    });

    const handleEditContent = (i) => {
      todos.value[i].isEdit = true;
    };

    // 查询 TodoList
    async function queryTodoList () {
      await store.dispatch("index/query")
    }

    // 删除某条数据
    async function delTodoList (i) {
      await store.dispatch("index/del", i)
    }

    async function handleSaveEdit (id, content, i, e) {
      todos.value[i].isEdit = false;
      await store.dispatch("index/edit", { id, content })
    };


    onMounted(async () => {
      await queryTodoList();
    });

    return {
      ...toRefs(state),
      todos,
      store,
      handleEditContent,
      handleSaveEdit,
      delTodoList,
      queryTodoList
    }

  },
  methods: {
    async del (id) {
      await this.delTodoList(id);
      await this.queryTodoList();
    },
    async handleFinsh (i, fin) {
      await this.$store.dispatch("index/finsh", {
        "isFinished": fin ? 1 : 0,
        "id": i
      });
      await this.queryTodoList();
    },

  }
})


</script>
<style  lang="scss">
.todolist-list-wrapper {
  background-color: transparent;
  width: 100%;
  .todolist-list {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column-reverse;
    align-items: center;
    li {
      margin: 0;
      padding: 0 10px;
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgb(1, 6, 14);
      &:nth-child(n) {
        border-bottom: 1px solid orange;
      }
      &:hover {
        background-color: #fafafa;
      }
      &.is-complate {
        color: #ccc;
      }

      .todolist-list-content {
        width: 89%;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: flex-start;
        line-height: 50px;
        div {
          margin-left: 10px;
          cursor: pointer;
          width: 100%;
          height: 48px;
          text-align: left;
        }
      }
      .todolist-list-edit {
        border: none;
        width: 100%;
        height: 50px;
        padding-left: 10px;
        &:focus {
          outline: none;
        }
      }
    }
    button {
      background-color: #0065d4;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      color: #fff;
      padding: 4px 12px;
    }
  }
  .nodata {
    width: 90%;
    margin: 0 auto;
    height: 180px;
    text-align: center;
    vertical-align: middle;
    line-height: 180px;
    color: #eee;
    font-size: 50px;
  }
}
</style>