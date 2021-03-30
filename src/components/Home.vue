<template>
  <h1>Hello World!</h1>
  <div class="box">
    <div class="input-area">
      <a-input v-model:value="inputValue" class="input-form"></a-input>
      <a-button type="primary" @click="increment" class="increment-btn"
        >increment</a-button
      >
    </div>
    <div>
      <a-list item-layout="horizontal" :data-source="list">
        <template #renderItem="{ item, index }">
          <a-list-item>
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
              <template #title>
                <div v-if="isEdit && currentIndex === index">
                  <a-input v-model:value="item.title"></a-input>
                  <CheckOutlined @click="updateItem(index, item.title)" />
                </div>
                <span v-else @click="edit(index)">{{ item.title }}</span>
              </template>
              <template #avatar>
                <a-avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </template>
            </a-list-item-meta>
            <template #actions>
              <CloseOutlined @click="decrement(index)" />
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { CheckOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    CloseOutlined,
    CheckOutlined,
  },
  setup() {
    const store = useStore();

    const list = ref([]);
    let inputValue = ref();
    const isEdit = ref(false);
    let currentIndex = ref();

    const queryData = async () => {
      list.value = await store.dispatch("queryList");
    };

    onMounted(queryData);

    const increment = () => {
      store.dispatch("increment", { title: inputValue.value });
      inputValue.value = "";
    };

    const decrement = (index) => store.dispatch("decrement", index);

    const edit = (index) => {
      isEdit.value = true;
      currentIndex.value = index;
    };

    const updateItem = (index, title) => {
      store.dispatch("modify", {
        index,
        title,
      });
      isEdit.value = false;
      currentIndex.value = "";
    };

    return {
      count: computed(() => store.state.count),
      list: computed(() => store.state.list),
      inputValue,
      increment,
      decrement,
      isEdit,
      edit,
      updateItem,
      currentIndex,
    };
  },
});
</script>

<style scoped>
.box {
  margin: 0 auto;
  width: 400px;
}
.input-area {
  display: flex;
}

.input-form {
  flex: 1;
}

.increment-btn {
  margin-left: 15px;
}
</style>
