<template>
  <div class="row">
    <div class="col-md-8">
      <table class="table" border="1">
        <thead>
          <tr>
            <th>标题</th>
            <th>作者</th>
            <th>内容</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ly_list" :key="item.url">
            <td>{{ item.title }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.content }}</td>
            <td>
              <button
                class="btn btn-success"
                title="编辑"
                @click="editLyb(item)"
              >
                <i class="glyphicon glyphicon-pencil"></i>
              </button>
              <button
                class="btn btn-danger"
                title="删除"
                style="margin-left: 10px"
                @click='deleteLyb(item)'
              >
                <i class="glyphicon glyphicon-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-4">
      <input type="hidden" v-model="lyb.url" />
      <div class="form-group">
        <label for="title">标题:</label>
        <input
          type="text"
          id="title"
          class="form-control"
          v-model="lyb.title"
        />
      </div>

      <div class="form-group">
        <label for="author">作者:</label>
        <input
          type="text"
          id="author"
          class="form-control"
          v-model="lyb.author"
        />
      </div>

      <div class="form-group">
        <label for="content">留言内容:</label>
        <textarea
          id="content"
          rows="10"
          class="form-control"
          v-model="lyb.content"
        ></textarea>
      </div>
      <br>
      <div class="form-group">
        <button class="btn btn-default" @click="saveLyb">确定</button>
                <button class="btn btn-default" @click="Cancel_Save" style="margin-left:10px">取消</button>

      </div>

    </div>
  </div>
</template>

<script>
// import {axios} from 'vue'
import axios from "axios";
import { onMounted, reactive, ref, toRefs } from "vue";
export default {
  name: "lyb",
  setup() {
    let base_url = "http://127.0.0.1:8000/api/lyb/";
    const lyb_black = { url: "", title: "", author: "", content: "" };
    let state = reactive({
      ly_list: [],
      //将lyb_black置为空 {}
      lyb: Object.assign({}, lyb_black),
    });
    //新增和编辑更新数据
    const getLyb = () => {
      axios
        .get(base_url)
        .then((res) => {
          state.ly_list = res.data;
          state.lyb=Object.assign({},lyb_black)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 一挂载 就进行查询数据展示
    onMounted(() => {
      getLyb();
    });
    // 进行修改赋值
    const editLyb = (item) => {
      state.lyb.url = item.url;
      state.lyb.title = item.title;
      state.lyb.author = item.author;
      state.lyb.content = item.content;
    };
    const saveLyb = () => {
      let newdata = {
        title: state.lyb.title,
        author: state.lyb.author,
        content: state.lyb.content,
      };
      if (state.lyb.url == "") {
        //新增数据 通过post请求 (新增的参数的url,数据)
        axios.post(base_url, newdata).then(()=>{
          console.log("新增成功")
          getLyb()
        }).catch(err=>{
          console.log("新增失败")
          console.log(err)
          
        })
      } else {
        //编辑数据 通过put请求 (要修改的url,数据)
        axios.put(state.lyb.url, newdata).then(()=>{
          console.log("修改成功")
          getLyb()
        }).catch(err=>{
          console.log("修改失败")
          console.log(err)
          
        })
      }
    };

    const deleteLyb=(item)=>{
        axios.delete(item.url).then(()=>{
          //更新表格
          console.log("删除成功")

                    getLyb()

        }).catch(err=>{
          console.log("删除失败")
          console.log(err)
        })
    }

    const Cancel_Save=()=>{
      console.log("取消")
  getLyb()
    }
    return {
      ...toRefs(state),
      editLyb,
      saveLyb,deleteLyb,Cancel_Save
    };
  },
};
</script>
