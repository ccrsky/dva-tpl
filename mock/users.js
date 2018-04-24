import { parse } from 'url';

let list = mockUserList();

function mockUserList() {
    const count = 1;
    const list = [];
    for (let i = 0; i < count; i += 1) {
      list.push({
        id: `${i}`,
        username: `测试用户${i}`,
        // authority: `${i==0?'administrator':'user'}`,
        roleId:1,
        status:1,
        phone: `138${Math.ceil(Math.random()*100000000)}`,
        email: `test${Math.ceil(Math.random()*20)}@sina.com`,
        password:'111111',
        gender:`${Math.random()>0.5?'male':'female'}`,
      });
    }
    return list;
}

export function getUserList(req,res) {
    
    const url = req.url;
  
    const params = parse(url, true).query;
    
    let result={};

    if(params.searchName){
      result = {
        list:list.filter(item=>{
          return ~item.userName.indexOf(decodeURIComponent(params.searchName))
        })
      }  
    }else{
      result = {
        ret:0,
        message:'',
        data:{
          rows:list,
          count:1,
        },
      } 
    }
  
    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
}
export function delateUsers(req,res) {
    const params = req.body.keys;
    list = list.filter(item=>{
        return !params.includes(item.key)
    });
    const result = {
      text:'删除成功'
    };
    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
}
export function changeAuthority(req,res){
  const params = req.body.params;
  let result={};
  if(params.authority){
    const authority = params.authority;
    list.forEach((item)=>{
      if(params.keys.includes(item.key)){
        item.authority = authority;
      }
    });
    result.text="权限修改成功"
  }else{
    result.text="权限修改失败"
  }
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function saveAdd(req,res){
  const params = req.body.params;
  if(params){
    list.push({
      key:`${list.length+1}`,
      ...params,
    })
  }
  const result={
    text:'保存成功',
    list,
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function saveEdit(req,res){
  const params = req.body.params;
  if(params){
    list.forEach(item=>{
      if (item.key == params.key){
        item.userName = params.userName;
        item.authority = params.authority;
        item.mobile= params.mobile;
        item.email= params.email;
        item.password= params.password;
        item.gender = params.gender;
      };
    })
  }
  const result={
    text:'保存成功',
    list,
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}