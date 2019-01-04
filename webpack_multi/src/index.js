// import _ from "lodash";
import { _ajax } from "./common";
import $ from "jquery";
import './style/common.styl'
_ajax({
  method: "post",
  url: "/api/article_ajax.ashx?action=getArticleList",
  data: {
    category_id: 1,
    channel_name: "goods",
    pageIndex: 1,
    goodname: "",
    pageSize: 10
  }
}).then(res => {
  console.log(res);
});


