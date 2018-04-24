import { parse } from 'url';

// mock tableListDataSource
const category = ['分类一','分类二','分类三'];
const owner = ['张三', '李四', '王五', '哈哈哈'];
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    id: i,
    uid: Math.floor(Math.random() * 7) + 1,
    title: `文章名称 ${i}`,
    owner: owner[Math.floor(Math.random() * 4)],
    category: category[Math.floor(Math.random() * 3)],
    feedback: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 4) + 1,
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function getArticleList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  let dataSource = [...tableListDataSource];

  // 排序
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  // 状态
  if (params.status && parseInt(params.status,10) !== 0) {
      dataSource = dataSource.filter(data => parseInt(data.status,10) === parseInt(params.status,10));
  }
  // 搜索title
  if (params.title) {
    dataSource = dataSource.filter(data => data.title.indexOf(params.title) > -1);
  }
  // 分类
  if (params.category) {
    dataSource = dataSource.filter(data => data.category.indexOf(params.category) > -1);
  }
  // 作者
  if (params.user) {
    dataSource = dataSource.filter(data => data.owner.indexOf(params.user) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getArticleList,
};
