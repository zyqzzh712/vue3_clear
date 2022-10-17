<template>
  <div class="row">
    <div class="col-md-8">
      <div class="input-group">
        <span class="input-group-addon" id="glyphicon glyphicon-user"
          >账号</span
        >
        <input
          type="text"
          class="form-control"
          placeholder="请输入账号"
          aria-describedby="basic-addon1"
          v-model="user.username"
        />
      </div>
        <br>
       <div class="input-group">
        <span class="input-group-addon" id="glyphicon glyphicon-user"
          style="margin-left:10px">密码</span
        >
        <input
          type="password"
          class="form-control"
          placeholder="请输入密码"
          aria-describedby="basic-addon1"
          v-model="user.password"
        />
      </div>
      <br>
      <div class="form-group">
        <button class="btn btn-default" @click="login">登录</button>
                <button class="btn btn-default" @click="reg" style="margin-left:10px">注册</button>

      <span v-if="messg_is" style="margin-left:10px">{{messg}}</span>
      </div>
      
      <!-- 无网络动态加载样式 -->
      <!-- <el-dialog
    v-model="centerDialogVisible"
    title="注册"
    width="40%"
    align-center
    
  >
  <el-form
    label-width="100px"
    style="max-width: 460px"
  >
      <el-form-item label="账号" >
      <input v-model="ruleForm.use" class="form-control" />
    </el-form-item>
    <el-form-item label="密码">
      
      <input v-model="ruleForm.pass" class="form-control" />
    </el-form-item>

<el-form-item>
      <el-button type="primary" 
        @click="determine">确认</el-button
      >
      <el-button type="primary" @click="centerDialogVisible=false">取消</el-button>
    </el-form-item>
  </el-form>

  </el-dialog> -->


    </div>
     <div class="RIghr" v-if="is_add">
      <span>用户注册</span>
      <br>
      <br>

      账号    :<input type="text" v-model="reg_user.user"/>
      <br>
      <br>
      密码   :<input type="password" v-model="reg_user.password"/>

      <br>
      <br>

      确认
      <br>
      密码 :<input type="password" v-model="reg_user.enter_password" />
<br>
      <br>
      <div>
      <button @click="saveAdd">确认</button>
      <button  @click="salaAdd">取消</button>
      <span>{{reg_user.if_true}}</span>
    </div>
     </div>
    
     
  </div>
  
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import {useRouter} from 'vue-router'
import axios from 'axios'
export default {
  name: "login",

  setup() {
    const reg_user=reactive({
      user:"",
      password:"",
      enter_password:"",
      if_true:""
    })
    const router=useRouter()
    let base_url = "http://127.0.0.1:8000/api/user/";
    const user_black = { url: "", username: "", password: "" };
    const ruleForm=reactive({
      use:"",
      pass:""
    })
    const user = reactive({
      user_list: [],
      messg:"123",
      messg_is:false,
      centerDialogVisible:false,
      is_add:false,
      user: Object.assign({}, user_black),
    });
    
    //登录按钮
    const login=()=>{
      console.log('登录');
      if(user.user.username=="" || user.user.password==""){
        alert("账号密码不能为空")
        user.messg_is=true
              user.messg='账号密码不能为空'
      }else{
      console.log(`登录账号 ${user.user.username} 密码${user.user.password}`);
      user.user_list.forEach(item=>{
          if(user.user.username==item.username){
            if(user.user.password==item.password){
              localStorage.setItem("token",1)
              router.push("/user")
            }else{
              user.messg_is=true
              user.messg='账号密码错误'
          }

            }else{
              user.messg_is=true
              user.messg='账号密码错误'
          }
        })
      getUser()}
    }
    //注册按钮
    const reg=()=>{
      console.log('注册');
      user.centerDialogVisible=true;
      user.is_add=true
    }
    //查询后端接口数据
    const getUser=()=>{
      axios.get(base_url).then(res=>{
        user.user_list=res.data
        user.user=Object.assign({}, user_black)
        

      })
    }
    onMounted(()=>{
      getUser()
      console.log("挂载成功")
      console.log(user);
      
    })
    //确定弹窗
    const determine=()=>{
      console.log(ruleForm)
      user.centerDialogVisible=false
    }
    
     const salaAdd=()=>{
      console.log('取消添加');
      user.is_add=false
      reg_user.user=""
      reg_user.password=""
      reg_user.enter_password=""

    }
    const saveAdd=()=>{
      console.log('确认添加');
      if(reg_user.user=="" || reg_user.password=="" || reg_user.enter_password==""){
        reg_user.if_true="账号密码不能为空"
      }else if(reg_user.password != reg_user.enter_password){
        reg_user.if_true="输入两次密码不一致"
      }else{
        let newdata={
          username:reg_user.user,
          password:reg_user.password
        }
        axios.post(base_url,newdata).then(()=>{
          alert("添加成功");
          user.is_add=false
          reg_user.user=""
          reg_user.password=""
          reg_user.enter_password=""
          getUser()
        }).catch(err=>{
          console.log("新增失败");
          console.log(err);
        })
      }
    }
    return {
      ...toRefs(user),
      login,reg,ruleForm,determine,salaAdd,saveAdd
      ,reg_user
    };
  },
};
</script>
<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.RIghr{
  margin-top: 10%;
  margin-left: 30%;
  background: beige;
  width: 300px;
  height: 300px;
}
</style>