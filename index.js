const PAGE ={
  data:{
    TOKEN_API:'https://www.jevescript.com/api/qiniu-token',
    QINIU_API:'http://upload-z2.qiniup.com',
    UPLOAD_API:'https://www.jevescript.com/api/image-upload',
  },
  init:function(){
    this.bing();
  },
  bing:function(){
    let button = document.getElementById('submit');
    // button.addEventListener('click',this.XHRuploadImage);
    // button.addEventListener('click',this.AXIOSuploadImage);
    button.addEventListener('click',this.FetchuploadImage);
  },
  FetchuploadImage:async function(){
    let files = document.getElementById('upload').files;
    let file = files[0];
    if(!file ){
      alert('缺少文件');
      return
    }
    //获取token
    let tokenFetch = await fetch(PAGE.data.TOKEN_API).then((response) => response.json());
    let token = tokenFetch.token;
    let domain = tokenFetch.domain;
    let key = Date.now()+'_'+file.name;
    let formData = new FormData();
    formData.append('file', file);
    formData.append('key', key);
    formData.append('fname', file.name);
    formData.append('token', token);
    formData.append('x.name', file.name);
    //上传图片
    await fetch(PAGE.data.QINIU_API,{
      method:'POST',
      body:formData,
    }).then(response => response.json())
    let image_url = domain + '/' + key;
    //上传地址
    let uploadFetch = await fetch(PAGE.data.UPLOAD_API,{
      method:'POST',
      body:JSON.stringify({image_url}),
      headers:{
        'content-type':'application/json'
      },
    }).then(response => response.json())
    if(uploadFetch.code === 200){
      alert('提交成功');
    }else{
      alert('提交失败')
    }
  }
  //Axios上传
  // AXIOSuploadImage:function(){
  //   let files = document.getElementById('upload').files;
  //   let file = files[0];
  //   if(!file){
  //     alert('缺少文件');
  //     return
  //   }
  //   //获取token
  //   let domain;
  //   let key = Date.now()+ '_' + file.name;
  //   axios.get(PAGE.data.TOKEN_API)
  //   .then(res =>{
  //     console.log(res)
  //     let token = "ckYYxI4xwp2etJ9okRlLO0tfzaSkm9hoQte2XKNu:Mec8qDZ-0uxZWjDJK1vJeJd_VpY=:eyJzY29wZSI6InN3ZWV0LWhvdXNlIiwiZGVhZGxpbmUiOjE1ODY1MTQxMzl9";
  //     domain = "sweet-house";
  //     return token;
  //   })
  //   .then(token =>{
  //     console.log(token)
  //     let formData = new FormData();
  //     formData.append('file',file);
  //     formData.append('key',key);
  //     formData.append('fname',file.name);
  //     formData.append('token',token);
  //     formData.append('x.name',file.name);
  //     //上传图片
  //     return axios.post(PAGE.data.QINIU_API, formData, {
  //       headers: {
  //         'Content-Type': 'multiple/form-data'
  //       }
  //     })
  //   })
  //   .then(res =>{
  //     let image_url = domain+'/'+key;
  //     console.log(res)
  //     console.log(image_url)
  //     //上传图片地址
  //     return axios.post(PAGE.data.UPLOAD_API,{image_url})
  //   })
  //   .then(res =>{
  //     if(res.data.code === 200){
  //       alert('提交成功')
  //     }else{
  //       alert('提交失败')
  //     }
  //   })
  // }


  //XHR上传
  // //判断是否有图片
  // XHRuploadImage:function(){
  //   let files = document.getElementById('upload').files;
  //   let file = files[0];
  //   if(!file){
  //     alert('缺少文件');
  //     return
  //   }
  //   //获取token
  //   let domain;
  //   PAGE._XHR('GET',PAGE.data.TOKEN_API,{},(res) =>{
  //     let token = res.data.uptoken;
  //     domain = res.data.domain;
  //     let key = Date.now() + '_' + file.name;
  //     let formData = {};
  //     formData['file'] = file;
  //     formData['key'] = key;
  //     formData['fname'] = file.name;
  //     formData['token'] = token;
  //     formData['x.name'] = file.name;
  //     formData['form-data'] = true;

  //     //上传图片
  //     PAGE._XHR('POST',PAGE.data.QINIU_API,formData,(res) =>{
  //       let image_url = domain +'/'+key;
  //       console.log(image_url)
  //       //上传图片地址
  //       PAGE._XHR('POST',PAGE.data.UPLOAD_API,{image_url},(res) =>{
  //         if(res.code === 200){
  //           alert('提交成功');
  //         }else{
  //           alert('提交失败');
  //         }
  //       })
  //     })
  //   })
  // },
  // _XHR: function(method,url,datas,success,progress,error,csrf) {
  //   console.log(123)
  //   let xhr = new XMLHttpRequest();
  //   xhr.open(method, url, true);
  //   if(csrf){
  //     xhr.withCredentials = true;
  //     xhr.setRequestHeader('X-CSRF-TOKEN',csrf);
  //   }

  //   let formData;
  //   console.log(datas['form-data'])
  //   if(datas['form-data']){
  //     formData = new FormData();
  //     for(let key in datas){
  //       formData.append(key, datas[key]);
  //     }
  //     console.log(123,datas)
  //     datas = formData;
  //   }else{
  //     formData = JSON.stringify(datas);
  //     xhr.setRequestHeader('content-type', 'application/json')
  //   }

  //   xhr.upload.onprogress = function (event) {
  //     typeof progress === 'function' && progress(event);
  //   };

  //   xhr.onerror = function(xhr, status, text) {
  //     typeof error === 'function' && error(xhr, status, text);
  //   };

  //   xhr.onreadystatechange = function(response) {
  //     if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
  //       typeof success === 'function' && success(JSON.parse(xhr.response))
  //     } else if (xhr.status != 200 && xhr.responseText) {
  //       typeof error === 'function' && error(xhr, xhr.status, xhr.responseText);
  //     }
  //   };

  //   xhr.send(formData);
  // }
}
PAGE.init();